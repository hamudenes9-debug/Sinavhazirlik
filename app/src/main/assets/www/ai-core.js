/* Kamp Koçu'nun saf (test edilebilir) mantığı: günlük çıkış saatleri, ödev
 * eşleştirme/ayrıştırma, arama planı, sesli brifing ve çevrimdışı yanıtlar.
 * Tarayıcıya bağımlı değildir. */
(function(root){
 'use strict';
 const ZONE_OFFSET_MIN=180; // Türkiye 2016'dan beri sabit UTC+3
 const MONTHS=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
 const WEEKDAYS=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
 const SHORT_DAYS={1:'Pzt',2:'Sal',3:'Çar',4:'Per',5:'Cum',6:'Cmt',7:'Paz'};
 const DEFAULT_DAYS={1:'16:00',2:'15:10',3:'15:10',4:'15:10',5:'15:10',6:'',7:''};
 const DONE_WORDS=['yaptim','bitirdim','tamamladim','bitti','hallettim','yapildi'];
 const HELP_WORDS=['takildim','anlamadim','anlamiyorum','nasil','yardim','cozemedim','zor','ipucu','coz'];
 const GREETING_WORDS=['merhaba','selam','gunaydin','iyi aksamlar','iyi gunler','naber','nasilsin'];
 const FILLERS=['bugun','bize','hocam','ogretmen','ogretmenim','verdi','verildi','odev','odevler','odevimiz','odevim','olarak','iste','bir de','ayrica','sonra','dedi','kadar','icin'];

 function pad(n){return String(n).padStart(2,'0');}
 function istParts(ms){
  const d=new Date(Number(ms)+ZONE_OFFSET_MIN*60000);
  return {y:d.getUTCFullYear(),m:d.getUTCMonth()+1,d:d.getUTCDate(),h:d.getUTCHours(),mi:d.getUTCMinutes(),weekday:((d.getUTCDay()+6)%7)+1};
 }
 function toMs(p){return Date.UTC(p.y,p.m-1,p.d,p.h||0,p.mi||0)-ZONE_OFFSET_MIN*60000;}
 function istDate(ms){const p=istParts(ms);return `${p.y}-${pad(p.m)}-${pad(p.d)}`;}
 function parseTime(v){
  if(typeof v!=='string')return null;
  const m=/^([01]\d|2[0-3]):([0-5]\d)$/.exec(v.trim());
  return m?`${m[1]}:${m[2]}`:null;
 }
 function istAt(dateStr,time){
  const d=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr||''));
  const t=parseTime(time);
  if(!d||!t)return null;
  const [h,mi]=t.split(':').map(Number);
  return toMs({y:Number(d[1]),m:Number(d[2]),d:Number(d[3]),h,mi});
 }
 function addDaysISO(dateStr,n){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr||''));
  if(!m)return null;
  return new Date(Date.UTC(Number(m[1]),Number(m[2])-1,Number(m[3]))+n*86400000).toISOString().slice(0,10);
 }
 function weekdayOf(dateStr){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr||''));
  if(!m)return null;
  return ((new Date(Date.UTC(Number(m[1]),Number(m[2])-1,Number(m[3]))).getUTCDay()+6)%7)+1;
 }
 /* Bir günün (hafta sonu Atlanarak) sonraki okul günü. */
 function nextSchoolDay(dateStr){
  let day=addDaysISO(dateStr,1);
  for(let i=0;i<7&&day;i++){
   const wd=weekdayOf(day);
   if(wd>=1&&wd<=5)return day;
   day=addDaysISO(day,1);
  }
  return day;
 }
 /* Hafta içi verilen saatte bir sonraki arama zamanı (tek saat). */
 function nextCallAt(nowMs,time,days){
  const safe=parseTime(time);if(!safe)return null;
  const [h,mi]=safe.split(':').map(Number);
  const allowed=Array.isArray(days)&&days.length?days:[1,2,3,4,5];
  const base=istParts(nowMs);
  for(let i=0;i<8;i++){
   const day=new Date(Date.UTC(base.y,base.m-1,base.d+i));
   const weekday=((day.getUTCDay()+7-1)%7)+1;
   if(!allowed.includes(weekday))continue;
   const candidate=toMs({y:day.getUTCFullYear(),m:day.getUTCMonth()+1,d:day.getUTCDate(),h,mi});
   if(candidate>Number(nowMs)+30000)return candidate;
  }
  return null;
 }
 function sanitizeDays(obj){
  const out={...DEFAULT_DAYS};
  if(obj&&typeof obj==='object'){
   for(const key of ['1','2','3','4','5','6','7']){
    if(!(key in obj))continue;
    const value=obj[key]===''? '' : parseTime(obj[key]);
    out[key]=value===null?DEFAULT_DAYS[key]:value;
   }
  }
  return out;
 }
 /* Günlük çıkış saatlerinden sıradaki aramalar: [{at,weekday,time}]. */
 function upcomingCalls(nowMs,days,count){
  const safe=sanitizeDays(days), result=[], base=istParts(nowMs);
  for(let i=0;i<14&&result.length<(count||8);i++){
   const day=new Date(Date.UTC(base.y,base.m-1,base.d+i));
   const weekday=((day.getUTCDay()+7-1)%7)+1;
   const time=safe[String(weekday)];
   if(!time)continue;
   const [h,mi]=time.split(':').map(Number);
   const at=toMs({y:day.getUTCFullYear(),m:day.getUTCMonth()+1,d:day.getUTCDate(),h,mi});
   if(at>Number(nowMs)+30000)result.push({at,weekday,time});
  }
  return result;
 }
 function scheduleSummary(days){
  const safe=sanitizeDays(days), groups=[];
  for(let wd=1;wd<=7;wd++){
   const time=safe[String(wd)];
   if(!time)continue;
   const last=groups[groups.length-1];
   if(last&&last.time===time&&last.end===wd-1)last.end=wd;
   else groups.push({start:wd,end:wd,time});
  }
  if(!groups.length)return 'Arama günü seçilmedi';
  return groups.map(g=>g.start===g.end?`${SHORT_DAYS[g.start]} ${g.time}`:`${SHORT_DAYS[g.start]}–${SHORT_DAYS[g.end]} ${g.time}`).join(' · ');
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
 function noHomework(text){return /\b(yok|yoktu|vermediler|odev yok|hicbir sey|bir sey yok)\b/.test(norm(text));}

 /* Sesli cümleden ödevleri çıkarır: "matematik çalışma kağıdı, fen özeti ve
  * türkçe kitap okuma" → üç ödev. Teslim tarihi varsayılan: sonraki okul günü. */
 const QUESTION_STARTS=['kim','kimsin','nesin','ne','neden','nicin','nasil','nerede','nereye','hangi','kac','misin','misiniz','musun','muyum','mi','mu','misin','anlat','soyle','biliyor musun'];
const HOMEWORK_HINTS=['odev','odevler','odevim','odevlerim','odevini','calisma kagidi','calisma','test','kitap','okuma','proje','sunum','arastir','arastirma','yaz','coz','sayfa','etkinlik','poster','maket','deneme','defter','fotokopi','kitapcik','ozet','rapor','soru','problem','alistirma','tekrar','ezber','sozluk','kelime','yazma','anlatim','cikar'];
const IDENTITY_PATTERNS=['sen kimsin','kimsin','sen nesin','nesin sen','adin ne','ismin ne','sen bir robot','robot musun','yapay zeka misin','yapay zekamisin','gercek misin','insan misin','nerede yasiyorsun'];
function isQuestionText(text){
  const raw=String(text||'').trim();
  if(!raw)return false;
  if(/\?$/.test(raw))return true;
  const n=norm(raw);
  const first=n.split(' ')[0];
  if(QUESTION_STARTS.includes(first))return true;
  return /\b(misin|misiniz|musun|muyum|misiniz|mi|mu)\b/.test(n)&&n.split(' ').length<=6;
}
function looksLikeHomework(text){
  const n=norm(text);
  if(!n)return false;
  if(/\b(cozduk|yaptik|bitirdik|tamamladik|vermediler|gelmedi)\b/.test(n))return false;
  const words=n.split(' ');
  if(HOMEWORK_HINTS.some(hint=>words.some(w=>w.length>=3&&(w===hint||(hint.length>=4&&w.startsWith(hint.slice(0,4))&&w.startsWith(hint))||(hint.length>=5&&w.startsWith(hint.slice(0,5)))))))return true;
  /* Ders adı + fiil: "matematikten 20 soru çözdük" gibi cümleler ödevdir. */
  return /\b(verdi|verildi|odedi|yapilacak|getir|getirin|bitirin|tamamlayin|hazirlayin)\b/.test(n);
}
function parseHomeworkUtterance(text,subjects,today){
  const raw=String(text||'').trim();
  if(!raw||noHomework(raw))return [];
  /* Yalnızca gerçekten ödev listesi söylenmişse kaydet. */
  if(classifyUtterance(raw,subjects)!=='homework')return [];
  const chunks=raw
   .replace(/[.!?]+/g,' ')
   .split(/\s*(?:,|;|\bve\b|\bile\b|\bsonra\b|\bayrıca\b|\bartı\b|\bdiğer\b|\bde\b|\bda\b)\s*/iu)
   .map(x=>x.trim())
   .filter(Boolean);
  const due=nextSchoolDay(today||istDate(Date.now()));
  const items=[];
  for(const chunk of chunks){
   let title=chunk
    .replace(/^(?:bugün|bize|hocam|öğretmenim|öğretmen|verdi|verildi|işte|bir de|şey)\s+/iu,'')
    .replace(/\s+(?:ödevini|ödevi|ödevlerini|ödevler|ödev|verdi|verildi|dedi|kadar)$/iu,'')
    .trim();
   if(title.length<3)continue;
   if(/^(yok|hiç|hiçbir|bir şey|şey|tamam|peki|evet|hayır)$/iu.test(title))continue;
   if(norm(title).split(' ').every(w=>FILLERS.includes(w)))continue;
   const subject=matchSubject(title,subjects)||'diger';
   items.push({subject,title:title.charAt(0).toLocaleUpperCase('tr-TR')+title.slice(1),due});
   if(items.length>=5)break;
  }
  return items;
 }

 function buildBriefing(ctx){
  const c=ctx||{},hour=istParts(c.nowMs||Date.now()).h;
  const greeting=hour>=17?'İyi akşamlar':hour>=12?'Merhaba':'Günaydın';
  const pending=pendingHomework(c.homework);
  const name=c.name?`${c.name}! `:'';
  const parts=[`${name}${greeting}! Ben Kamp Koçu.`];
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
  parts.push(pending.length?'Hangisinden başlayalım?':'Bugün hangi ödevleri verdiler? Söyle, kaydedeyim.');
  return parts.join(' ');
}

/* Okul çıkışı aramasının açılışı: ödevleri sorar. */
 function intakePrompt(ctx){
  const c=ctx||{},hour=istParts(c.nowMs||Date.now()).h;
  const greeting=hour>=17?'İyi akşamlar':hour>=12?'Merhaba':'Günaydın';
  const name=c.name?`${c.name}! `:'';
  return `${name}${greeting}! Okuldan çıktın, bugün hangi ödevleri verdiler? Dersleriyle birlikte söyle, hemen kaydedeyim.`;
}

/* Teslimden bir gün önceki hatırlatma: "(İsim)! Ödevin var, unutma". */
 function dueReminder(ctx){
  const c=ctx||{},list=pendingHomework(c.homework).filter(h=>h.due===c.tomorrow);
  const name=c.name?`${c.name}! `:'';
  if(!list.length)return null;
  const titles=list.map(h=>h.title).join(', ');
  const verb=list.length>1?'ödevlerin':'ödevin';
  return `${name}Yarın ${titles} ${verb} var, unutma! ${c.tomorrow===c.today?'Bugün teslim.':'Şimdi kısa bir başlangıç yapalım mı?'}`;
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
   'Sen "Kamp Koçu"sun: 6. sınıf öğrencisiyle konuşan, Türkçe bilen, zeki ve sıcak bir yapay zekâ koçusun.',
   'Kurallar:',
   '- Sesli konuşuyorsun. En fazla 3 kısa cümle kur; madde işareti, emoji ve markdown kullanma.',
   '- "Sen kimsin?", "ne yapabilirsin?", "nasılsın?" gibi sorulara doğal cevap ver; bunları ödev sanma.',
   '- Ders, ödev ve genel bilgi sorularını 6. sınıf düzeyinde, doğru ve kısa yanıtla; bilmiyorsan bilmediğini söyle.',
   '- Ödev, sınav tarihi ve not bilgisi için yalnızca aşağıdaki verilere dayan; olmayan ödev veya tarih uydurma.',
   '- Ders ve genel kültür sorularında 6. sınıf düzeyinde bildiğin doğru bilgiyi kullanabilirsin; emin değilsen tahmin etme.',
   '- Ödev yardımı istenirse konuyu tek cümleyle hatırlat, sonra cevabı vermeden küçük bir ipucu ver.',
   '- Öğrenci bir ödevi bitirdiğini söylerse kısaca tebrik et ve sıradaki ödevi hatırlat.',
   '- Ders dışı veya uygunsuz istekte kibarca konuyu ödeve getir. Sağlık/acil durumda güvendiği bir yetişkine yönlendir.',
   `Bugün: ${formatDateTR(c.today,true)}.${c.name?` Öğrencinin adı: ${c.name}.`:''}`,
   `Ödevler:\n${describeHomework(c.homework,c.today)}`,
   `Sınavlar:\n${describeExams(c.exams)}`,
   c.tasks&&c.tasks.length?`Bugünkü plan: ${c.tasks.slice(0,4).map(t=>t.title+(t.done?' (bitti)':'')).join(', ')}.`:'',
   knowledgeBrief(c)
  ].filter(Boolean).join('\n');
  const messages=[{role:'system',content:system}];
  for(const m of (c.history||[]).slice(-8)){
   if(m&&(m.role==='user'||m.role==='assistant')&&typeof m.content==='string')messages.push({role:m.role,content:m.content.slice(0,1200)});
  }
  messages.push({role:'user',content:String(c.userText||'').slice(0,1200)});
  return messages;
}
/* Modelin uydurmak yerine uygulama içeriğine dayanması için kısa bilgi notu. */
function knowledgeBrief(c){
  try{
    if(!Array.isArray(c&&c.knowledge)||!c.knowledge.length||!c.userText)return '';
    const hits=searchKnowledge(c.userText,c.knowledge,3);
    if(!hits.length)return '';
    return 'Uygulama içeriğinden ilgili notlar:\n'+hits.map(h=>`- ${h.text}`).join('\n');
  }catch{return '';}
}

