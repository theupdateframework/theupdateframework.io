// Turns Hugo-flavored Markdown into the plain prose a visitor actually reads.
//
// Readability scores are only meaningful when the input is prose. Front matter,
// fenced code, shortcodes, raw HTML, tables and URLs are not prose: leaving them
// in place inflates word and syllable counts and makes every page look harder
// than it is. Each step below removes one such category.

const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/;
const FENCED_CODE = /^[ \t]*(`{3,}|~{3,})[^\n]*[\s\S]*?^[ \t]*\1[^\n]*$/gm;
const SHORTCODE = /\{\{[<%][\s\S]*?[>%]\}\}/g;
const REF_DEFINITION = /^[ \t]*\[[^\]^]+\]:[ \t]+.*$/gm;
const TABLE_ROW = /^[ \t]*\|.*$/gm;
const HEADING = /^[ \t]*#{1,6}[ \t]+.*$/gm;
const HORIZONTAL_RULE = /^[ \t]*([-*_])[ \t]*(?:\1[ \t]*){2,}$/gm;
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g;
const FOOTNOTE_REF = /\[\^[^\]]+\]/g;
const NUMERIC_REF = /\[{1,2}\d+\]{1,2}/g;
const INLINE_LINK = /\[([^\]]*)\]\([^)]*\)/g;
const REFERENCE_LINK = /\[([^\]]+)\]\[[^\]]*\]/g;
const INLINE_CODE = /`[^`\n]*`/g;
const AUTOLINK = /<(?:https?|mailto):[^>]*>/g;
const BARE_URL = /\b(?:https?:\/\/|www\.)\S+/g;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;
const HTML_TAG = /<\/?[a-zA-Z][^>]*>/g;
const HTML_ENTITY = /&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g;
const BLOCKQUOTE = /^[ \t]*>[ \t]?/gm;
const LIST_ITEM = /^([ \t]*)(?:[-*+]|\d+[.)])[ \t]+(.*)$/;
const EMPHASIS = /(\*{1,3}|_{1,3})(?=\S)([^\n]*?\S)\1/g;
const TRAILING_SPACE = /[ \t]+$/gm;
const EXCESS_BLANK_LINES = /\n{3,}/g;

// A bullet or numbered item reads as one unit even when it has no terminal
// punctuation. Closing it with a period keeps sentence counts honest, instead
// of letting a whole list collapse into one enormous "sentence".
function terminateListItems(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      const match = line.match(LIST_ITEM);
      if (!match) return line;
      const [, indent, body] = match;
      const trimmed = body.trimEnd();
      if (!trimmed) return indent;
      return /[.!?:;]$/.test(trimmed)
        ? `${indent}${trimmed}`
        : `${indent}${trimmed}.`;
    })
    .join('\n');
}

// Content here is hard-wrapped (Prettier's proseWrap: always), so a newline is
// usually a wrap, not a boundary. Rejoining each paragraph into one line is what
// lets sentence detection see whole sentences instead of 80-column fragments.
// List items survive this because terminateListItems() already punctuated them.
function reflowParagraphs(text) {
  return text
    .split(/\n[ \t]*\n/)
    .map((block) => block.replace(/[ \t]*\n[ \t]*/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n');
}

export function extractProse(markdown) {
  let text = markdown.replace(/\r\n/g, '\n');

  text = text.replace(FRONT_MATTER, '');
  text = text.replace(HTML_COMMENT, '');
  text = text.replace(FENCED_CODE, '');
  text = text.replace(SHORTCODE, '');
  text = text.replace(REF_DEFINITION, '');
  text = text.replace(TABLE_ROW, '');
  // Headings are labels, not prose, and are usually verbless fragments.
  text = text.replace(HEADING, '');
  text = text.replace(HORIZONTAL_RULE, '');

  text = terminateListItems(text);

  text = text.replace(IMAGE, '');
  text = text.replace(FOOTNOTE_REF, '');
  text = text.replace(NUMERIC_REF, '');
  // Keep the link text, drop the target: readers read the text, not the URL.
  text = text.replace(INLINE_LINK, '$1');
  text = text.replace(REFERENCE_LINK, '$1');
  text = text.replace(INLINE_CODE, '');
  text = text.replace(AUTOLINK, '');
  text = text.replace(BARE_URL, '');
  text = text.replace(HTML_TAG, ' ');
  text = text.replace(HTML_ENTITY, ' ');
  text = text.replace(BLOCKQUOTE, '');
  text = text.replace(EMPHASIS, '$2');
  text = text.replace(/[[\]]/g, '');

  return reflowParagraphs(
    text.replace(TRAILING_SPACE, '').replace(EXCESS_BLANK_LINES, '\n\n').trim(),
  );
}

// Abbreviations whose period does not end a sentence.
const ABBREVIATIONS = [
  'e.g.',
  'i.e.',
  'etc.',
  'vs.',
  'cf.',
  'approx.',
  'Inc.',
  'Ltd.',
  'Co.',
  'Mr.',
  'Mrs.',
  'Ms.',
  'Dr.',
  'Prof.',
  'St.',
  'No.',
  'Fig.',
  'al.',
  'U.S.',
  'a.m.',
  'p.m.',
];

// Stand-in for a period that must not be treated as a sentence boundary.
const SENTINEL = '@@DOT@@';

function protectPeriods(text) {
  let out = text;
  for (const abbreviation of ABBREVIATIONS) {
    out = out.split(abbreviation).join(abbreviation.replaceAll('.', SENTINEL));
  }
  // Decimals and version numbers.
  out = out.replace(/(\d)\.(?=\d)/g, `$1${SENTINEL}`);
  // Ellipses.
  out = out.replace(/\.{2,}/g, (match) => SENTINEL.repeat(match.length));
  return out;
}

export function splitSentences(prose) {
  return protectPeriods(prose)
    .split('\n')
    .flatMap((line) => line.split(/(?<=[.!?])["'’)\]]*\s+/))
    .map((sentence) => sentence.replaceAll(SENTINEL, '.').trim())
    .filter((sentence) => /[A-Za-z]/.test(sentence));
}

export function splitWords(text) {
  // Hyphens and apostrophes belong to the word; everything else separates.
  return text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];
}
