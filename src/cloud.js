import { initializeApp, deleteApp } from 'firebase/app';
import DEFAULT_CONFIG from './firebase-config.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { getFirestore, doc, runTransaction, onSnapshot, query, collection, orderBy, limit, getDocs, serverTimestamp, deleteDoc } from 'firebase/firestore';

const CONFIG_KEY='sinav-kampi-firebase-config-v1', OPT_KEY='sinav-kampi-cloud-opt-v1';
const C=window.KampCore;
let host,app,auth,db,user=null,uid=null,generation=0,unsubPrivate=null,unsubBoard=null,syncTimer=null,syncing=false,dirty=false,optIn=false,boardOptIn=false,nickname='',lastSync=0,lastError='',statusText='Bağlantı yapılandırılmadı',busy=false,rows=[],boardLoading=false,config=readConfig();
let lastObserved='',operationEpoch=0,activeSync=null;
function readConfig(){try{const stored=localStorage.getItem(CONFIG_KEY);return stored?validConfig(JSON.parse(stored)):{...DEFAULT_CONFIG};}catch{return {...DEFAULT_CONFIG};}}
function validConfig(c){
 if(!c||typeof c!=='object')return null;
 const projectId=String(c.projectId||'').trim(),apiKey=String(c.apiKey||'').trim(),appId=String(c.appId||'').trim(),authDomain=String(c.authDomain||projectId+'.firebaseapp.com').trim();
 if(!/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(projectId)||!/^[A-Za-z0-9_-]{20,200}$/.test(apiKey)||(appId&&!/^1:\d+:web:[a-fA-F0-9]+$/.test(appId))||!/^[a-z0-9.-]+(?::\d+)?$/.test(authDomain))return null;
 return {apiKey,authDomain,projectId,...(appId?{appId}:{}),...(c.storageBucket?{storageBucket:String(c.storageBucket)}:{}),...(c.messagingSenderId?{messagingSenderId:String(c.messagingSenderId)}:{})};
}
function readPrefs(){try{const p=JSON.parse(localStorage.getItem(OPT_KEY)||'{}');return p&&typeof p==='object'?p:{};}catch{return {};}}
function savePrefs(){if(!uid)return;try{const p=readPrefs();p[uid]={sync:optIn,leaderboard:boardOptIn,nickname};localStorage.setItem(OPT_KEY,JSON.stringify(p));}catch{error('Tercihler cihazda kaydedilemedi.');}}
function emit(){host?.render?.();}
function error(e){const code=e?.code||'';const map={
 'auth/invalid-email':'E-posta adresini kontrol et.',
 'auth/email-already-in-use':'Bu e-posta ile bir hesap var. Giriş yapmayı veya şifre sıfırlamayı dene.',
 'auth/invalid-credential':'E-posta veya şifre doğru değil.',
 'auth/wrong-password':'E-posta veya şifre doğru değil.',
 'auth/user-not-found':'E-posta veya şifre doğru değil.',
 'auth/weak-password':'Şifre en az 8 karakter olmalı.',
 'auth/too-many-requests':'Çok fazla deneme yapıldı. Biraz bekle veya şifreni sıfırla.',
 'auth/operation-not-allowed':'Firebase Console’da Authentication → Email/Password sağlayıcısını etkinleştir.',
 'auth/unauthorized-domain':'Bu web adresi Firebase Auth izinli alanlarında değil. FIREBASE.md dosyasındaki alan ayarını uygula.',
 'auth/network-request-failed':'Firebase bağlantısı kurulamadı. İnternetini ve proje bilgilerini kontrol et.',
 'permission-denied':'Firestore erişimi reddedildi. sinavkam projesinde firestore.rules kurallarını yayımla.',
 'unavailable':'Firebase’e ulaşılamıyor. Yerel kaydın korunuyor; bağlantı gelince tekrar deneyebilirsin.',
 'failed-precondition':'Firestore veritabanı henüz hazır değil. Firebase Console’da Firestore’u oluştur.',
 'auth/invalid-api-key':'Firebase apiKey bilgisini kontrol et.',
 'app/invalid-app-argument':'Firebase uygulama bilgileri eşleşmiyor. Web uygulaması yapılandırmasını kontrol et.'
 };return map[code]||'İşlem tamamlanamadı. Bağlantını ve Firebase ayarlarını kontrol edip tekrar dene.';}
