import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { extractProse, splitSentences, splitWords } from './extract.mjs';
import { analyzeProse, countSyllables, gradeBand } from './metrics.mjs';

describe('extractProse', () => {
  test('drops front matter', () => {
    const prose = extractProse(
      '---\ntitle: Overview\nweight: 100\n---\n\nReal text.\n',
    );
    assert.equal(prose, 'Real text.');
  });

  test('drops fenced code blocks', () => {
    const prose = extractProse(
      'Before.\n\n```json\n{ "a": 1 }\n```\n\nAfter.\n',
    );
    assert.equal(prose, 'Before.\n\nAfter.');
  });

  test('drops Hugo shortcodes in both delimiter styles', () => {
    const prose = extractProse(
      '{{% blocks/cover title="Hi" %}}\nKept.\n{{< youtube "abc" >}}\n',
    );
    assert.equal(prose, 'Kept.');
  });

  test('drops tables, headings and horizontal rules', () => {
    const prose = extractProse(
      '## A heading\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n---\n\nProse only.\n',
    );
    assert.equal(prose, 'Prose only.');
  });

  test('keeps link text but drops the target', () => {
    const prose = extractProse('See the [TUF spec](https://example.com/spec).');
    assert.equal(prose, 'See the TUF spec.');
  });

  test('drops reference definitions and bare URLs', () => {
    const prose = extractProse(
      'Read more.\n\n[group]: https://example.com/group\n',
    );
    assert.equal(prose, 'Read more.');
  });

  test('rejoins hard-wrapped lines within a paragraph', () => {
    // Prettier wraps prose at 80 columns, so a newline is a wrap, not a break.
    const prose = extractProse(
      'One sentence that was\nwrapped across lines.\n',
    );
    assert.equal(prose, 'One sentence that was wrapped across lines.');
    assert.equal(splitSentences(prose).length, 1);
  });

  test('treats each list item as its own sentence', () => {
    const prose = extractProse('- first item\n- second item\n- third item\n');
    assert.equal(splitSentences(prose).length, 3);
  });

  test('leaves already-punctuated list items alone', () => {
    const prose = extractProse('- Only item.\n');
    assert.equal(prose, 'Only item.');
  });
});

describe('splitSentences', () => {
  test('splits on terminal punctuation', () => {
    const sentences = splitSentences('One. Two! Three? Four.');
    assert.deepEqual(sentences, ['One.', 'Two!', 'Three?', 'Four.']);
  });

  test('does not split on abbreviations', () => {
    const sentences = splitSentences(
      'Use a key, e.g. an offline one, to sign.',
    );
    assert.equal(sentences.length, 1);
  });

  test('does not split on decimals', () => {
    assert.equal(splitSentences('Version 1.2.3 shipped.').length, 1);
  });

  test('splits across paragraph boundaries', () => {
    assert.equal(splitSentences('No period here\n\nNor here').length, 2);
  });
});

describe('splitWords', () => {
  test('keeps hyphens and apostrophes inside words', () => {
    assert.deepEqual(splitWords("a well-known client's key"), [
      'a',
      'well-known',
      "client's",
      'key',
    ]);
  });

  test('ignores bare numbers and punctuation', () => {
    assert.deepEqual(splitWords('3 keys, 2 roles.'), ['keys', 'roles']);
  });
});

describe('countSyllables', () => {
  const cases = {
    a: 1,
    the: 1,
    key: 1,
    role: 1,
    update: 2,
    signing: 2,
    threshold: 2,
    repository: 5,
    metadata: 4,
    cryptographic: 4,
  };

  for (const [word, expected] of Object.entries(cases)) {
    test(`${word} has ${expected} syllable(s)`, () => {
      assert.equal(countSyllables(word), expected);
    });
  }
});

describe('analyzeProse', () => {
  test('returns null when there is nothing to score', () => {
    assert.equal(analyzeProse('', []), null);
  });

  test('rates plain prose as easier than dense prose', () => {
    const plain = 'The dog ran. The cat sat. We had fun. It was a good day.';
    const dense =
      'Notwithstanding the cryptographic delegation hierarchy, the ' +
      'authentication of repository metadata necessitates a threshold of ' +
      'independently generated signatures whose provenance remains verifiable.';

    const plainScore = analyzeProse(plain, []);
    const denseScore = analyzeProse(dense, []);

    assert.ok(plainScore.fleschKincaidGrade < denseScore.fleschKincaidGrade);
    assert.ok(plainScore.fleschReadingEase > denseScore.fleschReadingEase);
  });

  test('counts long sentences over 25 words', () => {
    const long = `${'word '.repeat(30).trim()}.`;
    const score = analyzeProse(`Short one. ${long}`, []);
    assert.equal(score.sentences, 2);
    assert.equal(score.longSentences, 1);
    assert.equal(score.longSentencePercent, 50);
  });

  test('matches jargon stems with a trailing wildcard', () => {
    const score = analyzeProse(
      'The delegation delegates to a delegated role.',
      ['delegat'],
    );
    assert.equal(score.topJargon[0].count, 3);
  });
});

describe('gradeBand', () => {
  test('bands grades by reading difficulty', () => {
    assert.equal(gradeBand(7), 'plain');
    assert.equal(gradeBand(9), 'plain');
    assert.equal(gradeBand(11), 'firm');
    assert.equal(gradeBand(15), 'hard');
  });
});
