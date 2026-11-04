import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import AI from '../web/ai-core.js';

function loadContent() {
  const sandbox = { window: {} };
  for (const file of ['content.js', 'kb.js']) {
    vm.runInNewContext(fs.readFileSync(new URL('../web/' + file, import.meta.url), 'utf8'), sandbox);
  }
  return { content: sandbox.window.KAMP_CONTENT || {}, kb: sandbox.window.KAMP_KB || [], words: sandbox.window.KAMP_WORDS || {} };
}

const subjects = {
  matematik: { name: 'Matematik', short: 'Mat', topics: ['Çarpanlar ve katlar'] },
  fen: { name: 'Fen Bilimleri', short: 'Fen', topics: ['Kuvvet ve hareket'] },
  turkce: { name: 'Türkçe', short: 'Tür', topics: ['Paragrafta anlam'] }
};
const homework = [
  { id: 'hw-1', title: 'Matematik çalışma kağıdı', subject: 'matematik', due: '2026-11-03', done: false, createdAt: 1 },
  { id: 'hw-2', title: 'Fen özeti', subject: 'fen', due: '2026-11-04', done: false, createdAt: 2 }
];

test('after-school call time picks the next weekday at 16:30 Istanbul', () => {
  const mondayMorning = Date.parse('2026-11-02T06:00:00Z'); // 09:00 Istanbul Monday
  const at = AI.nextCallAt(mondayMorning, '16:30');
  assert.equal(new Date(at).toISOString(), '2026-11-02T13:30:00.000Z');
  const mondayEvening = Date.parse('2026-11-02T15:00:00Z'); // 18:00 Istanbul
  const tomorrow = AI.nextCallAt(mondayEvening, '16:30');
  assert.equal(new Date(tomorrow).toISOString(), '2026-11-03T13:30:00.000Z');
});

test('weekend and Friday evening move the call to Monday', () => {
  const fridayEvening = Date.parse('2026-11-06T15:00:00Z'); // Friday 18:00
  assert.equal(new Date(AI.nextCallAt(fridayEvening, '16:30')).toISOString(), '2026-11-09T13:30:00.000Z');
  const saturday = Date.parse('2026-11-07T09:00:00Z');
  assert.equal(new Date(AI.nextCallAt(saturday, '16:30')).toISOString(), '2026-11-09T13:30:00.000Z');
});

test('invalid times are rejected instead of scheduling midnight', () => {
  assert.equal(AI.parseTime('25:00'), null);
  assert.equal(AI.parseTime('7:5'), null);
  assert.equal(AI.parseTime(' 16:30 '), '16:30');
  assert.equal(AI.nextCallAt(Date.now(), 'nope'), null);
});

test('homework statistics separate done, pending and overdue', () => {
  const stats = AI.homeworkStats([...homework, { id: 'hw-3', title: 'Türkçe', subject: 'turkce', due: '2026-11-01', done: false }], '2026-11-03');
  assert.deepEqual(stats, { total: 3, pending: 3, done: 0, overdue: 1, dueToday: 1 });
  assert.equal(AI.dueLabel('2026-11-02', '2026-11-03'), '1 gün gecikti');
  assert.equal(AI.dueLabel('2026-11-03', '2026-11-03'), 'Bugün teslim');
});

test('spoken "I finished maths" marks the right homework', () => {
  assert.deepEqual(AI.matchDone('Matematik ödevini yaptım', homework, subjects), ['hw-1']);
  assert.deepEqual(AI.matchDone('Bugün hepsini bitirdim', homework, subjects), ['hw-1', 'hw-2']);
  assert.deepEqual(AI.matchDone('Yarın sınav var', homework, subjects), []);
});

test('briefing mentions pending homework and the next exam in Turkish', () => {
  const text = AI.buildBriefing({ nowMs: Date.parse('2026-11-03T14:30:00Z'), today: '2026-11-03', homework, exam: { name: 'Fen Bilimleri', days: 0 } });
  assert.match(text, /İyi akşamlar/);
  assert.match(text, /2 ödevin bekliyor/);
  assert.match(text, /Matematik çalışma kağıdı/);
  assert.match(text, /Bugün Fen Bilimleri sınavın var/);
  assert.match(text, /Hangisinden başlayalım/);
});