/* Kullanıcının ne söylediğini anlar: ödev mi, soru mu, teşekkür mü? */
function classifyUtterance(text,subjects){
  const raw=String(text||'').trim();
  const n=norm(raw);
  if(!raw)return 'chat';
  if(IDENTITY_PATTERNS.some(p=>n.includes(p)))return 'identity';
  if(/ne yapabilirsin|neler yapabilirsin|nasil yardim|ne ise yararsin/.test(n))return 'capabilities';
  if(/bana soru sor|beni yokla|beni sina|test et|quiz|soru sorar misin/.test(n))return 'quiz';
  if(/daha basit|anlamadim|anlayamadim|tekrar anlat|kisaca anlat|anlatamadin/.test(n))return 'simplify';
  if(hasWord(n,DONE_WORDS))return 'done';
  if(hasWord(n,HELP_WORDS)&&(matchSubject(raw,subjects)||/odev|soru|konu/.test(n)))return 'help';
  if(noHomework(raw))return 'no-homework';
  if(/^(tesekkur|sagol|eyvallah|eline saglik|harika|super|tamam|peki|evet|hayir|ok)\b/.test(n))return 'ack';
  if(['tesekkurler','tesekkur ederim','sagol','sag ol','eyvallah','harika','super','tamam','peki','evet','hayir','ok','anladim'].some(w=>n===w||n.startsWith(w+' ')))return 'ack';
  if(isGreeting(raw))return 'greeting';
  if(isQuestionText(raw)&&!hasWord(n,['odev','odevler','odevim','calisma','kitap','proje','sunum','sayfa','test']))return 'question';
  if(looksLikeHomework(raw))return 'homework';
  return 'chat';
}

