// Readability metrics computed over extracted prose.
//
// The formulas are the standard published ones. They are estimates, not verdicts:
// their value here is comparative — which pages are hardest, and whether an edit
// moved a page in the right direction.

import { splitSentences, splitWords } from './extract.mjs';

// Words the vowel-group heuristic reliably gets wrong, plus the domain terms
// that dominate this site's prose and would otherwise skew every score.
const SYLLABLE_EXCEPTIONS = {
  are: 1,
  business: 2,
  create: 2,
  created: 2,
  every: 3,
  everyone: 3,
  idea: 3,
  metadata: 4,
  once: 1,
  online: 2,
  people: 2,
  role: 1,
  roles: 1,
  secure: 2,
  service: 2,
  services: 3,
  someone: 2,
  the: 1,
  there: 1,
  threshold: 2,
  update: 2,
  updated: 3,
  updates: 2,
  usable: 3,
  used: 1,
  where: 1,
};

export function countSyllables(word) {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return 0;
  if (normalized in SYLLABLE_EXCEPTIONS) return SYLLABLE_EXCEPTIONS[normalized];
  if (normalized.length <= 3) return 1;

  const trimmed = normalized
    .replace(/(?:[^laeiouy]es|[^laeiouy]e)$/, '')
    .replace(/^y/, '');

  const vowelGroups = trimmed.match(/[aeiouy]+/g);
  return Math.max(vowelGroups ? vowelGroups.length : 1, 1);
}

// Deliberately conservative: it catches "be + past participle" and is reported
// as an approximation, not a count to be trusted to the unit.
const PASSIVE = new RegExp(
  String.raw`\b(?:am|is|are|was|were|be|been|being)\b(?:\s+\w+ly)?\s+` +
    String.raw`\b(?:\w+ed|born|done|known|seen|given|taken|made|shown|written|` +
    String.raw`held|kept|left|sent|built|found|used|based|signed|met|set)\b`,
  'gi',
);

const LONG_SENTENCE_WORDS = 25;
const COMPLEX_WORD_SYLLABLES = 3;

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function analyzeProse(prose, jargonTerms = []) {
  const sentences = splitSentences(prose);
  const words = splitWords(prose);

  if (sentences.length === 0 || words.length === 0) return null;

  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const complexWords = words.filter(
    (word) => countSyllables(word) >= COMPLEX_WORD_SYLLABLES,
  ).length;

  const longSentences = sentences.filter(
    (sentence) => splitWords(sentence).length > LONG_SENTENCE_WORDS,
  );

  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = syllables / words.length;
  const complexWordRatio = complexWords / words.length;

  const lowerCaseProse = prose.toLowerCase();
  const jargonHits = jargonTerms
    .map((term) => {
      const pattern = new RegExp(
        String.raw`\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\w*\b`,
        'gi',
      );
      return { term, count: (lowerCaseProse.match(pattern) ?? []).length };
    })
    .filter((hit) => hit.count > 0)
    .sort((a, b) => b.count - a.count);

  const jargonTotal = jargonHits.reduce((sum, hit) => sum + hit.count, 0);

  return {
    words: words.length,
    sentences: sentences.length,
    wordsPerSentence: round(wordsPerSentence),
    // Flesch Reading Ease: 0-100, higher is easier. 60-70 is plain English.
    fleschReadingEase: round(
      206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord,
    ),
    // US school grade level needed to follow the text on a first read.
    fleschKincaidGrade: round(
      0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59,
    ),
    gunningFog: round(0.4 * (wordsPerSentence + 100 * complexWordRatio)),
    complexWordPercent: round(complexWordRatio * 100),
    longSentences: longSentences.length,
    longSentencePercent: round((longSentences.length / sentences.length) * 100),
    longestSentence: longSentences.reduce(
      (longest, sentence) =>
        splitWords(sentence).length > splitWords(longest).length
          ? sentence
          : longest,
      '',
    ),
    passiveApprox: (prose.match(PASSIVE) ?? []).length,
    jargonPer100Words: round((jargonTotal / words.length) * 100),
    topJargon: jargonHits.slice(0, 5),
  };
}

// Bands used to colour the report. Grade 9 is the widely used ceiling for
// general-audience technical writing; 12+ is university-level prose.
export function gradeBand(grade) {
  if (grade <= 9) return 'plain';
  if (grade <= 12) return 'firm';
  return 'hard';
}