test('briefing handles an empty list without inventing homework', () => {
  const text = AI.buildBriefing({ nowMs: Date.parse('2026-11-03T07:00:00Z'), today: '2026-11-03', homework: [], exam: null });
  assert.match(text, /Günaydın/);
  assert.match(text, /kayıtlı ödevin görünmüyor/);
  assert.doesNotMatch(text, /ödevin bekliyor/);
});

test('Groq messages include rules, homework facts and the student question', () => {
  const messages = AI.composeMessages({ today: '2026-11-03', homework, exams: [{ name: 'Fen Bilimleri', date: '2026-11-03', days: 0 }], tasks: [], userText: 'Bugün ne yapayım?', history: [{ role: 'user', content: 'Merhaba' }] });
  assert.equal(messages[0].role, 'system');
  assert.match(messages[0].content, /Kamp Koçu/);
  assert.match(messages[0].content, /Fen özeti/);
  assert.match(messages[0].content, /uydurma/i);
  assert.deepEqual(messages.at(-1), { role: 'user', content: 'Bugün ne yapayım?' });
});

test('offline answers stay useful without an API key', () => {
  const ctx = { today: '2026-11-03', homework, subjects, exam: { name: 'Fen Bilimleri', days: 0 } };
  assert.match(AI.offlineAnswer('matematik ödevinde takıldım', ctx), /Matematik/);
  assert.match(AI.offlineAnswer('hangi sınav var', ctx), /Fen Bilimleri/);
  assert.match(AI.offlineAnswer('ödevlerim ne', ctx), /Matematik çalışma kağıdı/);
});

test('homework and settings validation reject junk', () => {
  assert.equal(AI.validateHomeworkItem({ id: 'hw-1', title: 'Mat', subject: 'matematik', due: '2026-11-03', done: false }), true);
  assert.equal(AI.validateHomeworkItem({ id: 'x', title: 'Mat', subject: 'matematik', due: '2026-11-03', done: false }), false);
  assert.equal(AI.validateHomeworkItem({ id: 'hw-1', title: '', subject: 'matematik', due: '2026-11-03', done: false }), false);
  assert.deepEqual(AI.sanitizeHomework([{ id: 'hw-1', title: 'Mat', subject: 'matematik', due: '2026-11-03', done: false }, null]), [{ id: 'hw-1', title: 'Mat', subject: 'matematik', due: '2026-11-03', done: false }]);
  assert.deepEqual(AI.sanitizeSettings({ enabled: 1, key: ' x ' }), { enabled: true, name: '', days: { 1: '16:00', 2: '15:10', 3: '15:10', 4: '15:10', 5: '15:10', 6: '', 7: '' }, key: 'x', proxy: '', voice: '', rate: 1.12, preferNetwork: true, voicePack: true });
  assert.equal(AI.sanitizeSettings({ days: { 2: '25:00' } }).days['2'], '15:10');
  assert.equal(AI.sanitizeSettings({ days: { 6: '11:00' } }).days['6'], '11:00');
  assert.equal(AI.sanitizeSettings({ name: '  Ali   Veli ' }).name, 'Ali Veli');
});

test('per-day dismissal times drive the next calls', () => {
  const days = { 1: '16:00', 2: '15:10', 3: '15:10', 4: '15:10', 5: '15:10', 6: '', 7: '' };
  const mondayMorning = Date.parse('2026-11-02T06:00:00Z'); // 09:00 Istanbul
  const calls = AI.upcomingCalls(mondayMorning, days, 3);
  assert.deepEqual(calls.map(c => new Date(c.at).toISOString()), [
    '2026-11-02T13:00:00.000Z', // Pazartesi 16:00
    '2026-11-03T12:10:00.000Z', // Salı 15:10
    '2026-11-04T12:10:00.000Z'
  ]);
  assert.equal(calls[0].weekday, 1);
  assert.equal(AI.scheduleSummary(days), 'Pzt 16:00 · Sal–Cum 15:10');
  const fridayEvening = Date.parse('2026-11-06T15:00:00Z'); // Cuma 18:00
  assert.equal(new Date(AI.upcomingCalls(fridayEvening, days, 1)[0].at).toISOString(), '2026-11-09T13:00:00.000Z');
});

