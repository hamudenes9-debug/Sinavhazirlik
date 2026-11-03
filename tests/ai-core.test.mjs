import assert from 'node:assert/strict';
import test from 'node:test';
import AI from '../web/ai-core.js';

const subjects = {
  matematik: { name: 'Matematik', short: 'Mat', topics: ['Çarpanlar ve katlar'] },
  fen: { name: 'Fen Bilimleri', short: 'Fen', topics: ['Kuvvet ve hareket'] }
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
  assert.deepEqual(AI.sanitizeSettings({ enabled: 1, time: '9:00', key: ' x ' }), { enabled: true, time: '16:30', key: 'x', proxy: '' });
});
