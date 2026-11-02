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
  return n===0?'Bugün':n===1?'Yarın':`${n} gün sonra`;
 }
 function reminder(e,date=today()){
  if(!e)return 'Yaklaşan sınavın yok. Takvimini kontrol etmeyi unutma!';
  const n=daysBetween(date,e.date);
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
 function validateState(s){
  if(!s||s.version!==1||typeof s.completed!=='object'||!s.completed||Array.isArray(s.completed))return false;
  if(!Array.isArray(s.hidden)||!s.customExams||!Array.isArray(s.customExams)||!s.settings||!Array.isArray(s.history))return false;
  if(s.customExams.length>100||s.history.length>1000)return false;
  const validDate=d=>typeof d==='string'&&/^20\d{2}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
  if(!s.customExams.every(e=>e&&typeof e.id==='string'&&/^custom-[a-zA-Z0-9-]+$/.test(e.id)&&typeof e.name==='string'&&e.name.length<=60&&validDate(e.date)&&Number.isInteger(e.period)&&e.period>=1&&e.period<=10))return false;
  if(!Object.values(s.completed).every(v=>typeof v==='boolean'))return false;
  if(!s.hidden.every(v=>typeof v==='string')||!s.history.every(h=>h&&typeof h.subject==='string'&&typeof h.score==='number'&&typeof h.total==='number'&&h.total>0&&h.score>=0&&h.score<=h.total&&typeof h.date==='string'))return false;
  return typeof s.settings.enabled==='boolean'&&typeof s.settings.quiet==='boolean'&&typeof s.settings.quietStart==='string'&&typeof s.settings.quietEnd==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s.settings.quietStart)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s.settings.quietEnd);
 }
 const api={today,daysBetween,addDays,upcoming,countdown,reminder,makePlan,validateState};
 if(typeof module!=='undefined')module.exports=api;else root.KampCore=api;
})(typeof window!=='undefined'?window:globalThis);
