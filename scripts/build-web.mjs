import {cp,mkdir,rm,readdir,copyFile,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {build} from 'esbuild';
const target='app/src/main/assets/www';
await build({entryPoints:['src/cloud.js'],bundle:true,minify:true,format:'iife',target:['chrome90'],outfile:'web/firebase.js',legalComments:'inline'});
await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});await cp('web',target,{recursive:true});
// Groq anahtarı depoya yazılmaz: yalnızca derleme ortamından APK paketine gömülür.
const aiKey=process.env.GROQ_API_KEY||'', aiProxy=process.env.GROQ_PROXY_URL||'';
if(aiKey||aiProxy){
 await writeFile(target+'/ai-config.js',`window.KAMP_AI_CONFIG=${JSON.stringify({key:aiKey,proxy:aiProxy,model:process.env.GROQ_MODEL||'llama-3.3-70b-versatile'})};\n`);
 console.log('Groq bağlantısı pakete eklendi'+(aiProxy?' (proxy üzerinden)':'')+'.');
}
for(const [font,weights] of [['dm-sans',[400,500,600,700]],['manrope',[500,600,700,800]]]){
 await mkdir(`${target}/fonts`,{recursive:true});
 for(const weight of weights)for(const subset of ['latin','latin-ext']){
  const file=`${font}-${subset}-${weight}-normal.woff2`;
  await copyFile(`node_modules/@fontsource/${font}/files/${file}`,`${target}/fonts/${font}-${weight}-${subset}.woff2`);
 }
}
// Latin and extended Latin are separate files: Turkish glyphs must work offline too.
let css=await readFile('web/style.css','utf8');
css=css.replace(/@font-face\{[^}]*\}/g,'');
let faces='';for(const [font,family,weights] of [['dm-sans','DM Sans',[400,500,600,700]],['manrope','Manrope',[500,600,700,800]]])for(const weight of weights)for(const subset of ['latin','latin-ext'])faces+=`@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};src:url('fonts/${font}-${weight}-${subset}.woff2') format('woff2');font-display:swap;unicode-range:${subset==='latin'?'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD':'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'};}\n`;
await writeFile(target+'/style.css',faces+css);
const files=[];async function walk(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())await walk(join(dir,e.name),p+'/');else if(e.name!=='sw.js')files.push(p);}}
await walk(target);
const sw=(await readFile(target+'/sw.js','utf8')).replace('sinav-kampi-v1','sinav-kampi-v1.6.0').replace('const ASSETS=[','const ASSETS=[...'+JSON.stringify(files)+',');
await writeFile(target+'/sw.js',sw);
console.log('Offline web assets and bundled Firebase SDK ready.');