test('a day without a time is skipped instead of calling at midnight', () => {
  const days = { 1: '', 2: '15:10', 3: '', 4: '', 5: '', 6: '', 7: '' };
  const calls = AI.upcomingCalls(Date.parse('2026-11-02T06:00:00Z'), days, 2);
  assert.deepEqual(calls.map(c => c.weekday), [2, 2]);
  assert.equal(AI.scheduleSummary({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '' }), 'Arama günü seçilmedi');
});

test('spoken homework list is parsed into separate due items', () => {
  const items = AI.parseHomeworkUtterance('Bugün matematik çalışma kağıdı, fen özeti ve türkçe kitap okuma verdiler', subjects, '2026-11-03');
  assert.equal(items.length, 3);
  assert.deepEqual(items.map(i => i.subject), ['matematik', 'fen', 'turkce']);
  assert.match(items[0].title, /Matematik çalışma kağıdı/);
  assert.equal(items[0].due, '2026-11-04');
  assert.deepEqual(AI.parseHomeworkUtterance('bugün hiç ödev yok', subjects, '2026-11-03'), []);
  assert.equal(AI.parseHomeworkUtterance('matematik ödevi', subjects, '2026-11-06')[0].due, '2026-11-09');
});

test('dismissal call asks which homework was given and uses the name', () => {
  const text = AI.intakePrompt({ nowMs: Date.parse('2026-11-03T13:10:00Z'), name: 'Ahmet' });
  assert.match(text, /Ahmet!/);
  assert.match(text, /hangi ödevleri verdiler/);
});

test('the day before, the coach says "ödevin var, unutma"', () => {
  const tomorrow = '2026-11-04';
  const text = AI.dueReminder({ homework, tomorrow, today: '2026-11-03', name: 'Ahmet' });
  assert.match(text, /^Ahmet! Yarın Fen özeti ödevin var, unutma!/);
  assert.equal(AI.dueReminder({ homework, tomorrow: '2026-11-09', today: '2026-11-03', name: 'Ahmet' }), null);
});

test('connection errors are explained in plain Turkish', () => {
});

test('questions are not saved as homework', () => {
  for (const phrase of ['Sen kimsin?', 'Sen kimsin', 'merhaba', 'teşekkürler', 'nasılsın?', 'yarın hangi sınav var?', 'matematik ödevinde takıldım']) {
    assert.deepEqual(AI.parseHomeworkUtterance(phrase, subjects, '2026-11-03'), [], phrase);
  }
  assert.equal(AI.classifyUtterance('Sen kimsin?', subjects), 'identity');
  assert.equal(AI.classifyUtterance('merhaba', subjects), 'greeting');
  assert.equal(AI.classifyUtterance('teşekkürler', subjects), 'ack');
  assert.equal(AI.classifyUtterance('matematik ödevinde takıldım', subjects), 'help');
  assert.equal(AI.classifyUtterance('bugün hiç ödev yok', subjects), 'no-homework');
  assert.equal(AI.classifyUtterance('fen özeti ve türkçe kitap okuma', subjects), 'homework');
});

test('the coach introduces itself instead of recording a homework', () => {
  const text = AI.identityAnswer({ name: 'Ahmet', homework });
  assert.match(text, /Kamp Koçu/);
  assert.match(text, /Ahmet/);
  assert.match(text, /1 ödevin bekliyor|ödevin bekliyor/);
  assert.match(AI.offlineAnswer('Sen kimsin?', { homework, subjects, today: '2026-11-03' }), /Kamp Koçu/);
});

