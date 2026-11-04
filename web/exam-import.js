/* Sınav takvimi PDF'inden metin çıkarır. Tarayıcıda ve testte çalışır.
 * Kapsam: metin tabanlı PDF'ler (Word/Canva/Excel çıktıları). Taranmış görsel
 * PDF'lerde metin olmadığı için boş döner; o durumda kullanıcı metni yapıştırır. */
(function (root) {
  'use strict';

  const CP1254 = [
    '\u20AC', '', '\u201A', '\u0192', '\u201E', '\u2026', '\u2020', '\u2021',
    '\u02C6', '\u2030', '\u0160', '\u2039', '\u0152', '', '\u017D', '',
    '', '\u2018', '\u2019', '\u201C', '\u201D', '\u2022', '\u2013', '\u2014',
    '\u02DC', '\u2122', '\u0161', '\u203A', '\u0153', '', '\u017E', '\u0178',
    '\u00A0', '\u00A1', '\u00A2', '\u00A3', '\u00A4', '\u00A5', '\u00A6', '\u00A7',
    '\u00A8', '\u00A9', '\u00AA', '\u00AB', '\u00AC', '\u00AD', '\u00AE', '\u00AF',
    '\u00B0', '\u00B1', '\u00B2', '\u00B3', '\u00B4', '\u00B5', '\u00B6', '\u00B7',
    '\u00B8', '\u00B9', '\u00BA', '\u00BB', '\u00BC', '\u00BD', '\u00BE', '\u00BF',
    '\u00C0', '\u00C1', '\u00C2', '\u00C3', '\u00C4', '\u00C5', '\u00C6', '\u00C7',
    '\u00C8', '\u00C9', '\u00CA', '\u00CB', '\u00CC', '\u00CD', '\u00CE', '\u00CF',
    '\u011E', '\u00D1', '\u00D2', '\u00D3', '\u00D4', '\u00D5', '\u00D6', '\u00D7',
    '\u00D8', '\u00D9', '\u00DA', '\u00DB', '\u00DC', '\u0130', '\u015E', '\u00DF',
    '\u00E0', '\u00E1', '\u00E2', '\u00E3', '\u00E4', '\u00E5', '\u00E6', '\u00E7',
    '\u00E8', '\u00E9', '\u00EA', '\u00EB', '\u00EC', '\u00ED', '\u00EE', '\u00EF',
    '\u00F0', '\u00F1', '\u00F2', '\u00F3', '\u00F4', '\u00F5', '\u00F6', '\u00F7',
    '\u00F8', '\u00F9', '\u00FA', '\u00FB', '\u00FC', '\u0131', '\u015F', '\u00FF'
  ];

  function decode(bytes) {
    let out = '';
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if (b === 13) { out += '\n'; continue; }
      if (b === 10) { out += '\n'; continue; }
      out += b < 0x80 ? String.fromCharCode(b) : (CP1254[b - 0x80] || ' ');
    }
    return out;
  }

  async function inflate(bytes) {
    if (typeof DecompressionStream !== 'function') return null;
    for (const attempt of [bytes, bytes.subarray(0, Math.max(0, bytes.length - 2)), bytes.subarray(0, Math.max(0, bytes.length - 1))]) {
      if (!attempt || attempt.length < 8) continue;
      const out = await inflateOnce(attempt);
      if (out) return out;
    }
    return null;
  }

  async function inflateOnce(bytes) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    } catch {
      try {
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        return new Uint8Array(await new Response(stream).arrayBuffer());
      } catch { return null; }
    }
  }

  const MONTHS = '(?:ocak|subat|mart|nisan|mayis|haziran|temmuz|agustos|eylul|ekim|kasim|aralik)';
  const DATE_HINT = new RegExp('\\d{1,2}\\s*[./-]\\s*\\d{1,2}|\\d{1,2}\\s*' + MONTHS, 'i');

  function escapeString(value) {
    return value
      .replace(/\\n/g, '\n').replace(/\\r/g, '\n').replace(/\\t/g, ' ')
      .replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\\\/g, '\\');
  }

  /* Bir içerik akışından görünen metni toplar. */
  function textFromStream(source) {
    if (!source) return '';
    let out = '';
    let i = 0;
    const length = source.length;
    let pending = '';
    while (i < length) {
      const ch = source[i];
      if (ch === '(') {
        let j = i + 1;
        let depth = 1;
        let raw = '';
        while (j < length && depth > 0) {
          const c = source[j];
          if (c === '\\') { raw += c + (source[j + 1] || ''); j += 2; continue; }
          if (c === '(') depth++;
          else if (c === ')') { depth--; if (depth === 0) { j++; break; } }
          raw += c;
          j++;
        }
        pending += escapeString(raw);
        i = j;
        continue;
      }
      if (ch === '<' && source[i + 1] !== '<') {
        const end = source.indexOf('>', i + 1);
        if (end > i) {
          const hex = source.slice(i + 1, end).replace(/[^0-9a-fA-F]/g, '');
          let text = '';
          for (let k = 0; k + 1 < hex.length; k += 2) {
            const code = parseInt(hex.slice(k, k + 2), 16);
            text += code < 0x80 ? String.fromCharCode(code) : (CP1254[code - 0x80] || '');
          }
          pending += text;
          i = end + 1;
          continue;
        }
      }
      const op = source.slice(i, i + 2);
      if (op === 'Tj' || op === 'TJ' || op === "'" || op === '"') {
        out += pending + ' ';
        pending = '';
        i += op.length;
        continue;
      }
      if (op === 'Td' || op === 'TD') { out += pending + '\n'; pending = ''; i += 2; continue; }
      if (op === 'T*') { out += '\n'; i += 2; continue; }
      if (op === 'ET') { out += '\n'; pending = ''; i += 2; continue; }
      i++;
    }
    return out;
  }

  /* PDF baytlarından okunabilir metin üretir. Bulamazsa boş metin. */
  async function extractPdfText(input) {
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    const ascii = decode(bytes);
    const chunks = [];
    let cursor = 0;
    while (true) {
      const start = ascii.indexOf('stream', cursor);
      if (start < 0) break;
      let dataStart = start + 6;
      if (ascii[dataStart] === '\r') dataStart++;
      if (ascii[dataStart] === '\n') dataStart++;
      const end = ascii.indexOf('endstream', dataStart);
      if (end < 0) break;
      let rawEnd = end;
      while (rawEnd > dataStart && (bytes[rawEnd - 1] === 10 || bytes[rawEnd - 1] === 13 || bytes[rawEnd - 1] === 32)) rawEnd--;
      const raw = bytes.subarray(dataStart, rawEnd);
      const header = ascii.slice(Math.max(0, start - 400), start);
      const compressed = /FlateDecode/.test(header);
      let source = null;
      if (compressed) {
        const plain = await inflate(raw);
        if (plain) source = decode(plain);
      } else {
        source = decode(raw);
      }
      if (source && (source.includes('Tj') || source.includes('TJ'))) chunks.push(textFromStream(source));
      cursor = end + 9;
    }
    let text = chunks.join('\n').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    if (!DATE_HINT.test(text) && chunks.length > 1) {
      text = chunks.join(' ').replace(/\s+/g, ' ').trim();
    }
    return text;
  }

  const api = { extractPdfText, textFromStream, decode };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KampExamImport = api;
})(typeof window !== 'undefined' ? window : globalThis);
