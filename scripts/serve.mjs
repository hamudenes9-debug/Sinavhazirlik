import http from 'node:http';import { readFile,stat } from 'node:fs/promises';import path from 'node:path';
const root=path.resolve('app/src/main/assets/www');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.pdf':'application/pdf','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 try{
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname.endsWith('/'))pathname+='index.html';
  if(pathname==='/api/groq'&&req.method==='POST'){
   let raw='';for await(const chunk of req)raw+=chunk;
   let key=process.env.GROQ_API_KEY||'';
   if(!key){try{key=(await readFile('web/ai-config.js','utf8')).match(/key:\s*'([^']+)'/)?.[1]||'';}catch{}}
   if(!key){res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'no-key'}));return;}
   let payload={};try{payload=JSON.parse(raw||'{}');}catch{}
   const model=payload.model||process.env.GROQ_MODEL||'llama-3.3-70b-versatile';
   let upstream,text='';
   try{
    upstream=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+key},body:JSON.stringify({model,messages:payload.messages||[],max_tokens:payload.max_tokens||240,temperature:0.5,top_p:0.9})});
    text=await upstream.text();
   }catch{
    res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'network'}));return;
   }
   res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});
   if(!upstream.ok){res.end(JSON.stringify({error:'groq-'+upstream.status,detail:text.slice(0,300)}));return;}
   let out={};try{out=JSON.parse(text);}catch{}
   res.end(JSON.stringify({text:out.choices?.[0]?.message?.content||''}));
   return;
  }
  if(pathname==='/ai-config.js'&&process.env.GROQ_API_KEY){
   res.writeHead(200,{'Content-Type':'application/javascript','Cache-Control':'no-cache'});
   res.end(`window.KAMP_AI_CONFIG=${JSON.stringify({key:process.env.GROQ_API_KEY,proxy:process.env.GROQ_PROXY_URL||'',model:process.env.GROQ_MODEL||'llama-3.3-70b-versatile'})};`);
   return;
  }
  const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep))throw Error('Invalid path');
  let data=await readFile(file);
  if(pathname==='/sw.js')data=Buffer.from((await readFile(file,'utf8')).replace('sinav-kampi-v1','sinav-kampi-dev-'+Date.now()));
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Sınav Kampı ready on port '+(process.env.PORT||3000)));
