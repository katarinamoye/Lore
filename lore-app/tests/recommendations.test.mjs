import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOKS, rankBooks } from '../dist/books.mjs';

test('context changes the recommendation from a quiet short read to a demanding long escape', () => {
  const quiet = rankBooks({ mood: 'comfort', energy: 'low', length: 'quick', avoid: [] });
  const demanding = rankBooks({ mood: 'escape', energy: 'challenge', length: 'long', avoid: [] });
  assert.equal(quiet[0].book.id, 'psalm-wild-built');
  assert.equal(demanding[0].book.id, 'jonathan-strange');
  assert.match(quiet[0].reasons.join(' '), /160 pages/);
  assert.match(demanding[0].reasons.join(' '), /challenging read/);
});

test('avoidances outweigh a strong mood, energy, and length match', () => {
  const answers = { mood: 'escape', energy: 'challenge', length: 'long', avoid: ['dense', 'worldbuilding'] };
  const ranked = rankBooks(answers);
  assert.equal(ranked[0].book.avoidances.some(value => answers.avoid.includes(value)), false);
  const noConflicts = ranked.filter(({ book }) => !book.avoidances.some(value => answers.avoid.includes(value)));
  const conflicts = ranked.filter(({ book }) => book.avoidances.some(value => answers.avoid.includes(value)));
  assert.ok(noConflicts.at(-1).score > conflicts[0].score);
  assert.match(ranked.find(({ book }) => book.id === 'jonathan-strange').reasons.join(' '), /possible mismatch/);
});

test('repeated avoidances do not multiply a penalty and caller state is preserved', () => {
  const answers = Object.freeze({ mood: 'comfort', energy: 'low', length: 'medium', avoid: Object.freeze(['romance', 'romance']) });
  assert.deepEqual(rankBooks(answers), rankBooks({ ...answers, avoid: ['romance'] }));
  assert.deepEqual(answers.avoid, ['romance', 'romance']);
});

test('all books remain available for another recommendation without duplicates or mutation', () => {
  const originalOrder = BOOKS.map(book => book.id);
  const first = rankBooks({ mood: 'exciting', energy: 'easy', length: 'medium', avoid: ['sad'] });
  const second = rankBooks({ mood: 'exciting', energy: 'easy', length: 'medium', avoid: ['sad'] });
  assert.equal(first.length, BOOKS.length);
  assert.equal(new Set(first.map(({ book }) => book.id)).size, BOOKS.length);
  assert.deepEqual(first, second);
  assert.deepEqual(BOOKS.map(book => book.id), originalOrder);
  assert.ok(first.every(({ score, reasons }) => Number.isFinite(score) && reasons.length > 0));
});

test('missing or stale preference values degrade to a usable ranking', () => {
  assert.deepEqual(rankBooks({ mood: 'unknown', energy: 'unknown', length: 'unknown', avoid: 'romance' }), rankBooks());
  assert.equal(rankBooks({ mood: 'surprise', avoid: ['unknown'] }).length, BOOKS.length);
});

test('finals and midterms keep weekend suggestions manageable compared with school break', () => {
  const shared = { moment: 'weekend', mood: 'thoughtful', avoid: [] };
  const finals = rankBooks({ ...shared, school: 'finals' });
  const midterms = rankBooks({ ...shared, school: 'midterms' });
  const holiday = rankBooks({ ...shared, school: 'break' });
  assert.equal(finals[0].book.id, 'psalm-wild-built');
  assert.equal(finals[0].book.complexity, 1);
  assert.ok(finals[0].book.pages <= 250);
  assert.ok(midterms[0].book.complexity <= 2);
  assert.ok(midterms[0].book.pages <= 350);
  assert.notEqual(midterms[0].book.id, finals[0].book.id);
  assert.equal(holiday[0].book.id, 'the-secret-history');
  assert.match(finals[0].reasons.join(' '), /For finals/);
  assert.match(midterms[0].reasons.join(' '), /For midterms/);
  assert.match(holiday[0].reasons.join(' '), /For school break/);
});

test('short commutes, long commutes, and weekends produce different reading commitments', () => {
  const shared = { school: 'regular', mood: 'thoughtful', avoid: [] };
  const shortCommute = rankBooks({ ...shared, moment: 'short-commute' });
  const longCommute = rankBooks({ ...shared, moment: 'long-commute' });
  const weekend = rankBooks({ ...shared, moment: 'weekend' });
  assert.ok(shortCommute[0].book.pages <= 250);
  assert.equal(longCommute[0].book.id, 'roger-ackroyd');
  assert.ok(weekend[0].book.pages > longCommute[0].book.pages);
  assert.ok(weekend[0].book.complexity > shortCommute[0].book.complexity);
  assert.equal(new Set([shortCommute[0].book.id, longCommute[0].book.id, weekend[0].book.id]).size, 3);
  assert.match(shortCommute[0].reasons.join(' '), /short commute/);
  assert.match(longCommute[0].reasons.join(' '), /long commute/);
  assert.match(weekend[0].reasons.join(' '), /weekend reading/);
});

test('between-class and bedtime contexts are explained without reading-time or audio promises', () => {
  for (const moment of ['between', 'bedtime']) {
    const ranked = rankBooks({ school: 'start', moment, mood: 'comfort' });
    assert.equal(ranked[0].book.complexity, 1);
    assert.ok(ranked[0].book.pages <= (moment === 'between' ? 250 : 350));
    const explanation = ranked[0].reasons.join(' ');
    assert.match(explanation, /start of term/);
    assert.match(explanation, moment === 'between' ? /between classes/ : /bedtime reading/);
    assert.doesNotMatch(explanation, /\bminutes?\b|audiobook|audio available/i);
  }
});

test('avoidances dominate every school and reading-moment combination, including conflicting preferences', () => {
  const avoid = ['romance', 'slow', 'sad', 'dense', 'worldbuilding'];
  for (const school of ['start', 'regular', 'midterms', 'finals', 'break', 'other']) {
    for (const moment of ['between', 'short-commute', 'long-commute', 'bedtime', 'weekend']) {
      const answers = { school, moment, mood: 'escape', energy: 'challenge', length: 'long', avoid };
      const ranked = rankBooks(answers);
      const clean = ranked.filter(({ book }) => !book.avoidances.some(value => avoid.includes(value)));
      const conflicts = ranked.filter(({ book }) => book.avoidances.some(value => avoid.includes(value)));
      assert.ok(clean.at(-1).score > conflicts[0].score, `${school}/${moment}: a conflict outranked a clean match`);
      assert.equal(new Set(ranked.map(({ book }) => book.id)).size, BOOKS.length);
      assert.deepEqual(ranked, rankBooks(answers));
      assert.match(conflicts[0].reasons.join(' '), /possible mismatch/);
    }
  }
});

test('legacy choices override student defaults and unknown context remains backward compatible', () => {
  const explicit = { mood: 'escape', energy: 'challenge', length: 'long', avoid: [] };
  assert.equal(rankBooks({ ...explicit, school: 'finals', moment: 'between' })[0].book.id, 'jonathan-strange');
  assert.deepEqual(rankBooks({ ...explicit, school: 'unknown', moment: 'unknown' }), rankBooks(explicit));
  assert.deepEqual(rankBooks({ school: 'unknown', moment: 'unknown' }), rankBooks());
  const answers = Object.freeze({ school: 'finals', moment: 'short-commute', mood: 'comfort', avoid: Object.freeze(['slow', 'slow']) });
  assert.deepEqual(rankBooks(answers), rankBooks({ ...answers, avoid: ['slow'] }));
});
