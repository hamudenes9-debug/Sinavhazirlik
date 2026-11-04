import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const require=createRequire(import.meta.url), C=require('../web/core.js');
function load(file,key){const ctx={window:{}};vm.runInNewContext(readFileSync(file,'utf8'),ctx);return ctx.window[key];}
const D=load('web/data.js','KAMP_DATA'),CONTENT=load('web/content.js','KAMP_CONTENT');
const exams=D.exams.map(e=>({...e,...D.subjects[e.subject]}));
test('Istanbul day boundary is correct',()=>{assert.equal(C.today(new Date('2026-11-02T21:30:00Z')),'2026-11-03');assert.equal(C.today(new Date('2026-11-02T20:30:00Z')),'2026-11-02');});
test('sixth grade common exam schedule transcribed correctly',()=>{assert.equal(D.exams.length,6);const get=id=>D.exams.find(e=>e.id===id);assert.equal(get('fen-0311').date,'2026-11-03');assert.equal(get('sosyal-0611').date,'2026-11-06');assert.equal(get('turkce-1011').date,'2026-11-10');assert.match(get('turkce-1011').periodNote,/4\. ders/);assert.equal(get('matematik-1111').date,'2026-11-11');assert.equal(get('matematik-1111').period,2);assert.equal(get('ingilizce-1211').date,'2026-11-12');assert.equal(get('din-1311').date,'2026-11-13');assert(!D.exams.some(e=>e.subject==='matematik'&&e.date==='2026-11-05'));assert(D.exams.every(e=>e.common));});
test('next exam respects hidden lessons and date/period order',()=>{const active=C.upcoming(exams,'2026-11-02',['din-1311']);assert.equal(active[0].id,'fen-0311');assert.equal(active.length,5);assert.equal(C.upcoming(exams,'2026-11-09')[0].id,'turkce-1011');assert.equal(C.upcoming(exams,'2026-11-14').length,0);});
test('tomorrow / today / future notification wording',()=>{assert.equal(C.reminder(exams[0],'2026-11-02'),'Yarın Fen Bilimleri sınavın var!');assert.equal(C.reminder(exams[0],'2026-11-03'),'Bugün Fen Bilimleri sınavın var!');assert.equal(C.reminder(exams[0],'2026-11-01'),'2 gün sonra Fen Bilimleri sınavın var!');assert.match(C.reminder(null),/Yaklaşan sınavın yok/);assert.equal(C.reminder(exams[0],'2026-11-04'),'Yaklaşan sınavın yok. Takvimini kontrol etmeyi unutma!');});
test('passed exams are never counted down or reminded',()=>{assert.equal(C.countdown(exams[0],'2026-11-03'),'Bugün');assert.equal(C.countdown(exams[0],'2026-11-04'),'Geçti');assert.equal(C.countdown(exams[0],'2026-11-20'),'Geçti');assert.equal(C.upcoming(exams,'2026-11-04')[0].id,'sosyal-0611');});
test('camp covers 12 days and keeps completed IDs stable',()=>{const plan=C.makePlan(exams,'2026-11-02',[]);assert.equal(plan.length,12);assert.equal(plan[0].date,'2026-11-02');assert.equal(plan.at(-1).date,'2026-11-13');const ids=plan.flatMap(d=>d.tasks.map(t=>t.id));assert.equal(new Set(ids).size,ids.length);assert.deepEqual(C.makePlan(exams,'2026-11-02',[]),plan);assert.equal(C.makePlan(exams,'2026-11-14').length,0);});
test('state validation accepts clean backup and rejects malformed',()=>{const s={version:1,completed:{a:true},hidden:[],customExams:[],settings:{enabled:false,quiet:true,quietStart:'22:00',quietEnd:'08:00'},history:[]};assert(C.validateState(s));assert(!C.validateState({...s,version:2}));assert(!C.validateState({...s,completed:[]}));assert(!C.validateState({...s,customExams:[{id:'bad',name:'x',date:'2026-02-31',period:1}]}));assert(!C.validateState({...s,history:[{subject:'fen',score:9,total:5,date:'x'}]}));});
test('all quizzes have valid answer indices and explanations',()=>{let count=0;for(const [subject,qs] of Object.entries(CONTENT.quizzes)){assert(qs.length>=5);for(const q of qs){count++;assert.equal(q.options.length,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation.length>20);assert(q.q.length>10);}}assert.equal(count,68);});
test('every bundled PDF exists and has PDF signature',()=>{assert.equal(CONTENT.resources.length,15);for(const r of CONTENT.resources){const path='web/pdfs/'+r.file;assert(existsSync(path));assert.equal(readFileSync(path).subarray(0,5).toString(),'%PDF-');}});
test('generated content has no accidental non-Turkish placeholders',()=>{const s=JSON.stringify(CONTENT);assert(!/[\u3400-\u9fff]/.test(s));assert(!s.includes('undefined'));});
test('calendar arithmetic crosses month/year boundaries',()=>{assert.equal(C.addDays('2026-12-31',1),'2027-01-01');assert.equal(C.daysBetween('2026-11-02','2027-01-01'),60);});
const base={version:1,completed:{},hidden:[],customExams:[],history:[],settings:{enabled:false,quiet:false,quietStart:'22:00',quietEnd:'08:00'},focus:{remaining:1500,endAt:0}};
test('cloud merge is commutative and idempotent for timestamped task changes',()=>{
 const a={...base,completed:{a:true,b:false},taskUpdatedAt:{a:10,b:30}};
 const b={...base,completed:{a:false,b:true,c:true},taskUpdatedAt:{a:20,b:25,c:15}};
 const ab=C.mergeStates(a,b),ba=C.mergeStates(b,a);assert.deepEqual(ab.completed,ba.completed);assert.equal(ab.completed.a,false);assert.equal(ab.completed.b,false);assert.equal(ab.completed.c,true);assert.deepEqual(C.syncPayload(C.mergeStates(ab,b)),C.syncPayload(ab));
});
test('custom exam deletion tombstone wins over stale device; re-add works',()=>{
 const exam={id:'custom-1',name:'Fen',subject:'fen',date:'2026-11-15',period:2,updatedAt:10};
 const a={...base,customExams:[exam]},b={...base,deletedExams:{'custom-1':20}};
 assert.equal(C.mergeStates(a,b).customExams.length,0);assert.equal(C.mergeStates(b,a).customExams.length,0);assert.equal(C.mergeStates({...a,customExams:[{...exam,updatedAt:30}]},b).customExams.length,1);
});
test('practice points count each subject best result once',()=>{
 const s={...base,completed:{a:true,b:true,c:false},history:[{subject:'fen',score:3,total:5},{subject:'fen',score:5,total:5},{subject:'sosyal',score:4,total:6}]};assert.deepEqual(C.studyPoints(s),{points:100,completed:2,correct:9});assert.deepEqual(C.studyPoints(s),C.studyPoints({...s,history:[...s.history,{subject:'fen',score:5,total:5}]}));
});
test('sync payload validation rejects corrupt metadata and unsafe keys',()=>{
 const p=C.syncPayload(base);assert(C.validateSyncPayload(p));assert(!C.validateSyncPayload({...p,taskUpdatedAt:{a:'bad'}}));assert(!C.validateSyncPayload({...p,completed:{['__proto__']:true}}));assert(!C.validateSyncPayload({...p,settings:{enabled:true}}));assert(!C.validateSyncPayload({...p,history:[{subject:'fen',date:'2026-11-02',score:1.5,total:5}]}));
});
test('history merge deduplicates attempts and elective visibility uses latest change',()=>{
 const h={id:'attempt-1',subject:'fen',date:'2026-11-02',score:3,total:5,createdAt:10};const a={...base,history:[h],hidden:['x'],hiddenUpdatedAt:{x:20}},b={...base,history:[h],hidden:[],hiddenUpdatedAt:{x:10}};assert.equal(C.mergeStates(a,b).history.length,1);assert.deepEqual(C.mergeStates(a,b).hidden,['x']);assert.deepEqual(C.mergeStates(b,a).hidden,['x']);
});
