import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const words = require('../web/words.js');
globalThis.KAMP_WORDS = words;
const game = require('../web/game.js');
const update = require('../web/update.js');
const theme = require('../web/theme.js');
const root = new URL('../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const pkg = JSON.parse(read('package.json'));

test('kelime bankası yeterli, benzersiz ve tutarlı', () => {
  assert.ok(words.length >= 100, 'en az 100 kelime olmalı: ' + words.length);
  const seen = new Set();
  for (const entry of words) {
    assert.match(entry.w, /^[^\s]+$/, 'kelime tek parça olmalı: ' + entry.w);
    assert.ok(entry.m.length >= 8, 'anlam çok kısa: ' + entry.w);
    assert.equal(seen.has(entry.w), false, 'kelime tekrar ediyor: ' + entry.w);
    seen.add(entry.w);
    if (entry.s) assert.notEqual(entry.s.toLocaleLowerCase('tr'), entry.w.toLocaleLowerCase('tr'), 'eş anlamlı kelimenin kendisi olmamalı: ' + entry.w);
  }
  assert.ok(words.filter(entry => entry.s).length >= 70, 'eş anlamlı sayısı yetersiz');
});

test('her tur 10 soru üretir ve seçenekler benzersiz', () => {
  const rng = game.mulberry32(42);
  const round = game.buildRound('karisik', 10, rng);
  assert.equal(round.length, 10);
  for (const question of round) {
    assert.equal(question.options.length, 4, 'her soruda 4 seçenek olmalı');
    assert.equal(new Set(question.options).size, 4, 'seçenekler benzersiz olmalı: ' + question.options.join('|'));
    assert.equal(question.options[question.correctIndex], question.answer, 'doğru cevap işaretli olmalı');
    assert.match(question.prompt, /“/);
  }
  const repeat = game.buildRound('karisik', 10, game.mulberry32(42));
  assert.deepEqual(repeat.map(q => q.answer), round.map(q => q.answer), 'aynı tohum aynı turu üretmeli');
});

test('oyun türleri doğru soru tipini üretir', () => {
  const anlam = game.buildRound('anlam', 6, game.mulberry32(7));
  assert.ok(anlam.every(q => q.type === 'anlam' && q.answer === q.meaning));
  const kelime = game.buildRound('kelime', 6, game.mulberry32(7));
  assert.ok(kelime.every(q => q.type === 'kelime' && q.answer === q.word));
  const es = game.buildRound('es', 6, game.mulberry32(7));
  assert.ok(es.every(q => q.type === 'es' && q.answer && q.answer !== q.word));
});

test('puanlama seri bonusuyla artar', () => {
  assert.equal(game.scoreFor(0), 10);
  assert.equal(game.scoreFor(1), 12);
  assert.equal(game.scoreFor(9), 20);
  const questions = Array.from({ length: 10 }, (_, i) => ({ correctIndex: 0, options: ['a', 'b', 'c', 'd'], answer: 'a', type: 'anlam', word: 'w' + i, meaning: 'm' + i }));
  const perfect = game.resultOf(questions, questions.map(() => 0));
  assert.equal(perfect.correct, 10);
  assert.equal(perfect.bestStreak, 10);
  assert.equal(perfect.score, 170, 'seri bonusu toplamı');
  const mixed = game.resultOf(questions, [0, 1, 0, 1, 0]);
  assert.equal(mixed.correct, 3);
  assert.equal(mixed.bestStreak, 1);
});

test('sürüm karşılaştırması rakamsal çalışır', () => {
  assert.equal(update.compareVersions('1.12.0', '1.12.1'), -1);
  assert.equal(update.compareVersions('v1.12.1', '1.12.0'), 1);
  assert.equal(update.compareVersions('1.12', '1.12.0'), 0);
  assert.equal(update.compareVersions('1.9.0', '1.10.0'), -1);
  assert.equal(update.normalizeVersion('v1.12.0-beta'), '1.12.0');
  assert.equal(update.normalizeVersion('bozuk'), '0.0.0');
});

test('GitHub sürüm yanıtından APK bağlantısı seçilir', () => {
  const release = update.parseRelease({
    tag_name: 'v1.12.0',
    name: 'Sınav Kampı v1.12.0',
    body: '## Yenilikler\n- Kelime oyunu geldi',
    html_url: 'https://github.com/hamudenes9-debug/Sinavhazirlik/releases/tag/v1.12.0',
    assets: [
      { name: 'apk-sha256.txt', browser_download_url: 'https://example.com/a.txt', size: 92 },
      { name: 'Sinav-Kampi.apk', browser_download_url: 'https://example.com/Sinav-Kampi.apk', size: 3900000 }
    ]
  });
  assert.equal(release.version, '1.12.0');
  assert.equal(release.apk.name, 'Sinav-Kampi.apk');
  assert.equal(release.apk.size, 3900000);
  assert.ok(release.notes.includes('Kelime oyunu'));
  assert.equal(update.parseRelease({ tag_name: 'v1.2.0', assets: [] }).apk, null);
  assert.equal(update.parseRelease(null), null);
});

test('tema listesi geçerli ve varsayılan kamp', () => {
  assert.equal(theme.THEMES.length, 5);
  assert.equal(new Set(theme.ids()).size, 5);
  assert.equal(theme.normalize('gece'), 'gece');
  assert.equal(theme.normalize('olmayan'), 'kamp');
  assert.equal(theme.normalize(''), 'kamp');
  for (const item of theme.THEMES) {
    assert.match(item.meta, /^#[0-9a-f]{6}$/i, 'tema rengi geçersiz: ' + item.id);
    assert.equal(item.sw.length, 3);
  }
  const css = read('web/style.css');
  assert.match(css, /:root\{[^}]*--bg:#f6f7f2/, 'varsayılan kamp paleti eksik');
  for (const id of theme.ids().filter(item => item !== 'kamp')) assert.ok(css.includes(`[data-theme="${id}"]`), 'CSS teması eksik: ' + id);
});

test('yeni sayfalar ve betikler sıraya göre bağlanmış', () => {
  const html = read('web/index.html');
  const order = ['theme.js', 'words.js', 'game.js', 'update.js', 'app.js'];
  const positions = order.map(file => html.indexOf(file));
  positions.forEach((position, index) => assert.ok(position > 0, order[index] + ' yüklenmiyor'));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'betik sırası yanlış');
  assert.match(html, /data-nav="oyun"/, 'oyun menüde yok');
  assert.match(html, /data-theme-cycle/, 'hızlı tema düğmesi yok');
  const app = read('web/app.js');
  assert.match(app, /oyun:\(\)=>window\.KampWordGame/, 'oyun sayfası rotası yok');
  assert.match(app, /KampWordGame\?\.announcement/, 'duyuru ana sayfada yok');
  assert.match(app, /KampTheme\?\.picker/, 'tema seçici ayarlarda yok');
  assert.match(app, /KampUpdate\?\.settingsCard/, 'güncelleme kartı ayarlarda yok');
  assert.match(app, /KampUpdate\.banner/, 'güncelleme şeridi yok');
});

test('sürüm numaraları tek kaynaktan gelir', () => {
  assert.equal(pkg.version, '1.12.0');
  assert.match(read('app/build.gradle'), new RegExp(`versionName '${pkg.version}'`));
  assert.match(read('app/build.gradle'), /versionCode 17/);
  assert.match(read('web/version.js'), new RegExp(`KAMP_VERSION = '${pkg.version}'`));
  assert.match(read('scripts/build-web.mjs'), /version\.js/);
  const build = read('scripts/build-web.mjs');
  assert.match(build, /sinav-kampi-v\$\{pkg\.version\}/, 'service worker önbelleği sürümden gelmeli');
  assert.equal(/1\.1[0-2]\.0/.test(build), false, 'derleme betiğinde sabit sürüm kalmamalı');
});

test('güncelleme köprüsü ve kurulum izni Android tarafında hazır', () => {
  const java = read('app/src/main/java/tr/com/sinavkampi/MainActivity.java');
  assert.match(java, /@JavascriptInterface public void httpGet/, 'httpGet köprüsü yok');
  assert.match(java, /@JavascriptInterface public void downloadUpdate/, 'APK indirme köprüsü yok');
  assert.match(java, /@JavascriptInterface public String getVersion/, 'sürüm köprüsü yok');
  assert.match(java, /KampUpdate\._resolve/, 'sürüm yanıtı JavaScripte dönmüyor');
  assert.match(java, /ACTION_MANAGE_UNKNOWN_APP_SOURCES/, 'kurulum izni ekranı yok');
  const manifest = read('app/src/main/AndroidManifest.xml');
  assert.match(manifest, /REQUEST_INSTALL_PACKAGES/, 'kurulum izni bildirilmemiş');
  assert.match(read('app/src/main/res/xml/file_paths.xml'), /updates/, 'güncelleme klasörü paylaşılmamış');
});
