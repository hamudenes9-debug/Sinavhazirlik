import test from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const X = require('../web/exam-import.js');
const AI = require('../web/ai-core.js');

const SUBJECTS = {
  fen: { name: 'Fen Bilimleri' },
  matematik: { name: 'Matematik' },
  turkce: { name: 'Türkçe' },
  sosyal: { name: 'Sosyal Bilgiler' },
  ingilizce: { name: 'İngilizce' },
  din: { name: 'Din Kültürü ve Ahlak Bilgisi' }
};

function pdfWith(content, compress) {
  if (!compress) {
    return Buffer.from(`%PDF-1.4\n1 0 obj\n<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream\nendobj\n%%EOF`, 'latin1');
  }
  const packed = zlib.deflateSync(Buffer.from(content, 'latin1'));
  const head = Buffer.from(`%PDF-1.4\n1 0 obj\n<< /Length ${packed.length} /Filter /FlateDecode >>\nstream\n`, 'latin1');
  const tail = Buffer.from('\nendstream\nendobj\n%%EOF', 'latin1');
  return Buffer.concat([head, packed, tail]);
}

test('plain PDF text is extracted', async () => {
  const content = 'BT /F1 12 Tf 72 712 Td (Fen Bilimleri 03.11.2026 2. ders) Tj 0 -18 Td (Sosyal 06.11.2026 2. ders) Tj ET';
  const text = await X.extractPdfText(pdfWith(content, false));
  assert.match(text, /Fen Bilimleri 03\.11\.2026/);
  assert.match(text, /Sosyal 06\.11\.2026/);
});

test('Flate-compressed PDF text is extracted', async () => {
  const content = 'BT /F1 12 Tf 72 712 Td (Matematik 11.11.2026 2. ders) Tj ET';
  const text = await X.extractPdfText(pdfWith(content, true));
  assert.match(text, /Matematik 11\.11\.2026/);
});

test('PDF without text (scanned) returns an empty string', async () => {
  const text = await X.extractPdfText(pdfWith('BT /F1 12 Tf 72 712 Td () Tj ET', true));
  assert.equal(text.trim(), '');
});

test('schedule parser reads numeric and Turkish dates with subjects', () => {
  const schedule = [
    '6. SINIFLAR 1. DÖNEM 1. ORTAK YAZILI SINAV TAKVİMİ',
    'Fen Bilimleri 03.11.2026 Salı 2. ders',
    'Sosyal Bilgiler 06.11.2026 Cuma 2. ders',
    'Türkçe 10 Kasım 2026 Salı 4. ders',
    'Matematik 11.11.2026 2. ders',
    'İngilizce 12 Kasım 2026 2. ders',
    'Din Kültürü 13.11.2026 2. ders'
  ].join('\n');
  const list = AI.parseExamSchedule(schedule, { today: '2026-11-04', subjects: SUBJECTS });
  assert.equal(list.length, 6);
  assert.deepEqual(list.map(e => e.date), ['2026-11-03', '2026-11-06', '2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13']);
  assert.deepEqual(list.map(e => e.subject), ['fen', 'sosyal', 'turkce', 'matematik', 'ingilizce', 'din']);
  assert.equal(list.find(e => e.subject === 'turkce').period, 4);
  assert.equal(list[0].name, 'Fen Bilimleri');
});

test('schedule parser handles a plain list without years', () => {
  const list = AI.parseExamSchedule('Ders Tarih\nFen 3 Kasım\nSosyal 6 Kasım\nTürkçe 10 Kasım', { today: '2026-11-04', subjects: SUBJECTS });
  assert.deepEqual(list.map(e => `${e.subject}@${e.date}`), ['fen@2026-11-03', 'sosyal@2026-11-06', 'turkce@2026-11-10']);
});

test('schedule parser returns nothing without dates', () => {
  assert.deepEqual(AI.parseExamSchedule('Sınav takvimi henüz açıklanmadı.', { today: '2026-11-04', subjects: SUBJECTS }), []);
  assert.deepEqual(AI.parseExamSchedule('', { today: '2026-11-04' }), []);
});
