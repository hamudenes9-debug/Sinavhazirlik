import {chromium as playwright} from '@playwright/test';
import chromium from '@sparticuz/chromium';
import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const bundle=await build({entryPoints:['tests/cloud-entry.js'],bundle:true,write:false,format:'iife',target:'chrome100'});
const source=bundle.outputFiles[0].text;
let server;try{await fetch('http://127.0.0.1:3000');}catch{server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:'ignore'});for(let i=0;i<50;i++){try{await fetch('http://127.0.0.1:3000');break;}catch{await new Promise(r=>setTimeout(r,100));}}}
process.on('exit',()=>server?.kill());
const bundled=process.env.PLAYWRIGHT_CHROMIUM!=='system';
const browser=await playwright.launch(bundled?{executablePath:await chromium.executablePath(),args:chromium.args.filter(a=>!['--single-process','--disable-web-security'].includes(a)),headless:true}:{headless:true,args:['--no-sandbox']});
const errors=[];
async function client(){
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 await context.addInitScript(()=>localStorage.setItem('sinav-kampi-firebase-config-v1',JSON.stringify({projectId:'demo-sinav-kampi',apiKey:'demo-api-key-for-local-emulator',appId:'1:123456789:web:abcdef'})));
 const page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/firebase.js',route=>route.fulfill({contentType:'application/javascript',body:source}));
 await page.goto('http://127.0.0.1:3000/#bulut');await page.waitForFunction(()=>window.KampCloud?.getState().configured);await page.evaluate(()=>window.__connectTestEmulators());
 return {context,page};
}
const a=await client(),b=await client();
const email='camp-'+Date.now()+'@example.test',password='TestCamp!2468';
async function action(page,fn,arg){return page.evaluate(async({code,arg})=>await (new Function('arg','return '+code))(arg),{code:fn,arg});}
try{
 let result=await action(a.page,"window.KampCloud.authenticate('register',arg.email,arg.password)",{email,password});assert(result.ok,result.message);
 await a.page.waitForFunction(()=>!!window.KampCloud.getState().uid);
 assert.equal(await action(a.page,'window.KampCloud.getState().syncEnabled'),false,'login must not upload automatically');
 result=await action(a.page,'window.KampCloud.enableSync(true)');assert(result.ok,result.message);
 await a.page.locator('.desktop-nav [data-nav="kamp"]').click();await a.page.waitForSelector('.task-check');await a.page.locator('.task-check').first().click();
 result=await action(a.page,'window.KampCloud.syncNow()');assert(result.ok,result.message);
 const local=await a.page.evaluate(()=>JSON.parse(localStorage.getItem('sinav-kampi-state-v1')));assert(Object.values(local.completed).some(Boolean));
 result=await action(b.page,"window.KampCloud.authenticate('login',arg.email,arg.password)",{email,password});assert(result.ok,result.message);
 await b.page.waitForFunction(()=>!!window.KampCloud.getState().uid);
 result=await action(b.page,'window.KampCloud.enableSync(true)');assert(result.ok,result.message);
 const remote=await b.page.evaluate(()=>JSON.parse(localStorage.getItem('sinav-kampi-state-v1')));assert.deepEqual(remote.completed,local.completed,'second device receives cloud progress');
 result=await action(a.page,"window.KampCloud.enableBoard(true,'Test Kampçısı')");assert(result.ok,result.message);
 await b.page.waitForFunction(()=>window.KampCloud.getState().rows.some(r=>r.nickname==='Test Kampçısı'));
 assert(!(await action(b.page,'window.KampCloud.getState().rows')).some(r=>'email' in r),'email must not appear in public scoreboard');
 result=await action(a.page,'window.KampCloud.enableBoard(false)');assert(result.ok,result.message);
 await b.page.waitForFunction(()=>!window.KampCloud.getState().rows.some(r=>r.nickname==='Test Kampçısı'));
 result=await action(a.page,'window.KampCloud.logout()');assert(result.ok,result.message);
 await a.page.waitForFunction(()=>!window.KampCloud.getState().uid);
 result=await action(b.page,"window.KampCloud.authenticate('login',arg.email,arg.password)",{email,password});assert(result.ok,result.message);
 result=await action(b.page,'window.KampCloud.removeCloudData(arg.password)',{password});assert(result.ok,result.message);
 await b.page.waitForFunction(()=>!window.KampCloud.getState().uid);
 result=await action(a.page,"window.KampCloud.authenticate('login',arg.email,arg.password)",{email,password});assert(!result.ok,'deleted account must not authenticate');
 assert.deepEqual(errors,[]);
 console.log('PASS: real Firebase emulator SDK registration/login, explicit sync consent, two-device progress, nickname leaderboard, opt-out, logout and account/data deletion.');
}finally{await browser.close();server?.kill();}
