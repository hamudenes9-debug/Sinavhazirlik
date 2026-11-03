/* Kamp Koçu'nun saf (test edilebilir) mantığı: ödev eşleştirme, arama zamanı,
 * sesli brifing, Groq mesajları ve çevrimdışı yanıtlar. Tarayıcıya bağımlı değildir. */
(function(root){
 'use strict';
 const ZONE_OFFSET_MIN=180; // Türkiye 2016'dan beri sabit UTC+3
 const MONTHS=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
 const WEEKDAYS=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
 const DONE_WORDS=['yaptim','bitirdim','tamamladim','bitti','hallettim','yapildi'];
 const HELP_WORDS=['takildim','anlamadim','anlamiyorum','nasil','yardim','cozemedim','zor','ipucu','coz'];
 const GREETING_WORDS=['merhaba','selam','gunaydin','iyi aksamlar','iyi gunler','naber','nasilsin'];

 function pad(n){return String(n).padStart(2,'0');}
 function istParts(ms){
  const d=new Date(Number(ms)+ZONE_OFFSET_MIN*60000);
  return {y:d.getUTCFullYear(),m:d.getUTCMonth()+1,d:d.getUTCDate(),h:d.getUTCHours(),mi:d.getUTCMinutes(),weekday:((d.getUTCDay()+6)%7)+1};
 }
 function toMs(p){return Date.UTC(p.y,p.m-1,p.d,p.h||0,p.mi||0)-ZONE_OFFSET_MIN*60000;}
 function parseTime(v){
  if(typeof v!=='string')return null;
  const m=/^([01]\d|2[0-3]):([0-5]\d)$/.exec(v.trim());
  return m?`${m[1]}:${m[2]}`:null;
 }
 /* Hafta içi (Pzt-Cum) verilen saatte bir sonraki arama zamanı. */
 function nextCallAt(nowMs,time,days){
  const safe=parseTime(time);if(!safe)return null;
  const [h,mi]=safe.split(':').map(Number);
  const allowed=Array.isArray(days)&&days.length?days:[1,2,3,4,5];
  const base=istParts(nowMs);
  for(let i=0;i<8;i++){
   const day=new Date(Date.UTC(base.y,base.m-1,base.d+i));
   const weekday=((day.getUTCDay()+6)%7)+1;
   if(!allowed.includes(weekday))continue;
   const candidate=toMs({y:day.getUTCFullYear(),m:day.getUTCMonth()+1,d:day.getUTCDate(),h,mi});
   if(candidate>Number(nowMs)+30000)return candidate;
  }
  return null;
 }
 function formatClock(ms){const p=istParts(ms);return pad(p.h)+':'+pad(p.mi);}
 function formatDateTR(dateStr,withWeekday){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr||''));
  if(!m)return String(dateStr||'');
  const d=new Date(Date.UTC(Number(m[1]),Number(m[2])-1,Number(m[3])));
  const text=`${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
  return withWeekday?`${text} ${WEEKDAYS[d.getUTCDay()]}`:text;
 }
 function dayDiff(fromDate,toDate){
  const a=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(fromDate||''));
  const b=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(toDate||''));
  if(!a||!b)return null;
  return Math.round((Date.UTC(Number(b[1]),Number(b[2])-1,Number(b[3]))-Date.UTC(Number(a[1]),Number(a[2])-1,Number(a[3])))/86400000);
 }
 function dueLabel(due,today){
  const n=dayDiff(today,due);
  if(n===null)return formatDateTR(due);
  if(n<0)return `${-n} gün gecikti`;
  if(n===0)return 'Bugün teslim';
  if(n===1)return 'Yarın teslim';
  return `${formatDateTR(due)} teslim`;
 }
 function norm(v){
  return String(v??'')
   .toLocaleLowerCase('tr-TR')
   .replace(/[çÇ]/g,'c').replace(/[ğĞ]/g,'g').replace(/[ıİ]/g,'i')
   .replace(/[öÖ]/g,'o').replace(/[şŞ]/g,'s').replace(/[üÜ]/g,'u')
   .replace(/[âÂ]/g,'a').replace(/[îÎ]/g,'i')
   .replace(/[^a-z0-9 ]+/g,' ')
   .replace(/\s+/g,' ').trim();
 }
 function hasWord(text,words){const n=' '+norm(text)+' ';return words.some(w=>n.includes(' '+w+' '));}
 function matchSubject(text,subjects){
  const n=norm(text);
  if(!subjects)return null;
  for(const [id,s] of Object.entries(subjects)){
   const names=[s.name,s.short,...(s.aliases||[])].filter(Boolean).map(norm);
   if(names.some(name=>name&&n.includes(name)))return id;
  }
  return null;
 }
 function pendingHomework(list){return (Array.isArray(list)?list:[]).filter(x=>x&&!x.done);}
 function homeworkStats(list,today){
  const items=Array.isArray(list)?list:[];
  const pending=items.filter(x=>x&&!x.done);
  return {
   total:items.length,
   pending:pending.length,
   done:items.filter(x=>x&&x.done).length,
   overdue:pending.filter(x=>{const n=dayDiff(today,x.due);return n!==null&&n<0;}).length,
   dueToday:pending.filter(x=>x&&x.due===today).length
  };
 }
 /* "Matematik ödevini yaptım" gibi cümlelerden tamamlanan ödevleri bulur. */
 function matchDone(text,list,subjects){
  const n=norm(text);
  if(!hasWord(n,DONE_WORDS))return [];
  const pending=pendingHomework(list);
  if(!pending.length)return [];
  if(/\b(hepsi|hepsini|tum|tumunu|butun|butununu)\b/.test(n))return pending.map(x=>x.id);
  const found=[];
  for(const item of pending){
   const s=subjects&&subjects[item.subject];
   const subjectNames=[s&&s.name,s&&s.short,item.subject].filter(Boolean).map(norm);
   const title=norm(item.title||'');
   const titleHit=title.length>=4&&n.includes(title.slice(0,Math.min(title.length,24)));
   if(subjectNames.some(name=>name&&n.includes(name))||titleHit)found.push(item.id);
  }
  return [...new Set(found)];
 }
 function wantsHelp(text){return hasWord(text,HELP_WORDS);}
 function isGreeting(text){return hasWord(text,GREETING_WORDS);}
 function buildBriefing(ctx){
  const c=ctx||{},hour=istParts(c.nowMs||Date.now()).h;
  const greeting=hour>=17?'İyi akşamlar':hour>=12?'Merhaba':'Günaydın';
  const pending=pendingHomework(c.homework);
  const parts=[`${greeting}! Ben Kamp Koçu.`];
  if(pending.length){
   const names=pending.slice(0,3).map(h=>h.title).join(', ');
   parts.push(`Bugün ${pending.length} ödevin bekliyor: ${names}.`);
   if(c.homework.some(h=>!h.done&&(dayDiff(c.today,h.due)||0)<0))parts.push('Gecikenleri de beraber halledebiliriz.');
  }else if((c.homework||[]).length){
   parts.push('Bugünkü bütün ödevlerin tamam görünüyor. Harika iş!');
  }else{
   parts.push('Bugün kayıtlı ödevin görünmüyor.');
  }
  if(c.exam){
   const n=c.exam.days;
   const when=n===0?'Bugün':n===1?'Yarın':`${n} gün sonra`;
   parts.push(`${when} ${c.exam.name} sınavın var.`);
  }
  parts.push(pending.length?'Hangisinden başlayalım?':'Bugünkü çalışma planını konuşalım mı?');
  return parts.join(' ');
 }
 function describeHomework(homework,today){
  const list=Array.isArray(homework)?homework:[];
  if(!list.length)return 'Kayıtlı ödev yok.';
  return list.map(h=>`- ${h.title} (${h.done?'tamamlandı':'bekliyor'}, ${dueLabel(h.due,today)})`).join('\n');
 }
 function describeExams(exams){
  if(!Array.isArray(exams)||!exams.length)return 'Yaklaşan sınav yok.';
  return exams.slice(0,4).map(e=>`- ${e.name}: ${formatDateTR(e.date,true)}, ${e.days===0?'bugün':e.days===1?'yarın':e.days+' gün sonra'}`).join('\n');
 }
 function composeMessages(input){
  const c=input||{};
  const system=[
   'Sen "Kamp Koçu"sun: 6. sınıf öğrencisine ödev ve sınav hazırlığında yardım eden, Türkçe konuşan sıcak bir koçsun.',
   'Kurallar:',
   '- Sesli konuşuyorsun. En fazla 3 kısa cümle kur; madde işareti, emoji ve markdown kullanma.',
   '- Yalnızca aşağıdaki verilere dayan; olmayan ödev, tarih veya not uydurma.',
   '- Ödev yardımı istenirse konuyu tek cümleyle hatırlat, sonra cevabı vermeden küçük bir ipucu ver.',
   '- Öğrenci bir ödevi bitirdiğini söylerse kısaca tebrik et ve sıradaki ödevi hatırlat.',
   '- Ders dışı veya uygunsuz istekte kibarca konuyu ödeve getir. Sağlık/acil durumda güvendiği bir yetişkine yönlendir.',
   `Bugün: ${formatDateTR(c.today,true)}.`,
   `Ödevler:\n${describeHomework(c.homework,c.today)}`,
   `Sınavlar:\n${describeExams(c.exams)}`,
   c.tasks&&c.tasks.length?`Bugünkü plan: ${c.tasks.slice(0,4).map(t=>t.title+(t.done?' (bitti)':'')).join(', ')}.`:''
  ].filter(Boolean).join('\n');
  const messages=[{role:'system',content:system}];
  for(const m of (c.history||[]).slice(-8)){
   if(m&&(m.role==='user'||m.role==='assistant')&&typeof m.content==='string')messages.push({role:m.role,content:m.content.slice(0,1200)});
  }
  messages.push({role:'user',content:String(c.userText||'').slice(0,1200)});
  return messages;
 }
 function subjectTip(subjects,id){
  const s=id&&subjects&&subjects[id];
  if(!s)return '';
  const topic=(s.topics&&s.topics[0])||'konu tekrarı';
  return `${s.name} için önce "${topic}" konusundaki örneği tekrar oku, sonra ilk soruyu kendin çözmeyi dene.`;
 }
 function offlineAnswer(text,ctx){
  const c=ctx||{},subjects=c.subjects||{},today=c.today||'';
  const pending=pendingHomework(c.homework);
  const subjectId=matchSubject(text,subjects);
  if(wantsHelp(text)&&subjectId){
   return `${subjectTip(subjects,subjectId)} Takıldığın soruyu bana yazarsan birlikte adım adım bakarız.`;
  }
  if(hasWord(text,DONE_WORDS)){
   const left=pendingHomework(c.homework);
   if(!left.length)return 'Bugünkü bütün ödevler tamam. Çok iyi iş çıkardın! Yarınki sınav için kısa bir tekrar yapalım mı?';
   return `Harika! Sırada ${left[0].title} var. Ona da birlikte bakalım mı?`;
  }
  if(/sinav|sinavlar|hangi sinav/.test(norm(text))&&c.exam){
   return `Sıradaki sınavın ${c.exam.name}. ${c.exam.days===0?'Bugün':c.exam.days===1?'Yarın':c.exam.days+' gün sonra'}. Bugün 15 dakika tekrar yeterli.`;
  }
  if(pending.length){
   const names=pending.slice(0,3).map(h=>h.title).join(', ');
   return `Bekleyen ${pending.length} ödevin var: ${names}. ${subjectTip(subjects,pending[0].subject)} Hangisiyle başlayalım?`;
  }
  if(isGreeting(text))return 'Merhaba! Bugünkü ödevlerin tamam görünüyor. Kısa bir sınav tekrarı yapalım mı?';
  return 'Şu an internete ulaşamadım ama ödevlerini biliyorum. Yeni bir ödev ekleyebilir veya sınav tekrarı isteyebilirsin.';
 }
 function validateHomeworkItem(item){
  if(!item||typeof item!=='object')return false;
  if(typeof item.id!=='string'||!/^hw-[a-zA-Z0-9-]{1,60}$/.test(item.id))return false;
  if(typeof item.title!=='string'||item.title.trim().length<1||item.title.length>120)return false;
  if(typeof item.subject!=='string'||item.subject.length>60)return false;
  if(typeof item.due!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(item.due))return false;
  if(typeof item.done!=='boolean')return false;
  if(item.createdAt!==undefined&&(!Number.isFinite(item.createdAt)||item.createdAt<0))return false;
  return true;
 }
 function sanitizeHomework(list){
  if(!Array.isArray(list))return [];
  return list.filter(validateHomeworkItem).slice(0,200);
 }
 function sanitizeSettings(obj){
  const o=obj&&typeof obj==='object'?obj:{};
  const time=parseTime(o.time)||'16:30';
  const key=typeof o.key==='string'&&o.key.length<=300?o.key.trim():'';
  const proxy=typeof o.proxy==='string'&&/^https:\/\/[^\s]+$/.test(o.proxy)?o.proxy:'';
  return {enabled:!!o.enabled,time,key,proxy};
 }
 const api={nextCallAt,parseTime,formatClock,formatDateTR,dayDiff,dueLabel,norm,homeworkStats,pendingHomework,matchSubject,matchDone,wantsHelp,isGreeting,buildBriefing,composeMessages,offlineAnswer,sanitizeHomework,validateHomeworkItem,sanitizeSettings,describeHomework};
 if(typeof module!=='undefined')module.exports=api;else root.KampAIcore=api;
})(typeof window!=='undefined'?window:globalThis);
