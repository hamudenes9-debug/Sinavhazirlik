import { chromium as playwright } from '@playwright/test';
import chromium from '@sparticuz/chromium';
import assert from 'node:assert/strict';
import {mkdir,readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {spawn} from 'node:child_process';
let testServer;
try{await fetch('http://127.0.0.1:3000');}catch{testServer=spawn(process.execPath,['scripts/serve.mjs'],{stdio:'ignore'});process.on('exit',()=>testServer.kill());for(let i=0;i<50;i++){try{await fetch('http://127.0.0.1:3000');break;}catch{await new Promise(r=>setTimeout(r,100));}}}
await mkdir('test-results',{recursive:true});
const bundled=process.env.PLAYWRIGHT_CHROMIUM!=='system';
const browser=await playwright.launch(bundled?{executablePath:await chromium.executablePath(),args:chromium.args.filter(a=>!['--single-process','--disable-web-security'].includes(a)),headless:true}:{headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});page.setDefaultTimeout(12000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000');await page.waitForSelector('.hero');await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'test-results/desktop.png',fullPage:true});
assert.match(await page.locator('.next-exam h3').innerText(),/Fen Bilimleri/);
await page.locator('.task-check').first().click();await page.reload();assert.equal(await page.locator('.task-check').first().getAttribute('aria-pressed'),'true');
await page.locator('.desktop-nav [data-nav="takvim"]').click();await page.waitForSelector('.calendar-grid');
await page.locator('[data-date="2026-11-11"]').click();assert.match(await page.locator('.day-detail-title + .exam-list').innerText(),/Matematik/);
await page.locator('[data-action="add-exam"]').first().click();await page.locator('[name="name"]').fill('Deneme sınavı');await page.locator('[name="date"]').fill('2026-11-15');await page.locator('[name="subject"]').selectOption('matematik');await page.locator('#exam-form button[type="submit"]').click();assert.match(await page.locator('.day-detail-title + .exam-list').innerText(),/Deneme sınavı/);
await page.locator('.desktop-nav [data-nav="kamp"]').click();await page.waitForSelector('.camp-days');assert.equal(await page.locator('.camp-day').count(),12);await page.locator('[data-action="timer-toggle"]').click();await page.waitForFunction(()=>document.querySelector('#focus-time')?.textContent!=='25:00',{},{timeout:10000});await page.locator('[data-action="timer-reset"]').click();
await page.locator('.desktop-nav [data-nav="kutuphane"]').click();await page.waitForSelector('.resource-grid');assert.equal(await page.locator('.resource-card').count(),15);await page.locator('#resource-search').fill('Matematik');assert.equal(await page.locator('.resource-card').count(),2);await page.locator('#resource-search').fill('');
await page.locator('.desktop-nav [data-nav="testler"]').click();await page.waitForSelector('.test-grid');await page.locator('[data-action="start-quiz"][data-id="matematik"]').first().click();await page.locator('[data-action="answer"][data-id="2"]').click();await page.locator('[data-action="check-answer"]').click();assert.match(await page.locator('.quiz-explanation').innerText(),/Doğru/);await page.locator('[data-action="next-question"]').click();assert.match(await page.locator('.quiz-card .eyebrow').innerText(),/SORU 2/);
for(let i=1;i<12;i++){await page.locator('[data-action="answer"][data-id="0"]').click();await page.locator('[data-action="check-answer"]').click();await page.locator('[data-action="next-question"]').click();}
assert.match(await page.locator('.result-score').innerText(),/3\s*\/\s*12/);assert.equal(await page.locator('.review-item').count(),9);
await page.locator('[data-action="quit-quiz"]').click();await page.locator('.settings-link').click();await page.waitForSelector('#reminder-toggle',{state:'attached'});await page.locator('#quiet-toggle + span').click();await page.locator('#quiet-start').fill('21:30');await page.locator('#quiet-start').dispatchEvent('change');await page.reload();assert.equal(await page.locator('#quiet-start').inputValue(),'21:30');
await page.locator('.exam-toggle[data-id="secingilizce-0411"] + span').click();await page.reload();assert(await page.locator('.exam-toggle[data-id="secingilizce-0411"]').isChecked());
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3000/#bugun');await page.waitForSelector('.hero');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'test-results/mobile.png',fullPage:true});
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'mobile horizontal overflow');
for(const p of ['takvim','kamp','kutuphane','testler','ayarlar','bulut']){await page.goto('http://127.0.0.1:3000/#'+p);await page.waitForTimeout(100);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'overflow '+p);}
let cached=0;
if(bundled){console.log('Service worker activation is checked on stock Chromium in CI; bundled Lambda Chromium does not activate workers.');}
else{
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
 cached=await page.evaluate(async()=>{const keys=await caches.keys();const cache=await caches.open(keys.find(k=>k.startsWith('sinav-kampi-')));return (await cache.keys()).length;});assert(cached>45);
 await page.context().setOffline(true);await page.reload();await page.waitForSelector('.cloud-account-card');await page.locator('.bottom-nav [data-nav="kutuphane"]').click();await page.waitForSelector('.resource-card');assert.equal(await page.locator('.resource-card').count(),15);await page.context().setOffline(false);
}

await page.goto('http://127.0.0.1:3000/#bulut');await page.waitForSelector('#firebase-config-form',{state:'attached'});await page.locator('#cloud-config-section summary').click();assert.equal(await page.locator('[name="projectId"]').inputValue(),'sinavkam');assert.equal(await page.locator('[name="appId"]').getAttribute('required'),null);await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});await page.screenshot({path:'test-results/cloud-mobile.png',fullPage:true});
assert.deepEqual(errors,[]);console.log('PASS: desktop + 390px mobile, navigation, tasks persistence, calendar/custom exam, timer, PDF filters, 12-question quiz, settings, elective toggle, offline precache ('+cached+' assets), no JS errors.');
await browser.close();
