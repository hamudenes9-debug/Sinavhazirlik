/* Kelime Oyunu: 6. sınıf kelime hazinesi için anlam, kelime ve eş anlamlı turu.
   Oyun motoru saf fonksiyonlardan oluşur; arayüz kısmı yalnızca tarayıcıda çalışır. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root || window).KampWordGame = api;
})(typeof window !== 'undefined' ? window : globalThis, function (root) {
  'use strict';
  const ROUND_SIZE = 10;
  const STORE_KEY = 'sinav-kampi-kelime-v1';
  const ANNOUNCE_KEY = 'sinav-kampi-duyuru-v1';
  const MODES = [
    { id: 'karisik', name: 'Karışık', hint: 'Her türden soru' },
    { id: 'anlam', name: 'Anlamı bul', hint: 'Kelimenin anlamını seç' },
    { id: 'kelime', name: 'Kelimeyi bul', hint: 'Anlamı verilen kelimeyi seç' },
    { id: 'es', name: 'Eş anlamlı', hint: 'Eş anlamlısını yakala' }
  ];
  const LETTERS = ['A', 'B', 'C', 'D'];

  function bank() {
    const list = (root && root.KAMP_WORDS) || [];
    return Array.isArray(list) ? list : [];
  }
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, rng) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  function usable(entry) {
    return entry && typeof entry.w === 'string' && entry.w.length >= 2 && typeof entry.m === 'string' && entry.m.length >= 3;
  }
  function typeFor(mode, entry, rng) {
    if (mode === 'anlam' || mode === 'kelime') return mode;
    if (mode === 'es') return entry.s ? 'es' : 'anlam';
    const pool = entry.s ? ['anlam', 'kelime', 'es', 'anlam', 'kelime'] : ['anlam', 'kelime', 'anlam', 'kelime'];
    return pool[Math.floor(rng() * pool.length)];
  }
  function optionText(type, entry) {
    if (type === 'anlam') return entry.m;
    if (type === 'es') return entry.s || entry.w;
    return entry.w;
  }
  function buildQuestion(type, entry, all, rng) {
    const answer = optionText(type, entry);
    const needsSynonym = type === 'es';
    const pool = all.filter(other => other !== entry && usable(other) && optionText(type, other) && optionText(type, other) !== answer && (!needsSynonym || (other.s && other.s !== entry.s)));
    const distractors = [];
    const seen = new Set([answer.toLocaleLowerCase('tr')]);
    for (const other of shuffle(pool, rng)) {
      const text = optionText(type, other);
      const key = text.toLocaleLowerCase('tr');
      if (seen.has(key)) continue;
      seen.add(key);
      distractors.push(text);
      if (distractors.length === 3) break;
    }
    const options = shuffle([answer, ...distractors], rng);
    return {
      type,
      word: entry.w,
      meaning: entry.m,
      prompt: type === 'anlam' ? `“${entry.w}” ne anlama gelir?`
        : type === 'kelime' ? `“${entry.m}” anlamına gelen kelime hangisi?`
          : `“${entry.w}” ile eş anlamlı olan kelime hangisi?`,
      answer,
      options,
      correctIndex: options.indexOf(answer)
    };
  }
  function buildRound(mode = 'karisik', size = ROUND_SIZE, rng = Math.random) {
    const all = bank().filter(usable);
    if (all.length < 8) return [];
    const source = mode === 'es' ? all.filter(entry => entry.s) : all;
    const chosen = shuffle(source, rng).slice(0, Math.min(size, source.length));
    return chosen.map(entry => buildQuestion(typeFor(mode, entry, rng), entry, all, rng));
  }
  function scoreFor(streak) {
    return 10 + Math.min(streak, 5) * 2;
  }
  function resultOf(questions, answers) {
    let score = 0, streak = 0, bestStreak = 0, correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        correct += 1;
        score += scoreFor(streak);
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
      } else streak = 0;
    });
    return { score, correct, total: questions.length, bestStreak };
  }
  function readBest() {
    try {
      const data = JSON.parse((root.localStorage && root.localStorage.getItem(STORE_KEY)) || '{}');
      return { best: Number(data.best) || 0, rounds: Number(data.rounds) || 0, correct: Number(data.correct) || 0, total: Number(data.total) || 0 };
    } catch { return { best: 0, rounds: 0, correct: 0, total: 0 }; }
  }
  function saveBest(best) {
    try {
      const data = readBest();
      data.best = Math.max(data.best, best);
      (root.localStorage || {}).setItem && root.localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch { }
  }
  function recordRound(summary) {
    try {
      const data = readBest();
      data.best = Math.max(data.best, summary.score);
      data.rounds += 1;
      data.correct += summary.correct;
      data.total += summary.total;
      root.localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch { }
  }
  function announcementHidden() {
    try { return (root.localStorage || {}).getItem && root.localStorage.getItem(ANNOUNCE_KEY) === '1'; } catch { return false; }
  }
  function hideAnnouncement() {
    try { root.localStorage && root.localStorage.setItem(ANNOUNCE_KEY, '1'); } catch { }
  }
  function esc(text) {
    return String(text == null ? '' : text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const state = { view: 'intro', mode: 'karisik', round: [], index: 0, answers: [], revealed: false, picked: -1, summary: null };

  /* ---------- Arayüz ---------- */
  function modeChips(active) {
    return `<div class="word-modes" role="tablist" aria-label="Oyun türü">${MODES.map(mode => `<button type="button" class="word-mode${mode.id === active ? ' active' : ''}" data-word="mode" data-mode="${mode.id}" role="tab" aria-selected="${mode.id === active}"><strong>${mode.name}</strong><small>${mode.hint}</small></button>`).join('')}</div>`;
  }
  function introView() {
    const stats = readBest();
    const accuracy = stats.total ? Math.round(stats.correct / stats.total * 100) : 0;
    return `<div class="word-shell">
      <div class="page-intro"><div><div class="eyebrow">KELİME OYUNU · YENİ</div><h1>Kelimelerle oyna,<br>kelime hazineni büyüt.</h1><p>Her turda 10 soru. Anlamı bul, kelimeyi seç, eş anlamlıyı yakala. İnternetsiz çalışır.</p></div><span class="word-best-pill">🏆 En iyi: <strong>${stats.best}</strong></span></div>
      <section class="word-intro-card">
        <div class="word-intro-glow" aria-hidden="true"></div>
        <div class="word-intro-copy">
          <span class="word-tag">DUYURU · YENİ OYUN</span>
          <h2>Kelime Oyunu geldi!</h2>
          <p>${bank().length} kelimelik sözlükten sorular. Doğru cevap 10 puan, üst üste doğru yaparsan seri bonusu kazanırsın.</p>
          ${modeChips(state.mode)}
          <div class="word-intro-actions">
            <button type="button" class="btn word-play" data-word="start">Hemen oyna ${'▶'}</button>
            <button type="button" class="btn btn-white" data-word="mode" data-mode="karisik">Karışık başlat</button>
          </div>
        </div>
        <div class="word-intro-stats">
          <div><strong>${bank().length}</strong><span>kelime</span></div>
          <div><strong>${stats.rounds}</strong><span>oynanan tur</span></div>
          <div><strong>${accuracy ? '%' + accuracy : '—'}</strong><span>doğruluk</span></div>
        </div>
      </section>
      <section class="card card-padding word-how">
        <div class="section-heading"><h2>Nasıl oynanır?</h2></div>
        <ol class="word-steps">
          <li><span>1</span><div><strong>Türü seç</strong><p>Karışık, anlamı bul, kelimeyi bul ya da eş anlamlı.</p></div></li>
          <li><span>2</span><div><strong>Soruyu oku</strong><p>Dört seçenekten doğru olanı işaretle.</p></div></li>
          <li><span>3</span><div><strong>Seriyi büyüt</strong><p>Üst üste doğru cevap her soruda daha çok puan kazandırır.</p></div></li>
        </ol>
      </section>
    </div>`;
  }
  function headerRow() {
    return `<div class="word-topbar">
      <span class="word-tag">SORU ${state.index + 1} / ${state.round.length}</span>
      <div class="word-meters">
        <span class="word-chip">${'★'} <strong>${state.scoreNow || 0}</strong> puan</span>
        <span class="word-chip${state.streakNow > 0 ? ' hot' : ''}">${'🔥'} <strong>${state.streakNow || 0}</strong> seri</span>
      </div>
    </div>
    <div class="word-progress"><i style="width:${Math.round(state.index / state.round.length * 100)}%"></i></div>`;
  }
  function playView() {
    const question = state.round[state.index];
    if (!question) return introView();
    const answered = state.revealed;
    return `<div class="word-shell">
      ${headerRow()}
      <section class="word-card${answered ? (state.picked === question.correctIndex ? ' right' : ' wrong') : ''}">
        <p class="word-prompt">${esc(question.prompt)}</p>
        <div class="word-options">${question.options.map((option, index) => {
          let extra = '';
          if (answered && index === question.correctIndex) extra = ' correct';
          else if (answered && index === state.picked) extra = ' wrong';
          return `<button type="button" class="word-option${extra}" data-word="pick" data-index="${index}" ${answered ? 'disabled' : ''}><span class="word-letter">${LETTERS[index]}</span><span>${esc(option)}</span></button>`;
        }).join('')}</div>
        ${answered ? `<div class="word-feedback ${state.picked === question.correctIndex ? 'ok' : 'no'}" role="status" aria-live="polite">
          <strong>${state.picked === question.correctIndex ? 'Doğru! +' + (state.lastGain || 0) + ' puan' : 'Doğru cevap: ' + esc(question.answer)}</strong>
          <span>${esc(question.meaning ? '“' + question.word + '”: ' + question.meaning : '')}</span>
        </div>` : ''}
        <div class="word-actions">
          ${answered ? `<button type="button" class="btn word-play" data-word="next">${state.index + 1 >= state.round.length ? 'Sonucu gör' : 'Sonraki soru'} ${'→'}</button>` : `<span class="word-hintline">Doğru seçeneği işaretle.</span>`}
          <button type="button" class="btn btn-white" data-word="quit">Turu bitir</button>
        </div>
      </section>
      <div class="word-dots">${state.round.map((_, index) => `<i class="${index < state.answers.length ? (state.answers[index] === state.round[index].correctIndex ? 'ok' : 'no') : index === state.index ? 'now' : ''}"></i>`).join('')}</div>
    </div>`;
  }
  function resultView() {
    const summary = state.summary || { score: 0, correct: 0, total: state.round.length, bestStreak: 0 };
    const best = state.previousBest || 0;
    const perfect = summary.correct === summary.total && summary.total > 0;
    return `<div class="word-shell">
      <section class="word-result">
        <span class="word-result-badge">${perfect ? '🏆' : '🎯'}</span>
        <h1>${perfect ? 'Kusursuz tur!' : summary.correct >= summary.total / 2 ? 'Güzel oyun!' : 'Tur tamamlandı'}</h1>
        <p>${summary.correct} / ${summary.total} doğru · en uzun seri ${summary.bestStreak}</p>
        <div class="word-result-score"><strong>${summary.score}</strong><span>puan</span></div>
        <p class="word-record">${summary.score > best ? 'Yeni rekorun! 🎉' : best ? 'Rekorun: ' + best + ' puan' : 'İlk rekorun senin!'}</p>
        <div class="word-intro-actions">
          <button type="button" class="btn word-play" data-word="start">Yeniden oyna</button>
          <a class="btn btn-white" href="#bugun">Ana sayfa</a>
        </div>
      </section>
    </div>`;
  }
  function renderPage() {
    if (state.view === 'play') return playView();
    if (state.view === 'result') return resultView();
    return introView();
  }
  function announcement() {
    if (announcementHidden()) return '';
    return `<section class="announce-card">
      <div class="announce-copy">
        <span class="announce-tag">DUYURU</span>
        <h2>Kelime Oyunu geldi!</h2>
        <p>10 soruda anlamı bul, kelimeyi seç, eş anlamlıyı yakala. Seri yaparsan puanlar katlanır.</p>
        <div class="announce-actions">
          <a class="btn announce-play" href="#oyun" data-word="start">Hemen oyna</a>
          <button type="button" class="announce-dismiss" data-word="dismiss" aria-label="Duyuruyu kapat">Sonra</button>
        </div>
      </div>
      <div class="announce-art" aria-hidden="true"><span>A</span><span>B</span><span>C</span><span>?</span></div>
    </section>`;
  }
  function start(mode) {
    if (mode && MODES.some(item => item.id === mode)) state.mode = mode;
    state.round = buildRound(state.mode, ROUND_SIZE);
    state.index = 0; state.answers = []; state.revealed = false; state.picked = -1; state.summary = null;
    state.scoreNow = 0; state.streakNow = 0; state.lastGain = 0;
    state.view = state.round.length ? 'play' : 'intro';
    return state.view;
  }
  function pick(index) {
    if (state.view !== 'play' || state.revealed) return false;
    const question = state.round[state.index];
    if (!question || index < 0 || index >= question.options.length) return false;
    state.picked = index;
    state.revealed = true;
    state.answers[state.index] = index;
    const right = index === question.correctIndex;
    state.lastGain = right ? scoreFor(state.streakNow) : 0;
    state.scoreNow += state.lastGain;
    state.streakNow = right ? state.streakNow + 1 : 0;
    return right;
  }
  function next() {
    if (state.view !== 'play') return 'intro';
    if (state.index + 1 >= state.round.length) return finish();
    state.index += 1; state.picked = -1; state.revealed = false;
    return 'play';
  }
  function finish() {
    const previous = readBest().best;
    state.summary = resultOf(state.round, state.answers);
    state.previousBest = previous;
    recordRound(state.summary);
    state.view = 'result';
    return state.view;
  }
  function reset() {
    state.view = 'intro'; state.round = []; state.index = 0; state.answers = []; state.revealed = false;
    state.summary = null; state.scoreNow = 0; state.streakNow = 0;
  }

  const api = {
    ROUND_SIZE, MODES, STORE_KEY, ANNOUNCE_KEY,
    bank, shuffle, mulberry32, buildQuestion, buildRound, scoreFor, resultOf,
    readBest, saveBest, recordRound, announcementHidden, hideAnnouncement,
    renderPage, announcement, start, pick, next, finish, reset,
    _state: state,
    _onAction(action, detail) {
      const el = detail || {};
      if (action === 'start') { start(el.mode || state.mode); if (el.mode) state.mode = el.mode; return; }
      if (action === 'mode') { state.mode = MODES.some(item => item.id === el.mode) ? el.mode : 'karisik'; if (state.view === 'play') reset(); return; }
      if (action === 'pick') { pick(Number(el.index)); return; }
      if (action === 'next') { next(); return; }
      if (action === 'quit') { finish(); return; }
      if (action === 'dismiss') { hideAnnouncement(); return; }
    }
  };

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', event => {
      const button = event.target.closest && event.target.closest('[data-word]');
      if (!button) return;
      event.preventDefault();
      const action = button.dataset.word;
      api._onAction(action, { mode: button.dataset.mode, index: button.dataset.index });
      if (action === 'start' || action === 'mode') {
        if (location.hash !== '#oyun') { location.hash = 'oyun'; return; }
      }
      if (window.KampApp) window.KampApp.render();
    });
  }
  return api;
});