function fail(e){lastError=error(e);statusText='Bağlantı kurulamadı';emit();return {ok:false,message:lastError};}
function offline(){return typeof navigator!=='undefined'&&!navigator.onLine;}
async function boot(){
 const token=++generation;unsubPrivate?.();unsubBoard?.();unsubPrivate=null;unsubBoard=null;user=null;uid=null;optIn=false;boardOptIn=false;rows=[];lastError='';lastSync=0;
 if(app){const old=app;app=null;auth=null;db=null;await deleteApp(old).catch(()=>{});}
 if(!config){statusText='Bağlantı yapılandırılmadı';emit();return;}
 try{
  app=initializeApp(config,'sinav-kampi-'+token);auth=getAuth(app);db=getFirestore(app);
  await setPersistence(auth,browserLocalPersistence);
  if(token!==generation)return;
  statusText='Giriş bekleniyor';
  onAuthStateChanged(auth,async next=>{
   if(token!==generation)return;
   unsubPrivate?.();unsubBoard?.();unsubPrivate=null;unsubBoard=null;operationEpoch++;syncing=false;dirty=false;user=next;uid=next?.uid||null;rows=[];lastError='';
   const pref=uid?readPrefs()[uid]:null;optIn=!!pref?.sync;boardOptIn=!!pref?.leaderboard;nickname=typeof pref?.nickname==='string'?pref.nickname:'';
   statusText=user?(optIn?'Eşitleniyor':'Giriş yapıldı'):'Giriş bekleniyor';emit();
   if(user){attachPrivate();attachBoard();if(optIn)queueSync(300);}
  },e=>{if(token===generation)fail(e);});
 }catch(e){if(token===generation)fail(e);}
}
function privateRef(){return doc(db,'users',uid);}
function boardRef(){return doc(db,'leaderboard',uid);}
function attachPrivate(){
 unsubPrivate?.();if(!uid||!optIn)return;
 const token=generation,account=uid;
 unsubPrivate=onSnapshot(privateRef(),{includeMetadataChanges:false},snap=>{
  if(token!==generation||account!==uid||!optIn)return;
  if(snap.metadata.hasPendingWrites)return;
  try{
   const data=snap.data();if(data?.progress){const remote=JSON.parse(data.progress);if(!validPayload(remote))throw Error();const merged=C.mergeStates(host.getState(),remote);host.applyRemote(merged);}
   if(snap.exists()){lastSync=Date.now();statusText=dirty?'Değişiklikler bekliyor':'Eşitlendi';}
   else statusText='İlk bulut kaydı bekleniyor';
   lastError='';emit();if(dirty)queueSync(500);
  }catch(e){lastError='Bulut kaydı okunamadı. Yerel ilerlemen korunuyor.';emit();}
 },e=>{if(token===generation)fail(e);});
}
function validPayload(p){return C.validateSyncPayload(p);}
function queueSync(delay=1600,force=false){const snapshot=JSON.stringify(C.syncPayload(host.getState()));if(!force&&snapshot===lastObserved)return;lastObserved=snapshot;dirty=true;clearTimeout(syncTimer);if(optIn&&uid&&!offline())syncTimer=setTimeout(()=>syncNow(),delay);}
function syncNow(){activeSync=performSync().finally(()=>{activeSync=null;});return activeSync;}
async function performSync(){
 if(!uid||!optIn)return {ok:false,message:'Önce giriş yap ve bulut eşitlemeyi aç.'};
 if(syncing)return {ok:false,message:'Eşitleme zaten sürüyor.'};
 if(offline()){statusText='Çevrimdışı · cihazda kayıtlı';emit();return {ok:false,message:'İnternet yok. İlerlemen bu cihazda korunuyor.'};}
 syncing=true;lastError='';statusText='Eşitleniyor';emit();const account=uid,token=generation,epoch=operationEpoch;
 try{
  const result=await runTransaction(db,async tx=>{
   if(epoch!==operationEpoch||account!==uid||!optIn)throw Error('Sync cancelled');
   const snap=await tx.get(privateRef());const board=boardOptIn?await tx.get(boardRef()):null;const previous=snap.data();const remote=previous?.progress?JSON.parse(previous.progress):null;
   if(remote&&!validPayload(remote))throw Error('Invalid remote data');
   const merged=C.syncPayload(C.mergeStates(host.getState(),remote));const json=JSON.stringify(merged);
   if(json.length>450000)throw Error('Payload too large');
   if(previous?.progress!==json)tx.set(privateRef(),{progress:json,revision:(previous?.revision||0)+1,updatedAt:serverTimestamp()},{merge:false});
   if(boardOptIn){if(!validNickname(nickname))throw Error('Invalid nickname');const old=board.data(),score={nickname,...C.studyPoints(merged)};if(!old||Object.keys(score).some(k=>old[k]!==score[k]))tx.set(boardRef(),{...score,updatedAt:serverTimestamp()},{merge:false});}
   return merged;
  },{maxAttempts:3});
  if(token!==generation||account!==uid)return {ok:false,message:'Hesap değişti.'};
  dirty=false;host.applyRemote(result);lastObserved=JSON.stringify(C.syncPayload(host.getState()));lastSync=Date.now();statusText='Eşitlendi';
  if(JSON.stringify(C.syncPayload(host.getState()))!==JSON.stringify(result))queueSync(800,true);
  emit();return {ok:true,message:'İlerlemen Firebase’e eşitlendi.'};
 }catch(e){if(token===generation){dirty=true;fail(e);}return {ok:false,message:lastError};}
 finally{if(token===generation&&epoch===operationEpoch){syncing=false;emit();}}
}
function validNickname(n){return typeof n==='string'&&n.trim().length>=3&&n.trim().length<=20&&/^[\p{L}\p{N} _-]+$/u.test(n.trim())&&!n.includes('@');}
function attachBoard(){
 unsubBoard?.();if(!uid){rows=[];return;}boardLoading=true;emit();const token=generation;
 unsubBoard=onSnapshot(query(collection(db,'leaderboard'),orderBy('points','desc'),limit(50)),snap=>{
  if(token!==generation)return;rows=snap.docs.map(d=>({id:d.id,...d.data()}));boardLoading=false;lastError='';emit();
 },e=>{boardLoading=false;if(token===generation)fail(e);});
}
async function refreshBoard(){if(!uid)return {ok:false,message:'Skor tablosu için giriş yap.'};attachBoard();return {ok:true,message:'Skor tablosu yenileniyor.'};}
async function enableSync(enabled){
 if(!uid)return {ok:false,message:'Önce giriş yap.'};
 optIn=!!enabled;savePrefs();lastError='';
 if(optIn){attachPrivate();const result=await syncNow();return result;}
 operationEpoch++;if(activeSync)await activeSync.catch(()=>{});operationEpoch++;lastError='';
 unsubPrivate?.();unsubPrivate=null;clearTimeout(syncTimer);dirty=false;statusText='Bulut eşitleme kapalı';emit();return {ok:true,message:'Bulut eşitleme kapatıldı. Cihazındaki kayıt korunuyor.'};
}
async function enableBoard(enabled,name){
 if(!uid)return {ok:false,message:'Önce giriş yap.'};
 if(enabled){if(!validNickname(name))return {ok:false,message:'3–20 karakterlik takma ad kullan. Harf, rakam, boşluk, _ ve - olabilir; e-posta yazma.'};nickname=name.trim();boardOptIn=true;optIn=true;savePrefs();attachPrivate();attachBoard();const result=await syncNow();return {...result,message:result.ok?'Skor tablosun ve bulut eşitlemen açıldı.':result.message};}
 boardOptIn=false;operationEpoch++;savePrefs();unsubBoard?.();unsubBoard=null;if(activeSync)await activeSync.catch(()=>{});
 try{await deleteDoc(boardRef());lastError='';emit();return {ok:true,message:'Takma adın ve skorun listeden kaldırıldı.'};}catch(e){boardOptIn=true;savePrefs();return fail(e);}
}
async function authenticate(mode,email,password){
 if(busy)return {ok:false,message:'Önce devam eden giriş işlemini bekle.'};
 if(!auth)return {ok:false,message:'Önce Firebase bağlantı bilgilerini kaydet.'};
 if(typeof email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())||email.length>254)return {ok:false,message:'Geçerli bir e-posta adresi yaz.'};
 if(typeof password!=='string'||password.length<8||password.length>128)return {ok:false,message:'Şifren 8–128 karakter olmalı.'};
 busy=true;lastError='';emit();
 try{if(mode==='register')await createUserWithEmailAndPassword(auth,email.trim(),password);else await signInWithEmailAndPassword(auth,email.trim(),password);return {ok:true,message:mode==='register'?'Hesabın oluşturuldu. Bulut eşitlemeyi ayrıca açabilirsin.':'Giriş yapıldı.'};}
 catch(e){return fail(e);}finally{busy=false;emit();}
}
async function resetPassword(email){if(!auth)return {ok:false,message:'Önce bağlantıyı yapılandır.'};if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return {ok:false,message:'Önce e-posta alanına adresini yaz.'};try{await sendPasswordResetEmail(auth,email.trim());return {ok:true,message:'Şifre sıfırlama e-postası gönderildi. Gelen ve spam kutunu kontrol et.'};}catch(e){return fail(e);}}
async function logout(){if(!auth)return;try{if(optIn&&dirty&&!offline())await syncNow();unsubPrivate?.();unsubBoard?.();await signOut(auth);return {ok:true,message:'Çıkış yapıldı. Bu cihazdaki çalışma kaydı silinmedi.'};}catch(e){return fail(e);}}
async function removeCloudData(password){
 if(!user||!auth)return {ok:false,message:'Önce giriş yap.'};
 try{if(offline())return {ok:false,message:'Hesap silmek için internet bağlantısı gerekli.'};await reauthenticateWithCredential(user,EmailAuthProvider.credential(user.email,password));optIn=false;boardOptIn=false;operationEpoch++;savePrefs();unsubPrivate?.();unsubBoard?.();clearTimeout(syncTimer);if(activeSync)await activeSync.catch(()=>{});await deleteDoc(privateRef());await deleteDoc(boardRef());await deleteUser(user);return {ok:true,message:'Hesabın, bulut kaydın ve skor tablosu verin silindi. Cihazındaki yerel kayıt duruyor.'};}catch(e){return fail(e);}
}
window.KampCloud={
 init(options){host=options;boot();window.addEventListener('online',()=>{if(optIn){attachPrivate();queueSync(400);}attachBoard();emit();});window.addEventListener('offline',()=>{statusText='Çevrimdışı · cihazda kayıtlı';emit();});window.addEventListener('focus',()=>{if(optIn)queueSync(1000);});},
 configure(value){const c=validConfig(value);if(!c)return {ok:false,message:'apiKey ve projectId gerekli. Web App ID bu sürümde isteğe bağlı; Android App ID’yi bu alana yazma. Servis hesabı anahtarı kullanma.'};config=c;try{localStorage.setItem(CONFIG_KEY,JSON.stringify(c));}catch{return {ok:false,message:'Bağlantı bilgileri cihazda kaydedilemedi.'};}boot();return {ok:true,message:'Firebase bilgileri kaydedildi. Şimdi giriş yapabilirsin.'};},
 async disconnect(){const token=++generation;unsubPrivate?.();unsubBoard?.();if(auth)await signOut(auth).catch(()=>{});if(app)await deleteApp(app).catch(()=>{});app=null;auth=null;db=null;user=null;uid=null;optIn=false;boardOptIn=false;config={...DEFAULT_CONFIG};rows=[];lastError='';localStorage.removeItem(CONFIG_KEY);boot();return {ok:true,message:'Oturum kapatıldı ve varsayılan sinavkam ayarlarına dönüldü. Bulut kaydı silinmedi.'};},
 changed(){queueSync();},
 syncNow,enableSync,enableBoard,refreshBoard,authenticate,resetPassword,logout,removeCloudData,
 validNickname,
 getState(){return {configured:!!config,config,uid,email:user?.email||'',syncEnabled:optIn,boardEnabled:boardOptIn,nickname,status:statusText,error:lastError,lastSync,busy,syncing,rows,boardLoading,online:!offline()};}
};
