/* Production precache is injected by scripts/build-web.mjs. */
const CACHE='sinav-kampi-v1.1.0';
const ASSETS=[...["app.js","cloud-ui.js","content.js","core.js","data.js","firebase.js","fonts/dm-sans-400-latin-ext.woff2","fonts/dm-sans-400-latin.woff2","fonts/dm-sans-500-latin-ext.woff2","fonts/dm-sans-500-latin.woff2","fonts/dm-sans-600-latin-ext.woff2","fonts/dm-sans-600-latin.woff2","fonts/dm-sans-700-latin-ext.woff2","fonts/dm-sans-700-latin.woff2","fonts/manrope-500-latin-ext.woff2","fonts/manrope-500-latin.woff2","fonts/manrope-600-latin-ext.woff2","fonts/manrope-600-latin.woff2","fonts/manrope-700-latin-ext.woff2","fonts/manrope-700-latin.woff2","fonts/manrope-800-latin-ext.woff2","fonts/manrope-800-latin.woff2","icon-192.png","icon-512.png","icon.svg","index.html","manifest.webmanifest","pdfs/arapca-not.pdf","pdfs/din-not.pdf","pdfs/fen-not.pdf","pdfs/ingilizce-not.pdf","pdfs/kuran-not.pdf","pdfs/matematik-deneme.pdf","pdfs/matematik-not.pdf","pdfs/robotik-not.pdf","pdfs/secingilizce-not.pdf","pdfs/sinav-takvimi.pdf","pdfs/siyer-not.pdf","pdfs/sosyal-deneme.pdf","pdfs/sosyal-not.pdf","pdfs/tdb-not.pdf","pdfs/turkce-not.pdf","style.css"],'./','index.html','style.css','data.js','core.js','content.js','app.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);self.__precacheDone=0;self.__precacheTotal=new Set(ASSETS).size;
 await Promise.all([...new Set(ASSETS)].map(async url=>{
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
  try{const response=await fetch(url,{cache:'reload',signal:controller.signal});if(!response.ok)throw new Error(url+' HTTP '+response.status);await cache.put(url,response);self.__precacheDone++;}
  finally{clearTimeout(timer);}
 }));
 await self.skipWaiting();
})().catch(e=>{self.__installError=String(e);console.error('Sınav Kampı precache failed',e);throw e;}));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sinav-kampi-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(hit=>hit||(event.request.mode==='navigate'?caches.match('index.html'):Response.error()))));});
