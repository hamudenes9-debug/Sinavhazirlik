import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { loadContent, buildPdfEntries, chunkText } = require('../scripts/build-pdf-kb.mjs');

test('PDF notes are chunked into short speakable pieces', () => {
  const chunks = chunkText('Birinci cümle burada. İkinci cümle daha uzun olabilir ve konuyu açar. Üçüncü cümle ise bitirir.');
  assert.equal(chunks.length, 1);
  assert(chunks[0].startsWith('Birinci cümle'));
  const long = chunkText('a'.repeat(120) + '. ' + 'b'.repeat(120) + '. ' + 'c'.repeat(120) + '.');
  assert.equal(long.length, 3);
  assert(long.every(c => c.length <= 181));
});

test('every PDF note section becomes at least one knowledge entry', () => {
  const content = loadContent();
  const entries = buildPdfEntries(content);
  assert.ok(entries.length > 100);
  const sections = Object.values(content.notes).reduce((n, note) => n + note.sections.length, 0);
  assert.ok(entries.length >= sections, 'her bölüm için en az bir parça olmalı');
  for (const entry of entries) {
    assert.equal(typeof entry.s, 'string');
    assert.equal(typeof entry.q, 'string');
    assert.ok(entry.a.length > 20);
    assert.equal(entry.src, entry.s + '-not.pdf');
  }
  const subjects = new Set(entries.map(e => e.s));
  assert.deepEqual([...subjects].sort(), Object.keys(content.notes).sort());
});
