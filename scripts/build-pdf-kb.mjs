/* PDF konu özetlerini koçun bilgi bankasına çevirir.
 * Kaynak: web/content.js içindeki notes (aynı içerikten PDF'ler üretilir).
 * Çıktı: web/pdf-kb.js → window.KAMP_PDF_KB
 * Her kayıt: { s: ders, q: bölüm başlığı, a: not parçası, src: pdf dosyası }
 * `npm run build` bu dosyayı yeniden üretir; elle düzenlemek gerekmez. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export function loadContent() {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(join(ROOT, 'web', 'content.js'), 'utf8'), sandbox);
  return sandbox.window.KAMP_CONTENT || {};
}

/* Cümleleri kısa konuşma parçalarına böler; 1–3 cümle, en fazla ~240 karakter. */
export function chunkText(text, limit = 180) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const parts = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
  const chunks = [];
  let current = '';
  for (const raw of parts) {
    const sentence = raw.trim();
    if (!sentence) continue;
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length > limit && current) {
      chunks.push(current);
      current = sentence;
    } else current = candidate;
  }
  if (current) chunks.push(current);
  return chunks;
}

export function buildPdfEntries(content = loadContent()) {
  const notes = content.notes || {};
  const entries = [];
  const seen = new Set();
  for (const [subject, note] of Object.entries(notes)) {
    const sections = (note && note.sections) || [];
    for (const section of sections) {
      const [title, text] = section;
      for (const chunk of chunkText(text)) {
        const key = `${subject}|${title}|${chunk}`;
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push({ s: subject, q: String(title || '').trim(), a: chunk, src: `${subject}-not.pdf` });
      }
    }
  }
  return entries;
}

export function writePdfKb(file = join(ROOT, 'web', 'pdf-kb.js')) {
  const content = loadContent();
  const entries = buildPdfEntries(content);
  const body = `/* Otomatik üretildi: scripts/build-pdf-kb.mjs — elle düzenlemeyin.
 * Kaynak: PDF konu özetleri (web/pdfs/*.pdf), ${entries.length} not parçası. */
window.KAMP_PDF_KB = ${JSON.stringify(entries)};
`;
  writeFileSync(file, body);
  return entries.length;
}

if (process.argv[1] && process.argv[1].endsWith('build-pdf-kb.mjs')) {
  const count = writePdfKb();
  console.log(`pdf-kb: ${count} not parçası yazıldı.`);
}
