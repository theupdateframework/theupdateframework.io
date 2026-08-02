# Readability report

Measures how hard each page under `content/` is to read, so that changes aimed
at making TUF easier to understand can be checked rather than guessed at.

This is a reporting tool, not a style guide. It has no opinion about wording. It
answers one question: **which pages ask the most of a reader, and is that
changing over time?**

It does not measure whether an explanation is clear, and it cannot. See
[What these numbers cannot tell you](#what-these-numbers-cannot-tell-you) before
using a score to argue that a page got better.

## Running it

```sh
npm run check:readability
```

There are no dependencies to install: the tool is plain Node, using only the
standard library.

Useful options:

```sh
# The five hardest pages
npm run check:readability -- --top 5

# Markdown, for pasting into an issue or a CI job summary
npm run check:readability -- --format markdown

# Machine-readable, for diffing two revisions
npm run check:readability -- --format json

# Turn the report into a gate: fail if any page is above grade 12
npm run check:readability -- --max-grade 12

# Score one page, or a directory
npm run check:readability -- content/en/docs/metadata.md
```

Run `npm run check:readability -- --help` for the full list.

## Reading the numbers

| Column   | Meaning                                                             |
| :------- | :------------------------------------------------------------------ |
| `GRADE`  | Flesch-Kincaid grade level: US school year needed. Lower is easier. |
| `EASE`   | Flesch Reading Ease, 0-100. Higher is easier; 60-70 is plain.       |
| `FOG`    | Gunning Fog index, roughly the years of education needed.           |
| `LONG`   | Share of sentences longer than 25 words.                            |
| `JARGON` | Specialist terms per 100 words, counted against `terms.json`.       |
| `LOAD`   | `light` (grade 9 or under), `moderate` (10-12), `heavy` (over 12).  |

Grade 9 is the usual ceiling for writing aimed at a general audience. A page
above grade 12 is asking for university-level reading.

A high `JARGON` score is not automatically a problem — the metadata and
specification pages genuinely need those words. It is a problem on pages meant
to introduce TUF to someone who has never heard of it, because it means the page
assumes knowledge the reader does not have yet.

Pages with fewer than 120 words of prose are skipped and listed separately.
Landing pages built mostly from shortcodes fall into this group; there is not
enough text for the formulas to say anything meaningful.

## What counts as prose

Readability formulas only mean something when the input is actually prose, so
`extract.mjs` strips everything that is not: front matter, fenced code,
shortcodes, tables, headings, raw HTML, URLs and reference definitions. Link
text is kept and the target dropped, because that is what a reader reads.

Two details matter more than they look:

- Content here is hard-wrapped at 80 columns by Prettier, so a newline is
  usually a line wrap rather than a sentence break. Paragraphs are rejoined
  before sentences are counted. Without this every score is far too optimistic.
- A list item is treated as one sentence even when it has no full stop, so that
  a long bulleted list is not counted as a single enormous sentence.

## What these numbers cannot tell you

The formulas count sentence length and word complexity. That is all they count.
They say nothing about whether a reader understood anything.

The clearest way to see this: change one semicolon to a full stop. Not one word
is added, removed or reordered.

```text
The snapshot role signs metadata about the targets file; it also records
the version numbers of every other metadata file.
    grade 14.6, reading ease 26, load heavy

The snapshot role signs metadata about the targets file. It also records
the version numbers of every other metadata file.
    grade 10.7, reading ease 36, load moderate
```

The same twenty words, the same concepts, the same unexplained terms — and
nearly four grade levels better. Applied across a page, punctuation alone is
enough to move it a whole band while leaving it exactly as hard to understand.
There is a unit test pinning this behaviour so that nobody mistakes it for a
bug.

So: use the report to find the pages that ask the most of a reader. Do not use
it as evidence that a rewrite worked. Only a reader can tell you that.

Other limits worth knowing:

- Syllable counting is a heuristic with a small exception list. Individual words
  can be off by one; averages over a page are stable.
- `terms.json` is hand-maintained, so the jargon figure only reflects the terms
  someone thought to list. A rewrite can lower it by swapping vocabulary without
  making the idea any easier.
- Pages under 120 words of prose are skipped, so the site average covers only
  the pages long enough to score, not the whole site.
- Shortcode output is not expanded, so text injected through `{{% param %}}` is
  not scored.
- Passive-voice detection is approximate and reported as such.

Treat a single number as noise. Treat a consistent gap between two pages, or a
shift on one page across revisions, as something worth looking at by hand.

## Tests

```sh
npm run test:readability
```

The extraction and metric logic is regex-heavy, so it is covered by unit tests
using the Node test runner.