/* "Sen kimsin?" gibi sorulara kısa, dürüst yanıt. */
function identityAnswer(ctx){
  const c=ctx||{},pending=pendingHomework(c.homework).length;
  const who=c.name?`${c.name}, ben Kamp Koçu’yum.`:'Ben Kamp Koçu’yum.';
  return `${who} Ödevlerini ve sınavlarını takip eden, seninle konuşan bir yapay zekâ koçuyum. ${pending?`Şu an ${pending} ödevin bekliyor.`:'Şu an bekleyen ödevin yok.'} Bugün hangi ödevleri verdiler?`;
}

function subjectTip(subjects,id){
  const s=id&&subjects&&subjects[id];
  if(!s)return '';
  const topic=(s.topics&&s.topics[0])||'konu tekrarı';
  return `${s.name} için önce "${topic}" konusundaki örneği tekrar oku, sonra ilk soruyu kendin çözmeyi dene.`;
}
function offlineAnswer(text,ctx){
  const c=ctx||{},subjects=c.subjects||{},today=c.today||'';
  const intent=classifyUtterance(text,subjects);
  if(intent==='identity')return identityAnswer(c);
  if(intent==='quiz')return 'Hemen soruyorum. Cevabını söyle, birlikte bakalım.';
  if(intent==='simplify')return 'Hangi konuda takıldığını söyle, onu daha basit anlatayım.';
  if(intent==='capabilities')return 'Ödevlerini sesli olarak kaydediyorum, teslimden önce seni arıyorum, sınav takvimini söylüyorum ve ders sorularına ipucu veriyorum. İstersen “matematik ödevini yaptım” de, işaretleyeyim.';
  if(/kac odev|odevlerim ne|odev listesi|odevlerim neler/.test(norm(text))){
   const pending=pendingHomework(c.homework);
   if(!pending.length)return 'Şu an bekleyen ödevin yok. Yeni ödev verirlerse söyle, kaydedeyim.';
   return `${pending.length} ödevin bekliyor: ${pending.slice(0,4).map(h=>h.title).join(', ')}.`;
  }
  const n=norm(text);
  const earlyUnit=convertUnits(text);
  if(earlyUnit)return earlyUnit;
  if(/nasilsin|naber|ne haber/.test(n))return `${c.name?c.name+', ':''}iyiyim, teşekkürler! Sen nasılsın? Hazırsan bugünkü ödevleri konuşalım.`;
  if(/kac yasindasin|yasin kac|kac yasinda/.test(n))return 'Ben bir yapay zekâ koçuyum; insanlar gibi yaşım yok. Ama 6. sınıf konularını seninle birlikte çalışacak kadar biliyorum.';
  if(/ne yapiyorsun|napiyorsun|ne yaptigin/.test(n))return 'Senin ödevlerini ve sınavlarını takip ediyorum. Şu an seninle konuşuyorum; istersen bir ders sorusu sor ya da “bana soru sor” de.';
  if(/beni taniyor musun|benim adim|adimi biliyor/.test(n)){
   const p=pendingHomework(c.homework).length;
   return `${c.name?`Evet, adın ${c.name}. `:'Adını henüz bilmiyorum; “Koç sana nasıl hitap etsin?” alanına yazabilirsin. '}${p?`${p} ödevin bekliyor.`:'Şu an bekleyen ödevin yok.'}`;
  }
  if(/saat kac/.test(n))return `Şu an ${formatClock(Date.now())}.`;
  if(/gunlerden ne|hangi gun|bugun gunlerden/.test(n)){
   const d=new Date(Date.now()+ZONE_OFFSET_MIN*60000);
   return `Bugün ${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}.`;
  }
  if(/hangi dersleri biliyor|hangi dersler|hangi dersleri/.test(n)){
   const names=Object.values(subjects).map(s2=>s2.name).filter(Boolean);
   return names.length?`${names.join(', ')} derslerinde konu anlatımı ve örnek soru biliyorum.`:'Şu an ders listesi yüklenmedi.';
  }
  if(/ne calisayim|ne calissam|calisma plani|nereden baslayayim|plan ver|bugun ne yapsam/.test(n))return studyPlan(c);
  if(intent==='ack')return pendingHomework(c.homework).length?`Tamam! Sırada ${pendingHomework(c.homework)[0].title} var. Başlayalım mı?`:'Tamam! Bir şey olursa buradayım.';
  if(intent==='greeting')return `${c.name?c.name+', ':''}merhaba! Bugünkü ödevleri konuşalım mı?`;
  if(intent==='question'&&/sinav/.test(norm(text))&&c.exam)return `Sıradaki sınavın ${c.exam.name}. ${c.exam.days===0?'Bugün':c.exam.days===1?'Yarın':c.exam.days+' gün sonra'}.`;
  const subjectId=matchSubject(text,subjects);
  if(wantsHelp(text)&&subjectId){
   return `${subjectTip(subjects,subjectId)} Takıldığın soruyu bana yazarsan birlikte adım adım bakarız.`;
  }
  if(hasWord(text,DONE_WORDS)){
   const left=pendingHomework(c.homework);
   if(!left.length)return 'Bugünkü bütün ödevler tamam. Çok iyi iş çıkardın! Yarınki dersler için kısa bir tekrar yapalım mı?';
   return `Harika! Sırada ${left[0].title} var. Ona da birlikte bakalım mı?`;
  }
  if(/sinav|sinavlar|hangi sinav/.test(norm(text))&&c.exam){
   return `Sıradaki sınavın ${c.exam.name}. ${c.exam.days===0?'Bugün':c.exam.days===1?'Yarın':c.exam.days+' gün sonra'}. Bugün 15 dakika tekrar yeterli.`;
  }
  if(/saka yap|fikra anlat|beni guldur/.test(norm(text))){
   const jokes=[
    'Öğretmen sormuş: “İki elma yesem, birini sana versem kaç elmam kalır?” Öğrenci: “Bende hiç elma yok ki öğretmenim!”',
    'Matematik kitabı neden üzgünmüş? Çünkü çok fazla problemi varmış.',
    'Fen dersinde öğretmen: “Suyun formülü ne?” Öğrenci: “H₂O.” Öğretmen: “Peki neden iki hidrojen?” Öğrenci: “Çünkü biri yalnız kalmasın.”'
   ];
   return jokes[Math.floor(Math.random()*jokes.length)]+' Şimdi istersen bir ders sorusu da sorabilirsin.';
  }
  const unit=convertUnits(text);
  if(unit)return unit;
  const word=translateWord(text);
  if(word)return word;
  const math=solveMath(text);
  if(math)return math;
  const local=knowledgeAnswer(text,c);
  if(local)return local;
  if(pendingHomework(c.homework).length){
   const pending=pendingHomework(c.homework);
   const names=pending.slice(0,3).map(h=>h.title).join(', ');
   return `Bekleyen ${pending.length} ödevin var: ${names}. ${subjectTip(subjects,pending[0].subject)} Hangisiyle başlayalım?`;
  }
  if(isGreeting(text))return 'Merhaba! Bugünkü ödevlerin tamam görünüyor. Kısa bir sınav tekrarı yapalım mı?';
  return 'Bunu kendi notlarımdan çıkaramadım. Dersini ve konuyu biraz daha açık söyle (örnek: “fen, sindirim sistemi”), hemen bakayım.';
}
/* Aritmetik sorularını gerçekten hesaplar: “12 x 8 kaç eder?”, “80'in %25'i?”, “2 üssü 5”. */
function evalExpression(expr){
  const tokens=String(expr).replace(/\s+/g,'').match(/(\d+(?:[.,]\d+)?|[+\-*/])/g);
  if(!tokens||!tokens.length)return null;
  let pos=0;
  const num=v=>Number(String(v).replace(',','.'));
  function factor(){
    const t=tokens[pos++];
    if(t===undefined)return NaN;
    if(t==='-')return -factor();
    if(t==='+'||t==='*'||t==='/')return NaN;
    return num(t);
  }
  function term(){
    let v=factor();
    while(tokens[pos]==='*'||tokens[pos]==='/'){const op=tokens[pos++];const r=factor();v=op==='*'?v*r:(r===0?NaN:v/r);}
    return v;
  }
  function sum(){
    let v=term();
    while(tokens[pos]==='+'||tokens[pos]==='-'){const op=tokens[pos++];const r=term();v=op==='+'?v+r:v-r;}
    return v;
  }
  const out=sum();
  if(pos!==tokens.length||!Number.isFinite(out))return null;
  return out;
}
function fmtNum(n){
  const r=Math.round(n*10000)/10000;
  return String(r).replace('.',',');
}
function solveMath(text){
  const raw=String(text||'').toLocaleLowerCase('tr-TR').trim();
  if(!raw||!/\d/.test(raw))return null;
  const ask=/(kac|hesapla|eder|sonuc|bul|cevap|topla|cikar|carp|bol|ussu|uzeri|yuzde)/.test(norm(raw))||/[+*/×:%^]/.test(raw)||/\d\s*-\s*\d/.test(raw);
  if(!ask)return null;
  const pct=/(\d+(?:[.,]\d+)?)[^\d%]{0,18}(?:%|yuzde|yüzde)\s*(\d+(?:[.,]\d+)?)/.exec(raw);
  if(pct){
    const base=Number(String(pct[1]).replace(',','.'));
    const rate=Number(String(pct[2]).replace(',','.'));
    if(Number.isFinite(base)&&Number.isFinite(rate))return `${fmtNum(base)} sayısının %${fmtNum(rate)}’si = ${fmtNum(base*rate/100)}.`;
  }
  const pow=/(\d+(?:[.,]\d+)?)\s*(?:ussu|uzeri|\^)\s*(\d+)/.exec(norm(raw).replace(/\s+/g,' '));
  if(pow){
    const base=Number(String(pow[1]).replace(',','.')),exp=Number(pow[2]);
    if(Number.isFinite(base)&&exp>=0&&exp<=8)return `${fmtNum(base)} üssü ${exp} = ${fmtNum(Math.pow(base,exp))}.`;
  }
  const expr=raw
   .replace(/çarpı|carpı|kere|×/g,'*')
   .replace(/x(?=\s*\d)/g,'*')
   .replace(/bölü|bolu|÷/g,'/')
   .replace(/artı|arti/g,'+')
   .replace(/eksi|çıkar|cikar/g,'-')
   .replace(/kaç|kac|eder|ediyor|sonuç|sonuc|nedir|acaba|hesapla|bul/g,'');
  const m=/(\d+(?:[.,]\d+)?(?:\s*[+\-*/]\s*\d+(?:[.,]\d+)?)+)/.exec(expr);
  if(!m)return null;
  const value=evalExpression(m[1]);
  if(value===null)return null;
  const pretty=m[1].replace(/\s+/g,'').replace(/\*/g,' × ').replace(/\//g,' ÷ ');
  return `${pretty} = ${fmtNum(value)}.`;
}

/* Sınav tarihi ve bekleyen ödevlere göre üç adımlı kısa plan. */
function studyPlan(ctx){
  const c=ctx||{};
  const steps=[];
  const exam=c.exam;
  if(exam){
    const days=Number(exam.days)||0;
    const when=days===0?'bugün':days===1?'yarın':`${days} gün sonra`;
    steps.push(`${exam.name} sınavı ${when}: 15 dakika konu tekrarı + 10 soru.`);
  }
  const pending=pendingHomework(c.homework);
  if(pending.length){
    const first=pending[0];
    const sub=(c.subjects&&c.subjects[first.subject]&&c.subjects[first.subject].name)||'';
    steps.push(`Bekleyen ödev: ${first.title}${sub?` (${sub})`:''} — 20 dakikada bitir.`);
  }
  if(!steps.length)steps.push('Bugün 20 dakika matematik, 15 dakika Türkçe tekrarı yeterli.');
  if(steps.length<3)steps.push('Arada 5 dakika mola ver, su iç; sonra kalan ödevlere dön.');
  return 'Bugünkü planım: '+steps.slice(0,3).map((s2,i)=>`${i+1}) ${s2}`).join(' ')+' Başlayalım mı?';
}

/* Uzunluk, kütle, hacim ve zaman birimlerini çevirir: “3 km kaç m?” */
const UNITS={
  mm:{group:'len',factor:0.001},cm:{group:'len',factor:0.01},m:{group:'len',factor:1},km:{group:'len',factor:1000},
  mg:{group:'mass',factor:0.001},g:{group:'mass',factor:1},kg:{group:'mass',factor:1000},
  ml:{group:'vol',factor:0.001},litre:{group:'vol',factor:1},lt:{group:'vol',factor:1},
  saniye:{group:'time',factor:1},dakika:{group:'time',factor:60},dk:{group:'time',factor:60},saat:{group:'time',factor:3600},gun:{group:'time',factor:86400}
};
function convertUnits(text){
  const n=norm(text);
  const m=/(\d+(?:[.,]\d+)?)\s*(kg|mg|km|cm|mm|litre|lt|ml|m|g|saat|dakika|dk|gun|saniye)\s*(?:kac|kaca|->|=)\s*(kg|mg|km|cm|mm|litre|lt|ml|m|g|saat|dakika|dk|gun|saniye)/.exec(n);
  if(!m)return null;
  const from=m[2],to=m[3];
  if(!UNITS[from]||!UNITS[to]||UNITS[from].group!==UNITS[to].group)return null;
  const value=Number(String(m[1]).replace(',','.'))*UNITS[from].factor/UNITS[to].factor;
  const out=Math.round(value*100000)/100000;
  return `${fmtNum(Number(String(m[1]).replace(',','.')))} ${from} = ${fmtNum(out)} ${to}.`;
}

/* “apple ne demek?” / “elma ingilizce ne?” */
function translateWord(text){
  const words=(typeof root!=='undefined'&&root.KAMP_WORDS)||{};
  const keys=Object.keys(words);
  if(!keys.length)return null;
  const n=norm(text);
  const m=/([a-z]+)\s+(?:ne demek|ne anlama geliyor|anlami ne|ingilizcesi ne|turkcesi ne|ingilizcede ne|ingilizce ne demek|turkce ne demek|ingilizcesi nedir)/.exec(n);
  if(!m)return null;
  const word=m[1];
  if(words[word])return `“${word}” Türkçede “${words[word]}” demek.`;
  const tr=keys.find(k=>norm(words[k])===word);
  if(tr)return `“${word}” İngilizcede “${tr}” demek.`;
  return null;
}

/* Sesli okumak için metni sadeleştirir (emoji, markdown, uzun parantezler). */
function speechText(text,limit){
  let out=String(text||'')
   .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'')
   .replace(/[*_`#>~|]+/g,'')
   .replace(/\[(.*?)\]\((.*?)\)/g,'$1')
   .replace(/\s*\(([^)]{0,80})\)/g,' ')
   .replace(/\s+/g,' ')
   .trim();
  const max=limit||520;
  if(out.length<=max)return out;
  const cut=out.slice(0,max);
  const stop=Math.max(cut.lastIndexOf('.'),cut.lastIndexOf('!'),cut.lastIndexOf('?'));
  return (stop>max*0.5?cut.slice(0,stop+1):cut.replace(/\s+\S*$/,''))+'…';
}

/* "Sen kimsin?", "merhaba" gibi cümleler asla ödev başlığı olamaz. */
const NOT_HOMEWORK=['sen kimsin','kimsin','sen nesin','nesin','nasilsin','naber','merhaba','selam','gunaydin','iyi aksamlar','tesekkurler','tesekkur ederim','sagol','tamam','peki','evet','hayir','anladim','ne yapabilirsin','neler yapabilirsin','yardim et','saat kac','bugun gunlerden ne','hangi sinav var'];
function isNotHomework(text){
  const n=norm(text);
  if(!n)return true;
  if(/\?$/.test(String(text||'').trim()))return true;
  if(NOT_HOMEWORK.some(p=>n===p||n.startsWith(p+' ')||n.endsWith(' '+p)))return true;
  if(hasWord(n,['kimsin','nesin','misin','musun','misiniz','nasilsin','ne yapabilirsin']))return true;
  /* Soru kelimesi var ve ödevle ilgili bir kelime yoksa bu bir sohbet sorusudur. */
  const asksSomething=/\b(nasil|neden|nicin|nerede|kim|ne zaman|nedir|midir)\b/.test(n);
  const homeworkish=/\b(odev|odevler|odevim|calisma|kitap|sayfa|test|proje|sunum|okuma|coz|yaz|bitir)\b/.test(n);
  if(asksSomething&&!homeworkish)return true;
  if(/saka yap|fikra anlat|hikaye anlat|bilmece sor|oyun oyna|sohbet et|bana bir sey/.test(n))return true;
  return false;
}

/* Uygulamanın kendi içeriğinden (konu özeti + 68 soru açıklaması) cevap bulur. */
function buildKnowledgeIndex(content){
  const index=[];
  const subjects=(content&&content.subjects)||{};
  for(const [id,s] of Object.entries(subjects)){
    for(const topic of (s.topics||[]))index.push({subject:id,kind:'topic',weight:0.55,text:`${topic} konusuna çalış.`,tokens:norm(`${s.name} ${topic}`),stems:stems(`${s.name} ${topic}`)});
    if(s.note)index.push({subject:id,kind:'note',weight:0.9,text:s.note,tokens:norm(`${s.name} ${s.note}`),stems:stems(`${s.name} ${s.note}`)});
  }
  const kb=(content&&content.kb)||(typeof root!=='undefined'&&root.KAMP_KB)||[];
  for(const item of kb){
    if(!item||!item.a)continue;
    const s2=(subjects[item.s]&&subjects[item.s].name)||item.s||'';
    const text=`${item.q||''} ${item.k||''} ${s2}`;
    index.push({subject:item.s||'',kind:'kb',weight:1.7,text:item.a,tokens:norm(text),stems:stems(text),qNorm:norm(item.q||'')});
  }
  const quizzes=(content&&content.quizzes)||{};
  for(const [subject,list] of Object.entries(quizzes)){
    for(const q of (list||[])){
      if(!q)continue;
      const name=(subjects[subject]&&subjects[subject].name)||subject;
      const question=q.q||q.question||'';
      const answer=q.explanation||question||'';
      if(!answer)continue;
      index.push({subject,kind:'quiz',weight:1.05,text:answer,tokens:norm(`${name} ${question} ${answer} ${(q.options||[]).join(' ')}`),stems:stems(`${name} ${question} ${answer} ${(q.options||[]).join(' ')}`)});
    }
  }
  return index;
}
const SCHOOL_TERMS=['ebob','ekok','asal','carpan','kat','bolunebilme','bolme','kalansiz','olasilik','ondalik','kesir','yuzde','oran','uslu','karekok','cebir','denklem','kultur','kitalar','okyanus','toplum','grup','rol','sosyal','paragraf','anlam','sozcuk','yazim','noktalama','fiil','cumle','metin','greeting','present','routine','ingilizce','kelime','gramer','kuvvet','hareket','sindirim','destek','hucre','canli','din','ibadet','ahlak','peygamber','kuran'];
const STOPWORDS=['bir','ve','ile','icin','gibi','ama','fakat','cok','daha','nedir','ne','mi','mu','misin','misiniz','nasil','neden','nicin','hangi','bu','su','o','da','de','ki','olarak','olan','olur','midir'];
function stems(text){
  return norm(text).split(' ').filter(w=>w.length>=4||/^\d+$/.test(w)).map(w=>w.slice(0,5));
}
function inSchoolDomain(text){
  const n=norm(text);
  return SCHOOL_TERMS.some(term=>n.includes(term));
}
function searchKnowledge(text,index,limit){
  const query=stems(text).filter(w=>!STOPWORDS.includes(w));
  if(!query.length||!Array.isArray(index)||!index.length)return [];
  const df={};
  for(const stem of query)df[stem]=index.filter(item=>Array.isArray(item.stems)&&item.stems.includes(stem)).length;
  const rare=query.filter(stem=>(df[stem]||0)<=2);
  const need=query.length>=3?0.6:0.5;
  const scored=index.map(item=>{
    let raw=0,matched=0;
    const stemsArr=Array.isArray(item.stems)?item.stems:[];
    for(const stem of query){
      if(stemsArr.includes(stem)){matched++;raw+=df[stem]<=5?2.2:df[stem]<=12?1.6:1.2;}
    }
    if(item.qNorm&&item.qNorm===norm(text))raw+=1.4;
    const covers=matched/query.length>=need;
    const rareOk=rare.every(stem=>stemsArr.includes(stem));
    return {item,raw,score:raw*(item.weight||1),ok:covers&&rareOk&&raw>=(query.length===1?1.2:1.6)};
  }).filter(x=>x.ok).sort((a,b)=>b.score-a.score);
  const seen=new Set(),out=[];
  for(const {item,score} of scored){
    const key=item.text.slice(0,60);
    if(seen.has(key))continue;
    seen.add(key);out.push({...item,score});
    if(out.length>=(limit||2))break;
  }
  return out;
}
function knowledgeAnswer(text,ctx){
  const c=ctx||{};
  const index=c.knowledge||[];
  const hits=searchKnowledge(text,index,2);
  if(!hits.length)return null;
  /* Yalnızca ders/okul konularına cevap ver; havadan sudan sorulara uydurma cevap yok.
     Bilgi bankası zaten ders içeriği olduğu için güçlü bir bilgi bankası eşleşmesi de yeterli. */
  const school=inSchoolDomain(text)||matchSubject(text,c.subjects);
  if(!school&&hits[0].kind!=='kb')return null;
  const first=hits[0].text;
  if(hits[0].kind==='topic')return `${first} İstersen kısa bir örnek çözebiliriz.`;
  if(hits[0].kind==='kb')return first;
  const intro=hits[0].kind==='quiz'?'Bunu bir örnekle açıklayayım: ':'Bunu biliyorum: ';
  if(hits.length>1&&hits[1].kind==='quiz'&&hits[1].score>=hits[0].score*0.85&&first.length+hits[1].text.length<240)
    return `${intro}${first} Bir de şu örnek var: ${hits[1].text}`;
  return intro+first;
}

/* Groq/bağlantı hatasını öğrencinin anlayacağı tek cümleye çevirir. */

/* Groq'a ödev çıkarımı yaptırmak için mesajlar (JSON yanıt). */
function composeHomeworkExtraction(text,subjects,today){
  const list=Object.entries(subjects||{}).map(([id,s])=>`${id}: ${s.name}`).join(', ');
  return [
   {role:'system',content:[
    'Öğrencinin cümlesinden VERİLEN ÖDEVLERİ çıkarırsın. Yalnızca JSON döndür.',
    'Biçim: {"items":[{"subject":"ders-id","title":"kısa ödev başlığı"}],"none":false}',
    `Geçerli ders id’leri: ${list}, diger`,
    'Kural: cümle bir soru, selamlama veya sohbet ise {"items":[],"none":true} döndür.',
    'Ödev yoksa none true. Başlığı 6 kelimeyi geçmeyecek şekilde öğrencinin dediği gibi yaz.',
    `Bugün: ${formatDateTR(today,true)}.`
   ].join('\n')},
   {role:'user',content:String(text||'').slice(0,400)}
  ];
}
function parseIntakeResult(raw,subjects,today){
  let data=null;
  try{data=typeof raw==='string'?JSON.parse(raw):raw;}catch{return null;}
  if(!data||typeof data!=='object')return null;
  if(data.none===true)return [];
  const items=Array.isArray(data.items)?data.items:[];
  const due=nextSchoolDay(today||istDate(Date.now()));
  const out=[];
  for(const item of items.slice(0,5)){
   if(!item||typeof item.title!=='string')continue;
   const title=item.title.trim().slice(0,120);
   if(title.length<2||isNotHomework(title))continue;
   const subject=subjects&&subjects[item.subject]?item.subject:(matchSubject(title,subjects)||'diger');
   out.push({subject,title:title.charAt(0).toLocaleUpperCase('tr-TR')+title.slice(1),due});
  }
  return out;
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
  const key=typeof o.key==='string'&&o.key.length<=300?o.key.trim():'';
  const proxy=typeof o.proxy==='string'&&/^https:\/\/[^\s]+$/.test(o.proxy)?o.proxy:'';
  const name=typeof o.name==='string'?o.name.trim().replace(/\s+/g,' ').slice(0,24):'';
  const voice=typeof o.voice==='string'&&o.voice.length<=120?o.voice:'';
  const rate=Number.isFinite(Number(o.rate))?Math.max(0.7,Math.min(1.4,Number(o.rate))):1.12;
  return {enabled:!!o.enabled,name,days:sanitizeDays(o.days),key,proxy,voice,rate,preferNetwork:o.preferNetwork!==false,voicePack:o.voicePack!==false};
}
const api={inSchoolDomain,knowledgeBrief,solveMath,evalExpression,math:fmtNum,speechText,isNotHomework,buildKnowledgeIndex,searchKnowledge,knowledgeAnswer,studyPlan,convertUnits,translateWord,classifyUtterance,identityAnswer,isQuestionText,looksLikeHomework,composeHomeworkExtraction,parseIntakeResult,nextCallAt,upcomingCalls,scheduleSummary,sanitizeDays,parseTime,formatClock,formatDateTR,dayDiff,dueLabel,norm,homeworkStats,pendingHomework,matchSubject,matchDone,wantsHelp,isGreeting,parseHomeworkUtterance,intakePrompt,dueReminder,buildBriefing,composeMessages,offlineAnswer,sanitizeHomework,validateHomeworkItem,sanitizeSettings,describeHomework,istParts,istDate,istAt,addDaysISO,weekdayOf,nextSchoolDay,SHORT_DAYS,DEFAULT_DAYS};
if(typeof module!=='undefined')module.exports=api;else root.KampAIcore=api;
})(typeof window!=='undefined'?window:globalThis);
