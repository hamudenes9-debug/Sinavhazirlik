import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const N = require('../web/ai-net.js');

const KEY = 'sk-or-v1-' + 'a'.repeat(64);
const reply = (text, model = 'test/model') => ({
  status: 200,
  text: JSON.stringify({ model, choices: [{ message: { content: text } }] })
});

test('only well-formed OpenRouter keys are accepted', () => {
  assert.equal(N.sanitizeKey(KEY), KEY);
  assert.equal(N.sanitizeKey('  ' + KEY + ' '), KEY);
  assert.equal(N.sanitizeKey('sk-or-v1-kisa'), '');
  assert.equal(N.sanitizeKey('sk-other-' + 'a'.repeat(64)), '');
  assert.equal(N.sanitizeKey(null), '');
  assert.equal(N.maskKey(KEY), KEY.slice(0, 8) + '…' + KEY.slice(-4));
  assert.equal(N.sanitizeModel(''), N.DEFAULT_MODEL);
  assert.equal(N.sanitizeModel('openai/gpt-4o-mini'), 'openai/gpt-4o-mini');
  assert.equal(N.sanitizeModel('kötü model!'), N.DEFAULT_MODEL);
});

test('the request carries rules and context but never leaks the key', () => {
  const request = N.buildRequest({
    key: KEY,
    question: 'asit yağmuru nedir',
    context: { today: '2026-11-05', name: 'Ahmet', exams: [{ name: 'Sosyal Bilgiler', date: '2026-11-06' }], homework: [{ title: 'Fen özeti' }] },
    history: [{ role: 'user', content: 'merhaba' }, { role: 'assistant', content: 'selam' }]
  });
  assert.ok(request);
  assert.equal(request.url, 'https://openrouter.ai/api/v1/chat/completions');
  assert.equal(request.auth, KEY);
  assert.equal(request.body.includes(KEY), false, 'anahtar gövdeye yazılmamalı');
  const body = JSON.parse(request.body);
  assert.equal(body.messages[0].role, 'system');
  assert.match(body.messages[0].content, /en fazla 3 kısa cümle/i);
  assert.match(body.messages[0].content, /uydurma/i);
  assert.match(body.messages[0].content, /Sosyal Bilgiler 2026-11-06/);
  assert.equal(body.messages.at(-1).content, 'asit yağmuru nedir');
  assert.deepEqual(body.provider, { data_collection: 'deny' });
  assert.equal(N.buildRequest({ key: '', question: 'x' }), null);
});

test('history is trimmed to the last six turns', () => {
  const history = Array.from({ length: 12 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'm' + i }));
  const messages = N.buildMessages({ question: 'son', history });
  assert.equal(messages.length, 1 + 6 + 1);
  assert.equal(messages[1].content, 'm6');
});

test('model output is cleaned for speech', () => {
  assert.equal(N.cleanAnswer('**Şedde**, harfin *iki kez* okunmasıdır. 😊'), 'Şedde, harfin iki kez okunmasıdır.');
  assert.equal(N.cleanAnswer('- madde bir\n- madde iki'), 'madde bir madde iki');
  assert.equal(N.cleanAnswer(''), '');
  const long = N.cleanAnswer(('Bu uzun bir cümledir. ').repeat(30));
  assert.ok(long.length <= 421);
});

test('responses and errors are mapped to Turkish messages', () => {
  assert.deepEqual(N.parseResponse(200, JSON.stringify({ choices: [{ message: { content: 'Merhaba dünya.' } }] })).text, 'Merhaba dünya.');
  assert.equal(N.parseResponse(401, '{}').error, 'OpenRouter anahtarı geçersiz');
  assert.equal(N.parseResponse(402, '{}').error, 'OpenRouter kredisi bitti');
  assert.equal(N.parseResponse(429, '{}').error, 'Çok fazla istek gönderildi, biraz sonra dene');
  assert.equal(N.parseResponse(503, '{}').error, 'OpenRouter şu an yanıt vermiyor');
  assert.equal(N.parseResponse(0, '').error, 'İnternete ulaşamadım');
  assert.equal(N.parseResponse(200, JSON.stringify({ choices: [] })).ok, false);
  assert.equal(N.parseResponse(200, 'json değil').ok, false);
});

test('the network brain only answers when the device brain is not enough', () => {
  const base = { online: true, intent: 'question', question: 'x', localAnswer: 'Hücrenin yapısı şöyledir.' };
  assert.equal(N.needsNetwork(base), false);
  assert.equal(N.needsNetwork({ ...base, localAnswer: 'Bunu kendi notlarımdan çıkaramadım.' }), true);
  assert.equal(N.needsNetwork({ ...base, intent: 'homework' }), false);
  assert.equal(N.needsNetwork({ ...base, intent: 'simplify' }), true);
  assert.equal(N.needsNetwork({ ...base, question: 'bunu detaylı anlat' }), true);
  assert.equal(N.needsNetwork({ ...base, localAnswer: 'bilmem', online: false }), false);
});

test('a missing model falls back to another one, a bad key does not', async () => {
  const models = [];
  const transport = (url, auth, body) => {
    const parsed = JSON.parse(body);
    models.push(parsed.model);
    if (parsed.model === 'openai/gpt-4o-mini') return reply('Yedek modelden cevap.');
    return { status: 404, text: '{"error":{"message":"No endpoints found for model"}}' };
  };
  const result = await N.ask({ key: KEY, question: 'x', model: 'bozuk/model', transport });
  assert.equal(result.ok, true);
  assert.equal(result.text, 'Yedek modelden cevap.');
  assert.deepEqual(models, ['bozuk/model', 'bozuk/model', 'openai/gpt-4o-mini']);

  let calls = 0;
  const unauthorized = await N.ask({ key: KEY, question: 'x', transport: () => { calls++; return { status: 401, text: '{}' }; } });
  assert.equal(unauthorized.ok, false);
  assert.equal(calls, 1, 'geçersiz anahtarda tekrar denenmemeli');
});

test('the key is never committed to the code that ships', () => {
  const files = ['ai.js', 'ai-core.js', 'app.js', 'index.html', 'ai-net.js'];
  for (const file of files) {
    const text = fs.readFileSync(new URL('../web/' + file, import.meta.url), 'utf8');
    assert.equal(/sk-or-v1-[A-Za-z0-9]{32,}/.test(text), false, file + ' içinde anahtar var');
  }
  const config = fs.readFileSync(new URL('../web/ai-config.js', import.meta.url), 'utf8');
  assert.match(config, /KAMP_AI_CONFIG/, 'yapılandırma dosyası boş bir yedek olmalı');
  assert.equal(/sk-or-v1-[A-Za-z0-9]{32,}/.test(config), false, 'depoda anahtar tutulmamalı');
  const gitignore = fs.readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
  assert.match(gitignore, /assets\/www\/ai-config\.js/, 'derleme çıktısındaki anahtar depoya girmemeli');
});