test('Groq homework extraction result is validated', () => {
  const items = AI.parseIntakeResult('{"items":[{"subject":"matematik","title":"çalışma kağıdı"}],"none":false}', subjects, '2026-11-03');
  assert.deepEqual(items, [{ subject: 'matematik', title: 'Çalışma kağıdı', due: '2026-11-04' }]);
  assert.deepEqual(AI.parseIntakeResult('{"items":[],"none":true}', subjects, '2026-11-03'), []);
  assert.equal(AI.parseIntakeResult('bozuk json', subjects, '2026-11-03'), null);
  assert.equal(AI.parseIntakeResult('{"items":[{"subject":"yok","title":"deneme"}]}', subjects, '2026-11-03')[0].subject, 'diger');
});

test('voice settings are clamped and kept with the profile', () => {
  const s = AI.sanitizeSettings({ voice: 'tr-tr-x-ccc-network', rate: 2 });
  assert.equal(s.voice, 'tr-tr-x-ccc-network');
  assert.equal(s.rate, 1.4);
  assert.equal(AI.sanitizeSettings({ rate: 0.1 }).rate, 0.7);
  assert.equal(AI.sanitizeSettings({}).rate, 1.12);
});


test('chatty sentences are never treated as homework', () => {
  ['Sen kimsin?', 'Merhaba', 'nasılsın', 'bugün hava nasıl', 'ne yapabilirsin', 'bana bir şaka yap'].forEach(text => {
    assert.equal(AI.isNotHomework(text), true, text);
    assert.notEqual(AI.classifyUtterance(text, subjects), 'homework', text);
  });
  assert.equal(AI.isNotHomework('matematik çalışma kağıdı'), false);
  assert.deepEqual(AI.parseIntakeResult('{"items":[{"subject":"matematik","title":"Sen kimsin?"}]}', subjects, '2026-11-03'), []);
});

