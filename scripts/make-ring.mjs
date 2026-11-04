/* "Kamp Koçu seni arıyor" zil sesi: iki tonlu, yumuşak bir çan; harici ses dosyası gerekmez. */
import { writeFileSync } from 'node:fs';

const rate = 22050;
const seconds = 2.6;
const total = Math.floor(rate * seconds);
const data = new Int16Array(total);

function bell(start, freq, dur, gain = 0.5) {
  const from = Math.floor(start * rate);
  const len = Math.floor(dur * rate);
  for (let i = 0; i < len && from + i < total; i++) {
    const t = i / rate;
    const env = Math.exp(-3.2 * t) * (1 - Math.exp(-60 * t));
    const tone = Math.sin(2 * Math.PI * freq * t) * 0.72
      + Math.sin(2 * Math.PI * freq * 2.01 * t) * 0.2
      + Math.sin(2 * Math.PI * freq * 3.02 * t) * 0.08;
    data[from + i] += Math.max(-1, Math.min(1, tone * env * gain)) * 32767;
  }
}

/* ding-dong, kısa es, ding-dong */
bell(0.00, 880, 0.62);
bell(0.42, 660, 0.80);
bell(1.15, 880, 0.62);
bell(1.57, 660, 0.95);

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + total * 2, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(rate, 24);
header.writeUInt32LE(rate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(total * 2, 40);
writeFileSync('web/voice/ring.wav', Buffer.concat([header, Buffer.from(data.buffer)]));
console.log('web/voice/ring.wav yazıldı', 44 + total * 2, 'bayt');
