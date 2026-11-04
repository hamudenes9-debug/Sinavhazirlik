(function(root){
 'use strict';
 const zone='Europe/Istanbul';
 function today(now=new Date()){
  const p=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const v=t=>p.find(x=>x.type===t).value; return `${v('year')}-${v('month')}-${v('day')}`;
 }
 function dayNumber(date){const [y,m,d]=date.split('-').map(Number);return Math.floor(Date.UTC(y,m-1,d)/86400000);}
 function daysBetween(a,b){return dayNumber(b)-dayNumber(a);}
 function addDays(date,n){return new Date((dayNumber(date)+n)*86400000).toISOString().slice(0,10);}
 function upcoming(exams,date=today(),hidden=[]){return exams.filter(e=>!hidden.includes(e.id)&&daysBetween(date,e.date)>=0).sort((a,b)=>a.date.localeCompare(b.date)||a.period-b.period);}
 function countdown(e,date=today()){
  const n=daysBetween(date,e.date);
  if(n<0)return 'Geçti';
  return n===0?'Bugün':n===1?'Yarın':`${n} gün sonra`;
 }
 function reminder(e,date=today()){
  if(!e)return 'Yaklaşan sınavın yok. Takvimini kontrol etmeyi unutma!';
  const n=daysBetween(date,e.date);
  if(n<0)return 'Yaklaşan sınavın yok. Takvimini kontrol etmeyi unutma!';
  return `${n===0?'Bugün':n===1?'Yarın':n+' gün sonra'} ${e.name} sınavın var!`;
 }
 function makePlan(exams,date=today(),hidden=[]){
  const list=upcoming(exams,date,hidden), result=[];
  for(let offset=0;offset<12;offset++){
   const day=addDays(date,offset), nearest=list.filter(e=>e.date>=day).slice(0,2);
   if(!nearest.length)break;
   const tasks=[];
   nearest.forEach((e,i)=>{
    const left=daysBetween(day,e.date), topics=e.topics||['Konu tekrarı'];
    const topic=topics[Math.max(0,topics.length-1-left)%topics.length];
    tasks.push({id:`${day}:${e.id}:study`,examId:e.id,subject:e.subject,type:'study',title:topic,minutes:i===0?25:15});
    tasks.push({id:`${day}:${e.id}:quiz`,examId:e.id,subject:e.subject,type:'quiz',title:`${e.short}: kendini dene`,minutes:10});
   });
   result.push({date:day,tasks});
  }
  return result;
 }
 function plainObject(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
 function safeKey(k){return typeof k==='string'&&k.length<=220&&!['__proto__','constructor','prototype'].includes(k);}
 function normalizeSyncState(s){
  if(!plainObject(s))return s;
  const out={...s,taskUpdatedAt:{...(s.taskUpdatedAt||{})},hiddenUpdatedAt:{...(s.hiddenUpdatedAt||{})},deletedExams:{...(s.deletedExams||{})}};
  const counts={};
  out.history=(s.history||[]).map(h=>{
   if(h.id)return h;
   const signature=[h.date,h.subject,h.score,h.total].join('|');counts[signature]=(counts[signature]||0)+1;
   return {...h,id:'legacy-'+signature+'-'+counts[signature],createdAt:Date.parse(h.date+'T12:00:00Z')||0};
  });
  return out;
 }
 function syncPayload(s){
  return {version:1,completed:s.completed||{},hidden:s.hidden||[],customExams:s.customExams||[],history:s.history||[],taskUpdatedAt:s.taskUpdatedAt||{},hiddenUpdatedAt:s.hiddenUpdatedAt||{},deletedExams:s.deletedExams||{}};
 }
 function mergeStates(local,remote){
  if(!remote)return normalizeSyncState(local);
  const a=normalizeSyncState(local),b=normalizeSyncState(remote),out=syncPayload(a);
  out.taskUpdatedAt={...a.taskUpdatedAt,...b.taskUpdatedAt};
  for(const [key,value] of Object.entries(b.completed||{})){
   const at=b.taskUpdatedAt?.[key]||0,bt=a.taskUpdatedAt?.[key]||0;
   if(at>bt||(at===bt&&(value||!(key in a.completed))))out.completed[key]=value;
  }
  for(const [key,time] of Object.entries(a.taskUpdatedAt||{}))out.taskUpdatedAt[key]=Math.max(time,b.taskUpdatedAt?.[key]||0);
  const hidden=new Set(a.hidden),hiddenAt={...a.hiddenUpdatedAt};
  for(const key of new Set([...Object.keys(hiddenAt),...Object.keys(b.hiddenUpdatedAt||{}),...b.hidden||[]])){
   const at=a.hiddenUpdatedAt?.[key]||0,bt=b.hiddenUpdatedAt?.[key]||0;
   const value=bt>at?b.hidden.includes(key):at>bt?a.hidden.includes(key):a.hidden.includes(key)||b.hidden?.includes(key);
   if(value)hidden.add(key);else hidden.delete(key);hiddenAt[key]=Math.max(at,bt);
  }
  out.hidden=[...hidden].sort();out.hiddenUpdatedAt=hiddenAt;
  out.deletedExams={...a.deletedExams};
  for(const [id,time] of Object.entries(b.deletedExams||{}))out.deletedExams[id]=Math.max(time,a.deletedExams?.[id]||0);
  const exams=new Map((a.customExams||[]).map(e=>[e.id,e]));
  for(const e of b.customExams||[]){const old=exams.get(e.id);if(!old||(e.updatedAt||0)>=(old.updatedAt||0))exams.set(e.id,e);}
  out.customExams=[...exams.values()].filter(e=>!(out.deletedExams[e.id]>=(e.updatedAt||0))).sort((a,b)=>a.id.localeCompare(b.id));
  const history=new Map((a.history||[]).map(h=>[h.id,h]));
  for(const h of b.history||[])if(!history.has(h.id))history.set(h.id,h);
  out.history=[...history.values()].sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)||a.id.localeCompare(b.id)).slice(-1000);
  const sortedMap=m=>Object.fromEntries(Object.entries(m).sort(([x],[y])=>x.localeCompare(y)));
  out.completed=sortedMap(out.completed);out.taskUpdatedAt=sortedMap(out.taskUpdatedAt);out.hiddenUpdatedAt=sortedMap(out.hiddenUpdatedAt);out.deletedExams=sortedMap(out.deletedExams);
  out.settings={...a.settings};out.focus={...a.focus};
  return out;
 }
 function studyPoints(s){
  const best={};for(const h of s.history||[])best[h.subject]=Math.max(best[h.subject]||0,h.score);
  const tasks=Object.values(s.completed||{}).filter(Boolean).length,correct=Object.values(best).reduce((a,b)=>a+b,0);
  return {points:tasks*5+correct*10,completed:tasks,correct};
 }
 function validateState(s){
  if(!plainObject(s)||s.version!==1||!plainObject(s.completed)||!plainObject(s.settings))return false;
  if(!Array.isArray(s.hidden)||!Array.isArray(s.customExams)||!Array.isArray(s.history))return false;
  if(s.customExams.length>100||s.history.length>1000||s.hidden.length>200||Object.keys(s.completed).length>5000)return false;
  const validDate=d=>typeof d==='string'&&/^20\d{2}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
  const time=t=>typeof t==='number'&&Number.isFinite(t)&&t>=0&&t<9000000000000;
  const text=(v,max)=>typeof v==='string'&&v.length<=max;
  const map=(v,max)=>v===undefined||plainObject(v)&&Object.keys(v).length<=max&&Object.entries(v).every(([k,t])=>safeKey(k)&&time(t));
  if(!map(s.taskUpdatedAt,5000)||!map(s.hiddenUpdatedAt,200)||!map(s.deletedExams,200))return false;
  if(!Object.entries(s.completed).every(([k,v])=>safeKey(k)&&typeof v==='boolean'))return false;
  if(!s.hidden.every(v=>text(v,220)))return false;
  if(!s.customExams.every(e=>plainObject(e)&&text(e.id,100)&&/^custom-[a-zA-Z0-9-]+$/.test(e.id)&&text(e.name,60)&&e.name.trim().length>0&&text(e.subject,60)&&validDate(e.date)&&Number.isInteger(e.period)&&e.period>=1&&e.period<=10&&(e.updatedAt===undefined||time(e.updatedAt))&&(e.topics===undefined||Array.isArray(e.topics)&&e.topics.length<=10&&e.topics.every(t=>text(t,120)))))return false;
  if(!s.history.every(h=>plainObject(h)&&text(h.subject,60)&&Number.isInteger(h.score)&&Number.isInteger(h.total)&&h.total>0&&h.total<=100&&h.score>=0&&h.score<=h.total&&validDate(h.date)&&(h.id===undefined||text(h.id,220))&&(h.createdAt===undefined||time(h.createdAt))))return false;
  const v=s.settings;
  return typeof v.enabled==='boolean'&&typeof v.quiet==='boolean'&&typeof v.quietStart==='string'&&typeof v.quietEnd==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v.quietStart)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v.quietEnd);
 }
 function validateSyncPayload(p){
  if(!plainObject(p)||!Object.keys(p).every(k=>['version','completed','hidden','customExams','history','taskUpdatedAt','hiddenUpdatedAt','deletedExams'].includes(k)))return false;
  return validateState({...p,settings:{enabled:false,quiet:false,quietStart:'22:00',quietEnd:'08:00'}});
 }
 const api={today,daysBetween,addDays,upcoming,countdown,reminder,makePlan,validateState,normalizeSyncState,syncPayload,mergeStates,studyPoints,validateSyncPayload};
 if(typeof module!=='undefined')module.exports=api;else root.KampCore=api;
})(typeof window!=='undefined'?window:globalThis);
