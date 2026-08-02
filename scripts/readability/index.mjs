#!/usr/bin/env node
//
// Reports how hard each content page is to read.
//
// Usage:
//   node scripts/readability/index.mjs [paths...] [options]
//
// Options:
//   --format <text|markdown|json>  Output format (default: text)
//   --min-words <n>                Skip pages with fewer words (default: 120)
//   --max-grade <n>                Exit non-zero if any page exceeds this grade
//   --top <n>                      Show only the n hardest pages
//   --help                         Show this message
//
// A default run never fails: it is a report, not a gate. Pass --max-grade to
// turn it into one.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractProse } from './extract.mjs';
import { analyzeProse, gradeBand } from './metrics.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = dirname(scriptPath);
const repoRoot = resolve(scriptDir, '..', '..');
const { jargon } = JSON.parse(
  readFileSync(join(scriptDir, 'terms.json'), 'utf8'),
);

const DEFAULTS = {
  format: 'text',
  minWords: 120,
  maxGrade: null,
  top: null,
  paths: ['content'],
};

function parseArgs(argv) {
  const options = { ...DEFAULTS, paths: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case '--help':
      case '-h':
        options.help = true;
        break;
      case '--format':
        options.format = argv[(i += 1)];
        break;
      case '--min-words':
        options.minWords = Number(argv[(i += 1)]);
        break;
      case '--max-grade':
        options.maxGrade = Number(argv[(i += 1)]);
        break;
      case '--top':
        options.top = Number(argv[(i += 1)]);
        break;
      default:
        if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
        options.paths.push(arg);
    }
  }

  if (options.paths.length === 0) options.paths = DEFAULTS.paths;
  if (!['text', 'markdown', 'json'].includes(options.format)) {
    throw new Error(`Unknown format: ${options.format}`);
  }
  return options;
}

function findMarkdown(target) {
  const absolute = resolve(repoRoot, target);
  const stats = statSync(absolute);

  if (stats.isFile()) return absolute.endsWith('.md') ? [absolute] : [];

  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    return findMarkdown(join(absolute, entry.name));
  });
}

