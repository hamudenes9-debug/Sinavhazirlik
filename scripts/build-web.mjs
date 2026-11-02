import { cp, mkdir, rm, readdir, copyFile } from 'node:fs/promises';
const target='app/src/main/assets/www';
await rm(target,{recursive:true,force:true}); await mkdir(target,{recursive:true});
await cp('web',target,{recursive:true});
for(const [font,weights] of [['dm-sans',[400,500,600,700]],['manrope',[500,600,700,800]]]){
 await mkdir(`${target}/fonts`,{recursive:true});
 for(const w of weights)await copyFile(`node_modules/@fontsource/${font}/files/${font}-latin-ext-${w}-normal.woff2`,`${target}/fonts/${font}-${w}.woff2`).catch(()=>copyFile(`node_modules/@fontsource/${font}/files/${font}-latin-${w}-normal.woff2`,`${target}/fonts/${font}-${w}.woff2`));
}
console.log('Offline web assets ready.');
const files=[];async function walk(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())await walk(pathjoin(dir,e.name),p+'/');else if(e.name!=='sw.js')files.push(p);}}
import {join as pathjoin} from 'node:path';await walk(target);
const sw=await import('node:fs/promises').then(m=>m.readFile(target+'/sw.js','utf8'));
await import('node:fs/promises').then(m=>m.writeFile(target+'/sw.js',sw.replace('sinav-kampi-v1','sinav-kampi-v1.0.0').replace("const ASSETS=[","const ASSETS=[..."+JSON.stringify(files)+",").replace("];\nself.addEventListener('install'"," ];\nself.addEventListener('install'")));