test('local knowledge answers real lesson questions', () => {
  const { content, kb } = loadContent();
  assert.ok(kb.length > 130, 'kb entries: ' + kb.length);
  globalThis.KAMP_WORDS = loadContent().words || {};
  const idx = AI.buildKnowledgeIndex({ subjects, quizzes: content.quizzes || {}, kb });
  assert.ok(idx.length > 140, 'index: ' + idx.length);
  const questions = {
    'asal sayı nedir': /asal sayı/i,
    'EBOB nasıl bulunur': /EBOB/i,
    '3 e bölünebilme kuralı': /3’e|3'e/,
    'olasılık nedir': /[Oo]lasılık/,
    'kıtalar ve okyanuslar': /Atlas|kıta/i,
    'hücre nedir': /Hücre/i,
    'sindirim nasıl olur': /[Ss]indirim/,
    'kültür nedir': /Kültür/i,
    'present simple nedir': /Present simple/i,
    'çemberin çevresi': /çevre/i,
    'deprem': /[Dd]eprem/,
    'noktalama işaretleri': /[Nn]okta/,
    'fotosentez nedir': /[Ff]otosentez/,
    'ortalama nasıl hesaplanır': /[Oo]rtalama/,
    'cumhuriyet ne zaman ilan edildi': /1923/,
    'hacim nasıl bulunur': /[Hh]acim/,
    'yer edatları': /in \(|edat/i,
    'abdest nasıl alınır': /[Aa]bdest/
  };
  for (const [q, re] of Object.entries(questions)) {
    const answer = AI.knowledgeAnswer(q, { knowledge: idx, subjects });
    assert.ok(answer, 'cevap yok: ' + q);
    assert.match(answer, re, q + ' → ' + answer);
  }
  assert.equal(AI.knowledgeAnswer('bugün hava nasıl', { knowledge: idx, subjects }), null);
  assert.equal(AI.knowledgeAnswer('blabla bilinmeyen konu', { knowledge: idx, subjects }), null);
  assert.equal(AI.classifyUtterance('bana soru sor', subjects), 'quiz');
  assert.equal(AI.knowledgeAnswer('sen kimsin', { knowledge: idx, subjects }), null);
  const ctx = { knowledge: idx, subjects, homework, today: '2026-11-03', name: 'Ahmet' };
  assert.match(AI.offlineAnswer('EBOB nasıl bulunur', ctx), /EBOB/i);
});

test('the coach does arithmetic itself', () => {
  assert.equal(AI.solveMath('12 x 8 kaç eder'), '12 × 8 = 96.');
  assert.equal(AI.solveMath('144 / 12'), '144 ÷ 12 = 12.');
  assert.equal(AI.solveMath('45+18'), '45+18 = 63.');
  assert.equal(AI.solveMath('80in %25i'), '80 sayısının %25’si = 20.');
  assert.equal(AI.solveMath('2 üssü 5'), '2 üssü 5 = 32.');
  assert.equal(AI.solveMath('bugün hava nasıl'), null);
});

test('bundled natural voice clips ship with the app', () => {
  const names = ['intro', 'who', 'capabilities', 'thanks', 'none', 'saved', 'retry', 'reminder', 'exam', 'greet'];
  for (const name of names) {
    const file = new URL('../web/voice/' + name + '.mp3', import.meta.url);
    const size = fs.statSync(file).size;
    assert.ok(size > 8000, name + ' çok küçük: ' + size);
    const head = fs.readFileSync(file).subarray(0, 3).toString('latin1');
    assert.equal(head, 'ID3', name + ' geçerli bir mp3 değil');
  }
});

test('spoken text strips markup and emoji', () => {
  const spoken = AI.speechText('**Harika!** 😀 \n- Matematik: 10 soru\n- Fen: özet');
  assert.ok(!spoken.includes('*'));
  assert.ok(!spoken.includes('😀'));
  assert.match(spoken, /Matematik/);
  assert.equal(AI.speechText(''), '');
  assert.equal(AI.sanitizeSettings({}).preferNetwork, true);
  assert.equal(AI.sanitizeSettings({ preferNetwork: false }).preferNetwork, false);
});

test('the coach answers small talk like a person', () => {
  const ctx = { name: 'Ahmet', homework, subjects, today: '2026-11-04', exam: { name: 'Matematik', days: 1 } };
  assert.match(AI.offlineAnswer('nasılsın', ctx), /iyiyim/i);
  assert.match(AI.offlineAnswer('kaç yaşındasın', ctx), /yaşım yok/i);
  assert.match(AI.offlineAnswer('bugün ne çalışayım', ctx), /Matematik/);
  assert.match(AI.offlineAnswer('beni tanıyor musun', ctx), /Ahmet/);
  assert.match(AI.offlineAnswer('günlerden ne', ctx), /Çarşamba/);
});

test('Groq is completely gone from the app', async () => {
  const source = await readFile(new URL('../web/ai.js', import.meta.url), 'utf8');
  assert.equal(/groq|api\.groq/i.test(source), false, 'ai.js hâlâ Groq içeriyor');
  assert.equal(fs.existsSync(new URL('../web/ai-config.js', import.meta.url)), false, 'ai-config.js silinmeli');
  assert.equal(fs.existsSync(new URL('../app/src/main/java/tr/com/sinavkampi/AiChat.java', import.meta.url)), false, 'AiChat.java silinmeli');
});

test('units and a mini dictionary are answered in the call', () => {
  globalThis.KAMP_WORDS = loadContent().words;
  assert.equal(AI.convertUnits('3 km kaç m'), '3 km = 3000 m.');
  assert.equal(AI.convertUnits('1 saat kaç dakika'), '1 saat = 60 dakika.');
  assert.equal(AI.convertUnits('500 g kaç kg'), '500 g = 0,5 kg.');
  assert.equal(AI.convertUnits('3 km kaç kg'), null);
  assert.match(AI.translateWord('apple ne demek'), /elma/);
  assert.match(AI.translateWord('kitap ingilizce ne demek'), /kitap.*book/);
  assert.equal(AI.translateWord('zzzz ne demek'), null);
});

test('“anlamadım” asks for a simpler retelling', () => {
  assert.equal(AI.classifyUtterance('anlamadım', subjects), 'simplify');
  assert.match(AI.offlineAnswer('anlamadım', { subjects, homework, today: '2026-11-04' }), /basit/i);
});