function titleOf(markdown, fallback) {
  const frontMatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const title = frontMatter?.[1].match(/^title:[ \t]*(.+)$/m)?.[1];
  return title?.replace(/^['"]|['"]$/g, '').trim() || fallback;
}

function shortPath(path) {
  return path.replace(/^content\/en\//, '');
}

function analyzeFile(file) {
  const markdown = readFileSync(file, 'utf8');
  const path = relative(repoRoot, file).split(sep).join('/');
  const metrics = analyzeProse(extractProse(markdown), jargon);

  return {
    path,
    title: titleOf(markdown, path),
    ...(metrics ?? { words: 0, sentences: 0 }),
    analyzed: metrics !== null,
  };
}

function summarize(pages) {
  const totalWords = pages.reduce((sum, page) => sum + page.words, 0);
  if (totalWords === 0) return null;

  // Weight by word count: a 2000-word page shapes the site's voice more than a
  // 150-word one does.
  const weighted = (key) =>
    Math.round(
      (pages.reduce((sum, page) => sum + page[key] * page.words, 0) /
        totalWords) *
        10,
    ) / 10;

  return {
    pages: pages.length,
    words: totalWords,
    fleschKincaidGrade: weighted('fleschKincaidGrade'),
    fleschReadingEase: weighted('fleschReadingEase'),
    gunningFog: weighted('gunningFog'),
    jargonPer100Words: weighted('jargonPer100Words'),
  };
}

const COLUMNS = [
  { key: 'grade', header: 'GRADE', align: 'right' },
  { key: 'ease', header: 'EASE', align: 'right' },
  { key: 'fog', header: 'FOG', align: 'right' },
  { key: 'long', header: 'LONG', align: 'right' },
  { key: 'jargon', header: 'JARGON', align: 'right' },
  { key: 'words', header: 'WORDS', align: 'right' },
  { key: 'band', header: 'BAND', align: 'left' },
  { key: 'path', header: 'PAGE', align: 'left' },
];

function toRow(page) {
  return {
    grade: page.fleschKincaidGrade.toFixed(1),
    ease: page.fleschReadingEase.toFixed(0),
    fog: page.gunningFog.toFixed(1),
    long: `${page.longSentencePercent.toFixed(0)}%`,
    jargon: page.jargonPer100Words.toFixed(1),
    words: String(page.words),
    band: gradeBand(page.fleschKincaidGrade),
    path: shortPath(page.path),
  };
}

function renderTable(rows) {
  const widths = Object.fromEntries(
    COLUMNS.map((column) => [
      column.key,
      Math.max(
        column.header.length,
        ...rows.map((row) => row[column.key].length),
      ),
    ]),
  );

  const format = (row) =>
    COLUMNS.map((column) =>
      column.align === 'right'
        ? row[column.key].padStart(widths[column.key])
        : row[column.key].padEnd(widths[column.key]),
    )
      .join('  ')
      .trimEnd();

  const header = Object.fromEntries(
    COLUMNS.map((column) => [column.key, column.header]),
  );

  return [format(header), ...rows.map(format)];
}

const LEGEND = [
  'GRADE = Flesch-Kincaid grade level (lower is easier). ' +
    'EASE = Flesch Reading Ease (higher is easier).',
  'FOG = Gunning Fog index. LONG = share of sentences over 25 words. ' +
    'JARGON = specialist terms per 100 words.',
];

function renderText(pages, summary, skipped) {
  const out = ['', 'Readability of content pages, hardest first', ''];
  out.push(...renderTable(pages.map(toRow)));
  out.push('');

  if (summary) {
    out.push(
      `Site average (weighted by length): grade ${summary.fleschKincaidGrade}, ` +
        `reading ease ${summary.fleschReadingEase}, fog ${summary.gunningFog}, ` +
        `jargon ${summary.jargonPer100Words} per 100 words`,
    );
    out.push(`Analyzed ${summary.pages} pages, ${summary.words} words.`);
  }
  if (skipped.length > 0) {
    out.push(
      `Skipped ${skipped.length} page(s) with too little prose to score: ` +
        skipped.map((page) => shortPath(page.path)).join(', '),
    );
  }

  out.push('', ...LEGEND, '');
  return out.join('\n');
}

function renderMarkdown(pages, summary, skipped) {
  const out = ['## Readability of content pages', ''];
  out.push('| Page | Grade | Ease | Fog | Long | Jargon /100 | Words |');
  out.push('| :--- | ----: | ---: | --: | ---: | ----------: | ----: |');

  for (const page of pages) {
    const marker =
      gradeBand(page.fleschKincaidGrade) === 'hard' ? ' :warning:' : '';
    out.push(
      `| \`${shortPath(page.path)}\`${marker} | ` +
        `${page.fleschKincaidGrade.toFixed(1)} | ` +
        `${page.fleschReadingEase.toFixed(0)} | ` +
        `${page.gunningFog.toFixed(1)} | ` +
        `${page.longSentencePercent.toFixed(0)}% | ` +
        `${page.jargonPer100Words.toFixed(1)} | ` +
        `${page.words} |`,
    );
  }

  out.push('');
  if (summary) {
    out.push(
      '**Site average** (weighted by page length): grade ' +
        `**${summary.fleschKincaidGrade}**, reading ease ` +
        `**${summary.fleschReadingEase}**, fog **${summary.gunningFog}**, ` +
        `jargon **${summary.jargonPer100Words}** per 100 words ` +
        `(${summary.pages} pages, ${summary.words} words).`,
      '',
    );
  }
  if (skipped.length > 0) {
    out.push(
      `Skipped ${skipped.length} page(s) with too little prose to score.`,
      '',
    );
  }

  out.push(
    'Grade is the Flesch-Kincaid grade level: the US school year a reader ' +
      'needs in order to follow the page on a first read. Lower is easier.',
  );

  return out.join('\n');
}

function showHelp() {
  const help = readFileSync(scriptPath, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('//'))
    .map((line) => line.replace(/^\/\/ ?/, ''))
    .join('\n');
  console.log(help.trim());
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    showHelp();
    return;
  }

  const analyzed = options.paths.flatMap(findMarkdown).sort().map(analyzeFile);

  const skipped = analyzed.filter(
    (page) => !page.analyzed || page.words < options.minWords,
  );
  const scored = analyzed
    .filter((page) => page.analyzed && page.words >= options.minWords)
    .sort((a, b) => b.fleschKincaidGrade - a.fleschKincaidGrade);

  const summary = summarize(scored);
  const pages = options.top ? scored.slice(0, options.top) : scored;

  if (options.format === 'json') {
    console.log(JSON.stringify({ summary, pages, skipped }, null, 2));
  } else if (options.format === 'markdown') {
    console.log(renderMarkdown(pages, summary, skipped));
  } else {
    console.log(renderText(pages, summary, skipped));
  }

  if (options.maxGrade === null) return;

  const failing = scored.filter(
    (page) => page.fleschKincaidGrade > options.maxGrade,
  );
  if (failing.length > 0) {
    console.error(
      `\n${failing.length} page(s) exceed the maximum grade level of ` +
        `${options.maxGrade}:`,
    );
    for (const page of failing) {
      console.error(`  ${page.path} (grade ${page.fleschKincaidGrade})`);
    }
    process.exitCode = 1;
  }
}

main();
