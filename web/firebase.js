(()=>{var Zp=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tC=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Jy=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=n[t++],a=n[t++],u=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},nC={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let i=n[s],a=s+1<n.length,u=a?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,h=i>>2,f=(i&3)<<4|u>>4,C=(u&15)<<2|l>>6,_=l&63;c||(_=64,a||(C=64)),r.push(t[h],t[f],t[C],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(tC(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Jy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||l==null||f==null)throw new jc;let C=i<<2|u>>4;if(r.push(C),l!==64){let _=u<<4&240|l>>2;if(r.push(_),f!==64){let D=l<<6&192|f;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},jc=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},zy=function(n){let e=tC(n);return nC.encodeByteArray(e,!0)},pi=function(n){return zy(n).replace(/\./g,"")},Xa=function(n){try{return nC.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wy=()=>rC().__FIREBASE_DEFAULTS__,Qy=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},$y=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Xa(n[1]);return e&&JSON.parse(e)},Za=()=>{try{return Zp()||Wy()||Qy()||$y()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jc=n=>{var e,t;return(t=(e=Za())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},sC=n=>{let e=Jc(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},zc=()=>{var n;return(n=Za())==null?void 0:n.config},Wc=n=>{var e;return(e=Za())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rs=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iC(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[pi(JSON.stringify(t)),pi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function aC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function Yy(){var e;let n=(e=Za())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function oC(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uC(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function cC(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function lC(){let n=He();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function BC(){return!Yy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Qc(){try{return typeof indexedDB=="object"}catch{return!1}}function hC(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xy="FirebaseError",mt=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Xy,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,an.prototype.create)}},an=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Zy(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new mt(s,u,r)}};function Zy(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}let a=n.substring(s+2,i),u=e[a];r+=n.substring(t,s)+(u!=null?String(u):`<${a}?>`),t=i+1}return r}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dC(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let i=n[s],a=e[s];if(eC(i)&&eC(a)){if(!Gt(i,a))return!1}else if(i!==a)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function eC(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function is(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function as(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fC(n,e){let t=new Kc(n,e);return t.subscribe.bind(t)}var Kc=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");eD(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=qc),s.error===void 0&&(s.error=qc),s.complete===void 0&&(s.complete=qc);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function eD(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function qc(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ab=14400*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function eo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rt=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $c=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new rs;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nD(e))try{this.getOrInitializeService({instanceIdentifier:hr})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=hr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=hr){return this.instances.has(e)}getOptions(e=hr){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[i,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:tD(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=hr){return this.component?this.component.multipleInstances?e:hr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function tD(n){return n===hr?void 0:n}function nD(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var to=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new $c(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rD=[],ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));var sD={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},iD=ae.INFO,aD={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},oD=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=aD[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Fn=class{constructor(e){this.name=e,this._logLevel=iD,this._logHandler=oD,this._userLogHandler=null,rD.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sD[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}};var uD=(n,e)=>e.some(t=>n instanceof t),pC,CC;function cD(){return pC||(pC=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lD(){return CC||(CC=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var gC=new WeakMap,Xc=new WeakMap,mC=new WeakMap,Yc=new WeakMap,el=new WeakMap;function BD(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(zt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&gC.set(t,n)}).catch(()=>{}),el.set(e,n),e}function hD(n){if(Xc.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Xc.set(n,e)}var Zc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||mC.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function EC(n){Zc=n(Zc)}function dD(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(no(this),e,...t);return mC.set(r,e.sort?e.sort():[e]),zt(r)}:lD().includes(n)?function(...e){return n.apply(no(this),e),zt(gC.get(this))}:function(...e){return zt(n.apply(no(this),e))}}function fD(n){return typeof n=="function"?dD(n):(n instanceof IDBTransaction&&hD(n),uD(n,cD())?new Proxy(n,Zc):n)}function zt(n){if(n instanceof IDBRequest)return BD(n);if(Yc.has(n))return Yc.get(n);let e=fD(n);return e!==n&&(Yc.set(n,e),el.set(e,n)),e}var no=n=>el.get(n);function yC(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){let a=indexedDB.open(n,e),u=zt(a);return r&&a.addEventListener("upgradeneeded",c=>{r(zt(a.result),c.oldVersion,c.newVersion,zt(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),u}var pD=["get","getKey","getAll","getAllKeys","count"],CD=["put","add","delete","clear"],tl=new Map;function _C(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(tl.get(e))return tl.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=CD.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||pD.includes(t)))return;let i=async function(a,...u){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(u.shift())),(await Promise.all([l[t](...u),s&&c.done]))[0]};return tl.set(e,i),i}EC(n=>({...n,get:(e,t,r)=>_C(e,t)||n.get(e,t,r),has:(e,t)=>!!_C(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rl=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(gD(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function gD(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var sl="@firebase/app",DC="0.16.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var un=new Fn("@firebase/app"),mD="@firebase/app-compat",ED="@firebase/analytics-compat",_D="@firebase/analytics",yD="@firebase/app-check-compat",DD="@firebase/app-check",wD="@firebase/auth",ID="@firebase/auth-compat",TD="@firebase/database",AD="@firebase/data-connect",vD="@firebase/database-compat",bD="@firebase/functions",SD="@firebase/functions-compat",RD="@firebase/installations",PD="@firebase/installations-compat",ND="@firebase/messaging",OD="@firebase/messaging-compat",FD="@firebase/performance",kD="@firebase/performance-compat",LD="@firebase/remote-config",xD="@firebase/remote-config-compat",VD="@firebase/storage",MD="@firebase/storage-compat",GD="@firebase/firestore",UD="@firebase/ai",HD="@firebase/firestore-compat",qD="firebase",jD="12.19.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var il="[DEFAULT]",KD={[sl]:"fire-core",[mD]:"fire-core-compat",[_D]:"fire-analytics",[ED]:"fire-analytics-compat",[DD]:"fire-app-check",[yD]:"fire-app-check-compat",[wD]:"fire-auth",[ID]:"fire-auth-compat",[TD]:"fire-rtdb",[AD]:"fire-data-connect",[vD]:"fire-rtdb-compat",[bD]:"fire-fn",[SD]:"fire-fn-compat",[RD]:"fire-iid",[PD]:"fire-iid-compat",[ND]:"fire-fcm",[OD]:"fire-fcm-compat",[FD]:"fire-perf",[kD]:"fire-perf-compat",[LD]:"fire-rc",[xD]:"fire-rc-compat",[VD]:"fire-gcs",[MD]:"fire-gcs-compat",[GD]:"fire-fst",[HD]:"fire-fst-compat",[UD]:"fire-vertex","fire-js":"fire-js",[qD]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var os=new Map,al=new Map,ol=new Map;function wC(n,e){try{n.container.addComponent(e)}catch(t){un.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function kn(n){let e=n.name;if(ol.has(e))return un.debug(`There were multiple attempts to register component ${e}.`),!1;ol.set(e,n);for(let t of os.values())wC(t,n);for(let t of al.values())wC(t,n);return!0}function gi(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ye(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var JD={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},on=new an("app","Firebase",JD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ul=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw on.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ln=jD;function Bl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:il,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw on.create("bad-app-name",{appName:String(s)});if(t||(t=zc()),!t)throw on.create("no-options");let i=os.get(s);if(i)if(Gt(t,i.options)){if(Gt(r,i.config))return i;throw on.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw on.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let a=new to(s);for(let c of ol.values())a.addComponent(c);let u=new ul(t,r,a);return os.set(s,u),u}function ro(n=il){let e=os.get(n);if(!e&&n===il&&zc())return Bl();if(!e)throw on.create("no-app",{appName:n});return e}async function hl(n){let e=!1,t=n.name;os.has(t)?(e=!0,os.delete(t)):al.has(t)&&n.decRefCount()<=0&&(al.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(r=>r.delete())),n.isDeleted=!0)}function Ut(n,e,t){let r=KD[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),un.warn(a.join(" "));return}kn(new Rt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zD="firebase-heartbeat-database",WD=1,Ci="firebase-heartbeat-store",nl=null;function vC(){return nl||(nl=yC(zD,WD,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ci)}catch(t){console.warn(t)}}}}).catch(n=>{throw on.create("idb-open",{originalErrorMessage:n.message})})),nl}async function QD(n){try{let t=(await vC()).transaction(Ci),r=await t.objectStore(Ci).get(bC(n));return await t.done,r}catch(e){if(e instanceof mt)un.warn(e.message);else{let t=on.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});un.warn(t.message)}}}async function IC(n,e){try{let r=(await vC()).transaction(Ci,"readwrite");await r.objectStore(Ci).put(e,bC(n)),await r.done}catch(t){if(t instanceof mt)un.warn(t.message);else{let r=on.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});un.warn(r.message)}}}function bC(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $D=1024,YD=30,cl=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ll(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=TC();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>YD){let a=ZD(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){un.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=TC(),{heartbeatsToSend:r,unsentEntries:s}=XD(this._heartbeatsCache.heartbeats),i=pi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return un.warn(t),""}}};function TC(){return new Date().toISOString().substring(0,10)}function XD(n,e=$D){let t=[],r=n.slice();for(let s of n){let i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),AC(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),AC(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var ll=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qc()?hC().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await QD(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return IC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return IC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function AC(n){return pi(JSON.stringify({version:2,heartbeats:n})).length}function ZD(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(n){kn(new Rt("platform-logger",e=>new rl(e),"PRIVATE")),kn(new Rt("heartbeat",e=>new cl(e),"PRIVATE")),Ut(sl,DC,n),Ut(sl,DC,"esm2020"),Ut("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ew("");var tw="firebase",nw="12.19.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(tw,nw,"app");var so={apiKey:"AIzaSyB253AtePagVhGLnEC-wNNpwB3yhtiQ6Y4",authDomain:"sinavkam.firebaseapp.com",projectId:"sinavkam",storageBucket:"sinavkam.firebasestorage.app",messagingSenderId:"547780044422"};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WC(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var QC=WC,$C=new an("auth","Firebase",WC());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ho=new Fn("@firebase/auth");function ao(n,...e){ho.logLevel<=ae.WARN&&ho.warn(`Auth (${Ln}): ${n}`,...e)}function oo(n,...e){ho.logLevel<=ae.ERROR&&ho.error(`Auth (${Ln}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n,...e){throw kl(n,...e)}function Ht(n,...e){return kl(n,...e)}function Lo(n,e,t){let r={...QC(),[e]:t};return new an("auth","Firebase",r).create(e,{appName:n.name})}function Qt(n){return Lo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function YC(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Pt(n,"argument-error"),Lo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function kl(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return $C.create(n,...e)}function W(n,e,...t){if(!n)throw kl(e,...t)}function Wt(n){let e="INTERNAL ASSERTION FAILED: "+n;throw oo(e),new Error(e)}function ln(n,e){n||Wt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ml(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function rw(){return SC()==="http:"||SC()==="https:"}function SC(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rw()||uC()||"connection"in navigator)?navigator.onLine:!0}function iw(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fr=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ln(t>e,"Short delay should be less than long delay!"),this.isMobile=aC()||cC()}get(){return sw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(n,e){ln(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fo=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Wt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Wt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Wt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var aw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ow=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],uw=new fr(3e4,6e4);function be(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ze(n,e,t,r,s={}){return XC(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});let u=ss({...a,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let l={method:e,headers:c,...i};return oC()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Br(n.emulatorConfig.host)&&(l.credentials="include"),fo.fetch()(await ZC(n,n.config.apiHost,t,u),l)})}async function XC(n,e,t){n._canInitEmulator=!1;let r={...aw,...e};try{let s=new El(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let a=await i.json();if("needConfirmation"in a)throw Ei(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{let u=i.ok?a.errorMessage:a.error.message,[c,l]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ei(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Ei(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Ei(n,"user-disabled",a);let h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Lo(n,h,l);Pt(n,h)}}catch(s){if(s instanceof mt)throw s;Pt(n,"network-request-failed",{message:String(s)})}}async function Mn(n,e,t,r,s={}){let i=await ze(n,e,t,r,s);return"mfaPendingCredential"in i&&Pt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function ZC(n,e,t,r){let s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Ll(n.config,s):`${n.config.apiScheme}://${s}`;return ow.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function cw(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var El=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ht(this.auth,"network-request-failed")),uw.get())})}};function Ei(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=Ht(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RC(n){return n!==void 0&&n.enterprise!==void 0}var po=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return cw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eg(n,e){return ze(n,"GET","/v2/recaptchaConfig",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lw(n,e){return ze(n,"POST","/v1/accounts:delete",e)}async function Co(n,e){return ze(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tg(n,e=!1){let t=de(n),r=await t.getIdToken(e),s=xl(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:_i(dl(s.auth_time)),issuedAtTime:_i(dl(s.iat)),expirationTime:_i(dl(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function dl(n){return Number(n)*1e3}function xl(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return oo("JWT malformed, contained fewer than 3 sections"),null;try{let s=Xa(t);return s?JSON.parse(s):(oo("Failed to decode base64 JWT payload"),null)}catch(s){return oo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function PC(n){let e=xl(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof mt&&Bw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Bw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _l=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ti=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=_i(this.lastLoginAt),this.creationTime=_i(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(n){var f;let e=n.auth,t=await n.getIdToken(),r=await Ii(n,Co(e,{idToken:t}));W(r==null?void 0:r.users.length,e,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let i=(f=s.providerUserInfo)!=null&&f.length?rg(s.providerUserInfo):[],a=hw(n.providerData,i),u=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),l=u?c:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ti(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function ng(n){let e=de(n);await go(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function rg(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dw(n,e){let t=await XC(n,{},async()=>{let r=ss({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await ZC(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:u,body:r};return n.emulatorConfig&&Br(n.emulatorConfig.host)&&(c.credentials="include"),fo.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function fw(n,e){return ze(n,"POST","/v2/accounts:revokeToken",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yi=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):PC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");let t=PC(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:i}=await dw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new n;return r&&(W(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Wt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Vn=class n{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new _l(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ti(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Ii(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return tg(this,e)}reload(){return ng(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await go(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(Qt(this.auth));let e=await this.getIdToken();return await Ii(this,lw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:f,emailVerified:C,isAnonymous:_,providerData:D,stsTokenManager:P}=t;W(f&&P,e,"internal-error");let V=yi.fromJSON(this.name,P);W(typeof f=="string",e,"internal-error"),xn(r,e.name),xn(s,e.name),W(typeof C=="boolean",e,"internal-error"),W(typeof _=="boolean",e,"internal-error"),xn(i,e.name),xn(a,e.name),xn(u,e.name),xn(c,e.name),xn(l,e.name),xn(h,e.name);let q=new n({uid:f,auth:e,email:s,emailVerified:C,displayName:r,isAnonymous:_,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:V,createdAt:l,lastLoginAt:h});return D&&Array.isArray(D)&&(q.providerData=D.map(z=>({...z}))),c&&(q._redirectEventId=c),q}static async _fromIdTokenResponse(e,t,r=!1){let s=new yi;s.updateFromServerResponse(t);let i=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await go(i),i}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];W(s.localId!==void 0,"internal-error");let i=s.providerUserInfo!==void 0?rg(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new yi;u.updateFromIdToken(r);let c=new n({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ti(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,l),c}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var NC=new Map;function cn(n){ln(n instanceof Function,"Expected a class definition");let e=NC.get(n);return e?(ln(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,NC.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mo=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};mo.type="NONE";var yl=mo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(n,e,t){return`firebase:${n}:${e}:${t}`}var Di=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:i}=this.auth;this.fullUserKey=uo(this.userKey,s.apiKey,i),this.fullPersistenceKey=uo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await Co(this.auth,{idToken:e}).catch(()=>{});return t?Vn._fromGetAccountInfoResponse(this.auth,t,e):null}return Vn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(cn(yl),e,r);let s=(await Promise.all(t.map(async l=>{try{if(await l._isAvailable())return l}catch{return}}))).filter(l=>l),i=s[0]||cn(yl),a=uo(r,e.config.apiKey,e.name),u=null;for(let l of t)try{let h=await l._get(a);if(h){let f;if(typeof h=="string"){let C=await Co(e,{idToken:h}).catch(()=>{});if(!C)break;f=await Vn._fromGetAccountInfoResponse(e,C,h)}else f=Vn._fromJSON(e,h);l!==i&&(u=f),i=l;break}}catch{}let c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new n(i,e,r):(i=c[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(a)}catch{}})),new n(i,e,r))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OC(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(og(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(sg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(cg(e))return"Blackberry";if(lg(e))return"Webos";if(ig(e))return"Safari";if((e.includes("chrome/")||ag(e))&&!e.includes("edge/"))return"Chrome";if(ug(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function sg(n=He()){return/firefox\//i.test(n)}function ig(n=He()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ag(n=He()){return/crios\//i.test(n)}function og(n=He()){return/iemobile/i.test(n)}function ug(n=He()){return/android/i.test(n)}function cg(n=He()){return/blackberry/i.test(n)}function lg(n=He()){return/webos/i.test(n)}function Vl(n=He()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function pw(n=He()){var e;return Vl(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Cw(){return lC()&&document.documentMode===10}function Bg(n=He()){return Vl(n)||ug(n)||lg(n)||cg(n)||/windows phone/i.test(n)||og(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg(n,e=[]){let t;switch(n){case"Browser":t=OC(He());break;case"Worker":t=`${OC(He())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ln}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=i=>new Promise((a,u)=>{try{let c=e(i);a(c)}catch(c){u(c)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gw(n,e={}){return ze(n,"GET","/v2/passwordPolicy",be(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mw=6,wl=class{constructor(e){var r;let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??mw,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Il=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Eo(this),this.idTokenSubscription=new Eo(this),this.beforeStateQueue=new Dl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$C,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=cn(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted){try{this.persistenceManager=await Di.create(this,e)}catch(a){ao(`Failed to initialize persistence: ${a}`),this.persistenceManager=await Di.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(a){ao(`Failed to initialize current user: ${a}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Co(this,{idToken:e}),r=await Vn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ye(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(i=this.redirectUser)==null?void 0:i._redirectEventId,u=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===u)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await go(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=iw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(Qt(this));let t=e?de(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(Qt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(Qt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(cn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await gw(this),t=new wl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new an("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await fw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&cn(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Di.create(this,[cn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let i=typeof t=="function"?t:t.next.bind(t),a=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,r,s);return()=>{a=!0,c()}}else{let c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=(t==null?void 0:t.message)||String(t),s=Lo(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=hg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&ao(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}};function Et(n){return de(n)}var Eo=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=fC(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ew(n){xo=n}function dg(n){return xo.loadJS(n)}function _w(){return xo.recaptchaEnterpriseScript}function yw(){return xo.gapiScript}function fg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tl=class{constructor(){this.enterprise=new Al}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Al=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dw="recaptcha-enterprise",wi="NO_RECAPTCHA",FC="onFirebaseAuthREInstanceReady",Ai=class n{constructor(e){this.type=Dw,this.auth=Et(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,u)=>{eg(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let l=new po(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,a(l.siteKey)}}).catch(c=>{u(c)})})}function s(i,a,u){let c=window.grecaptcha;RC(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{a(l)}).catch(()=>{a(wi)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Tl().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(async u=>{if(!t&&RC(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,s(u,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=_w();c.length!==0&&(c+=u+`&onload=${FC}`),n.scriptInjectionDeferred=new rs,window[FC]=()=>{var l;(l=n.scriptInjectionDeferred)==null||l.resolve()},dg(c).then(()=>{var l;return(l=n.scriptInjectionDeferred)==null?void 0:l.promise}).then(()=>{s(u,i,a)}).catch(l=>{a(l)})}}).catch(u=>{a(u)})})}};Ai.scriptInjectionDeferred=null;async function mi(n,e,t,r=!1,s=!1){let i=new Ai(n),a;if(s)a=wi;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}let u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){let c=u.phoneEnrollmentInfo.phoneNumber,l=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){let c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function dr(n,e,t,r,s){var i,a;if(s==="EMAIL_PASSWORD_PROVIDER")if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let u=await mi(n,e,t,t==="getOobCode");return r(n,u)}else return r(n,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let c=await mi(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(u)});else if(s==="PHONE_PROVIDER")if((a=n._getRecaptchaConfig())!=null&&a.isProviderEnabled("PHONE_PROVIDER")){let u=await mi(n,e,t);return r(n,u).catch(async c=>{var l;if(((l=n._getRecaptchaConfig())==null?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(c.code==="auth/missing-recaptcha-token"||c.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let h=await mi(n,e,t,!1,!0);return r(n,h)}return Promise.reject(c)})}else{let u=await mi(n,e,t,!1,!0);return r(n,u)}else return Promise.reject(s+" provider is not supported.")}async function ww(n){let e=Et(n),t=await eg(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new po(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Ai(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(n,e){let t=gi(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(Gt(i,e??{}))return s;Pt(s,"already-initialized")}return t.initialize({options:e})}function Iw(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(cn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Cg(n,e,t){let r=Et(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!(t!=null&&t.disableWarnings),i=gg(e),{host:a,port:u}=Tw(e),c=u===null?"":`:${u}`,l={url:`${i}//${a}${c}/`},h=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(Gt(l,r.config.emulator)&&Gt(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,Br(a)?eo(`${i}//${a}${c}`):s||Aw()}function gg(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Tw(n){let e=gg(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let i=s[1];return{host:i,port:kC(r.substr(i.length+1))}}else{let[i,a]=r.split(":");return{host:i,port:kC(a)}}}function kC(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Aw(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pr=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Wt("not implemented")}_getIdTokenResponse(e){return Wt("not implemented")}_linkToIdToken(e,t){return Wt("not implemented")}_getReauthenticationResolver(e){return Wt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vw(n,e){return ze(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bw(n,e){return Mn(n,"POST","/v1/accounts:signInWithPassword",be(n,e))}async function Sw(n,e){return ze(n,"POST","/v1/accounts:sendOobCode",be(n,e))}async function Rw(n,e){return Sw(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pw(n,e){return Mn(n,"POST","/v1/accounts:signInWithEmailLink",be(n,e))}async function Nw(n,e){return Mn(n,"POST","/v1/accounts:signInWithEmailLink",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vi=class n extends pr{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dr(e,t,"signInWithPassword",bw,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Pw(e,{email:this._email,oobCode:this._password});default:Pt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return dr(e,r,"signUpPassword",vw,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Nw(e,{idToken:t,email:this._email,oobCode:this._password});default:Pt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function us(n,e){return Mn(n,"POST","/v1/accounts:signInWithIdp",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ow="http://localhost",Cr=class n extends pr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;let a=new n(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return us(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,us(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,us(e,t)}buildRequest(){let e={requestUri:Ow,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ss(t)}return e}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LC(n,e){return ze(n,"POST","/v1/accounts:sendVerificationCode",be(n,e))}async function Fw(n,e){return Mn(n,"POST","/v1/accounts:signInWithPhoneNumber",be(n,e))}async function kw(n,e){let t=await Mn(n,"POST","/v1/accounts:signInWithPhoneNumber",be(n,e));if(t.temporaryProof)throw Ei(n,"account-exists-with-different-credential",t);return t}var Lw={USER_NOT_FOUND:"user-not-found"};async function xw(n,e){let t={...e,operation:"REAUTH"};return Mn(n,"POST","/v1/accounts:signInWithPhoneNumber",be(n,t),Lw)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bi=class n extends pr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Fw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return kw(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return xw(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Mw(n){let e=is(as(n)).link,t=e?is(as(e)).deep_link_id:null,r=is(as(n)).deep_link_id;return(r?is(as(r)).link:null)||r||t||e||n}var _o=class n{constructor(e){let t=is(as(e)),r=t.apiKey??null,s=t.oobCode??null,i=Vw(t.mode??null);W(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=Mw(e);try{return new n(t)}catch{return null}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return vi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=_o.parseLink(t);return W(r,"argument-error"),vi._fromEmailAndCode(e,r.code,r.tenantId)}};Bn.PROVIDER_ID="password";Bn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Bn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cs=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gr=class extends cs{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Si=class n extends gr{constructor(){super("facebook.com")}static credential(e){return Cr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Si.FACEBOOK_SIGN_IN_METHOD="facebook.com";Si.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mr=class n extends gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Cr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};mr.GOOGLE_SIGN_IN_METHOD="google.com";mr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Er=class n extends gr{constructor(){super("github.com")}static credential(e){return Cr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Er.GITHUB_SIGN_IN_METHOD="github.com";Er.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ri=class n extends gr{constructor(){super("twitter.com")}static credential(e,t){return Cr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Ri.TWITTER_SIGN_IN_METHOD="twitter.com";Ri.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gw(n,e){return Mn(n,"POST","/v1/accounts:signUp",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ls=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let i=await Vn._fromIdTokenResponse(e,r,s),a=xC(r);return new n({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=xC(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function xC(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vl=class n extends mt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function mg(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?vl._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uw(n,e,t=!1){let r=await Ii(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ls._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eg(n,e,t=!1){let{auth:r}=n;if(Ye(r.app))return Promise.reject(Qt(r));let s="reauthenticate";try{let i=await Ii(n,mg(r,s,e,n),t);W(i.idToken,r,"internal-error");let a=xl(i.idToken);W(a,r,"internal-error");let{sub:u}=a;return W(n.uid===u,r,"user-mismatch"),ls._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Pt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _g(n,e,t=!1){if(Ye(n.app))return Promise.reject(Qt(n));let r="signIn",s=await mg(n,r,e),i=await ls._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function yg(n,e){return _g(Et(n),e)}async function Ml(n,e){return Eg(de(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(n,e,t){var r;W(((r=t.url)==null?void 0:r.length)>0,n,"invalid-continue-uri"),W(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),W(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(W(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(W(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dg(n){let e=Et(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Gl(n,e,t){let r=Et(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Hw(r,s,t),await dr(r,s,"getOobCode",Rw,"EMAIL_PASSWORD_PROVIDER")}async function Ul(n,e,t){if(Ye(n.app))return Promise.reject(Qt(n));let r=Et(n),a=await dr(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Gw,"EMAIL_PASSWORD_PROVIDER").catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Dg(n),c}),u=await ls._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}function Hl(n,e,t){return Ye(n.app)?Promise.reject(Qt(n)):yg(de(n),Bn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Dg(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(n,e){return de(n).setPersistence(e)}function wg(n,e,t,r){return de(n).onIdTokenChanged(e,t,r)}function Ig(n,e,t){return de(n).beforeAuthStateChanged(e,t)}function jl(n,e,t,r){return de(n).onAuthStateChanged(e,t,r)}function Vo(n){return de(n).signOut()}async function Kl(n){return de(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VC(n,e){return ze(n,"POST","/v2/accounts/mfaEnrollment:start",be(n,e))}function qw(n,e){return ze(n,"POST","/v2/accounts/mfaEnrollment:finalize",be(n,e))}function jw(n,e){return ze(n,"POST","/v2/accounts/mfaEnrollment:start",be(n,e))}function Kw(n,e){return ze(n,"POST","/v2/accounts/mfaEnrollment:finalize",be(n,e))}var yo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Do=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(yo,"1"),this.storage.removeItem(yo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jw=1e3,zw=10,wo=class extends Do{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Bg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,c)=>{this.notifyListeners(a,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Cw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,zw):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Jw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};wo.type="LOCAL";var Mo=wo;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ww=1e3;function fl(n){var r;let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return((r=document.cookie.match(t))==null?void 0:r[1])??null}function pl(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var bl=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=pl(e);if(window.cookieStore){let r=await window.cookieStore.get(t);return r==null?void 0:r.value}return fl(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=pl(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=pl(e);if(window.cookieStore){let u=(l=>{let h=l.changed.find(C=>C.name===r);h&&t(h.value),l.deleted.find(C=>C.name===r)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",u);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",u)}let s=fl(r),i=setInterval(()=>{let u=fl(r);u!==s&&(t(u),s=u)},Ww),a=()=>clearInterval(i);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};bl.type="COOKIE";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Io=class extends Do{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Io.type="SESSION";var Jl=Io;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var To=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let u=Array.from(a).map(async l=>l(t.origin,i)),c=await Qw(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};To.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sl=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,c)=>{let l=zl("",20);s.port1.start();let h=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(f){let C=f;if(C.data.eventId===l)switch(C.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(C.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(){return window}function $w(n){$t().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tg(){return typeof $t().WorkerGlobalScope<"u"&&typeof $t().importScripts=="function"}async function Yw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Zw(){return Tg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ag="firebaseLocalStorageDb",eI=1,Ao="firebaseLocalStorage",vg="fbase_key",_r=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Go(n,e){return n.transaction([Ao],e?"readwrite":"readonly").objectStore(Ao)}function tI(){let n=indexedDB.deleteDatabase(Ag);return new _r(n).toPromise()}function bg(){let n=indexedDB.open(Ag,eI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Ao,{keyPath:vg})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Ao)?e(r):(r.close(),await tI(),e(await bg()))})})}async function MC(n,e,t){let r=Go(n,!0).put({[vg]:e,value:t});return new _r(r).toPromise()}async function nI(n,e){let t=Go(n,!1).get(e),r=await new _r(t).toPromise();return r===void 0?null:r.value}function GC(n,e){let t=Go(n,!0).delete(e);return new _r(t).toPromise()}var rI=800,sI=3,vo=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=bg(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>sI)throw r;if(this.dbPromise){let s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return Tg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=To._getInstance(Zw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Yw(),!this.activeServiceWorker)return;this.sender=new Sl(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await MC(e,yo,"1"),await GC(e,yo)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>MC(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>nI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>GC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let i=Go(s,!1).getAll();return new _r(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||ao(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};vo.type="LOCAL";var Sg=vo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UC(n,e){return ze(n,"POST","/v2/accounts/mfaSignIn:start",be(n,e))}function iI(n,e){return ze(n,"POST","/v2/accounts/mfaSignIn:finalize",be(n,e))}function aI(n,e){return ze(n,"POST","/v2/accounts/mfaSignIn:finalize",be(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ob=fg("rcb"),Fb=new fr(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var co="recaptcha";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oI(n,e,t){var r;if(!n._getRecaptchaConfig())try{await ww(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let i=s.session;if("phoneNumber"in s){W(i.type==="enroll",n,"internal-error");let a={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await dr(n,a,"mfaSmsEnrollment",async(h,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===wi){W((t==null?void 0:t.type)===co,h,"argument-error");let C=await Cl(h,f,t);return VC(h,C)}return VC(h,f)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneSessionInfo.sessionInfo}else{W(i.type==="signin",n,"internal-error");let a=((r=s.multiFactorHint)==null?void 0:r.uid)||s.multiFactorUid;W(a,n,"missing-multi-factor-info");let u={mfaPendingCredential:i.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await dr(n,u,"mfaSmsSignIn",async(f,C)=>{if(C.phoneSignInInfo.captchaResponse===wi){W((t==null?void 0:t.type)===co,f,"argument-error");let _=await Cl(f,C,t);return UC(f,_)}return UC(f,C)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{let i={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await dr(n,i,"sendVerificationCode",async(l,h)=>{if(h.captchaResponse===wi){W((t==null?void 0:t.type)===co,l,"argument-error");let f=await Cl(l,h,t);return LC(l,f)}return LC(l,h)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t==null||t._reset()}}async function Cl(n,e,t){W(t.type===co,n,"argument-error");let r=await t.verify();W(typeof r=="string",n,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,u=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){let i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,u=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:a,recaptchaVersion:u}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Et(e)}verifyPhoneNumber(e,t){return oI(this.auth,e,de(t))}static credential(e,t){return bi._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?bi._fromTokenResponse(t,r):null}};Pi.PROVIDER_ID="phone";Pi.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n,e){return e?cn(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ni=class extends pr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return us(e,this._buildIdpRequest())}_linkToIdToken(e,t){return us(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return us(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function uI(n){return _g(n.auth,new Ni(n),n.bypassAuthState)}function cI(n){let{auth:e,user:t}=n;return W(t,e,"internal-error"),Eg(t,new Ni(n),n.bypassAuthState)}async function lI(n){let{auth:e,user:t}=n;return W(t,e,"internal-error"),Uw(t,new Ni(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bo=class{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uI;case"linkViaPopup":case"linkViaRedirect":return lI;case"reauthViaPopup":case"reauthViaRedirect":return cI;default:Pt(this.auth,"internal-error")}}resolve(e){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var BI=new fr(2e3,1e4);async function Ql(n,e,t){if(Ye(n.app))return Promise.reject(Ht(n,"operation-not-supported-in-this-environment"));let r=Et(n);YC(n,e,cs);let s=Wl(r,t);return new So(r,"signInViaPopup",e,s).executeNotNull()}var So=class n extends bo{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){ln(this.filter.length===1,"Popup operations only handle one event");let e=zl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,BI.get())};e()}};So.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hI="pendingRedirect",lo=new Map,Rl=class extends bo{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=lo.get(this.auth._key());if(!e){try{let r=await dI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}lo.set(this.auth._key(),e)}return this.bypassAuthState||lo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function dI(n,e){let t=Pg(e),r=Rg(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}async function fI(n,e){return Rg(n)._set(Pg(e),"true")}function pI(n,e){lo.set(n._key(),e)}function Rg(n){return cn(n._redirectPersistence)}function Pg(n){return uo(hI,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(n,e,t){return CI(n,e,t)}async function CI(n,e,t){if(Ye(n.app))return Promise.reject(Qt(n));let r=Et(n);YC(n,e,cs),await r._initializationPromise;let s=Wl(r,t);return await fI(s,r),s._openRedirect(r,e,"signInViaRedirect")}async function $l(n,e){return await Et(n)._initializationPromise,Ng(n,e,!1)}async function Ng(n,e,t=!1){if(Ye(n.app))return Promise.reject(Qt(n));let r=Et(n),s=Wl(r,e),a=await new Rl(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gI=600*1e3,Pl=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!mI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Og(e)){let s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ht(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=gI&&this.cachedEventUids.clear(),this.cachedEventUids.has(HC(e))}saveEventToCache(e){this.cachedEventUids.add(HC(e)),this.lastProcessedEventTime=Date.now()}};function HC(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Og({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function mI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Og(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(n,e={}){return ze(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _I=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yI=/^https?/;async function DI(n){if(n.config.emulator)return;let{authorizedDomains:e}=await EI(n);for(let t of e)try{if(wI(t))return}catch{}Pt(n,"unauthorized-domain")}function wI(n){let e=ml(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!yI.test(t))return!1;if(_I.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var II=new fr(3e4,6e4);function qC(){let n=$t().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function TI(n){return new Promise((e,t)=>{var s,i,a;function r(){qC(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qC(),t(Ht(n,"network-request-failed"))},timeout:II.get()})}if((i=(s=$t().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=$t().gapi)!=null&&a.load)r();else{let u=fg("iframefcb");return $t()[u]=()=>{gapi.load?r():t(Ht(n,"network-request-failed"))},dg(`${yw()}?onload=${u}`).catch(c=>t(c))}}).catch(e=>{throw Bo=null,e})}var Bo=null;function AI(n){return Bo=Bo||TI(n),Bo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vI=new fr(5e3,15e3),bI="__/auth/iframe",SI="emulator/auth/iframe",RI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},PI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function NI(n){let e=n.config;W(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Ll(e,SI):`https://${n.config.authDomain}/${bI}`,r={apiKey:e.apiKey,appName:n.name,v:Ln},s=PI.get(n.config.apiHost);s&&(r.eid=s);let i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ss(r).slice(1)}`}async function OI(n){let e=await AI(n),t=$t().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:NI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:RI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});let a=Ht(n,"network-request-failed"),u=$t().setTimeout(()=>{i(a)},vI.get());function c(){$t().clearTimeout(u),s(r)}r.ping(c).then(c,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var FI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kI=500,LI=600,xI="_blank",VI="http://localhost",Ro=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function MI(n,e,t,r=kI,s=LI){let i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),u="",c={...FI,width:r.toString(),height:s.toString(),top:i,left:a},l=He().toLowerCase();t&&(u=ag(l)?xI:t),sg(l)&&(e=e||VI,c.scrollbars="yes");let h=Object.entries(c).reduce((C,[_,D])=>`${C}${_}=${D},`,"");if(pw(l)&&u!=="_self")return GI(e||"",u),new Ro(null);let f=window.open(e||"",u,h);W(f,n,"popup-blocked");try{f.focus()}catch{}return new Ro(f)}function GI(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var UI="__/auth/handler",HI="emulator/auth/handler",qI=encodeURIComponent("fac");async function jC(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ln,eventId:s};if(e instanceof cs){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",dC(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[h,f]of Object.entries(i||{}))a[h]=f}if(e instanceof gr){let h=e.getScopes().filter(f=>f!=="");h.length>0&&(a.scopes=h.join(","))}n.tenantId&&(a.tid=n.tenantId);let u=a;for(let h of Object.keys(u))u[h]===void 0&&delete u[h];let c=await n._getAppCheckToken(),l=c?`#${qI}=${encodeURIComponent(c)}`:"";return`${jI(n)}?${ss(u).slice(1)}${l}`}function jI({config:n}){return n.emulator?Ll(n,HI):`https://${n.authDomain}/${UI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gl="webStorageSupport",Nl=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jl,this._completeRedirectFn=Ng,this._overrideRedirectResult=pI}async _openPopup(e,t,r,s){var a;ln((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");let i=await jC(e,t,r,ml(),s);return MI(e,i,zl())}async _openRedirect(e,t,r,s){await this._originValidation(e);let i=await jC(e,t,r,ml(),s);return $w(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ln(i,"If manager is not set, promise should be"),i)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await OI(e),r=new Pl(e);return t.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(gl,{type:gl},s=>{var a;let i=(a=s==null?void 0:s[0])==null?void 0:a[gl];i!==void 0&&t(!!i),Pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=DI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bg()||ig()||Vl()}},Fg=Nl,Po=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Wt("unexpected MultiFactorSessionType")}}},Ol=class n extends Po{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return qw(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return iI(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},No=class{constructor(){}static assertion(e){return Ol._fromCredential(e)}};No.FACTOR_ID="phone";var Oo=class{static assertionForEnrollment(e,t){return Fo._fromSecret(e,t)}static assertionForSignIn(e,t){return Fo._fromEnrollmentId(e,t)}static async generateSecret(e){var s;let t=e;W(typeof((s=t.user)==null?void 0:s.auth)<"u","internal-error");let r=await jw(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return ko._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};Oo.FACTOR_ID="totp";var Fo=class n extends Po{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return W(typeof this.secret<"u",e,"argument-error"),Kw(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){W(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return aI(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ko=class n{constructor(e,t,r,s,i,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var s;let r=!1;return(io(e)||io(t))&&(r=!0),r&&(io(e)&&(e=((s=this.auth.currentUser)==null?void 0:s.email)||"unknownuser"),io(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function io(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var KC="@firebase/auth",JC="1.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fl=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function JI(n){kn(new Rt("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:hg(n)},l=new Il(r,s,i,c);return Iw(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),kn(new Rt("auth-internal",e=>{let t=Et(e.getProvider("auth").getImmediate());return(r=>new Fl(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ut(KC,JC,KI(n)),Ut(KC,JC,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zI=300,WI=Wc("authIdTokenMaxAge")||zI,zC=null,QI=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>WI)return;let s=t==null?void 0:t.token;zC!==s&&(zC=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Yl(n=ro()){let e=gi(n,"auth");if(e.isInitialized())return e.getImmediate();let t=pg(n,{popupRedirectResolver:Fg,persistence:[Sg,Mo,Jl]}),r=Wc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let i=new URL(r,location.origin);if(location.origin===i.origin){let a=QI(i.toString());Ig(t,a,()=>a(t.currentUser)),wg(t,u=>a(u))}}let s=Jc("auth");return s&&Cg(t,`http://${s}`),t}function $I(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Ew({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let i=Ht("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",$I().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});JI("Browser");var kg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Lg={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hn,Xl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,E){function w(){}w.prototype=E.prototype,A.F=E.prototype,A.prototype=new w,A.prototype.constructor=A,A.D=function(b,T,R){for(var y=Array(arguments.length-2),ct=2;ct<arguments.length;ct++)y[ct-2]=arguments[ct];return E.prototype[T].apply(b,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,E,w){w||(w=0);let b=Array(16);if(typeof E=="string")for(var T=0;T<16;++T)b[T]=E.charCodeAt(w++)|E.charCodeAt(w++)<<8|E.charCodeAt(w++)<<16|E.charCodeAt(w++)<<24;else for(T=0;T<16;++T)b[T]=E[w++]|E[w++]<<8|E[w++]<<16|E[w++]<<24;E=A.g[0],w=A.g[1],T=A.g[2];let R=A.g[3],y;y=E+(R^w&(T^R))+b[0]+3614090360&4294967295,E=w+(y<<7&4294967295|y>>>25),y=R+(T^E&(w^T))+b[1]+3905402710&4294967295,R=E+(y<<12&4294967295|y>>>20),y=T+(w^R&(E^w))+b[2]+606105819&4294967295,T=R+(y<<17&4294967295|y>>>15),y=w+(E^T&(R^E))+b[3]+3250441966&4294967295,w=T+(y<<22&4294967295|y>>>10),y=E+(R^w&(T^R))+b[4]+4118548399&4294967295,E=w+(y<<7&4294967295|y>>>25),y=R+(T^E&(w^T))+b[5]+1200080426&4294967295,R=E+(y<<12&4294967295|y>>>20),y=T+(w^R&(E^w))+b[6]+2821735955&4294967295,T=R+(y<<17&4294967295|y>>>15),y=w+(E^T&(R^E))+b[7]+4249261313&4294967295,w=T+(y<<22&4294967295|y>>>10),y=E+(R^w&(T^R))+b[8]+1770035416&4294967295,E=w+(y<<7&4294967295|y>>>25),y=R+(T^E&(w^T))+b[9]+2336552879&4294967295,R=E+(y<<12&4294967295|y>>>20),y=T+(w^R&(E^w))+b[10]+4294925233&4294967295,T=R+(y<<17&4294967295|y>>>15),y=w+(E^T&(R^E))+b[11]+2304563134&4294967295,w=T+(y<<22&4294967295|y>>>10),y=E+(R^w&(T^R))+b[12]+1804603682&4294967295,E=w+(y<<7&4294967295|y>>>25),y=R+(T^E&(w^T))+b[13]+4254626195&4294967295,R=E+(y<<12&4294967295|y>>>20),y=T+(w^R&(E^w))+b[14]+2792965006&4294967295,T=R+(y<<17&4294967295|y>>>15),y=w+(E^T&(R^E))+b[15]+1236535329&4294967295,w=T+(y<<22&4294967295|y>>>10),y=E+(T^R&(w^T))+b[1]+4129170786&4294967295,E=w+(y<<5&4294967295|y>>>27),y=R+(w^T&(E^w))+b[6]+3225465664&4294967295,R=E+(y<<9&4294967295|y>>>23),y=T+(E^w&(R^E))+b[11]+643717713&4294967295,T=R+(y<<14&4294967295|y>>>18),y=w+(R^E&(T^R))+b[0]+3921069994&4294967295,w=T+(y<<20&4294967295|y>>>12),y=E+(T^R&(w^T))+b[5]+3593408605&4294967295,E=w+(y<<5&4294967295|y>>>27),y=R+(w^T&(E^w))+b[10]+38016083&4294967295,R=E+(y<<9&4294967295|y>>>23),y=T+(E^w&(R^E))+b[15]+3634488961&4294967295,T=R+(y<<14&4294967295|y>>>18),y=w+(R^E&(T^R))+b[4]+3889429448&4294967295,w=T+(y<<20&4294967295|y>>>12),y=E+(T^R&(w^T))+b[9]+568446438&4294967295,E=w+(y<<5&4294967295|y>>>27),y=R+(w^T&(E^w))+b[14]+3275163606&4294967295,R=E+(y<<9&4294967295|y>>>23),y=T+(E^w&(R^E))+b[3]+4107603335&4294967295,T=R+(y<<14&4294967295|y>>>18),y=w+(R^E&(T^R))+b[8]+1163531501&4294967295,w=T+(y<<20&4294967295|y>>>12),y=E+(T^R&(w^T))+b[13]+2850285829&4294967295,E=w+(y<<5&4294967295|y>>>27),y=R+(w^T&(E^w))+b[2]+4243563512&4294967295,R=E+(y<<9&4294967295|y>>>23),y=T+(E^w&(R^E))+b[7]+1735328473&4294967295,T=R+(y<<14&4294967295|y>>>18),y=w+(R^E&(T^R))+b[12]+2368359562&4294967295,w=T+(y<<20&4294967295|y>>>12),y=E+(w^T^R)+b[5]+4294588738&4294967295,E=w+(y<<4&4294967295|y>>>28),y=R+(E^w^T)+b[8]+2272392833&4294967295,R=E+(y<<11&4294967295|y>>>21),y=T+(R^E^w)+b[11]+1839030562&4294967295,T=R+(y<<16&4294967295|y>>>16),y=w+(T^R^E)+b[14]+4259657740&4294967295,w=T+(y<<23&4294967295|y>>>9),y=E+(w^T^R)+b[1]+2763975236&4294967295,E=w+(y<<4&4294967295|y>>>28),y=R+(E^w^T)+b[4]+1272893353&4294967295,R=E+(y<<11&4294967295|y>>>21),y=T+(R^E^w)+b[7]+4139469664&4294967295,T=R+(y<<16&4294967295|y>>>16),y=w+(T^R^E)+b[10]+3200236656&4294967295,w=T+(y<<23&4294967295|y>>>9),y=E+(w^T^R)+b[13]+681279174&4294967295,E=w+(y<<4&4294967295|y>>>28),y=R+(E^w^T)+b[0]+3936430074&4294967295,R=E+(y<<11&4294967295|y>>>21),y=T+(R^E^w)+b[3]+3572445317&4294967295,T=R+(y<<16&4294967295|y>>>16),y=w+(T^R^E)+b[6]+76029189&4294967295,w=T+(y<<23&4294967295|y>>>9),y=E+(w^T^R)+b[9]+3654602809&4294967295,E=w+(y<<4&4294967295|y>>>28),y=R+(E^w^T)+b[12]+3873151461&4294967295,R=E+(y<<11&4294967295|y>>>21),y=T+(R^E^w)+b[15]+530742520&4294967295,T=R+(y<<16&4294967295|y>>>16),y=w+(T^R^E)+b[2]+3299628645&4294967295,w=T+(y<<23&4294967295|y>>>9),y=E+(T^(w|~R))+b[0]+4096336452&4294967295,E=w+(y<<6&4294967295|y>>>26),y=R+(w^(E|~T))+b[7]+1126891415&4294967295,R=E+(y<<10&4294967295|y>>>22),y=T+(E^(R|~w))+b[14]+2878612391&4294967295,T=R+(y<<15&4294967295|y>>>17),y=w+(R^(T|~E))+b[5]+4237533241&4294967295,w=T+(y<<21&4294967295|y>>>11),y=E+(T^(w|~R))+b[12]+1700485571&4294967295,E=w+(y<<6&4294967295|y>>>26),y=R+(w^(E|~T))+b[3]+2399980690&4294967295,R=E+(y<<10&4294967295|y>>>22),y=T+(E^(R|~w))+b[10]+4293915773&4294967295,T=R+(y<<15&4294967295|y>>>17),y=w+(R^(T|~E))+b[1]+2240044497&4294967295,w=T+(y<<21&4294967295|y>>>11),y=E+(T^(w|~R))+b[8]+1873313359&4294967295,E=w+(y<<6&4294967295|y>>>26),y=R+(w^(E|~T))+b[15]+4264355552&4294967295,R=E+(y<<10&4294967295|y>>>22),y=T+(E^(R|~w))+b[6]+2734768916&4294967295,T=R+(y<<15&4294967295|y>>>17),y=w+(R^(T|~E))+b[13]+1309151649&4294967295,w=T+(y<<21&4294967295|y>>>11),y=E+(T^(w|~R))+b[4]+4149444226&4294967295,E=w+(y<<6&4294967295|y>>>26),y=R+(w^(E|~T))+b[11]+3174756917&4294967295,R=E+(y<<10&4294967295|y>>>22),y=T+(E^(R|~w))+b[2]+718787259&4294967295,T=R+(y<<15&4294967295|y>>>17),y=w+(R^(T|~E))+b[9]+3951481745&4294967295,A.g[0]=A.g[0]+E&4294967295,A.g[1]=A.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,A.g[2]=A.g[2]+T&4294967295,A.g[3]=A.g[3]+R&4294967295}r.prototype.v=function(A,E){E===void 0&&(E=A.length);let w=E-this.blockSize,b=this.C,T=this.h,R=0;for(;R<E;){if(T==0)for(;R<=w;)s(this,A,R),R+=this.blockSize;if(typeof A=="string"){for(;R<E;)if(b[T++]=A.charCodeAt(R++),T==this.blockSize){s(this,b),T=0;break}}else for(;R<E;)if(b[T++]=A[R++],T==this.blockSize){s(this,b),T=0;break}}this.h=T,this.o+=E},r.prototype.A=function(){var A=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);A[0]=128;for(var E=1;E<A.length-8;++E)A[E]=0;E=this.o*8;for(var w=A.length-8;w<A.length;++w)A[w]=E&255,E/=256;for(this.v(A),A=Array(16),E=0,w=0;w<4;++w)for(let b=0;b<32;b+=8)A[E++]=this.g[w]>>>b&255;return A};function i(A,E){var w=u;return Object.prototype.hasOwnProperty.call(w,A)?w[A]:w[A]=E(A)}function a(A,E){this.h=E;let w=[],b=!0;for(let T=A.length-1;T>=0;T--){let R=A[T]|0;b&&R==E||(w[T]=R,b=!1)}this.g=w}var u={};function c(A){return-128<=A&&A<128?i(A,function(E){return new a([E|0],E<0?-1:0)}):new a([A|0],A<0?-1:0)}function l(A){if(isNaN(A)||!isFinite(A))return f;if(A<0)return V(l(-A));let E=[],w=1;for(let b=0;A>=w;b++)E[b]=A/w|0,w*=4294967296;return new a(E,0)}function h(A,E){if(A.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(A.charAt(0)=="-")return V(h(A.substring(1),E));if(A.indexOf("-")>=0)throw Error('number format error: interior "-" character');let w=l(Math.pow(E,8)),b=f;for(let R=0;R<A.length;R+=8){var T=Math.min(8,A.length-R);let y=parseInt(A.substring(R,R+T),E);T<8?(T=l(Math.pow(E,T)),b=b.j(T).add(l(y))):(b=b.j(w),b=b.add(l(y)))}return b}var f=c(0),C=c(1),_=c(16777216);n=a.prototype,n.m=function(){if(P(this))return-V(this).m();let A=0,E=1;for(let w=0;w<this.g.length;w++){let b=this.i(w);A+=(b>=0?b:4294967296+b)*E,E*=4294967296}return A},n.toString=function(A){if(A=A||10,A<2||36<A)throw Error("radix out of range: "+A);if(D(this))return"0";if(P(this))return"-"+V(this).toString(A);let E=l(Math.pow(A,6));var w=this;let b="";for(;;){let T=De(w,E).g;w=q(w,T.j(E));let R=((w.g.length>0?w.g[0]:w.h)>>>0).toString(A);if(w=T,D(w))return R+b;for(;R.length<6;)R="0"+R;b=R+b}},n.i=function(A){return A<0?0:A<this.g.length?this.g[A]:this.h};function D(A){if(A.h!=0)return!1;for(let E=0;E<A.g.length;E++)if(A.g[E]!=0)return!1;return!0}function P(A){return A.h==-1}n.l=function(A){return A=q(this,A),P(A)?-1:D(A)?0:1};function V(A){let E=A.g.length,w=[];for(let b=0;b<E;b++)w[b]=~A.g[b];return new a(w,~A.h).add(C)}n.abs=function(){return P(this)?V(this):this},n.add=function(A){let E=Math.max(this.g.length,A.g.length),w=[],b=0;for(let T=0;T<=E;T++){let R=b+(this.i(T)&65535)+(A.i(T)&65535),y=(R>>>16)+(this.i(T)>>>16)+(A.i(T)>>>16);b=y>>>16,R&=65535,y&=65535,w[T]=y<<16|R}return new a(w,w[w.length-1]&-2147483648?-1:0)};function q(A,E){return A.add(V(E))}n.j=function(A){if(D(this)||D(A))return f;if(P(this))return P(A)?V(this).j(V(A)):V(V(this).j(A));if(P(A))return V(this.j(V(A)));if(this.l(_)<0&&A.l(_)<0)return l(this.m()*A.m());let E=this.g.length+A.g.length,w=[];for(var b=0;b<2*E;b++)w[b]=0;for(b=0;b<this.g.length;b++)for(let T=0;T<A.g.length;T++){let R=this.i(b)>>>16,y=this.i(b)&65535,ct=A.i(T)>>>16,ir=A.i(T)&65535;w[2*b+2*T]+=y*ir,z(w,2*b+2*T),w[2*b+2*T+1]+=R*ir,z(w,2*b+2*T+1),w[2*b+2*T+1]+=y*ct,z(w,2*b+2*T+1),w[2*b+2*T+2]+=R*ct,z(w,2*b+2*T+2)}for(A=0;A<E;A++)w[A]=w[2*A+1]<<16|w[2*A];for(A=E;A<2*E;A++)w[A]=0;return new a(w,0)};function z(A,E){for(;(A[E]&65535)!=A[E];)A[E+1]+=A[E]>>>16,A[E]&=65535,E++}function ie(A,E){this.g=A,this.h=E}function De(A,E){if(D(E))throw Error("division by zero");if(D(A))return new ie(f,f);if(P(A))return E=De(V(A),E),new ie(V(E.g),V(E.h));if(P(E))return E=De(A,V(E)),new ie(V(E.g),E.h);if(A.g.length>30){if(P(A)||P(E))throw Error("slowDivide_ only works with positive integers.");for(var w=C,b=E;b.l(A)<=0;)w=Ae(w),b=Ae(b);var T=we(w,1),R=we(b,1);for(b=we(b,2),w=we(w,2);!D(b);){var y=R.add(b);y.l(A)<=0&&(T=T.add(w),R=y),b=we(b,1),w=we(w,1)}return E=q(A,T.j(E)),new ie(T,E)}for(T=f;A.l(E)>=0;){for(w=Math.max(1,Math.floor(A.m()/E.m())),b=Math.ceil(Math.log(w)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),R=l(w),y=R.j(E);P(y)||y.l(A)>0;)w-=b,R=l(w),y=R.j(E);D(R)&&(R=C),T=T.add(R),A=q(A,y)}return new ie(T,A)}n.B=function(A){return De(this,A).h},n.and=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let b=0;b<E;b++)w[b]=this.i(b)&A.i(b);return new a(w,this.h&A.h)},n.or=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let b=0;b<E;b++)w[b]=this.i(b)|A.i(b);return new a(w,this.h|A.h)},n.xor=function(A){let E=Math.max(this.g.length,A.g.length),w=[];for(let b=0;b<E;b++)w[b]=this.i(b)^A.i(b);return new a(w,this.h^A.h)};function Ae(A){let E=A.g.length+1,w=[];for(let b=0;b<E;b++)w[b]=A.i(b)<<1|A.i(b-1)>>>31;return new a(w,A.h)}function we(A,E){let w=E>>5;E%=32;let b=A.g.length-w,T=[];for(let R=0;R<b;R++)T[R]=E>0?A.i(R+w)>>>E|A.i(R+w+1)<<32-E:A.i(R+w);return new a(T,A.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Xl=Lg.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=l,a.fromString=h,hn=Lg.Integer=a}).apply(typeof kg<"u"?kg:typeof self<"u"?self:typeof window<"u"?window:{});var Ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},dn={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zl,YI,Bs,eB,Oi,qo,tB,nB,rB;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ho=="object"&&Ho];for(var B=0;B<o.length;++B){var d=o[B];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,B){if(B)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var S=o[p];if(!(S in d))break e;d=d[S]}o=o[o.length-1],p=d[o],B=B(p),B!=p&&B!=null&&e(d,o,{configurable:!0,writable:!0,value:B})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(B){var d=[],p;for(p in B)Object.prototype.hasOwnProperty.call(B,p)&&d.push([p,B[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var B=typeof o;return B=="object"&&o!=null||B=="function"}function c(o,B,d){return o.call.apply(o.bind,arguments)}function l(o,B,d){return l=c,l.apply(null,arguments)}function h(o,B){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function f(o,B){function d(){}d.prototype=B.prototype,o.Z=B.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(p,S,N){for(var H=Array(arguments.length-2),re=2;re<arguments.length;re++)H[re-2]=arguments[re];return B.prototype[S].apply(p,H)}}var C=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function _(o){let B=o.length;if(B>0){let d=Array(B);for(let p=0;p<B;p++)d[p]=o[p];return d}return[]}function D(o,B){for(let p=1;p<arguments.length;p++){let S=arguments[p];var d=typeof S;if(d=d!="object"?d:S?Array.isArray(S)?"array":d:"null",d=="array"||d=="object"&&typeof S.length=="number"){d=o.length||0;let N=S.length||0;o.length=d+N;for(let H=0;H<N;H++)o[d+H]=S[H]}else o.push(S)}}class P{constructor(B,d){this.i=B,this.j=d,this.h=0,this.g=null}get(){let B;return this.h>0?(this.h--,B=this.g,this.g=B.next,B.next=null):B=this.i(),B}}function V(o){a.setTimeout(()=>{throw o},0)}function q(){var o=A;let B=null;return o.g&&(B=o.g,o.g=o.g.next,o.g||(o.h=null),B.next=null),B}class z{constructor(){this.h=this.g=null}add(B,d){let p=ie.get();p.set(B,d),this.h?this.h.next=p:this.g=p,this.h=p}}var ie=new P(()=>new De,o=>o.reset());class De{constructor(){this.next=this.g=this.h=null}set(B,d){this.h=B,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ae,we=!1,A=new z,E=()=>{let o=Promise.resolve(void 0);Ae=()=>{o.then(w)}};function w(){for(var o;o=q();){try{o.h.call(o.g)}catch(d){V(d)}var B=ie;B.j(o),B.h<100&&(B.h++,o.next=B.g,B.g=o)}we=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,B){this.type=o,this.g=this.target=B,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,B=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let d=()=>{};a.addEventListener("test",d,B),a.removeEventListener("test",d,B)}catch{}return o})();function y(o){return/^[\s\xa0]*$/.test(o)}function ct(o,B){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,B)}f(ct,T),ct.prototype.init=function(o,B){let d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=B,B=o.relatedTarget,B||(d=="mouseover"?B=o.fromElement:d=="mouseout"&&(B=o.toElement)),this.relatedTarget=B,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ct.Z.h.call(this)},ct.prototype.h=function(){ct.Z.h.call(this);let o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ir="closure_listenable_"+(Math.random()*1e6|0),fy=0;function py(o,B,d,p,S){this.listener=o,this.proxy=null,this.src=B,this.type=d,this.capture=!!p,this.ha=S,this.key=++fy,this.da=this.fa=!1}function La(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function xa(o,B,d){for(let p in o)B.call(d,o[p],p,o)}function Cy(o,B){for(let d in o)B.call(void 0,o[d],d,o)}function Xf(o){let B={};for(let d in o)B[d]=o[d];return B}let Zf="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ep(o,B){let d,p;for(let S=1;S<arguments.length;S++){p=arguments[S];for(d in p)o[d]=p[d];for(let N=0;N<Zf.length;N++)d=Zf[N],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function Va(o){this.src=o,this.g={},this.h=0}Va.prototype.add=function(o,B,d,p,S){let N=o.toString();o=this.g[N],o||(o=this.g[N]=[],this.h++);let H=yc(o,B,p,S);return H>-1?(B=o[H],d||(B.fa=!1)):(B=new py(B,this.src,N,!!p,S),B.fa=d,o.push(B)),B};function _c(o,B){let d=B.type;if(d in o.g){var p=o.g[d],S=Array.prototype.indexOf.call(p,B,void 0),N;(N=S>=0)&&Array.prototype.splice.call(p,S,1),N&&(La(B),o.g[d].length==0&&(delete o.g[d],o.h--))}}function yc(o,B,d,p){for(let S=0;S<o.length;++S){let N=o[S];if(!N.da&&N.listener==B&&N.capture==!!d&&N.ha==p)return S}return-1}var Dc="closure_lm_"+(Math.random()*1e6|0),wc={};function tp(o,B,d,p,S){if(Array.isArray(B)){for(let N=0;N<B.length;N++)tp(o,B[N],d,p,S);return null}return d=sp(d),o&&o[ir]?o.J(B,d,u(p)?!!p.capture:!1,S):gy(o,B,d,!1,p,S)}function gy(o,B,d,p,S,N){if(!B)throw Error("Invalid event type");let H=u(S)?!!S.capture:!!S,re=Tc(o);if(re||(o[Dc]=re=new Va(o)),d=re.add(B,d,p,H,N),d.proxy)return d;if(p=my(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)R||(S=H),S===void 0&&(S=!1),o.addEventListener(B.toString(),p,S);else if(o.attachEvent)o.attachEvent(rp(B.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function my(){function o(d){return B.call(o.src,o.listener,d)}let B=Ey;return o}function np(o,B,d,p,S){if(Array.isArray(B))for(var N=0;N<B.length;N++)np(o,B[N],d,p,S);else p=u(p)?!!p.capture:!!p,d=sp(d),o&&o[ir]?(o=o.i,N=String(B).toString(),N in o.g&&(B=o.g[N],d=yc(B,d,p,S),d>-1&&(La(B[d]),Array.prototype.splice.call(B,d,1),B.length==0&&(delete o.g[N],o.h--)))):o&&(o=Tc(o))&&(B=o.g[B.toString()],o=-1,B&&(o=yc(B,d,p,S)),(d=o>-1?B[o]:null)&&Ic(d))}function Ic(o){if(typeof o!="number"&&o&&!o.da){var B=o.src;if(B&&B[ir])_c(B.i,o);else{var d=o.type,p=o.proxy;B.removeEventListener?B.removeEventListener(d,p,o.capture):B.detachEvent?B.detachEvent(rp(d),p):B.addListener&&B.removeListener&&B.removeListener(p),(d=Tc(B))?(_c(d,o),d.h==0&&(d.src=null,B[Dc]=null)):La(o)}}}function rp(o){return o in wc?wc[o]:wc[o]="on"+o}function Ey(o,B){if(o.da)o=!0;else{B=new ct(B,this);let d=o.listener,p=o.ha||o.src;o.fa&&Ic(o),o=d.call(p,B)}return o}function Tc(o){return o=o[Dc],o instanceof Va?o:null}var Ac="__closure_events_fn_"+(Math.random()*1e9>>>0);function sp(o){return typeof o=="function"?o:(o[Ac]||(o[Ac]=function(B){return o.handleEvent(B)}),o[Ac])}function $e(){b.call(this),this.i=new Va(this),this.M=this,this.G=null}f($e,b),$e.prototype[ir]=!0,$e.prototype.removeEventListener=function(o,B,d,p){np(this,o,B,d,p)};function it(o,B){var d,p=o.G;if(p)for(d=[];p;p=p.G)d.push(p);if(o=o.M,p=B.type||B,typeof B=="string")B=new T(B,o);else if(B instanceof T)B.target=B.target||o;else{var S=B;B=new T(p,o),ep(B,S)}S=!0;let N,H;if(d)for(H=d.length-1;H>=0;H--)N=B.g=d[H],S=Ma(N,p,!0,B)&&S;if(N=B.g=o,S=Ma(N,p,!0,B)&&S,S=Ma(N,p,!1,B)&&S,d)for(H=0;H<d.length;H++)N=B.g=d[H],S=Ma(N,p,!1,B)&&S}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var o=this.i;for(let B in o.g){let d=o.g[B];for(let p=0;p<d.length;p++)La(d[p]);delete o.g[B],o.h--}}this.G=null},$e.prototype.J=function(o,B,d,p){return this.i.add(String(o),B,!1,d,p)},$e.prototype.K=function(o,B,d,p){return this.i.add(String(o),B,!0,d,p)};function Ma(o,B,d,p){if(B=o.i.g[String(B)],!B)return!0;B=B.concat();let S=!0;for(let N=0;N<B.length;++N){let H=B[N];if(H&&!H.da&&H.capture==d){let re=H.listener,ke=H.ha||H.src;H.fa&&_c(o.i,H),S=re.call(ke,p)!==!1&&S}}return S&&!p.defaultPrevented}function _y(o,B){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=l(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(B)>2147483647?-1:a.setTimeout(o,B||0)}function ip(o){o.g=_y(()=>{o.g=null,o.i&&(o.i=!1,ip(o))},o.l);let B=o.h;o.h=null,o.m.apply(null,B)}class yy extends b{constructor(B,d){super(),this.m=B,this.l=d,this.h=null,this.i=!1,this.g=null}j(B){this.h=arguments,this.g?this.i=!0:ip(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zs(o){b.call(this),this.h=o,this.g={}}f(Zs,b);var ap=[];function op(o){xa(o.g,function(B,d){this.g.hasOwnProperty(d)&&Ic(B)},o),o.g={}}Zs.prototype.N=function(){Zs.Z.N.call(this),op(this)},Zs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var vc=a.JSON.stringify,Dy=a.JSON.parse,wy=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function up(){}function cp(){}var ei={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function bc(){T.call(this,"d")}f(bc,T);function Sc(){T.call(this,"c")}f(Sc,T);var ar={},lp=null;function Ga(){return lp=lp||new $e}ar.Ia="serverreachability";function Bp(o){T.call(this,ar.Ia,o)}f(Bp,T);function ti(o){let B=Ga();it(B,new Bp(B))}ar.STAT_EVENT="statevent";function hp(o,B){T.call(this,ar.STAT_EVENT,o),this.stat=B}f(hp,T);function at(o){let B=Ga();it(B,new hp(B,o))}ar.Ja="timingevent";function dp(o,B){T.call(this,ar.Ja,o),this.size=B}f(dp,T);function ni(o,B){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},B)}function ri(){this.g=!0}ri.prototype.ua=function(){this.g=!1};function Iy(o,B,d,p,S,N){o.info(function(){if(o.g)if(N){var H="",re=N.split("&");for(let he=0;he<re.length;he++){var ke=re[he].split("=");if(ke.length>1){let Ue=ke[0];ke=ke[1];let Jt=Ue.split("_");H=Jt.length>=2&&Jt[1]=="type"?H+(Ue+"="+ke+"&"):H+(Ue+"=redacted&")}}}else H=null;else H=N;return"XMLHTTP REQ ("+p+") [attempt "+S+"]: "+B+`
`+d+`
`+H})}function Ty(o,B,d,p,S,N,H){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+S+"]: "+B+`
`+d+`
`+N+" "+H})}function es(o,B,d,p){o.info(function(){return"XMLHTTP TEXT ("+B+"): "+vy(o,d)+(p?" "+p:"")})}function Ay(o,B){o.info(function(){return"TIMEOUT: "+B})}ri.prototype.info=function(){};function vy(o,B){if(!o.g)return B;if(!B)return null;try{let N=JSON.parse(B);if(N){for(o=0;o<N.length;o++)if(Array.isArray(N[o])){var d=N[o];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var S=p[0];if(S!="noop"&&S!="stop"&&S!="close")for(let H=1;H<p.length;H++)p[H]=""}}}}return vc(N)}catch{return B}}var Ua={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},fp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},pp;function Rc(){}f(Rc,up),Rc.prototype.g=function(){return new XMLHttpRequest},pp=new Rc;function si(o){return encodeURIComponent(String(o))}function by(o){var B=1;o=o.split(":");let d=[];for(;B>0&&o.length;)d.push(o.shift()),B--;return o.length&&d.push(o.join(":")),d}function bn(o,B,d,p){this.j=o,this.i=B,this.l=d,this.S=p||1,this.V=new Zs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Cp}function Cp(){this.i=null,this.g="",this.h=!1}var gp={},Pc={};function Nc(o,B,d){o.M=1,o.A=qa(Kt(B)),o.u=d,o.R=!0,mp(o,null)}function mp(o,B){o.F=Date.now(),Ha(o),o.B=Kt(o.A);var d=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),Pp(d.i,"t",p),o.C=0,d=o.j.L,o.h=new Cp,o.g=Qp(o.j,d?B:null,!o.u),o.P>0&&(o.O=new yy(l(o.Y,o,o.g),o.P)),B=o.V,d=o.g,p=o.ba;var S="readystatechange";Array.isArray(S)||(S&&(ap[0]=S.toString()),S=ap);for(let N=0;N<S.length;N++){let H=tp(d,S[N],p||B.handleEvent,!1,B.h||B);if(!H)break;B.g[H.key]=H}B=o.J?Xf(o.J):{},o.u?(o.v||(o.v="POST"),B["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,B)):(o.v="GET",o.g.ea(o.B,o.v,null,B)),ti(),Iy(o.i,o.v,o.B,o.l,o.S,o.u)}bn.prototype.ba=function(o){o=o.target;let B=this.O;B&&Pn(o)==3?B.j():this.Y(o)},bn.prototype.Y=function(o){try{if(o==this.g)e:{let re=Pn(this.g),ke=this.g.ya(),he=this.g.ca();if(!(re<3)&&(re!=3||this.g&&(this.h.h||this.g.la()||Vp(this.g)))){this.K||re!=4||ke==7||(ke==8||he<=0?ti(3):ti(2)),Oc(this);var B=this.g.ca();this.X=B;var d=Sy(this);if(this.o=B==200,Ty(this.i,this.v,this.B,this.l,this.S,re,B),this.o){if(this.U&&!this.L){t:{if(this.g){var p,S=this.g;if((p=S.g?S.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(p)){var N=p;break t}}N=null}if(o=N)es(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Fc(this,o);else{this.o=!1,this.m=3,at(12),or(this),ii(this);break e}}if(this.R){o=!0;let Ue;for(;!this.K&&this.C<d.length;)if(Ue=Ry(this,d),Ue==Pc){re==4&&(this.m=4,at(14),o=!1),es(this.i,this.l,null,"[Incomplete Response]");break}else if(Ue==gp){this.m=4,at(15),es(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else es(this.i,this.l,Ue,null),Fc(this,Ue);if(Ep(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),re!=4||d.length!=0||this.h.h||(this.m=1,at(16),o=!1),this.o=this.o&&o,!o)es(this.i,this.l,d,"[Invalid Chunked Response]"),or(this),ii(this);else if(d.length>0&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.aa&&!H.P&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Uc(H),H.P=!0,at(11))}}else es(this.i,this.l,d,null),Fc(this,d);re==4&&or(this),this.o&&!this.K&&(re==4?Kp(this.j,this):(this.o=!1,Ha(this)))}else jy(this.g),B==400&&d.indexOf("Unknown SID")>0?(this.m=3,at(12)):(this.m=0,at(13)),or(this),ii(this)}}}catch{}finally{}};function Sy(o){if(!Ep(o))return o.g.la();let B=Vp(o.g);if(B==="")return"";let d="",p=B.length,S=Pn(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return or(o),ii(o),"";o.h.i=new a.TextDecoder}for(let N=0;N<p;N++)o.h.h=!0,d+=o.h.i.decode(B[N],{stream:!(S&&N==p-1)});return B.length=0,o.h.g+=d,o.C=0,o.h.g}function Ep(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Ry(o,B){var d=o.C,p=B.indexOf(`
`,d);return p==-1?Pc:(d=Number(B.substring(d,p)),isNaN(d)?gp:(p+=1,p+d>B.length?Pc:(B=B.slice(p,p+d),o.C=p+d,B)))}bn.prototype.cancel=function(){this.K=!0,or(this)};function Ha(o){o.T=Date.now()+o.H,_p(o,o.H)}function _p(o,B){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ni(l(o.aa,o),B)}function Oc(o){o.D&&(a.clearTimeout(o.D),o.D=null)}bn.prototype.aa=function(){this.D=null;let o=Date.now();o-this.T>=0?(Ay(this.i,this.B),this.M!=2&&(ti(),at(17)),or(this),this.m=2,ii(this)):_p(this,this.T-o)};function ii(o){o.j.I==0||o.K||Kp(o.j,o)}function or(o){Oc(o);var B=o.O;B&&typeof B.dispose=="function"&&B.dispose(),o.O=null,op(o.V),o.g&&(B=o.g,o.g=null,B.abort(),B.dispose())}function Fc(o,B){try{var d=o.j;if(d.I!=0&&(d.g==o||kc(d.h,o))){if(!o.L&&kc(d.h,o)&&d.I==3){try{var p=d.Ba.g.parse(B)}catch{p=null}if(Array.isArray(p)&&p.length==3){var S=p;if(S[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Qa(d),za(d);else break e;Gc(d),at(18)}}else d.xa=S[1],0<d.xa-d.K&&S[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=ni(l(d.Va,d),6e3));wp(d.h)<=1&&d.ta&&(d.ta=void 0)}else cr(d,11)}else if((o.L||d.g==o)&&Qa(d),!y(B))for(S=d.Ba.g.parse(B),B=0;B<S.length;B++){let he=S[B],Ue=he[0];if(!(Ue<=d.K))if(d.K=Ue,he=he[1],d.I==2)if(he[0]=="c"){d.M=he[1],d.ba=he[2];let Jt=he[3];Jt!=null&&(d.ka=Jt,d.j.info("VER="+d.ka));let lr=he[4];lr!=null&&(d.za=lr,d.j.info("SVER="+d.za));let Nn=he[5];Nn!=null&&typeof Nn=="number"&&Nn>0&&(p=1.5*Nn,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;let On=o.g;if(On){let Ya=On.g?On.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ya){var N=p.h;N.g||Ya.indexOf("spdy")==-1&&Ya.indexOf("quic")==-1&&Ya.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Lc(N,N.h),N.h=null))}if(p.G){let Hc=On.g?On.g.getResponseHeader("X-HTTP-Session-Id"):null;Hc&&(p.wa=Hc,ge(p.J,p.G,Hc))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var H=o;if(p.na=Wp(p,p.L?p.ba:null,p.W),H.L){Ip(p.h,H);var re=H,ke=p.O;ke&&(re.H=ke),re.D&&(Oc(re),Ha(re)),p.g=H}else qp(p);d.i.length>0&&Wa(d)}else he[0]!="stop"&&he[0]!="close"||cr(d,7);else d.I==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?cr(d,7):Mc(d):he[0]!="noop"&&d.l&&d.l.qa(he),d.A=0)}}ti(4)}catch{}}var Py=class{constructor(o,B){this.g=o,this.map=B}};function yp(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Dp(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function wp(o){return o.h?1:o.g?o.g.size:0}function kc(o,B){return o.h?o.h==B:o.g?o.g.has(B):!1}function Lc(o,B){o.g?o.g.add(B):o.h=B}function Ip(o,B){o.h&&o.h==B?o.h=null:o.g&&o.g.has(B)&&o.g.delete(B)}yp.prototype.cancel=function(){if(this.i=Tp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Tp(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let B=o.i;for(let d of o.g.values())B=B.concat(d.G);return B}return _(o.i)}var Ap=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ny(o,B){if(o){o=o.split("&");for(let d=0;d<o.length;d++){let p=o[d].indexOf("="),S,N=null;p>=0?(S=o[d].substring(0,p),N=o[d].substring(p+1)):S=o[d],B(S,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function Sn(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let B;o instanceof Sn?(this.l=o.l,ai(this,o.j),this.o=o.o,this.g=o.g,oi(this,o.u),this.h=o.h,xc(this,Np(o.i)),this.m=o.m):o&&(B=String(o).match(Ap))?(this.l=!1,ai(this,B[1]||"",!0),this.o=ui(B[2]||""),this.g=ui(B[3]||"",!0),oi(this,B[4]),this.h=ui(B[5]||"",!0),xc(this,B[6]||"",!0),this.m=ui(B[7]||"")):(this.l=!1,this.i=new li(null,this.l))}Sn.prototype.toString=function(){let o=[];var B=this.j;B&&o.push(ci(B,vp,!0),":");var d=this.g;return(d||B=="file")&&(o.push("//"),(B=this.o)&&o.push(ci(B,vp,!0),"@"),o.push(si(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ci(d,d.charAt(0)=="/"?ky:Fy,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ci(d,xy)),o.join("")},Sn.prototype.resolve=function(o){let B=Kt(this),d=!!o.j;d?ai(B,o.j):d=!!o.o,d?B.o=o.o:d=!!o.g,d?B.g=o.g:d=o.u!=null;var p=o.h;if(d)oi(B,o.u);else if(d=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var S=B.h.lastIndexOf("/");S!=-1&&(p=B.h.slice(0,S+1)+p)}if(S=p,S==".."||S==".")p="";else if(S.indexOf("./")!=-1||S.indexOf("/.")!=-1){p=S.lastIndexOf("/",0)==0,S=S.split("/");let N=[];for(let H=0;H<S.length;){let re=S[H++];re=="."?p&&H==S.length&&N.push(""):re==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),p&&H==S.length&&N.push("")):(N.push(re),p=!0)}p=N.join("/")}else p=S}return d?B.h=p:d=o.i.toString()!=="",d?xc(B,Np(o.i)):d=!!o.m,d&&(B.m=o.m),B};function Kt(o){return new Sn(o)}function ai(o,B,d){o.j=d?ui(B,!0):B,o.j&&(o.j=o.j.replace(/:$/,""))}function oi(o,B){if(B){if(B=Number(B),isNaN(B)||B<0)throw Error("Bad port number "+B);o.u=B}else o.u=null}function xc(o,B,d){B instanceof li?(o.i=B,Vy(o.i,o.l)):(d||(B=ci(B,Ly)),o.i=new li(B,o.l))}function ge(o,B,d){o.i.set(B,d)}function qa(o){return ge(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function ui(o,B){return o?B?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ci(o,B,d){return typeof o=="string"?(o=encodeURI(o).replace(B,Oy),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Oy(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var vp=/[#\/\?@]/g,Fy=/[#\?:]/g,ky=/[#\?]/g,Ly=/[#\?@]/g,xy=/#/g;function li(o,B){this.h=this.g=null,this.i=o||null,this.j=!!B}function ur(o){o.g||(o.g=new Map,o.h=0,o.i&&Ny(o.i,function(B,d){o.add(decodeURIComponent(B.replace(/\+/g," ")),d)}))}n=li.prototype,n.add=function(o,B){ur(this),this.i=null,o=ts(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(B),this.h+=1,this};function bp(o,B){ur(o),B=ts(o,B),o.g.has(B)&&(o.i=null,o.h-=o.g.get(B).length,o.g.delete(B))}function Sp(o,B){return ur(o),B=ts(o,B),o.g.has(B)}n.forEach=function(o,B){ur(this),this.g.forEach(function(d,p){d.forEach(function(S){o.call(B,S,p,this)},this)},this)};function Rp(o,B){ur(o);let d=[];if(typeof B=="string")Sp(o,B)&&(d=d.concat(o.g.get(ts(o,B))));else for(o=Array.from(o.g.values()),B=0;B<o.length;B++)d=d.concat(o[B]);return d}n.set=function(o,B){return ur(this),this.i=null,o=ts(this,o),Sp(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[B]),this.h+=1,this},n.get=function(o,B){return o?(o=Rp(this,o),o.length>0?String(o[0]):B):B};function Pp(o,B,d){bp(o,B),d.length>0&&(o.i=null,o.g.set(ts(o,B),_(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],B=Array.from(this.g.keys());for(let p=0;p<B.length;p++){var d=B[p];let S=si(d);d=Rp(this,d);for(let N=0;N<d.length;N++){let H=S;d[N]!==""&&(H+="="+si(d[N])),o.push(H)}}return this.i=o.join("&")};function Np(o){let B=new li;return B.i=o.i,o.g&&(B.g=new Map(o.g),B.h=o.h),B}function ts(o,B){return B=String(B),o.j&&(B=B.toLowerCase()),B}function Vy(o,B){B&&!o.j&&(ur(o),o.i=null,o.g.forEach(function(d,p){let S=p.toLowerCase();p!=S&&(bp(this,p),Pp(this,S,d))},o)),o.j=B}function My(o,B){let d=new ri;if(a.Image){let p=new Image;p.onload=h(Rn,d,"TestLoadImage: loaded",!0,B,p),p.onerror=h(Rn,d,"TestLoadImage: error",!1,B,p),p.onabort=h(Rn,d,"TestLoadImage: abort",!1,B,p),p.ontimeout=h(Rn,d,"TestLoadImage: timeout",!1,B,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else B(!1)}function Gy(o,B){let d=new ri,p=new AbortController,S=setTimeout(()=>{p.abort(),Rn(d,"TestPingServer: timeout",!1,B)},1e4);fetch(o,{signal:p.signal}).then(N=>{clearTimeout(S),N.ok?Rn(d,"TestPingServer: ok",!0,B):Rn(d,"TestPingServer: server error",!1,B)}).catch(()=>{clearTimeout(S),Rn(d,"TestPingServer: error",!1,B)})}function Rn(o,B,d,p,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),p(d)}catch{}}function Uy(){this.g=new wy}function ja(o){this.i=o.Sb||null,this.h=o.ab||!1}f(ja,up),ja.prototype.g=function(){return new Ka(this.i,this.h)};function Ka(o,B){$e.call(this),this.H=o,this.o=B,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(Ka,$e),n=Ka.prototype,n.open=function(o,B){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=B,this.readyState=1,hi(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let B={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(B.body=o),(this.H||a).fetch(new Request(this.D,B)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Bi(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,hi(this)),this.g&&(this.readyState=3,hi(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Op(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Op(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var B=o.value?o.value:new Uint8Array(0);(B=this.B.decode(B,{stream:!o.done}))&&(this.response=this.responseText+=B)}o.done?Bi(this):hi(this),this.readyState==3&&Op(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Bi(this))},n.Na=function(o){this.g&&(this.response=o,Bi(this))},n.ga=function(){this.g&&Bi(this)};function Bi(o){o.readyState=4,o.l=null,o.j=null,o.B=null,hi(o)}n.setRequestHeader=function(o,B){this.A.append(o,B)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],B=this.h.entries();for(var d=B.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=B.next();return o.join(`\r
`)};function hi(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ka.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Fp(o){let B="";return xa(o,function(d,p){B+=p,B+=":",B+=d,B+=`\r
`}),B}function Vc(o,B,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Fp(d),typeof o=="string"?d!=null&&si(d):ge(o,B,d))}function Ie(o){$e.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Ie,$e);var Hy=/^https?$/i,qy=["POST","PUT"];n=Ie.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,B,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);B=B?B.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():pp.g(),this.g.onreadystatechange=C(l(this.Ca,this));try{this.B=!0,this.g.open(B,String(o),!0),this.B=!1}catch(N){kp(this,N);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var S in p)d.set(S,p[S]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let N of p.keys())d.set(N,p.get(N));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(N=>N.toLowerCase()=="content-type"),S=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(qy,B,void 0)>=0)||p||S||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[N,H]of d)this.g.setRequestHeader(N,H);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(N){kp(this,N)}};function kp(o,B){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=B,o.o=5,Lp(o),Ja(o)}function Lp(o){o.A||(o.A=!0,it(o,"complete"),it(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,it(this,"complete"),it(this,"abort"),Ja(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ja(this,!0)),Ie.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?xp(this):this.Xa())},n.Xa=function(){xp(this)};function xp(o){if(o.h&&typeof i<"u"){if(o.v&&Pn(o)==4)setTimeout(o.Ca.bind(o),0);else if(it(o,"readystatechange"),Pn(o)==4){o.h=!1;try{let N=o.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var B=!0;break e;default:B=!1}var d;if(!(d=B)){var p;if(p=N===0){let H=String(o.D).match(Ap)[1]||null;!H&&a.self&&a.self.location&&(H=a.self.location.protocol.slice(0,-1)),p=!Hy.test(H?H.toLowerCase():"")}d=p}if(d)it(o,"complete"),it(o,"success");else{o.o=6;try{var S=Pn(o)>2?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.ca()+"]",Lp(o)}}finally{Ja(o)}}}}function Ja(o,B){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);let d=o.g;o.g=null,B||it(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Pn(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Pn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var B=this.g.responseText;return o&&B.indexOf(o)==0&&(B=B.substring(o.length)),Dy(B)}};function Vp(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function jy(o){let B={};o=(o.g&&Pn(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(y(o[p]))continue;var d=by(o[p]);let S=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let N=B[S]||[];B[S]=N,N.push(d)}Cy(B,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function di(o,B,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||B}function Mp(o){this.za=0,this.i=[],this.j=new ri,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=di("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=di("baseRetryDelayMs",5e3,o),this.Za=di("retryDelaySeedMs",1e4,o),this.Ta=di("forwardChannelMaxRetries",2,o),this.va=di("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new yp(o&&o.concurrentRequestLimit),this.Ba=new Uy,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Mp.prototype,n.ka=8,n.I=1,n.connect=function(o,B,d,p){at(0),this.W=o,this.H=B||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=Wp(this,null,this.W),Wa(this)};function Mc(o){if(Gp(o),o.I==3){var B=o.V++,d=Kt(o.J);if(ge(d,"SID",o.M),ge(d,"RID",B),ge(d,"TYPE","terminate"),fi(o,d),B=new bn(o,o.j,B),B.M=2,B.A=qa(Kt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(B.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=B.A,d=!0),d||(B.g=Qp(B.j,null),B.g.ea(B.A)),B.F=Date.now(),Ha(B)}zp(o)}function za(o){o.g&&(Uc(o),o.g.cancel(),o.g=null)}function Gp(o){za(o),o.v&&(a.clearTimeout(o.v),o.v=null),Qa(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Wa(o){if(!Dp(o.h)&&!o.m){o.m=!0;var B=o.Ea;Ae||E(),we||(Ae(),we=!0),A.add(B,o),o.D=0}}function Ky(o,B){return wp(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=B.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ni(l(o.Ea,o,B),Jp(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;let S=new bn(this,this.j,o),N=this.o;if(this.U&&(N?(N=Xf(N),ep(N,this.U)):N=this.U),this.u!==null||this.R||(S.J=N,N=null),this.S)e:{for(var B=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(B+=p,B>4096){B=d;break e}if(B===4096||d===this.i.length-1){B=d+1;break e}}B=1e3}else B=1e3;B=Hp(this,S,B),d=Kt(this.J),ge(d,"RID",o),ge(d,"CVER",22),this.G&&ge(d,"X-HTTP-Session-Id",this.G),fi(this,d),N&&(this.R?B="headers="+si(Fp(N))+"&"+B:this.u&&Vc(d,this.u,N)),Lc(this.h,S),this.Ra&&ge(d,"TYPE","init"),this.S?(ge(d,"$req",B),ge(d,"SID","null"),S.U=!0,Nc(S,d,null)):Nc(S,d,B),this.I=2}}else this.I==3&&(o?Up(this,o):this.i.length==0||Dp(this.h)||Up(this))};function Up(o,B){var d;B?d=B.l:d=o.V++;let p=Kt(o.J);ge(p,"SID",o.M),ge(p,"RID",d),ge(p,"AID",o.K),fi(o,p),o.u&&o.o&&Vc(p,o.u,o.o),d=new bn(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),B&&(o.i=B.G.concat(o.i)),B=Hp(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Lc(o.h,d),Nc(d,p,B)}function fi(o,B){o.H&&xa(o.H,function(d,p){ge(B,p,d)}),o.l&&xa({},function(d,p){ge(B,p,d)})}function Hp(o,B,d){d=Math.min(o.i.length,d);let p=o.l?l(o.l.Ka,o.l,o):null;e:{var S=o.i;let re=-1;for(;;){let ke=["count="+d];re==-1?d>0?(re=S[0].g,ke.push("ofs="+re)):re=0:ke.push("ofs="+re);let he=!0;for(let Ue=0;Ue<d;Ue++){var N=S[Ue].g;let Jt=S[Ue].map;if(N-=re,N<0)re=Math.max(0,S[Ue].g-100),he=!1;else try{N="req"+N+"_"||"";try{var H=Jt instanceof Map?Jt:Object.entries(Jt);for(let[lr,Nn]of H){let On=Nn;u(Nn)&&(On=vc(Nn)),ke.push(N+lr+"="+encodeURIComponent(On))}}catch(lr){throw ke.push(N+"type="+encodeURIComponent("_badmap")),lr}}catch{p&&p(Jt)}}if(he){H=ke.join("&");break e}}H=void 0}return o=o.i.splice(0,d),B.G=o,H}function qp(o){if(!o.g&&!o.v){o.Y=1;var B=o.Da;Ae||E(),we||(Ae(),we=!0),A.add(B,o),o.A=0}}function Gc(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ni(l(o.Da,o),Jp(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,jp(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ni(l(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,at(10),za(this),jp(this))};function Uc(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function jp(o){o.g=new bn(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var B=Kt(o.na);ge(B,"RID","rpc"),ge(B,"SID",o.M),ge(B,"AID",o.K),ge(B,"CI",o.F?"0":"1"),!o.F&&o.ia&&ge(B,"TO",o.ia),ge(B,"TYPE","xmlhttp"),fi(o,B),o.u&&o.o&&Vc(B,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=qa(Kt(B)),d.u=null,d.R=!0,mp(d,o)}n.Va=function(){this.C!=null&&(this.C=null,za(this),Gc(this),at(19))};function Qa(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Kp(o,B){var d=null;if(o.g==B){Qa(o),Uc(o),o.g=null;var p=2}else if(kc(o.h,B))d=B.G,Ip(o.h,B),p=1;else return;if(o.I!=0){if(B.o)if(p==1){d=B.u?B.u.length:0,B=Date.now()-B.F;var S=o.D;p=Ga(),it(p,new dp(p,d)),Wa(o)}else qp(o);else if(S=B.m,S==3||S==0&&B.X>0||!(p==1&&Ky(o,B)||p==2&&Gc(o)))switch(d&&d.length>0&&(B=o.h,B.i=B.i.concat(d)),S){case 1:cr(o,5);break;case 4:cr(o,10);break;case 3:cr(o,6);break;default:cr(o,2)}}}function Jp(o,B){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*B}function cr(o,B){if(o.j.info("Error code "+B),B==2){var d=l(o.bb,o),p=o.Ua;let S=!p;p=new Sn(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ai(p,"https"),qa(p),S?My(p.toString(),d):Gy(p.toString(),d)}else at(2);o.I=0,o.l&&o.l.pa(B),zp(o),Gp(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),at(2)):(this.j.info("Failed to ping google.com"),at(1))};function zp(o){if(o.I=0,o.ja=[],o.l){let B=Tp(o.h);(B.length!=0||o.i.length!=0)&&(D(o.ja,B),D(o.ja,o.i),o.h.i.length=0,_(o.i),o.i.length=0),o.l.oa()}}function Wp(o,B,d){var p=d instanceof Sn?Kt(d):new Sn(d);if(p.g!="")B&&(p.g=B+"."+p.g),oi(p,p.u);else{var S=a.location;p=S.protocol,B=B?B+"."+S.hostname:S.hostname,S=+S.port;let N=new Sn(null);p&&ai(N,p),B&&(N.g=B),S&&oi(N,S),d&&(N.h=d),p=N}return d=o.G,B=o.wa,d&&B&&ge(p,d,B),ge(p,"VER",o.ka),fi(o,p),p}function Qp(o,B,d){if(B&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return B=o.Aa&&!o.ma?new Ie(new ja({ab:d})):new Ie(o.ma),B.Fa(o.L),B}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $p(){}n=$p.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function $a(){}$a.prototype.g=function(o,B){return new gt(o,B)};function gt(o,B){$e.call(this),this.g=new Mp(B),this.l=o,this.h=B&&B.messageUrlParams||null,o=B&&B.messageHeaders||null,B&&B.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=B&&B.initMessageHeaders||null,B&&B.messageContentType&&(o?o["X-WebChannel-Content-Type"]=B.messageContentType:o={"X-WebChannel-Content-Type":B.messageContentType}),B&&B.sa&&(o?o["X-WebChannel-Client-Profile"]=B.sa:o={"X-WebChannel-Client-Profile":B.sa}),this.g.U=o,(o=B&&B.Qb)&&!y(o)&&(this.g.u=o),this.A=B&&B.supportsCrossDomainXhr||!1,this.v=B&&B.sendRawJson||!1,(B=B&&B.httpSessionIdParam)&&!y(B)&&(this.g.G=B,o=this.h,o!==null&&B in o&&(o=this.h,B in o&&delete o[B])),this.j=new ns(this)}f(gt,$e),gt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},gt.prototype.close=function(){Mc(this.g)},gt.prototype.o=function(o){var B=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=vc(o),o=d);B.i.push(new Py(B.Ya++,o)),B.I==3&&Wa(B)},gt.prototype.N=function(){this.g.l=null,delete this.j,Mc(this.g),delete this.g,gt.Z.N.call(this)};function Yp(o){bc.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var B=o.__sm__;if(B){e:{for(let d in B){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,B=B!==null&&o in B?B[o]:void 0),this.data=B}else this.data=o}f(Yp,bc);function Xp(){Sc.call(this),this.status=1}f(Xp,Sc);function ns(o){this.g=o}f(ns,$p),ns.prototype.ra=function(){it(this.g,"a")},ns.prototype.qa=function(o){it(this.g,new Yp(o))},ns.prototype.pa=function(o){it(this.g,new Xp)},ns.prototype.oa=function(){it(this.g,"b")},$a.prototype.createWebChannel=$a.prototype.g,gt.prototype.send=gt.prototype.o,gt.prototype.open=gt.prototype.m,gt.prototype.close=gt.prototype.close,rB=dn.createWebChannelTransport=function(){return new $a},nB=dn.getStatEventTarget=function(){return Ga()},tB=dn.Event=ar,qo=dn.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ua.NO_ERROR=0,Ua.TIMEOUT=8,Ua.HTTP_ERROR=6,Oi=dn.ErrorCode=Ua,fp.COMPLETE="complete",eB=dn.EventType=fp,cp.EventType=ei,ei.OPEN="a",ei.CLOSE="b",ei.ERROR="c",ei.MESSAGE="d",$e.prototype.listen=$e.prototype.J,Bs=dn.WebChannel=cp,YI=dn.FetchXmlHttpFactory=ja,Ie.prototype.listenOnce=Ie.prototype.K,Ie.prototype.getLastError=Ie.prototype.Ha,Ie.prototype.getLastErrorCode=Ie.prototype.ya,Ie.prototype.getStatus=Ie.prototype.ca,Ie.prototype.getResponseJson=Ie.prototype.La,Ie.prototype.getResponseText=Ie.prototype.la,Ie.prototype.send=Ie.prototype.ea,Ie.prototype.setWithCredentials=Ie.prototype.Fa,Zl=dn.XhrIo=Ie}).apply(typeof Ho<"u"?Ho:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.9.1
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository [object Object]
* @license MIT
*/var L=class Dr{static FOLD_CASE=1;static LITERAL=2;static CLASS_NL=4;static DOT_NL=8;static ONE_LINE=16;static NON_GREEDY=32;static PERL_X=64;static UNICODE_GROUPS=128;static WAS_DOLLAR=256;static LOOKBEHIND=512;static MATCH_NL=Dr.CLASS_NL|Dr.DOT_NL;static PERL=Dr.CLASS_NL|Dr.ONE_LINE|Dr.PERL_X|Dr.UNICODE_GROUPS;static POSIX=0;static UNANCHORED=0;static ANCHOR_START=1;static ANCHOR_BOTH=2},qt={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},xi=128,uB=new Int32Array(xi),cB=new Int32Array(xi),jo=65535;for(let n=0;n<xi;n++)n>=97&&n<=122?uB[n]=n-32:uB[n]=n,n>=65&&n<=90?cB[n]=n+32:cB[n]=n;var x=class{static CODES=Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125});static toUpperCase(n){if(n<xi)return uB[n];let e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>jo?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=r.codePointAt(0)>jo?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<xi)return cB[n];let e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>jo?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=r.codePointAt(0)>jo?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}},g=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}},XI="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",hm=new Uint8Array(256);for(let n=0;n<64;n++)hm[XI.charCodeAt(n)]=n;var dm=n=>{let e=[],t=0,r=0;for(let s=0;s<n.length;s++){let i=hm[n.charCodeAt(s)];t|=(i&31)<<r,(i&32)===0?(e.push(t),t=0,r=0):r+=5}return e},m=(n,e)=>{let t=dm(n),r=e?t.length/2:t.length/3,s=new Uint32Array(r*3),i=0,a=0;for(let u=0;u<r;u++)i+=t[a++],s[u*3]=i,i+=t[a++],s[u*3+1]=i,s[u*3+2]=e?1:t[a++];return s},ZI=n=>{let e=dm(n),t=new Map,r=0;for(let s=0;s<e.length;s+=2){r+=e[s];let i=e[s+1],a=i>>>1^-(i&1);t.set(r,r+a)}return t},Ko=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return n in this.initializer}get(n){if(this.cache.has(n))return this.cache.get(n);let e=this.initializer[n],t=e?e():null;return this.cache.set(n,t),t}},yt=class{static _CASE_ORBIT=null;static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=ZI("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static _Print=null;static get Print(){return this._Print||(this._Print=new g(m("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static CATEGORIES=new Ko({C:()=>new g(m("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new g(m("AfgDgB",!0)),Cf:()=>new g(m("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new g(m("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new g(m("gg2B--B",!0)),L:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new g(m("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new g(m("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new g(m("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new g(m("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new g(m("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new g(m("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new g(m("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new g(m("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new g(m("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new g(m("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new g(m("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new g(m("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new g(m("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new g(m("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new g(m("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new g(m("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new g(m("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new g(m("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new g(m("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new g(m("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new g(m("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new g(m("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new g(m("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new g(m("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new g(m("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new g(m("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new g(m("ohIA",!0)),Zp:()=>new g(m("phIA",!0)),Zs:()=>new g(m("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new g(m("wBJIFbF",!0)),Alphabetic:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new g(m("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new g(m("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new g(m("7-8DE",!0)),Emoji_Modifier_Base:()=>new g(m("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new g(m("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new g(m("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new g(m("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new g(m("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new g(m("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new g(m("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new g(m("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new g(m("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))});static SCRIPTS=new Ko({Adlam:()=>new g(m("go6DrCFJFB",!0)),Ahom:()=>new g(m("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new g(m("ggxCmS",!0)),Arabic:()=>new g(m("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new g(m("xpBlBDxBDCks9BE",!0)),Avestan:()=>new g(m("g4iC1BEG",!0)),Balinese:()=>new g(m("g4GsCCxB",!0)),Bamum:()=>new g(m("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new g(m("w26CdDF",!0)),Batak:()=>new g(m("g+GzBJD",!0)),Bengali:()=>new g(m("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new g(m("g17CYDY",!0)),Bhaiksuki:()=>new g(m("ggnCICsBCNLc",!0)),Bopomofo:()=>new g(m("qXB6wLqBxDf",!0)),Brahmi:()=>new g(m("ggkCtCFjBKA",!0)),Braille:()=>new g(m("ggK-H",!0)),Buginese:()=>new g(m("gwGbDB",!0)),Buhid:()=>new g(m("g6FT",!0)),Canadian_Aboriginal:()=>new g(m("ggF-TxRlC7tgCP",!0)),Carian:()=>new g(m("g1gCwB",!0)),Caucasian_Albanian:()=>new g(m("wphCzBMA",!0)),Chakma:()=>new g(m("gokC0BCR",!0)),Cham:()=>new g(m("gwqB2BKNDJDD",!0)),Cherokee:()=>new g(m("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new g(m("w9jCb",!0)),Common:()=>new g(m("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new g(m("ifNxkKzDGG",!0)),Cuneiform:()=>new g(m("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new g(m("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new g(m("w8rCiD",!0)),Cyrillic:()=>new g(m("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new g(m("gghCvC",!0)),Devanagari:()=>new g(m("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new g(m("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new g(m("ggmC7B",!0)),Duployan:()=>new g(m("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new g(m("ggsC1iBL68D",!0)),Elbasan:()=>new g(m("gohCnB",!0)),Elymaic:()=>new g(m("g-jCW",!0)),Ethiopic:()=>new g(m("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new g(m("gqjClBEcJB",!0)),Georgian:()=>new g(m("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new g(m("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new g(m("w5gCa",!0)),Grantha:()=>new g(m("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new g(m("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new g(m("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new g(m("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new g(m("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new g(m("go4C5B",!0)),Han:()=>new g(m("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new g(m("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new g(m("gojCnBJJ",!0)),Hanunoo:()=>new g(m("g5FU",!0)),Hatran:()=>new g(m("gniCSCBGE",!0)),Hebrew:()=>new g(m("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new g(m("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new g(m("giiCVCI",!0)),Inherited:()=>new g(m("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new g(m("g7iCSGH",!0)),Inscriptional_Parthian:()=>new g(m("g6iCVDH",!0)),Javanese:()=>new g(m("gsqBtCDJFB",!0)),Kaithi:()=>new g(m("gkkCiCLA",!0)),Kannada:()=>new g(m("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new g(m("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new g(m("g4nCQCoBEc",!0)),Kayah_Li:()=>new g(m("goqBtBCA",!0)),Kharoshthi:()=>new g(m("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new g(m("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new g(m("g8F9CDJHJnPf",!0)),Khojki:()=>new g(m("gwkCRCuB",!0)),Khudawadi:()=>new g(m("w1kC6BGJ",!0)),Kirat_Rai:()=>new g(m("gq7C5B",!0)),Lao:()=>new g(m("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new g(m("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new g(m("ggH3BEOEC",!0)),Limbu:()=>new g(m("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new g(m("gwhC2JKVLH",!0)),Linear_B:()=>new g(m("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new g(m("wmpBvBx1eA",!0)),Lycian:()=>new g(m("g0gCc",!0)),Lydian:()=>new g(m("gpiCZGA",!0)),Mahajani:()=>new g(m("wqkCmB",!0)),Makasar:()=>new g(m("g3nCY",!0)),Malayalam:()=>new g(m("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new g(m("giCbDA",!0)),Manichaean:()=>new g(m("g2iCmBFL",!0)),Marchen:()=>new g(m("wjnCfDVCN",!0)),Masaram_Gondi:()=>new g(m("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new g(m("gy7C6C",!0)),Meetei_Mayek:()=>new g(m("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new g(m("gg6DkGDP",!0)),Meroitic_Cursive:()=>new g(m("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new g(m("gsiCf",!0)),Miao:()=>new g(m("g47CqCF4BIQ",!0)),Modi:()=>new g(m("gwlCkCMJ",!0)),Mongolian:()=>new g(m("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new g(m("gy6CeCJFB",!0)),Multani:()=>new g(m("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new g(m("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new g(m("gkiCeJI",!0)),Nag_Mundari:()=>new g(m("wm5DpB",!0)),Nandinagari:()=>new g(m("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new g(m("gsGrBFZHKEB",!0)),Newa:()=>new g(m("gglC7CCE",!0)),Nko:()=>new g(m("g+B6BDC",!0)),Nushu:()=>new g(m("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new g(m("go4DsBENDJFB",!0)),Ogham:()=>new g(m("g0Fc",!0)),Ol_Chiki:()=>new g(m("wiHvB",!0)),Ol_Onal:()=>new g(m("wu5DqBFA",!0)),Old_Hungarian:()=>new g(m("gkjCyBOyBIF",!0)),Old_Italic:()=>new g(m("g4gCjBKC",!0)),Old_North_Arabian:()=>new g(m("g0iCf",!0)),Old_Permic:()=>new g(m("w6gCqB",!0)),Old_Persian:()=>new g(m("g9gCjBFN",!0)),Old_Sogdian:()=>new g(m("g4jCnB",!0)),Old_South_Arabian:()=>new g(m("gziCf",!0)),Old_Turkic:()=>new g(m("ggjCoC",!0)),Old_Uyghur:()=>new g(m("w7jCZ",!0)),Oriya:()=>new g(m("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new g(m("wlhCjBFjB",!0)),Osmanya:()=>new g(m("gkhCdDJ",!0)),Pahawh_Hmong:()=>new g(m("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new g(m("gjiCf",!0)),Pau_Cin_Hau:()=>new g(m("g2mC4B",!0)),Phags_Pa:()=>new g(m("giqB3B",!0)),Phoenician:()=>new g(m("goiCbEA",!0)),Psalter_Pahlavi:()=>new g(m("g8iCRIDNG",!0)),Rejang:()=>new g(m("wpqBjBMA",!0)),Runic:()=>new g(m("g1FqCEK",!0)),Samaritan:()=>new g(m("ggCtBDO",!0)),Saurashtra:()=>new g(m("gkqBlCJL",!0)),Sharada:()=>new g(m("gskC-ChsCH",!0)),Shavian:()=>new g(m("wihCvB",!0)),Siddham:()=>new g(m("gslC1BDlB",!0)),Sidetic:()=>new g(m("gqiCZ",!0)),SignWriting:()=>new g(m("gg2DrUQECO",!0)),Sinhala:()=>new g(m("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new g(m("w5jCpB",!0)),Sora_Sompeng:()=>new g(m("wmkCYIJ",!0)),Soyombo:()=>new g(m("wymCyC",!0)),Sundanese:()=>new g(m("g8G-BhIH",!0)),Sunuwar:()=>new g(m("g+mChBPJ",!0)),Syloti_Nagri:()=>new g(m("ggqBsB",!0)),Syriac:()=>new g(m("g4BNC7BDCxIK",!0)),Tagalog:()=>new g(m("g4FVKA",!0)),Tagbanwa:()=>new g(m("g7FMCCCB",!0)),Tai_Le:()=>new g(m("wqGdDE",!0)),Tai_Tham:()=>new g(m("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new g(m("g0qBiCZE",!0)),Tai_Yo:()=>new g(m("g25DeCVJB",!0)),Takri:()=>new g(m("g0lC5BHJ",!0)),Tamil:()=>new g(m("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new g(m("wz6CuCCJ",!0)),Tangut:()=>new g(m("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new g(m("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new g(m("g8BxB",!0)),Thai:()=>new g(m("hwD5BGb",!0)),Tibetan:()=>new g(m("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new g(m("wpL3BIBPA",!0)),Tirhuta:()=>new g(m("gklCnCJJ",!0)),Todhri:()=>new g(m("guhCzB",!0)),Tolong_Siki:()=>new g(m("wtnCrBFJ",!0)),Toto:()=>new g(m("w04De",!0)),Tulu_Tigalari:()=>new g(m("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new g(m("g8gCdCA",!0)),Unknown:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new g(m("gopBrJ",!0)),Vithkuqi:()=>new g(m("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new g(m("g24D5BGA",!0)),Warang_Citi:()=>new g(m("glmCyCNA",!0)),Yezidi:()=>new g(m("g0jCpBCCDB",!0)),Yi:()=>new g(m("ggoBskBE2B",!0)),Zanabazar_Square:()=>new g(m("gwmCnC",!0))});static FOLD_CATEGORIES=new Ko({L:()=>new g(m("laA",!0)),LC:()=>new g(m("laA",!0)),Ll:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new g(m("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new g(m("5cgBgBlgHAB",!1)),Mn:()=>new g(m("5cgBgBlgHAB",!1)),Emoji:()=>new g(m("8mJA",!0)),Extended_Pictographic:()=>new g(m("8mJA",!0)),Lowercase:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new g(m("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))});static FOLD_SCRIPT=new Ko({Common:()=>new g(m("8cgBgB",!1)),Greek:()=>new g(m("1FwUwU",!1)),Inherited:()=>new g(m("5cgBgBlgHAB",!1))})},J=class Bt{static MAX_RUNE=1114111;static RUNE_ERROR=65533;static isUnsearchable(e){return e===Bt.RUNE_ERROR||e>=Bt.MIN_HIGH_SURROGATE&&e<=Bt.MAX_LOW_SURROGATE}static MAX_ASCII=127;static MAX_LATIN1=255;static MAX_BMP=65535;static MIN_FOLD=65;static MAX_FOLD=125251;static MIN_HIGH_SURROGATE=55296;static MAX_HIGH_SURROGATE=56319;static MIN_LOW_SURROGATE=56320;static MAX_LOW_SURROGATE=57343;static MIN_SUPPLEMENTARY_CODE_POINT=65536;static is32(e,t){let r=0,s=e.length;for(;r<s;){let i=r+Math.floor((s-r)/2),a=e.getLo(i),u=e.getHi(i);if(a<=t&&t<=u){let c=e.getStride(i);return(t-a)%c===0}t<a?s=i:r=i+1}return!1}static is(e,t){if(t<=Bt.MAX_LATIN1){for(let r=0;r<e.length;r++){if(t>e.getHi(r))continue;let s=e.getLo(r);if(t<s)return!1;let i=e.getStride(r);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Bt.is32(e,t)}static isPrint(e){return e<=Bt.MAX_LATIN1?e>=32&&e<Bt.MAX_ASCII||e>=161&&e!==173:Bt.is(yt.Print,e)}static simpleFold(e){if(yt.CASE_ORBIT.has(e))return yt.CASE_ORBIT.get(e);if(e<=Bt.MAX_ASCII){let t=x.toLowerCase(e);return t!==e?t:x.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Bt.MAX_ASCII&&t<=Bt.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let r=Bt.simpleFold(e);r!==e;r=Bt.simpleFold(r))if(r===t)return!0;return!1}},hB=256,fm=new Uint8Array(hB);for(let n=0;n<hB;n++)fm[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;var sB=null,iB=null,j=class _t{static METACHARACTERS="\\.+*?()|[]{}^$";static EMPTY_BEGIN_LINE=1;static EMPTY_END_LINE=2;static EMPTY_BEGIN_TEXT=4;static EMPTY_END_TEXT=8;static EMPTY_WORD_BOUNDARY=16;static EMPTY_NO_WORD_BOUNDARY=32;static EMPTY_ALL=-1;static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return x.CODES[0]<=e&&e<=x.CODES[9]||x.CODES.a<=e&&e<=x.CODES.z||x.CODES.A<=e&&e<=x.CODES.Z}static unhex(e){return x.CODES[0]<=e&&e<=x.CODES[9]?e-x.CODES[0]:x.CODES.a<=e&&e<=x.CODES.f?e-x.CODES.a+10:x.CODES.A<=e&&e<=x.CODES.F?e-x.CODES.A+10:-1}static escapeRune(e){let t="";if(J.isPrint(e))_t.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case x.CODES['"']:t+='\\"';break;case x.CODES["\\"]:t+="\\\\";break;case x.CODES["	"]:t+="\\t";break;case x.CODES[`
`]:t+="\\n";break;case x.CODES["\r"]:t+="\\r";break;case x.CODES["\b"]:t+="\\b";break;case x.CODES["\f"]:t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){let t=String(e),r=[],s=0;for(;s<t.length;){let i=t.codePointAt(s);r.push(i),s+=i>J.MAX_BMP?2:1}return new Int32Array(r)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<hB?fm[e]===1:!1}static emptyOpContext(e,t){let r=0;return e<0&&(r|=_t.EMPTY_BEGIN_TEXT|_t.EMPTY_BEGIN_LINE),e===10&&(r|=_t.EMPTY_BEGIN_LINE),t<0&&(r|=_t.EMPTY_END_TEXT|_t.EMPTY_END_LINE),t===10&&(r|=_t.EMPTY_END_LINE),_t.isWordRune(e)!==_t.isWordRune(t)?r|=_t.EMPTY_WORD_BOUNDARY:r|=_t.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>_t.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>J.MAX_BMP?2:1}static toArray(e){let t=e.length,r=new Array(t);for(let s=0;s<t;s++)r[s]=e[s];return r}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return sB||(sB=new TextEncoder),sB.encode(e);{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===J.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===J.MIN_LOW_SURROGATE?(i=J.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){iB||(iB=new TextDecoder("utf-8"));let t=e instanceof Uint8Array?e:new Uint8Array(e);return iB.decode(t)}else{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[r++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[r++],u=e[r++],c=e[r++],l=((i&7)<<18|(a&63)<<12|(u&63)<<6|c&63)-J.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(J.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(J.MIN_LOW_SURROGATE+(l&1023))}else{let a=e[r++],u=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|u&63)}}return t.join("")}}},pm=(n=[],e=0)=>{let t=Object.create(null);for(let r=0;r<n.length;r++){let s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)},Tr=class lB{static Encoding=pm(["UTF_16","UTF_8"]);getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===lB.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===lB.Encoding.UTF_16}},xg=class extends Tr{constructor(n=null){super(),this.bytes=n}getEncoding(){return Tr.Encoding.UTF_8}asCharSequence(){return j.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},eT=class extends Tr{constructor(n=null){super(),this.charSequence=n}getEncoding(){return Tr.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return j.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},Ir=class{static utf16(n){return new eT(n)}static utf8(n){return j.isByteArray(n)?new xg(n):new xg(j.stringToUtf8ByteArray(n))}},ot=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},tT=class hs extends ot{static RUNE_ERROR_STEP=J.RUNE_ERROR<<3|1;constructor(e,t=0,r=e.length){super(),this.bytes=e,this.start=t,this.end=r}hasString(e,t){let r=e.bytes;if(r.length===0)return!0;let s=this.indexOf(this.bytes,r,this.start+t);return s!==-1&&s<=this.end-r.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return ot.EOF();let t=this.bytes[e]&255;if(t<128)return t<<3|1;let r,s,i=128,a=191;if(t>=194&&t<=223)r=2,s=t&31;else if(t>=224&&t<=239)r=3,s=t&15,t===224?i=160:t===237&&(a=159);else if(t>=240&&t<=244)r=4,s=t&7,t===240?i=144:t===244&&(a=143);else return hs.RUNE_ERROR_STEP;if(e+r>this.end)return hs.RUNE_ERROR_STEP;let u=this.bytes[e+1]&255;if(u<i||u>a)return hs.RUNE_ERROR_STEP;if(s=s<<6|u&63,r>2){let c=this.bytes[e+2]&255;if((c&192)!==128)return hs.RUNE_ERROR_STEP;if(s=s<<6|c&63,r>3){let l=this.bytes[e+3]&255;if((l&192)!==128)return hs.RUNE_ERROR_STEP;s=s<<6|l&63}}return s<<3|r}index(e,t){t+=this.start;let r=this.indexOf(this.bytes,e.prefixUTF8,t);return r<0?r:r-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);let a=this.step(s-this.start);t=s+(a&7)===e?a>>3:J.RUNE_ERROR}}let r=e<this.end?this.step(e-this.start)>>3:-1;return j.emptyOpContext(t,r)}indexOf(e,t,r=0){let s=t.length;if(s===0)return r<=this.end?r:-1;let i=t[0],a=this.end-s,u=typeof e.indexOf=="function",c=r;for(;c<=a;){if(u){if(c=e.indexOf(i,c),c===-1||c>a)return-1}else{for(;c<=a&&e[c]!==i;)c++;if(c>a)return-1}let l=!0;for(let h=1;h<s;h++)if(e[c+h]!==t[h]){l=!1;break}if(l)return c;c++}return-1}prefixLength(e){return e.prefixUTF8.length}},nT=class extends ot{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){let t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(n){if(n+=this.start,n>=this.end)return ot.EOF();let e=this.charSequence.charCodeAt(n);if(e<J.MIN_HIGH_SURROGATE||e>J.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;let t=this.charSequence.charCodeAt(n+1);return t>=J.MIN_LOW_SURROGATE&&t<=J.MAX_LOW_SURROGATE?(e-J.MIN_HIGH_SURROGATE)*1024+(t-J.MIN_LOW_SURROGATE)+J.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;let t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;let e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return j.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},fe=class{static fromUTF8(n,e=0,t=n.length){return new tT(n,e,t)}static fromUTF16(n,e=0,t=n.length){return new nT(n,e,t)}},Vi=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},pe=class extends Vi{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},Li=class extends Vi{constructor(n){super(n),this.name="RE2JSCompileException"}},lt=class extends Vi{constructor(n){super(n),this.name="RE2JSGroupException"}},rT=class extends Vi{constructor(n){super(n),this.name="RE2JSFlagsException"}},Xo=class extends Vi{constructor(n){super(n),this.name="RE2JSInternalException"}},Vg=class Cm{static MAX_REPLACER_ARGS=65535;static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(r=>{let s=r.codePointAt(0);return s===x.CODES["\\"]||s===x.CODES.$?`\\${r}`:r}).join(""):e.indexOf("$")<0?e:e.split("").map(r=>r.codePointAt(0)===x.CODES.$?"$$":r).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;let r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=r.numberOfInstructions(),this.lookbehindState=null,t instanceof Tr?this.resetMatcherInput(t):j.isByteArray(t)?this.resetMatcherInput(Ir.utf8(t)):this.resetMatcherInput(Ir.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof Tr||(j.isByteArray(e)?e=Ir.utf8(e):e=Ir.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new lt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new lt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){let s=this.namedGroups[e];if(!Number.isFinite(s))throw new lt(`group '${e}' not found`);e=s}let t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}getNamedGroups(){if(!this.hasMatch)throw new lt("perhaps no match attempted");let e=Object.create(null);for(let t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new lt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new lt("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.matcherInputLength,r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!r[0])throw new lt("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,L.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,L.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new lt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){let t=(this.matcherInput.isUTF16Encoding()?fe.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):fe.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,L.UNANCHORED)}genMatch(e,t){let r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?j.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="",s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),r}appendReplacementInternalJava(e){let t="",r=0,s=e.length,i=0;for(;i<s;){let a=e.codePointAt(i);if(a===x.CODES["\\"]){if(r<i&&(t+=e.substring(r,i)),i++,i>=s)throw new lt("character to be escaped is missing");r=i,i++;continue}if(a===x.CODES.$){if(r<i&&(t+=e.substring(r,i)),i+1>=s)throw new lt("Illegal group reference: group index is missing");let u=e.codePointAt(i+1);if(x.CODES[0]<=u&&u<=x.CODES[9]){let c=u-x.CODES[0],l=i+2;for(;l<s;l++){let f=e.codePointAt(l);if(f<x.CODES[0]||f>x.CODES[9]||c*10+f-x.CODES[0]>this.patternGroupCount)break;c=c*10+f-x.CODES[0]}if(c>this.patternGroupCount)throw new lt(`n > number of groups: ${c}`);let h=this.group(c);h!==null&&(t+=h),i=l,r=i}else if(u===x.CODES["{"]){let c=i+2;for(;c<s&&e.codePointAt(c)!==x.CODES["}"];)c++;if(c>=s)throw new lt("named capture group is missing trailing '}'");let l=e.substring(i+2,c),h=this.group(l);h!==null&&(t+=h),i=c+1,r=i}else throw new lt("Illegal group reference");continue}i++}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalJs(e){let t=a=>a>=48&&a<=57,r=this.patternGroupCount,s="",i=0;for(;i<e.length;){let a=e.indexOf("$",i);if(a<0)break;s+=e.substring(i,a),i=a;let u=e.charCodeAt(i+1);if(u===x.CODES.$)s+="$",i+=2;else if(u===x.CODES["&"])s+=this.group(0),i+=2;else if(u===x.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(u===x.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(u)){let c=1,l=u-48,h=e.charCodeAt(i+2);if(t(h)&&l*10+h-48<=r&&(c=2,l=l*10+h-48),l>=1&&l<=r){let f=this.group(l);f!==null&&(s+=f)}else s+=e.substring(i,i+1+c);i+=1+c}else if(u===x.CODES["<"]&&this.hasNamedGroups){let c=e.indexOf(">",i+2);if(c<0)s+="$<",i+=2;else{let l=e.substring(i+2,c);if(Object.prototype.hasOwnProperty.call(this.namedGroups,l)){let h=this.group(l);h!==null&&(s+=h)}i=c+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";this.reset();let i=typeof e=="function",a=null;if(i){if(this.groupCount()>=Cm.MAX_REPLACER_ARGS)throw new lt("Too many capture groups to safely invoke replacer function");a=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a):this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let r="",s=this.start(),i=this.end();this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i;let a=this.matchArray();return a.push(s,t),this.hasNamedGroups&&a.push(this.namedGroupsObject()),r+=String(e(...a)),r}matchArray(){let e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){let r=this.group(t);e.push(r===null?void 0:r)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;let e=this.getNamedGroups();for(let t in e)e[t]===null&&(e[t]=void 0);return e}},O=class qe{static ALT=1;static ALT_MATCH=2;static CAPTURE=3;static EMPTY_WIDTH=4;static FAIL=5;static MATCH=6;static NOP=7;static RUNE=8;static RUNE1=9;static RUNE_ANY=10;static RUNE_ANY_NOT_NL=11;static LB_WRITE=12;static LB_CHECK=13;static isRuneOp(e){return qe.RUNE<=e&&e<=qe.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=j.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&L.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e):e===a}let t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&L.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}let t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case qe.ALT:return`alt -> ${this.out}, ${this.arg}`;case qe.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case qe.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case qe.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case qe.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case qe.FAIL:return"fail";case qe.NOP:return`nop -> ${this.out}`;case qe.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case qe.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case qe.RUNE:return this.runes===null?"rune <null>":["rune ",qe.escapeRunes(this.runes),(this.arg&L.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case qe.RUNE1:return`rune1 ${qe.escapeRunes(this.runes)} -> ${this.out}`;case qe.RUNE_ANY:return`any -> ${this.out}`;case qe.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},Mg=class gm{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}static INITIAL_THREADS=32;init(e){this.ncap=e;let t=Math.min(this.densePcs.length,gm.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){let t=this.densePcs.length*this.ncap,r=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));r.set(this.denseCaps),this.denseCaps=r}contains(e){let t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){let t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},sT=class{constructor(n){this.pos=-1,this.pcs=new Int32Array(n.numInst()),this.size=0,this.lbTable=new Int32Array(n.numLb+1)}reset(){this.pos=-1,this.size=0}},mm=class Em{static fromRE2(e){let t=new Em;return t.prog=e.prog,t.re2=e,t.q0=new Mg(t.prog.numInst()),t.q1=new Mg(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?j.emptyInts():j.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,r,s=null){let i=this.re2.cond;if(i===j.EMPTY_ALL||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let a=this.prog.numLb>0,u=t,c=t,l=!1;a&&(s!==null&&s.pos>=0&&s.pos<=t?(c=s.pos,l=!0):c=0);let h=a&&s!==null,f=this.q0,C=this.q1,_=e.step(c),D=_>>3,P=_&7,V=-1,q=0;_!==ot.EOF()&&(_=e.step(c+P),V=_>>3,q=_&7);let z;for(c===0?z=j.emptyOpContext(-1,D):z=e.context(c),a&&(l?this.restoreLookbehinds(s,f,z):this.spawnLookbehinds(f,c,z));;){if(f.mainThreads===0){if((i&j.EMPTY_BEGIN_TEXT)!==0&&c!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&c!==0||this.matched)break;if(this.prog.numLb===0&&f.isEmpty()&&this.re2.prefix.length!==0&&V!==this.re2.prefixRune&&e.canCheckPrefix()){let Ae=e.index(this.re2,c);if(Ae<0)break;c+=Ae,_=e.step(c),D=_>>3,P=_&7,_=e.step(c+P),V=_>>3,q=_&7,z=e.context(c)}}c>=u&&(h&&(this.saveLookbehinds(s,f,c),h=!1),!this.matched&&(c===0||r===L.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=c),this.add(f,this.prog.start,c,this.matchcap,0,z)));let ie=c+P;if(z=e.context(ie),this.step(f,C,c,ie,D,z,r,c===e.endPos()),P===0||this.ncap===0&&this.matched)break;c+=P,D=V,P=q,D!==-1&&(_=e.step(c+P),V=_>>3,q=_&7);let De=f;f=C,C=De}return f.clear(),C.clear(),this.matched}matchSet(e,t,r){let s=this.re2.cond;if(s===j.EMPTY_ALL)return[];if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,u=this.q0,c=this.q1,l=e.step(i),h=l>>3,f=l&7,C=-1,_=0;l!==ot.EOF()&&(l=e.step(i+f),C=l>>3,_=l&7);let D=i===0?j.emptyOpContext(-1,h):e.context(i),P=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(u,i,D);!(u.mainThreads===0&&((s&j.EMPTY_BEGIN_TEXT)!==0&&i!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&i!==0));){(i===0||r===L.UNANCHORED)&&i>=a&&this.add(u,this.prog.start,i,this.matchcap,0,D);let V=i+f;D=e.context(V);for(let z=0;z<u.size;z++){let ie=u.densePcs[z],De=this.prog.inst[ie],Ae=z*this.ncap,we=!1;switch(De.op){case O.MATCH:if(r===L.ANCHOR_BOTH&&i!==e.endPos())break;P.add(De.arg);break;case O.RUNE:we=De.matchRune(h);break;case O.RUNE1:we=h===De.runes[0];break;case O.RUNE_ANY:we=!0;break;case O.RUNE_ANY_NOT_NL:we=h!==10;break;default:continue}we&&this.add(c,De.out,V,u.denseCaps,Ae,D)}if(u.clear(),f===0)break;i+=f,h=C,f=_,h!==-1&&(l=e.step(i+f),C=l>>3,_=l&7);let q=u;u=c,c=q}return c.clear(),Array.from(P).sort((V,q)=>V-q)}step(e,t,r,s,i,a,u,c){let l=this.re2.longest;for(let h=0;h<e.size;h++){let f=e.densePcs[h],C=h*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[C])continue;let _=this.prog.inst[f],D=!1;switch(_.op){case O.MATCH:if(u===L.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<r)){e.denseCaps[C+1]=r;for(let P=0;P<this.ncap;P++)this.matchcap[P]=e.denseCaps[C+P]}l||(e.size=0),this.matched=!0;break;case O.RUNE:D=_.matchRune(i);break;case O.RUNE1:D=i===_.runes[0];break;case O.RUNE_ANY:D=!0;break;case O.RUNE_ANY_NOT_NL:D=i!==10;break;default:continue}D&&this.add(t,_.out,s,e.denseCaps,C,a)}e.clear()}spawnLookbehinds(e,t,r){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,r)}restoreLookbehinds(e,t,r){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,r)}saveLookbehinds(e,t,r){let s=0;for(let i=0;i<t.size;i++){let a=t.densePcs[i];this.prog.lbInst[a]===1&&O.isRuneOp(this.prog.inst[a].op)&&(e.pcs[s++]=a)}e.size=s,e.pos=r,e.lbTable.set(this.lbTable)}add(e,t,r,s,i,a){let u=this.addStack,c=0;for(;;){for(;t!==0&&!e.contains(t);){let h=e.add(t),f=this.prog.inst[t];switch(f.op){case O.FAIL:t=0;break;case O.ALT:case O.ALT_MATCH:u[c++]=f.arg,u[c++]=0,t=f.out;break;case O.EMPTY_WIDTH:t=(f.arg&~a)===0?f.out:0;break;case O.NOP:t=f.out;break;case O.CAPTURE:f.arg<this.ncap&&(u[c++]=-f.arg-1,u[c++]=s[i+f.arg],s[i+f.arg]=r),t=f.out;break;case O.LB_WRITE:this.lbTable[Math.abs(f.arg)]=r,t=f.out;break;case O.LB_CHECK:f.arg>0?t=this.lbTable[f.arg]===r?f.out:0:t=this.lbTable[-f.arg]!==r?f.out:0;break;case O.MATCH:case O.RUNE:case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){let C=h*this.ncap;C+this.ncap>e.denseCaps.length&&e.growCaps(C+this.ncap);for(let _=0;_<this.ncap;_++)e.denseCaps[C+_]=s[i+_]}t=0;break;default:throw new Xo("unhandled")}}if(c===0)return;c-=2;let l=u[c];l<0?(s[i-l-1]=u[c+1],t=0):t=l}}},iT=(n,e,t)=>{let r=-2128831035;for(let s=0;s<n.length;s++)r^=n[s],r=Math.imul(r,16777619);r^=e,r=Math.imul(r,16777619);for(let s=0;s<t.length;s++)r^=t[s],r=Math.imul(r,16777619);return r},Gg=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0},Ug=(n,e,t,r)=>n.flag===t&&Gg(n.nfaStates,e)&&Gg(n.matchIDs,r),aB=[],Fi=-1,Jo=class{constructor(n,e,t){this.nfaStates=n,this.flag=e,this.isMatch=(e&dB.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},dB=class je{static FLAG_EMPTY_MASK=255;static FLAG_MATCH=256;static FLAG_LAST_WORD=512;static FLAG_NEED_SHIFT=16;static STATE_OVERHEAD=150;static ARRAY_OVERHEAD=40;static ELEMENT_SIZE=8;static TABLE_OVERHEAD=48;static PROGRESS_PER_STATE=10;constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let r=0;r<e.numInst();r++){let s=e.getInst(r).op;if(s===O.LB_WRITE||s===O.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){let e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){let i=this.prog.getInst(s);switch(i.op){case O.RUNE:case O.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),(i.arg&L.FOLD_CASE)!==0)for(let a=J.simpleFold(i.runes[0]);a!==i.runes[0];a=J.simpleFold(a))t(a,a)}else for(let a=0;a<i.runes.length;a+=2)t(i.runes[a],i.runes[a+1]);break;case O.RUNE_ANY_NOT_NL:t(10,10);break;case O.EMPTY_WIDTH:(i.arg&(j.EMPTY_BEGIN_LINE|j.EMPTY_END_LINE))!==0&&t(10,10),(i.arg&(j.EMPTY_WORD_BOUNDARY|j.EMPTY_NO_WORD_BOUNDARY))!==0&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;let r=new Int32Array(J.MAX_LATIN1+1);for(let s=0;s<=J.MAX_LATIN1;s++)r[s]=this.searchClass(s);this.latin1Class=r}runeClass(e){return e<=J.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){let t=this.classBounds,r=0,s=t.length;for(;r<s;){let i=r+s>>1;t[i]<=e?r=i+1:s=i}return r}closure(e,t){let r=new Set,s=Array.from(e),i=0;for(;s.length>0;){let a=s.pop();if(a===0||r.has(a))continue;r.add(a);let u=this.prog.getInst(a);switch(u.op){case O.ALT:case O.ALT_MATCH:s.push(u.out),s.push(u.arg);break;case O.NOP:case O.CAPTURE:s.push(u.out);break;case O.EMPTY_WIDTH:i|=u.arg,(u.arg&~t)===0&&s.push(u.out)}}return{pcs:Array.from(r).sort((a,u)=>a-u),needflags:i}}getState(e,t,r){let s=iT(e,t,r),i=this.stateCache.get(s);if(i instanceof Jo){if(Ug(i,e,t,r))return i}else if(i!==void 0){for(let c=0;c<i.length;c++)if(Ug(i[c],e,t,r))return i[c]}let a=je.stateCost(e,r);if(this.memBudget<a)return null;this.memBudget-=a;let u=new Jo(e,t,r);return i===void 0?this.stateCache.set(s,u):i instanceof Jo?this.stateCache.set(s,[i,u]):i.push(u),this.stateCount++,u}static stateCost(e,t){let r=t.length===0?0:je.ARRAY_OVERHEAD+je.ELEMENT_SIZE*t.length;return je.STATE_OVERHEAD+je.ELEMENT_SIZE*e.length+r}*cachedStates(){for(let e of this.stateCache.values())e instanceof Jo?yield e:yield*e}makeState(e,t,r){let s=this.closure(e,t&je.FLAG_EMPTY_MASK),i=t;return s.needflags===0&&(i&=je.FLAG_MATCH),i|=s.needflags<<je.FLAG_NEED_SHIFT,this.getState(s.pcs,i,r)}allocTable(e,t){let r=this.numClasses+1,s=je.TABLE_OVERHEAD+je.ELEMENT_SIZE*r;if(this.memBudget<s)return null;this.memBudget-=s;let i=new Array(r).fill(null);return t===L.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,r,s){let i=s===L.UNANCHORED?e.next:e.nextAnchored;if(i!==null){let z=i[t];if(z!==null)return z}else if(i=this.allocTable(e,s),i===null)return null;let a=e.flag>>>je.FLAG_NEED_SHIFT,u=e.flag&je.FLAG_EMPTY_MASK,c=u,l=0;r===10&&(c|=j.EMPTY_END_LINE,l|=j.EMPTY_BEGIN_LINE),r===Fi&&(c|=j.EMPTY_END_LINE|j.EMPTY_END_TEXT);let h=(e.flag&je.FLAG_LAST_WORD)!==0,f=r!==Fi&&j.isWordRune(r);c|=f===h?j.EMPTY_NO_WORD_BOUNDARY:j.EMPTY_WORD_BOUNDARY;let C=e.nfaStates;(c&~u&a)!==0&&(C=this.closure(C,c).pcs);let _=[],D=!1,P=aB;for(let z=0;z<C.length;z++){let ie=this.prog.getInst(C[z]);ie.op===O.MATCH?(D||(D=!0,P=[]),P.push(ie.arg)):r!==Fi&&O.isRuneOp(ie.op)&&ie.matchRune(r)&&_.push(ie.out)}P.length>1&&P.sort((z,ie)=>z-ie),s===L.UNANCHORED&&r!==Fi&&_.push(this.prog.start);let V=l;D&&(V|=je.FLAG_MATCH),f&&(V|=je.FLAG_LAST_WORD);let q=this.makeState(_,V,P);return q===null?null:(i[t]=q,q)}start(e,t){let r=e.context(t),s;if((r&j.EMPTY_BEGIN_TEXT)!==0)s=j.EMPTY_BEGIN_TEXT|j.EMPTY_BEGIN_LINE;else if((r&j.EMPTY_BEGIN_LINE)!==0)s=j.EMPTY_BEGIN_LINE;else{let a=e.step(t),u=a>=0&&j.isWordRune(a>>3);s=(r&j.EMPTY_WORD_BOUNDARY)!==0!==u?je.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,aB),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,aB),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,r,s,i,a){let u=this.step(e,t,r,s);if(u!==null)return u;if(a.resetPos>=0&&i-a.resetPos<je.PROGRESS_PER_STATE*this.stateCount)return null;a.resetPos=i;let c=this.resetCache(e);return c===null?null:(u=this.step(c,t,r,s),u)}run(e,t,r,s,i){let a=e.endPos(),u=this.latin1Class,c=r===L.UNANCHORED,l={resetPos:-1},h=t;for(;h<a;){let f=e.step(h),C=f>>3,_=f&7;if(_===0)break;let D=C<=J.MAX_LATIN1?u[C]:this.runeClass(C),P=c&&s.next!==null?s.next[D]:null;if(P===null&&(P=this.stepOrReset(s,D,C,r,h,l),P===null))return null;if(s=P,s.isMatch&&i(s,!1))return!0;if(!c&&s.nfaStates.length===0)return!1;h+=_}return s=this.stepOrReset(s,this.numClasses,Fi,r,h,l),s===null?null:s.isMatch&&i(s,!0)}match(e,t,r){if(this.failed)return null;if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;let s=this.start(e,t);return s===null?null:this.run(e,t,r,s,(i,a)=>r!==L.ANCHOR_BOTH||a)}matchSet(e,t,r){if(this.failed)return null;if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];let s=this.start(e,t);if(s===null)return null;let i=new Set,a=(u,c)=>{if(r!==L.ANCHOR_BOTH||c)for(let l=0;l<u.matchIDs.length;l++)i.add(u.matchIDs[l]);return!1};return this.run(e,t,r,s,a)===null?null:Array.from(i).sort((u,c)=>u-c)}},aT=32,oT=500,oB=256,uT=262144,cT=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(oB),this.jobArg=new Uint8Array(oB),this.jobPos=new Int32Array(oB),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;let r=n.numInst()*(e+1)+aT-1>>>5;this.visited.length<r?this.visited=new Uint32Array(r):this.visited.fill(0,0,r),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){let t=n*(this.end+1)+e,r=t>>>5,s=1<<(t&31);return(this.visited[r]&s)!==0?!1:(this.visited[r]|=s,!0)}push(n,e,t,r){if(n.prog.getInst(e).op!==O.FAIL&&(r||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){let s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;let a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;let u=new Int32Array(s);u.set(this.jobPos),this.jobPos=u}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=r?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,r,s){let i=n.longest;for(this.push(n,t,r,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],u=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(a,c));){l=!1;let h=n.prog.getInst(a);switch(h.op){case O.FAIL:break;case O.ALT:if(u){u=!1,a=h.arg;continue}else{this.push(n,a,c,!0),a=h.out;continue}case O.ALT_MATCH:{let f=n.prog.getInst(h.out);if(O.isRuneOp(f.op)){this.push(n,h.arg,c,!1),a=h.arg,c=this.end;continue}this.push(n,h.out,this.end,!1),a=h.out;continue}case O.RUNE:{let f=e.step(c);if(f===ot.EOF()||!h.matchRune(f>>3))break;c+=f&7,a=h.out;continue}case O.RUNE1:{let f=e.step(c);if(f===ot.EOF()||f>>3!==h.runes[0])break;c+=f&7,a=h.out;continue}case O.RUNE_ANY_NOT_NL:{let f=e.step(c);if(f===ot.EOF()||f>>3===10)break;c+=f&7,a=h.out;continue}case O.RUNE_ANY:{let f=e.step(c);if(f===ot.EOF())break;c+=f&7,a=h.out;continue}case O.CAPTURE:if(u){this.cap[h.arg]=c;break}else{h.arg<this.ncap&&(this.push(n,a,this.cap[h.arg],!0),this.cap[h.arg]=c),a=h.out;continue}case O.EMPTY_WIDTH:{let f=e.context(c);if((h.arg&~f)!==0)break;a=h.out;continue}case O.NOP:a=h.out;continue;case O.MATCH:{if(s===L.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);let f=this.matchcap[1];if((f===-1||i&&c>0&&c>f)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case O.LB_WRITE:case O.LB_CHECK:throw new Xo("Backtracker cannot evaluate Lookbehind instructions");default:throw new Xo("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}},zo=[],Wo=class _m{static shouldBacktrack(e){return e.numInst()<=oT}static maxBitStateLen(e){return _m.shouldBacktrack(e)?Math.floor(uT/e.numInst()):0}static execute(e,t,r,s,i){let a=e.cond;if(a===j.EMPTY_ALL||(s===L.ANCHOR_START||s===L.ANCHOR_BOTH)&&r!==0||(a&j.EMPTY_BEGIN_TEXT)!==0&&r!==0)return null;let u=zo.length>0?zo.pop():new cT,c=t.endPos();u.reset(e.prog,c,i);let l=!1;if((a&j.EMPTY_BEGIN_TEXT)!==0||s===L.ANCHOR_START||s===L.ANCHOR_BOTH)u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)&&(l=!0);else{let f=-1;for(;r<=c&&f!==0;r+=f){if(e.prefix.length>0){let _=t.index(e,r);if(_<0)break;r+=_}if(u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)){l=!0;break}let C=t.step(r);f=C===ot.EOF()?0:C&7}}if(!l)return zo.push(u),null;let h=i===0?[]:j.toArray(u.matchcap.subarray(0,i));return zo.push(u),h}},Hg=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}},lT=(n,e,t,r)=>{let s=n.length,i=e.length,a=0,u=0,c=[],l=[],h=!0,f=-1,C=_=>{let D=_?n:e,P=_?a:u,V=_?t:r;return f>0&&D[P]<=c[f]?!1:(c.push(D[P],D[P+1]),_?a+=2:u+=2,f+=2,l.push(V),!0)};for(;a<s||u<i;)if(u>=i?h=C(!0):a>=s||e[u]<n[a]?h=C(!1):h=C(!0),!h)return null;return{merged:c,next:l}},BT=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){let t=n.inst[e],r=new O(t.op);r.out=t.out,r.arg=t.arg,r.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),r.next=null,this.inst[e]=r}}},hT=n=>{let e=new BT(n);for(let t=0;t<e.inst.length;t++){let r=e.inst[t];if(r.op!==O.ALT&&r.op!==O.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[r[i]];if(a.op!==O.ALT&&a.op!==O.ALT_MATCH&&(s="arg",i="out",a=e.inst[r[i]],a.op!==O.ALT&&a.op!==O.ALT_MATCH))continue;let u=e.inst[r[s]];if(u.op===O.ALT||u.op===O.ALT_MATCH)continue;let c="out",l="arg",h=!1;a.out===t?h=!0:a.arg===t&&(h=!0,c="arg",l="out"),h&&(a[c]=r[s]),r[s]===a[c]&&(r[i]=a[l])}return e},dT=n=>{if(n.inst.length>=1e3)return null;let e=new Hg(n.inst.length),t=new Hg(n.inst.length),r=new Array(n.inst.length),s=new Array(n.inst.length).fill(!1),i=a=>{let u=!0,c=n.inst[a];if(t.contains(a))return!0;switch(t.insert(a),c.op){case O.ALT:case O.ALT_MATCH:{u=i(c.out)&&i(c.arg);let l=s[c.out],h=s[c.arg];if(l&&h)return!1;if(h){let D=c.out;c.out=c.arg,c.arg=D;let P=l;l=h,h=P}l&&(s[a]=!0,c.op=O.ALT_MATCH);let f=r[c.out]||[],C=r[c.arg]||[],_=lT(f,C,c.out,c.arg);if(!_)return!1;r[a]=new Int32Array(_.merged),c.next=new Uint32Array(_.next);break}case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:u=i(c.out),s[a]=s[c.out],r[a]=r[c.out]?new Int32Array(r[c.out]):new Int32Array(0),c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out);break;case O.MATCH:case O.FAIL:s[a]=c.op===O.MATCH;break;case O.RUNE:{if(s[a]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){r[a]=new Int32Array(0),c.next=new Uint32Array([c.out]);break}let l=[];if(c.runes.length===1&&(c.arg&L.FOLD_CASE)!==0){let h=c.runes[0];l.push(h,h);for(let f=J.simpleFold(h);f!==h;f=J.simpleFold(f))l.push(f,f);l.sort((f,C)=>f-C)}else for(let h=0;h<c.runes.length;h++)l.push(c.runes[h]);r[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE1:{if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let l=[];if((c.arg&L.FOLD_CASE)!==0){let h=c.runes[0];l.push(h,h);for(let f=J.simpleFold(h);f!==h;f=J.simpleFold(f))l.push(f,f);l.sort((f,C)=>f-C)}else l.push(c.runes[0],c.runes[0]);r[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE_ANY:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=new Int32Array([0,J.MAX_RUNE]),c.next=new Uint32Array([c.out]);break;case O.RUNE_ANY_NOT_NL:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=new Int32Array([0,9,11,J.MAX_RUNE]),c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out)}return u};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<n.inst.length;a++)r[a]&&(n.inst[a].runes=r[a]);return n},fT=(n,e)=>{for(let t=0;t<e.inst.length;t++){let r=e.inst[t];switch(r.op){case O.ALT:case O.ALT_MATCH:case O.RUNE:break;case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:case O.MATCH:case O.FAIL:n.inst[t].next=null;break;case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=r.op,n.inst[t].runes=r.runes?new Int32Array(r.runes):new Int32Array(0)}}},qg=class ym{static compile(e){if(e.start===0||e.numLb>0)return null;let t=e.inst[e.start];if(t.op!==O.EMPTY_WIDTH||(t.arg&j.EMPTY_BEGIN_TEXT)===0)return null;let r=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===O.ALT||e.inst[i].op===O.ALT_MATCH){r=!0;break}for(let i=0;i<e.inst.length;i++){let a=e.inst[i],u=e.inst[a.out].op;switch(a.op){case O.ALT:case O.ALT_MATCH:if(u===O.MATCH||e.inst[a.arg].op===O.MATCH)return null;break;case O.EMPTY_WIDTH:if(u===O.MATCH){if((a.arg&j.EMPTY_END_TEXT)===j.EMPTY_END_TEXT)continue;return null}break;default:if(u===O.MATCH&&r)return null}}let s=hT(e);return s=dT(s),s!==null&&fT(s,e),s}static next(e,t){let r=e.matchRunePos(t);return r>=0?e.next[r]:e.op===O.ALT_MATCH?e.out:0}static execute(e,t,r,s,i){let a=e.onepass;if(!a)return null;let u=new Int32Array(i).fill(-1),c=!1,l=t.step(r),h=l>>3,f=l&7,C=ot.EOF(),_=-1,D=0;l!==ot.EOF()&&(C=t.step(r+f),C!==ot.EOF()&&(_=C>>3,D=C&7));let P=r===0?j.emptyOpContext(-1,h):t.context(r),V=a.start,q;for(;;){switch(q=a.inst[V],V=q.out,q.op){case O.MATCH:return s===L.ANCHOR_BOTH&&r!==t.endPos()?null:(c=!0,u.length>0&&(u[0]=0,u[1]=r),i===0?[]:j.toArray(u));case O.RUNE:if(!q.matchRune(h))return null;break;case O.RUNE1:if(h!==q.runes[0])return null;break;case O.RUNE_ANY:break;case O.RUNE_ANY_NOT_NL:if(h===10)return null;break;case O.ALT:case O.ALT_MATCH:V=ym.next(q,h);continue;case O.FAIL:return null;case O.NOP:continue;case O.EMPTY_WIDTH:if((q.arg&~P)!==0)return null;continue;case O.CAPTURE:q.arg<u.length&&(u[q.arg]=r);continue;default:throw new Xo("bad inst")}if(f===0)break;P=j.emptyOpContext(h,_),r+=f,h=_,f=D,h!==-1&&(C=t.step(r+f),C!==ot.EOF()?(_=C>>3,D=C&7):(_=-1,D=0))}return c?i===0?[]:j.toArray(u):null}},I=class Z{static Op=pm(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"]);static isPseudoOp(e){return e>=Z.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===x.CODES["-"]?"\\":""}static fromRegexp(e){let t=new Z(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=Z.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=Z.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case Z.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case Z.Op.EMPTY_MATCH:e+="(?:)";break;case Z.Op.STAR:case Z.Op.PLUS:case Z.Op.QUEST:case Z.Op.REPEAT:{let t=this.subs[0];switch(t.op>Z.Op.CAPTURE||t.op===Z.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case Z.Op.STAR:e+="*";break;case Z.Op.PLUS:e+="+";break;case Z.Op.QUEST:e+="?";break;case Z.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}(this.flags&L.NON_GREEDY)!==0&&(e+="?");break}case Z.Op.CONCAT:for(let t of this.subs)t.op===Z.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case Z.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case Z.Op.LITERAL:(this.flags&L.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=j.escapeRune(t);(this.flags&L.FOLD_CASE)!==0&&(e+=")");break;case Z.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case Z.Op.ANY_CHAR:e+="(?s:.)";break;case Z.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case Z.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case Z.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==Z.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case Z.Op.BEGIN_TEXT:e+="\\A";break;case Z.Op.END_TEXT:(this.flags&L.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case Z.Op.BEGIN_LINE:e+="^";break;case Z.Op.END_LINE:e+="$";break;case Z.Op.WORD_BOUNDARY:e+="\\b";break;case Z.Op.NO_WORD_BOUNDARY:e+="\\B";break;case Z.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===J.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){let r=this.runes[t]+1,s=this.runes[t+1]-1;e+=Z.quoteIfHyphen(r),e+=j.escapeRune(r),r!==s&&(e+="-",e+=Z.quoteIfHyphen(s),e+=j.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){let r=this.runes[t],s=this.runes[t+1];e+=Z.quoteIfHyphen(r),e+=j.escapeRune(r),r!==s&&(e+="-",e+=Z.quoteIfHyphen(s),e+=j.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===Z.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){let r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof Z)||this.op!==e.op)return!1;switch(this.op){case Z.Op.END_TEXT:if((this.flags&L.WAS_DOLLAR)!==(e.flags&L.WAS_DOLLAR))return!1;break;case Z.Op.LITERAL:case Z.Op.CHAR_CLASS:if((this.flags&L.FOLD_CASE)!==(e.flags&L.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case Z.Op.ALTERNATE:case Z.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case Z.Op.STAR:case Z.Op.PLUS:case Z.Op.QUEST:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.REPEAT:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case Z.Op.PLB:case Z.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},fB=class{static walk(n,e){let t=[],r=n,s;for(;;){if(r.subs.length===0)s=e.leaf(r);else{let i=e.enter(r);if(i.result===void 0){t.push({re:r,state:i,i:0}),r=r.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;let i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){r=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},jg=class{constructor(n,e){let t=new Map,r=[0],s=[0],i=[0],a=[0];for(let D of n){let P=0;for(let V=0;V<D.length;V++){let q=P*e+D[V],z=t.get(q);z===void 0&&(z=r.length,t.set(q,z),r.push(P),s.push(D[V]),i.push(i[P]+1),a.push(0)),P=z}a[P]=1}let u=r.length,c=new Int32Array(u-1);for(let D=1;D<u;D++)c[D-1]=D;c.sort((D,P)=>r[D]-r[P]||s[D]-s[P]);let l=new Int32Array(u+1);for(let D=1;D<u;D++)l[r[D]+1]++;for(let D=0;D<u;D++)l[D+1]+=l[D];let h=new Int32Array(u-1);for(let D=0;D<c.length;D++)h[D]=s[c[D]];this.childStart=l,this.childUnit=h,this.childNode=c;let f=new Int32Array(u);for(let D=0;D<u;D++)f[D]=D;f.sort((D,P)=>i[D]-i[P]);let C=new Int32Array(u),_=Uint8Array.from(a);for(let D=1;D<u;D++){let P=f[D],V=r[P];if(V!==0){let q=C[V],z=this.next(q,s[P]);for(;z<0&&q!==0;)q=C[q],z=this.next(q,s[P]);C[P]=z>=0?z:0}_[P]|=_[C[P]]}this.fail=C,this.match=_}next(n,e){let t=this.childStart[n],r=this.childStart[n+1],s=this.childUnit;for(;t<r;){let i=t+r>>1,a=s[i];if(a===e)return this.childNode[i];a<e?t=i+1:r=i}return-1}advance(n,e){for(;;){let t=this.next(n,e);if(t>=0)return t;if(n===0)return 0;n=this.fail[n]}}searchUTF16(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n.charCodeAt(s)),this.match[r]===1)return!0;return!1}searchUTF8(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n[s]),this.match[r]===1)return!0;return!1}},se=class ds{static Type={NONE:0,EXACT:1,AND:2,OR:3};static MAX_SCANS=32;static MAX_AC_UNITS=1<<18;constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===ds.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){let e=this.subs.map(t=>{let r=new Array(t.str.length);for(let s=0;s<t.str.length;s++)r[s]=t.str.charCodeAt(s);return r});this.ac16=new jg(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new jg(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case ds.Type.NONE:return!0;case ds.Type.EXACT:return e.hasString(this,t);case ds.Type.AND:for(let r=0;r<this.subs.length;r++)if(!this.subs[r].eval(e,t))return!1;return!0;case ds.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let r=0;r<this.subs.length;r++)if(this.subs[r].eval(e,t))return!0;return!1;default:return!0}}},pT=class fs{static build(e){return e?fB.walk(e,fs.WALKER):new se(se.Type.NONE)}static WALKER={leaf:e=>fs.leaf(e),enter:e=>fs.enter(e),child:(e,t,r)=>fs.child(e,t,r),leave:(e,t)=>fs.leave(e,t)};static leaf(e){if(e.op!==I.Op.LITERAL)return new se(se.Type.NONE);if(e.runes.length===0||(e.flags&L.FOLD_CASE)!==0)return new se(se.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(J.isUnsearchable(e.runes[s]))return new se(se.Type.NONE);t+=String.fromCodePoint(e.runes[s])}let r=new se(se.Type.EXACT);return r.str=t,r.bytes=j.stringToUtf8ByteArray(r.str),r}static enter(e){switch(e.op){case I.Op.CAPTURE:case I.Op.PLUS:return{sub:null};case I.Op.REPEAT:return e.min>=1?{sub:null}:{result:new se(se.Type.NONE)};case I.Op.CONCAT:return{pf:new se(se.Type.AND),subs:[]};case I.Op.ALTERNATE:return{pf:new se(se.Type.OR),subs:[]};default:return{result:new se(se.Type.NONE)}}}static child(e,t,r){if(t.subs===void 0){t.sub=r;return}if(t.pf.type===se.Type.AND){if(r.type===se.Type.NONE)return;if(r.type===se.Type.AND){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r);return}if(r.type===se.Type.NONE){t.result=new se(se.Type.NONE);return}if(r.type===se.Type.OR){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r)}static leave(e,t){if(t.subs===void 0)return t.sub;let r=t.pf,s=new Set,i=[];for(let l of t.subs){if(l.type===se.Type.EXACT){if(s.has(l.str))continue;s.add(l.str)}i.push(l)}if(r.type===se.Type.AND){let l=[],h=0;for(let f of i)h+f.cost>se.MAX_SCANS||(l.push(f),h+=f.cost);return l.length===0?new se(se.Type.NONE):l.length===1?l[0]:(r.subs=l,r.cost=h,r)}if(i.length===0)return new se(se.Type.NONE);if(i.length===1)return i[0];r.subs=i;let a=!0,u=0,c=0;for(let l of i)l.type!==se.Type.EXACT?a=!1:c+=l.bytes.length,u+=l.cost;return a?c>se.MAX_AC_UNITS?new se(se.Type.NONE):(r.allExact=!0,r.cost=1,r):u>se.MAX_SCANS?new se(se.Type.NONE):(r.cost=u,r)}},Nt=class{constructor(n=0,e=0){this.head=n,this.tail=e}},CT=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new O(n))}markLookbehindInsts(){let n=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){let t=e.pop();if(t===0||n[t]===1)continue;n[t]=1;let r=this.inst[t];switch(r.op){case O.ALT:case O.ALT_MATCH:e.push(r.out,r.arg);break;case O.MATCH:case O.FAIL:break;default:e.push(r.out)}}this.lbInst=n}skipNop(n){let e=this.inst[n];for(;e.op===O.NOP||e.op===O.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!O.isRuneOp(e.op)||e.runes.length!==1)return[e.op===O.MATCH,n];for(;O.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&L.FOLD_CASE)===0&&!J.isUnsearchable(e.runes[0]);)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===O.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){let t=this.inst[e];switch(t.op){case O.EMPTY_WIDTH:n|=t.arg;break;case O.FAIL:return-1;case O.CAPTURE:case O.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){let r=this.inst[t>>1];(t&1)===0?(t=r.out,r.out=e):(t=r.arg,r.arg=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;let t=this.inst[n.tail>>1];return(n.tail&1)===0?t.out=e.head:t.arg=e.head,new Nt(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){let t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},gT=new Int32Array([0,x.CODES[`
`]-1,x.CODES[`
`]+1,J.MAX_RUNE]),Kg=new Int32Array([0,J.MAX_RUNE]),Qo=class{constructor(n=0,e=new Nt,t=!1){this.i=n,this.out=e,this.nullable=t}},Dm=class BB{static compileRegexp(e){let t=new BB,r=t.compile(e);return t.prog.patch(r.out,t.newInst(O.MATCH).i),t.prog.start=r.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){let t=new BB;if(e.length===0)return t.prog.start=t.newInst(O.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let r=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;let a=t.compile(e[i]),u=t.newInst(O.MATCH);t.prog.getInst(u.i).arg=i,t.prog.patch(a.out,u.i),r.push(a.i)}let s=r[0];for(let i=1;i<r.length;i++){let a=t.newInst(O.ALT),u=t.prog.getInst(a.i);u.out=s,u.arg=r[i],s=a.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new CT,this.newInst(O.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,r)=>this.child(e,t,r),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new Qo(this.prog.numInst()-1,new Nt,!0)}nop(){let e=this.newInst(O.NOP);return e.out=new Nt(e.i<<1,e.i<<1),e}fail(){return new Qo}cap(e){let t=this.newInst(O.CAPTURE);return t.out=new Nt(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new Qo(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Nt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Nt(r.i<<1|1,r.i<<1|1)),this.prog.patch(e.out,r.i),r}quest(e,t){if(e.i===0)return this.nop();let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Nt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Nt(r.i<<1|1,r.i<<1|1)),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new Qo(e.i,this.loop(e,t).out,e.nullable)}empty(e){let t=this.newInst(O.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new Nt(t.i<<1,t.i<<1),t}rune(e,t){let r=this.newInst(O.RUNE);r.nullable=!1;let s=this.prog.getInst(r.i);return s.runes=e,t&=L.FOLD_CASE,(e.length!==1||J.simpleFold(e[0])===e[0])&&(t&=~L.FOLD_CASE),s.arg=t,r.out=new Nt(r.i<<1,r.i<<1),(t&L.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=O.RUNE1:e.length===2&&e[0]===0&&e[1]===J.MAX_RUNE?s.op=O.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===x.CODES[`
`]-1&&e[2]===x.CODES[`
`]+1&&e[3]===J.MAX_RUNE&&(s.op=O.RUNE_ANY_NOT_NL),r}lookBehind(e,t){let r=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(O.LB_WRITE);this.prog.getInst(s.i).arg=r;let i=this.rune(Kg,0),a=this.star(i,!0),u=this.cat(a,e);this.prog.patch(u.out,s.i);let c=this.newInst(O.LB_CHECK);return this.prog.getInst(c.i).arg=r,this.prog.lbStarts.push(u.i),Math.abs(r)>this.prog.numLb&&(this.prog.numLb=Math.abs(r)),c.out=new Nt(c.i<<1,c.i<<1),c}compile(e){return fB.walk(e,this.walker)}leaf(e){switch(e.op){case I.Op.NO_MATCH:return this.fail();case I.Op.EMPTY_MATCH:return this.nop();case I.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let r of e.runes){let s=this.runeCache.get(r);s===void 0&&(s=new Int32Array([r]),this.runeCache.set(r,s));let i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case I.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case I.Op.ANY_CHAR_NOT_NL:return this.rune(gT,0);case I.Op.ANY_CHAR:return this.rune(Kg,0);case I.Op.BEGIN_LINE:return this.empty(j.EMPTY_BEGIN_LINE);case I.Op.END_LINE:return this.empty(j.EMPTY_END_LINE);case I.Op.BEGIN_TEXT:return this.empty(j.EMPTY_BEGIN_TEXT);case I.Op.END_TEXT:return this.empty(j.EMPTY_END_TEXT);case I.Op.WORD_BOUNDARY:return this.empty(j.EMPTY_WORD_BOUNDARY);case I.Op.NO_WORD_BOUNDARY:return this.empty(j.EMPTY_NO_WORD_BOUNDARY);case I.Op.CONCAT:case I.Op.ALTERNATE:return this.nop();default:throw new Li("regexp: unhandled case in compile")}}enter(e){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return{sub:null};case I.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case I.Op.CONCAT:case I.Op.ALTERNATE:return{f:null};default:throw new Li("regexp: unhandled case in compile")}}child(e,t,r){e.op===I.Op.CONCAT?t.f=t.f===null?r:this.cat(t.f,r):e.op===I.Op.ALTERNATE?t.f=t.f===null?r:this.alt(t.f,r):t.sub=r}leave(e,t){switch(e.op){case I.Op.PLB:case I.Op.NLB:return this.lookBehind(t.sub,e.lb);case I.Op.CAPTURE:{let r=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),r)}case I.Op.STAR:return this.star(t.sub,(e.flags&L.NON_GREEDY)!==0);case I.Op.PLUS:return this.plus(t.sub,(e.flags&L.NON_GREEDY)!==0);case I.Op.QUEST:return this.quest(t.sub,(e.flags&L.NON_GREEDY)!==0);case I.Op.CONCAT:case I.Op.ALTERNATE:return t.f;default:throw new Li("regexp: unhandled case in compile")}}},wm=class Xe{static simplify(e){return e===null?null:fB.walk(e,Xe.WALKER)}static WALKER={leaf:e=>Xe.leaf(e),enter:e=>Xe.enter(e),child:(e,t,r,s)=>Xe.child(e,t,r,s),leave:(e,t)=>Xe.leave(e,t)};static leaf(e){if(e.op===I.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new I(I.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE)return new I(I.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE)return new I(I.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return{sub:null};case I.Op.CONCAT:case I.Op.ALTERNATE:return{subs:[],changed:!1};case I.Op.REPEAT:return e.min===0&&e.max===0?{result:new I(I.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,r,s){if(t.subs===void 0){t.sub=r;return}if(r!==e.subs[s]&&(t.changed=!0),e.op===I.Op.CONCAT){if(r.op===I.Op.NO_MATCH){t.result=new I(I.Op.NO_MATCH);return}if(r.op===I.Op.EMPTY_MATCH){t.changed=!0;return}if(r.op===I.Op.CONCAT){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}else{if(r.op===I.Op.NO_MATCH){t.changed=!0;return}if(r.op===I.Op.ALTERNATE){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}t.subs.push(r)}static leave(e,t){switch(e.op){case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:{let r=t.sub;if(r!==e.subs[0]){let s=I.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[r],s}return e}case I.Op.CONCAT:case I.Op.ALTERNATE:if(t.changed){let r=t.subs;if(r.length===0)return new I(e.op===I.Op.CONCAT?I.Op.EMPTY_MATCH:I.Op.NO_MATCH);if(r.length===1)return r[0];let s=I.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=r,s}return e;case I.Op.STAR:case I.Op.PLUS:case I.Op.QUEST:return Xe.simplify1(e.op,e.flags,t.sub,e);case I.Op.REPEAT:return Xe.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return Xe.simplify1(I.Op.STAR,e.flags,t,null);if(e.min===1)return Xe.simplify1(I.Op.PLUS,e.flags,t,null);let s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(Xe.simplify1(I.Op.PLUS,e.flags,t,null)),Xe.concat(s)}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=Xe.simplify1(I.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=Xe.simplify1(I.Op.QUEST,e.flags,Xe.concat([t,s]),null);if(r===null)return s;r.push(s)}return r!==null?Xe.concat(r):new I(I.Op.NO_MATCH)}static concat(e){let t=[];for(let s=0;s<e.length;s++){let i=e[s];if(i.op===I.Op.NO_MATCH)return new I(I.Op.NO_MATCH);if(i.op!==I.Op.EMPTY_MATCH){if(i.op===I.Op.CONCAT){for(let a=0;a<i.subs.length;a++)t.push(i.subs[a]);continue}t.push(i)}}if(t.length===0)return new I(I.Op.EMPTY_MATCH);if(t.length===1)return t[0];let r=new I(I.Op.CONCAT);return r.subs=t,r}static simplify1(e,t,r,s){if(r.op===I.Op.EMPTY_MATCH)return r;if(r.op===I.Op.NO_MATCH)return e===I.Op.PLUS?r:new I(I.Op.EMPTY_MATCH);if(e===r.op&&(t&L.NON_GREEDY)===(r.flags&L.NON_GREEDY))return r;if(s!==null&&s.op===e&&(s.flags&L.NON_GREEDY)===(t&L.NON_GREEDY)&&r===s.subs[0])return s;let i=new I(e);return i.flags=t,i.subs=[r],i}},ce=class{constructor(n,e){this.sign=n,this.cls=e}},Jg=[48,57],zg=[9,10,12,13,32,32],Wg=[48,57,65,90,95,95,97,122],Qg=new Map([["\\d",new ce(1,Jg)],["\\D",new ce(-1,Jg)],["\\s",new ce(1,zg)],["\\S",new ce(-1,zg)],["\\w",new ce(1,Wg)],["\\W",new ce(-1,Wg)]]),$g=[48,57,65,90,97,122],Yg=[65,90,97,122],Xg=[0,127],Zg=[9,9,32,32],em=[0,31,127,127],tm=[48,57],nm=[33,126],rm=[97,122],sm=[32,126],im=[33,47,58,64,91,96,123,126],am=[9,13,32,32],om=[65,90],um=[48,57,65,90,95,95,97,122],cm=[48,57,65,70,97,102],lm=new Map([["[:alnum:]",new ce(1,$g)],["[:^alnum:]",new ce(-1,$g)],["[:alpha:]",new ce(1,Yg)],["[:^alpha:]",new ce(-1,Yg)],["[:ascii:]",new ce(1,Xg)],["[:^ascii:]",new ce(-1,Xg)],["[:blank:]",new ce(1,Zg)],["[:^blank:]",new ce(-1,Zg)],["[:cntrl:]",new ce(1,em)],["[:^cntrl:]",new ce(-1,em)],["[:digit:]",new ce(1,tm)],["[:^digit:]",new ce(-1,tm)],["[:graph:]",new ce(1,nm)],["[:^graph:]",new ce(-1,nm)],["[:lower:]",new ce(1,rm)],["[:^lower:]",new ce(-1,rm)],["[:print:]",new ce(1,sm)],["[:^print:]",new ce(-1,sm)],["[:punct:]",new ce(1,im)],["[:^punct:]",new ce(-1,im)],["[:space:]",new ce(1,am)],["[:^space:]",new ce(-1,am)],["[:upper:]",new ce(1,om)],["[:^upper:]",new ce(-1,om)],["[:word:]",new ce(1,um)],["[:^word:]",new ce(-1,um)],["[:xdigit:]",new ce(1,cm)],["[:^xdigit:]",new ce(-1,cm)]]),yr=class $o{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");let i=e[s],a=e[s+1];i===a?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${a.toString(16)}`}return r+="]",r}static sortRanges(e,t){let r=t>>1,s=new Array(r);for(let a=0;a<r;a++)s[a]=a;s.sort((a,u)=>e[2*a]-e[2*u]||e[2*u+1]-e[2*a+1]);let i=e.slice(0,t);for(let a=0;a<r;a++)e[2*a]=i[2*s[a]],e[2*a+1]=i[2*s[a]+1]}constructor(e=j.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;$o.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){let r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&L.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){let s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=J.MIN_FOLD&&t>=J.MAX_FOLD)return this.appendRange(e,t);if(t<J.MIN_FOLD||e>J.MAX_FOLD)return this.appendRange(e,t);e<J.MIN_FOLD&&(this.appendRange(e,J.MIN_FOLD-1),e=J.MIN_FOLD),t>J.MAX_FOLD&&(this.appendRange(J.MAX_FOLD+1,t),t=J.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=J.simpleFold(r);s!==r;s=J.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){let s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){let r=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(r,s);continue}for(let a=r;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let r=0;r<e.length;++r){let s=e.getLo(r),i=e.getHi(r),a=e.getStride(r);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let u=s;u<=i;u+=a)t<=u-1&&this.appendRange(t,u-1),t=u+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){let s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=J.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=J.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new $o().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return $o.charClassToString(this.r,this.len)}},mT=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){let n=this.str.codePointAt(this.position);return this.position+=j.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},ki=class ${static ERR_INTERNAL_ERROR="regexp/syntax: internal error";static ERR_INVALID_CHAR_RANGE="invalid character class range";static ERR_INVALID_ESCAPE="invalid escape sequence";static ERR_INVALID_NAMED_CAPTURE="invalid named capture";static ERR_INVALID_PERL_OP="invalid or unsupported Perl syntax";static ERR_INVALID_REPEAT_OP="invalid nested repetition operator";static ERR_INVALID_REPEAT_SIZE="invalid repeat count";static ERR_MISSING_BRACKET="missing closing ]";static ERR_MISSING_PAREN="missing closing )";static ERR_MISSING_REPEAT_ARGUMENT="missing argument to repetition operator";static ERR_TRAILING_BACKSLASH="trailing backslash at end of expression";static ERR_DUPLICATE_NAMED_CAPTURE="duplicate capture group name";static ERR_UNEXPECTED_PAREN="unexpected )";static ERR_NESTING_DEPTH="expression nests too deeply";static ERR_LARGE="expression too large";static ERR_INVALID_CAPTURE_IN_LOOKBEHIND="invalid capture in lookbehind";static MAX_HEIGHT=1e3;static MAX_SIZE=1398101;static MAX_RUNES=33554432;static ANY_TABLE=new g(new Uint32Array([0,J.MAX_RUNE,1]));static ASCII_TABLE=new g(new Uint32Array([0,127,1]));static ASCII_FOLD_TABLE=new g(new Uint32Array([0,127,1,383,383,1,8490,8490,1]));static unicodeTable(e){return e==="Any"?{tab:$.ANY_TABLE,fold:$.ANY_TABLE,sign:1}:e==="Ascii"?{tab:$.ASCII_TABLE,fold:$.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:yt.CATEGORIES.get("Cn"),fold:yt.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:yt.CATEGORIES.get("LC"),fold:yt.FOLD_CATEGORIES.get("LC"),sign:1}:yt.CATEGORIES.has(e)?{tab:yt.CATEGORIES.get(e),fold:yt.FOLD_CATEGORIES.get(e),sign:1}:yt.SCRIPTS.has(e)?{tab:yt.SCRIPTS.get(e),fold:yt.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<J.MIN_FOLD||e>J.MAX_FOLD)return e;let t=e,r=e;for(e=J.simpleFold(e);e!==r;e=J.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===I.Op.EMPTY_MATCH)return null;if(e.op===I.Op.CONCAT&&e.subs.length>0){let t=e.subs[0];return t.op===I.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){let r=new I(I.Op.LITERAL);return r.flags=t,r.runes=j.stringToRunes(e),r}static parse(e,t){return new $(e,t).parseInternal()}static parseRepeat(e){let t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);let r=$.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=$.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new pe($.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&J.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){let r=e.codePointAt(t);if(r!==x.CODES._&&!j.isalnum(r))return!1}return!0}static parseInt(e){let t=e.pos();for(;e.more()&&e.peek()>=x.CODES[0]&&e.peek()<=x.CODES[9];)e.skip(1);let r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===x.CODES[0]?-1:r.length>8?-2:parseInt(r,10)}static isCharClass(e){return e.op===I.Op.LITERAL&&e.runes.length===1||e.op===I.Op.CHAR_CLASS||e.op===I.Op.ANY_CHAR_NOT_NL||e.op===I.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case I.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case I.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case I.Op.ANY_CHAR_NOT_NL:return t!==x.CODES[`
`];case I.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case I.Op.ANY_CHAR:break;case I.Op.ANY_CHAR_NOT_NL:$.matchRune(t,x.CODES[`
`])&&(e.op=I.Op.ANY_CHAR);break;case I.Op.CHAR_CLASS:{let r=new yr(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===I.Op.LITERAL?r.appendLiteral(t.runes[0],t.flags):r.appendClass(t.runes),e.runes=r.toGrowableArray();break}case I.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=I.Op.CHAR_CLASS,e.runes=new yr().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){let t=e.pos();if(e.skip(1),!e.more())throw new pe($.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case x.CODES[1]:case x.CODES[2]:case x.CODES[3]:case x.CODES[4]:case x.CODES[5]:case x.CODES[6]:case x.CODES[7]:if(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7])break;case x.CODES[0]:{let s=r-x.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7]);i++)s=s*8+e.peek()-x.CODES[0],e.skip(1);return s}case x.CODES.x:{if(!e.more())break;if(r=e.pop(),r===x.CODES["{"]){let a=0,u=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===x.CODES["}"])break;let c=j.unhex(r);if(c<0||(u=u*16+c,u>J.MAX_RUNE))break e;a++}if(a===0)break e;return u}let s=j.unhex(r);if(!e.more())break;r=e.pop();let i=j.unhex(r);if(s<0||i<0)break;return s*16+i}case x.CODES.a:return x.CODES["\x07"];case x.CODES.f:return x.CODES["\f"];case x.CODES.n:return x.CODES[`
`];case x.CODES.r:return x.CODES["\r"];case x.CODES.t:return x.CODES["	"];case x.CODES.v:return x.CODES["\v"];default:if(r<=J.MAX_ASCII&&!j.isalnum(r))return r}throw new pe($.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new pe($.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?$.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===I.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if($.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new I(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>$.MAX_RUNES)throw new pe($.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===I.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor($.MAX_SIZE/this.repeats)?this.repeats=$.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor($.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>$.MAX_SIZE)throw new pe($.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let r=0;switch(e.op){case I.Op.LITERAL:r=e.runes.length;break;case I.Op.PLB:case I.Op.NLB:case I.Op.CAPTURE:case I.Op.STAR:r=2+this.calcSize(e.subs[0]);break;case I.Op.PLUS:case I.Op.QUEST:r=1+this.calcSize(e.subs[0]);break;case I.Op.CONCAT:for(let s of e.subs)r=r+this.calcSize(s);break;case I.Op.ALTERNATE:for(let s of e.subs)r=r+this.calcSize(s);e.subs.length>1&&(r=r+e.subs.length-1);break;case I.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?r=2+s:r=1+e.min*s;break}r=e.max*s+(e.max-e.min);break}}return r=Math.max(1,r),this.size===null&&(this.size=new Map),this.size.set(e,r),r}checkHeight(e){if(!(this.numRegexp<$.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>$.MAX_HEIGHT)throw new pe($.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let r=1;for(let s of e.subs){let i=this.calcHeight(s);r<1+i&&(r=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,r),r}pop(){return this.stack.pop()}popToPseudo(){let e=this.stack.length,t=e;for(;t>0&&!I.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===I.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&~L.FOLD_CASE))return null;e.op=I.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&~L.FOLD_CASE}else if(e.op===I.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&J.simpleFold(e.runes[0])===e.runes[2]&&J.simpleFold(e.runes[2])===e.runes[0]||e.op===I.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&J.simpleFold(e.runes[0])===e.runes[1]&&J.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|L.FOLD_CASE))return null;e.op=I.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|L.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){let r=this.stack.length;if(r<2)return!1;let s=this.stack[r-1],i=this.stack[r-2];if(s.op!==I.Op.LITERAL||i.op!==I.Op.LITERAL||(s.flags&L.FOLD_CASE)!==(i.flags&L.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let a=0;a<s.runes.length;a++)i.runes.push(s.runes[a]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){let r=this.newRegexp(I.Op.LITERAL);return r.flags=t,(t&L.FOLD_CASE)!==0&&(e=$.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){let t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,a){let u=this.flags;if((u&L.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=L.NON_GREEDY),a!==-1))throw new pe($.ERR_INVALID_REPEAT_OP,i.from(a));let c=this.stack.length;if(c===0)throw new pe($.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let l=this.stack[c-1];if(I.isPseudoOp(l.op))throw new pe($.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let h=this.newRegexp(e);if(h.min=t,h.max=r,h.flags=u,h.subs=[l],this.stack[c-1]=h,this.checkLimits(h),e===I.Op.REPEAT&&(t>=2||r>=2)&&!this.repeatIsValid(h,1e3))throw new pe($.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===I.Op.REPEAT){let r=e.max;if(r===0)return!0;if(r<0&&(r=e.min),r>t)return!1;r>0&&(t=Math.trunc(t/r))}for(let r of e.subs)if(!this.repeatIsValid(r,t))return!1;return!0}concat(){this.maybeConcat(-1,0);let e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(I.Op.EMPTY_MATCH)):this.push(this.collapse(e,I.Op.CONCAT))}alternate(){let e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(I.Op.NO_MATCH)):this.push(this.collapse(e,I.Op.ALTERNATE))}cleanAlt(e){e.op===I.Op.CHAR_CLASS&&(e.runes=new yr(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE?(e.runes=new Int32Array(0),e.op=I.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=I.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let u of e)r+=u.op===t?u.subs.length:1;let s=new Array(r).fill(null),i=0;for(let u of e)if(u.op===t){for(let c=0;c<u.subs.length;c++)s[i++]=u.subs[c];this.reuse(u)}else s[i++]=u;let a=this.newRegexp(t);if(a.subs=s,t===I.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){let u=a;a=a.subs[0],this.reuse(u)}return a}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,a=0,u=0,c=0;for(let h=0;h<=r;h++){let f=null,C=0,_=0;if(h<r){let D=e[t+h];if(D.op===I.Op.CONCAT&&D.subs.length>0&&(D=D.subs[0]),D.op===I.Op.LITERAL&&(f=D.runes,C=D.runes.length,_=D.flags&L.FOLD_CASE),_===u){let P=0;for(;P<a&&P<C&&i[P]===f[P];)P++;if(P>0){a=P;continue}}}if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let D=this.newRegexp(I.Op.LITERAL);D.flags=u,D.runes=i.slice(0,a);for(let q=c;q<h;q++)e[t+q]=this.removeLeadingString(e[t+q],a),this.checkLimits(e[t+q]);let P=this.collapse(e.slice(t+c,t+h),I.Op.ALTERNATE),V=this.newRegexp(I.Op.CONCAT);V.subs=[D,P],e[s++]=V}c=h,i=f,a=C,u=_}r=s,t=0,c=0,s=0;let l=null;for(let h=0;h<=r;h++){let f=null;if(!(h<r&&(f=$.leadingRegexp(e[t+h]),l!==null&&l.equals(f)&&($.isCharClass(l)||l.op===I.Op.REPEAT&&l.min===l.max&&$.isCharClass(l.subs[0]))))){if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let C=l;for(let P=c;P<h;P++){let V=P!==c;e[t+P]=this.removeLeadingRegexp(e[t+P],V),this.checkLimits(e[t+P])}let _=this.collapse(e.slice(t+c,t+h),I.Op.ALTERNATE),D=this.newRegexp(I.Op.CONCAT);D.subs=[C,_],e[s++]=D}c=h,l=f}}r=s,t=0,c=0,s=0;for(let h=0;h<=r;h++)if(!(h<r&&$.isCharClass(e[t+h]))){if(h!==c)if(h===c+1)e[s++]=e[t+c];else{let f=c;for(let _=c+1;_<h;_++){let D=e[t+f],P=e[t+_];(D.op<P.op||D.op===P.op&&(D.runes!==null?D.runes.length:0)<(P.runes!==null?P.runes.length:0))&&(f=_)}let C=e[t+c];e[t+c]=e[t+f],e[t+f]=C;for(let _=c+1;_<h;_++)$.mergeCharClass(e[t+c],e[t+_]),this.reuse(e[t+_]);this.cleanAlt(e[t+c]),e[s++]=e[t+c]}h<r&&(e[s++]=e[t+h]),c=h+1}r=s,t=0,c=0,s=0;for(let h=0;h<r;++h)h+1<r&&e[t+h].op===I.Op.EMPTY_MATCH&&e[t+h+1].op===I.Op.EMPTY_MATCH||(e[s++]=e[t+h]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===I.Op.CONCAT&&e.subs.length>0){let r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===I.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=I.Op.EMPTY_MATCH,e.subs=I.emptySubs();break;case 2:{let s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===I.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=I.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===I.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=I.Op.EMPTY_MATCH,e.subs=I.emptySubs();break;case 1:{let r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(I.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&L.LITERAL)!==0)return $.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1,s=new mT(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case x.CODES["("]:if((this.flags&L.LOOKBEHIND)!==0){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if((this.flags&L.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(I.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case x.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case x.CODES[")"]:this.parseRightParen(),s.skip(1);break;case x.CODES["^"]:(this.flags&L.ONE_LINE)!==0?this.op(I.Op.BEGIN_TEXT):this.op(I.Op.BEGIN_LINE),s.skip(1);break;case x.CODES.$:(this.flags&L.ONE_LINE)!==0?this.op(I.Op.END_TEXT).flags|=L.WAS_DOLLAR:this.op(I.Op.END_LINE),s.skip(1);break;case x.CODES["."]:(this.flags&L.DOT_NL)!==0?this.op(I.Op.ANY_CHAR):this.op(I.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case x.CODES["["]:this.parseClass(s);break;case x.CODES["*"]:case x.CODES["+"]:case x.CODES["?"]:{i=s.pos();let a=null;switch(s.pop()){case x.CODES["*"]:a=I.Op.STAR;break;case x.CODES["+"]:a=I.Op.PLUS;break;case x.CODES["?"]:a=I.Op.QUEST}this.repeat(a,t,r,i,s,e);break}case x.CODES["{"]:{let a=s.pos(),u=$.parseRepeat(s);if(u<0){s.rewindTo(a),this.literal(s.pop());break}i=a,t=u>>16,r=(u&J.MAX_BMP)<<16>>16,this.repeat(I.Op.REPEAT,t,r,i,s,e);break}case x.CODES["\\"]:{let a=s.pos();if(s.skip(1),(this.flags&L.PERL_X)!==0&&s.more())switch(s.pop()){case x.CODES.A:this.op(I.Op.BEGIN_TEXT);break e;case x.CODES.b:this.op(I.Op.WORD_BOUNDARY);break e;case x.CODES.B:this.op(I.Op.NO_WORD_BOUNDARY);break e;case x.CODES.C:throw new pe($.ERR_INVALID_ESCAPE,"\\C");case x.CODES.Q:{let l=s.rest(),h=l.indexOf("\\E");h>=0?(l=l.substring(0,h),s.skipString(l),s.skipString("\\E")):s.skipString(l);let f=0;for(;f<l.length;){let C=l.codePointAt(f);this.literal(C),f+=j.charCount(C)}break e}case x.CODES.z:this.op(I.Op.END_TEXT);break e;default:s.rewindTo(a)}else s.rewindTo(a);let u=this.newRegexp(I.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){let l=new yr;if(this.parseUnicodeClass(s,l)){u.runes=l.toArray(),this.push(u);break e}}let c=new yr;if(this.parsePerlClassEscape(s,c)){u.runes=c.toArray(),this.push(u);break e}s.rewindTo(a),this.reuse(u),this.literal($.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new pe($.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){let t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){let u=r.charAt(2)==="P"?4:3,c=r.indexOf(">");if(c<0)throw new pe($.ERR_INVALID_NAMED_CAPTURE,r);let l=r.substring(u,c);if(e.skipString(l),e.skip(u+1),!$.isValidCaptureName(l))throw new pe($.ERR_INVALID_NAMED_CAPTURE,r.substring(0,c+1));let h=this.op(I.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[l])throw new pe($.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,h.name=l;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){let u=e.pop();switch(u){case x.CODES.i:s|=L.FOLD_CASE,a=!0;break;case x.CODES.m:s&=~L.ONE_LINE,a=!0;break;case x.CODES.s:s|=L.DOT_NL,a=!0;break;case x.CODES.U:s|=L.NON_GREEDY,a=!0;break;case x.CODES["-"]:if(i<0)break e;i=-1,s=~s,a=!1;break;case x.CODES[":"]:case x.CODES[")"]:if(i<0){if(!a)break e;s=~s}u===x.CODES[":"]&&this.op(I.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new pe($.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){let e=this.newRegexp(I.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){let e=this.newRegexp(I.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(I.Op.VERTICAL_BAR)}swapVerticalBar(){let e=this.stack.length;if(e>=3&&this.stack[e-2].op===I.Op.VERTICAL_BAR&&$.isCharClass(this.stack[e-1])&&$.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){let s=r;r=t,t=s,this.stack[e-3]=r}return $.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){let t=this.stack[e-1],r=this.stack[e-2];if(r.op===I.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new pe($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);let e=this.pop(),t=this.pop();if(t.op!==I.Op.LEFT_PAREN)throw new pe($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if($.hasCapture(e))throw new pe($.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=I.Op.PLB:t.op=I.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=I.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){let r=e.pos();if((this.flags&L.PERL_X)===0||!e.more()||e.pop()!==x.CODES["\\"]||!e.more())return!1;e.pop();let s=e.from(r),i=Qg.has(s)?Qg.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&L.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){let r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;let i=r.substring(0,s+2);e.skipString(i);let a=lm.has(i)?lm.get(i):null;if(a===null)throw new pe($.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&L.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){let r=e.pos();if((this.flags&L.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===x.CODES.P&&(s=-1),!e.more())throw e.rewindTo(r),new pe($.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==x.CODES["{"])a=j.runeToString(i);else{let h=e.rest(),f=h.indexOf("}");if(f<0)throw e.rewindTo(r),new pe($.ERR_INVALID_CHAR_RANGE,e.rest());a=h.substring(0,f),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===x.CODES["^"]&&(s=0-s,a=a.substring(1));let u=$.unicodeTable(a);if(u===null)throw new pe($.ERR_INVALID_CHAR_RANGE,e.from(r));u.sign<0&&(s=0-s);let c=u.tab,l=u.fold;if((this.flags&L.FOLD_CASE)===0||l===null)t.appendTableWithSign(c,s);else{let h=new yr().appendTable(c).appendTable(l).cleanClass().toArray();t.appendClassWithSign(Array.from(h),s)}return!0}parseClass(e){let t=e.pos();e.skip(1);let r=this.newRegexp(I.Op.CHAR_CLASS);r.flags=this.flags;let s=new yr,i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&L.CLASS_NL)===0&&s.appendRange(x.CODES[`
`],x.CODES[`
`]));let a=!0;for(;!e.more()||e.peek()!==x.CODES["]"]||a;){if(e.more()&&e.lookingAt("-")&&(this.flags&L.PERL_X)===0&&!a){let h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new pe($.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;let u=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(u)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(u);let c=$.parseClassChar(e,t),l=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=$.parseClassChar(e,t),l<c)throw new pe($.ERR_INVALID_CHAR_RANGE,e.from(u))}(this.flags&L.FOLD_CASE)===0?s.appendRange(c,l):s.appendFoldedRange(c,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}},ET=class wr{static initTest(e){let t=wr.compile(e),r=new wr(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r.prefilter=t.prefilter,r.namedGroups=t.namedGroups,r}static compile(e){return wr.compileImpl(e,L.PERL,!1)}static compilePOSIX(e){return wr.compileImpl(e,L.POSIX,!0)}static compileImpl(e,t,r){let s=ki.parse(e,t),i=s.maxCap(),a=s.namedGroups;s=wm.simplify(s);let u=pT.build(s),c=Dm.compileRegexp(s),l=new wr(e,c,i,r);l.prefilter=u.type===se.Type.NONE?null:u;let[h,f]=c.prefix();return l.prefixComplete=h,l.prefix=f,l.prefixUTF8=j.stringToUtf8ByteArray(l.prefix),l.prefix.length>0&&(l.prefixRune=l.prefix.codePointAt(0)),l.namedGroups=a,l}static match(e,t){return wr.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=qg.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new dB(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,r,s){if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1,u=e.prefixLength(this);if(r===L.UNANCHORED){let c=e.index(this,t);if(c<0)return null;i=t+c,a=i+u}else if(r===L.ANCHOR_BOTH){if(e.endPos()!==u||e.index(this,0)!==0)return null;i=0,a=u}else if(r===L.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=u}if(i<0)return null;if(s>0){let c=new Int32Array(s).fill(-1);return c[0]=i,c[1]=a,Array.from(c)}return[]}createLookbehindState(){return this.prog.numLb>0?new sT(this.prog):null}executeEngine(e,t,r,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,r,s);if(this.prefilter!==null&&r===L.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return qg.execute(this,e,t,r,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=Wo.maxBitStateLen(this.prog)?Wo.execute(this,e,t,r,s):this.doExecuteNFA(e,t,r,s,i);if(this.prog.numLb===0){let a=this.dfa.match(e,t,r);if(a!==null)return a?[]:null;if(e.endPos()<=Wo.maxBitStateLen(this.prog))return Wo.execute(this,e,t,r,s)}return this.doExecuteNFA(e,t,r,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,r,s,i=null){let a=this.get();a||(a=mm.fromRE2(this)),a.init(s);let u=a.match(e,t,r,i)?a.submatches():null;return this.put(a),u}match(e){return this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i,a=null){return e instanceof Tr||(j.isByteArray(e)?e=Ir.utf8(e):e=Ir.utf16(e)),this.matchMachineInput(e,t,r,s,i,a)}matchMachineInput(e,t,r,s,i,a=null){if(t>r)return[!1,null];let u=e.isUTF16Encoding()?fe.fromUTF16(e.asCharSequence(),0,r):fe.fromUTF8(e.asBytes(),0,r),c=this.executeEngine(u,t,s,2*i,a);return c===null?[!1,null]:[!0,c]}matchUTF8(e){return this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,a="",u=fe.fromUTF16(e),c=this.createLookbehindState(),l=0;for(;i<=e.length;){let h=this.executeEngine(u,i,L.UNANCHORED,2,c);if(h===null||h.length===0)break;a+=e.substring(s,h[0]),(h[1]>s||h[0]===0)&&(a+=t(e.substring(h[0],h[1])),l++),s=h[1];let f=u.step(i)&7;if(i+f>h[1]?i+=f:i+1>h[1]?i++:i=h[1],l>=r)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[],i=e.endPos();t<0&&(t=i+1);let a=0,u=0,c=-1,l=this.createLookbehindState();for(;u<t&&a<=i;){let h=this.executeEngine(e,a,L.UNANCHORED,this.prog.numCap,l);if(h===null||h.length===0)break;let f=!0;if(h[1]===a){h[0]===c&&(f=!1);let C=e.step(a);C<0?a=i+1:a+=C&7}else a=h[1];c=h[1],f&&(s.push(r(this.pad(h))),u++)}return s}findUTF8(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){let t=this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,2)}findUTF8Submatch(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap))}findSubmatch(e){let t=this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){let r=this.allMatches(fe.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){let r=this.allMatches(fe.fromUTF16(e),t);return r.length===0?null:r}},GS=class Yo{static UNANCHORED=L.UNANCHORED;static ANCHOR_START=L.ANCHOR_START;static ANCHOR_BOTH=L.ANCHOR_BOTH;constructor(e=Yo.UNANCHORED,t=0,r=8388608){this.anchor=e,this.jsFlags=t,this.maxMem=r;let s=L.PERL;(t&qt.DISABLE_UNICODE_GROUPS)!==0&&(s&=~L.UNICODE_GROUPS),(t&qt.LOOKBEHINDS)!==0&&(s|=L.LOOKBEHIND),this.re2Flags=s,this.regexps=[],this.prog=null,this.dfa=null,this.dummyRe2=null}add(e){if(this.prog)throw new Li("Cannot add patterns after compile");let t=e;(this.jsFlags&qt.CASE_INSENSITIVE)!==0&&(t=`(?i)${t}`),(this.jsFlags&qt.DOTALL)!==0&&(t=`(?s)${t}`),(this.jsFlags&qt.MULTILINE)!==0&&(t=`(?m)${t}`);let r=ki.parse(t,this.re2Flags);return this.regexps.push(wm.simplify(r)),this.regexps.length-1}compile(){if(this.prog)return;let e=Dm.compileSet(this.regexps);if(e.numInst()>ki.MAX_SIZE)throw new Li(`${ki.ERR_LARGE}: the set compiles to ${e.numInst()} instructions, more than ${ki.MAX_SIZE}`);this.prog=e,this.dfa=new dB(this.prog,this.maxMem),this.dummyRe2={prog:this.prog,cond:this.prog.startCond(),prefix:"",prefixRune:0,longest:!1}}match(e){this.prog||this.compile();let t=j.isByteArray(e)?fe.fromUTF8(e):fe.fromUTF16(e),r=L.UNANCHORED;this.anchor===Yo.ANCHOR_START?r=L.ANCHOR_START:this.anchor===Yo.ANCHOR_BOTH&&(r=L.ANCHOR_BOTH);let s=this.dfa.matchSet(t,0,r);if(s!==null)return s;let i=mm.fromRE2(this.dummyRe2);return i.init(0),i.matchSet(t,0,r)}},_T=class ps{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let r="",s=!1,i=e.length;i===0&&(r="(?:)",s=!0);let a=!1,u=0;for(;u<i;){let l=e[u];if(l==="\\"){if(u+1<i)switch(l=e[u+1],l){case"\\":r+="\\\\",u+=2;continue;case"c":if(u+2<i){let C=e[u+2].charCodeAt(0);if(C>=65&&C<=90||C>=97&&C<=122){let _=C%32;r+="\\x",r+=(_>>4).toString(16).toUpperCase(),r+=(_&15).toString(16).toUpperCase(),u+=3,s=!0;continue}}r+="c",u+=2,s=!0;continue;case"u":if(u+2<i){if(e[u+2]==="{"){let C=u+3,_=!1,D=!1;for(;C<i;){let P=e[C];if(P==="}"){D=!0;break}if(!ps.isHexadecimal(P))break;_=!0,C++}if(D&&_){r+="\\x",u+=2,s=!0;continue}}else if(u+5<i){let C=!0;for(let _=0;_<4;_++)if(!ps.isHexadecimal(e[u+2+_])){C=!1;break}if(C){r+="\\x{"+e.substring(u+2,u+6)+"}",u+=6,s=!0;continue}}}r+="u",u+=2,s=!0;continue;case"x":{let C=!1;if(u+2<i&&e[u+2]==="{"){let _=u+3,D=!1,P=!1;for(;_<i;){let V=e[_];if(V==="}"){P=!0;break}if(!ps.isHexadecimal(V))break;D=!0,_++}P&&D&&(C=!0)}else u+3<i&&ps.isHexadecimal(e[u+2])&&ps.isHexadecimal(e[u+3])&&(C=!0);C?(r+="\\x",u+=2):(r+="x",u+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":r+="\\"+l,u+=2;continue;default:{let C=e.codePointAt(u+1);if(C>=48&&C<=57||C>=65&&C<=90||C>=97&&C<=122){let _=j.charCount(C);r+=e.substring(u+1,u+1+_),u+=_+1,s=!0}else{r+="\\";let _=j.charCount(C);r+=e.substring(u+1,u+1+_),u+=_+1}continue}}}else if(l==="/"){r+="\\/",u+=1,s=!0;continue}else if(l==="["){if(!a&&e[u+1]==="]"){r+="[^\\x00-\\x{10FFFF}]",u+=2,s=!0;continue}if(!a&&e[u+1]==="^"&&e[u+2]==="]"){r+="[\\x00-\\x{10FFFF}]",u+=3,s=!0;continue}a=!0}else if(l==="]")a=!1;else if(!a&&l==="("&&u+2<i&&e[u+1]==="?"&&e[u+2]==="<"&&u+3<i&&!"=!>)".includes(e[u+3])){r+="(?P<",u+=3,s=!0;continue}let h=e.codePointAt(u),f=j.charCount(h);r+=e.substring(u,u+f),u+=f}let c=s?r:e;return t.length>0?`(?${t})${c}`:c}},Bm=(n,e)=>{let t=n.matchArray();return t.index=n.start(0),t.input=e,t.groups=n.namedGroupsObject(),t},Zo=class Ze{static CASE_INSENSITIVE=qt.CASE_INSENSITIVE;static DOTALL=qt.DOTALL;static MULTILINE=qt.MULTILINE;static DISABLE_UNICODE_GROUPS=qt.DISABLE_UNICODE_GROUPS;static LONGEST_MATCH=qt.LONGEST_MATCH;static LOOKBEHINDS=qt.LOOKBEHINDS;static quote(e){return j.quoteMeta(e)}static quoteReplacement(e,t=!1){return Vg.quoteReplacement(e,t)}static translateRegExp(e){return _T.translate(e)}static compile(e,t=0){let r=e;if((t&Ze.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(t&Ze.DOTALL)!==0&&(r=`(?s)${r}`),(t&Ze.MULTILINE)!==0&&(r=`(?m)${r}`),(t&~(Ze.MULTILINE|Ze.DOTALL|Ze.CASE_INSENSITIVE|Ze.DISABLE_UNICODE_GROUPS|Ze.LONGEST_MATCH|Ze.LOOKBEHINDS))!==0)throw new rT("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=L.PERL;(t&Ze.DISABLE_UNICODE_GROUPS)!==0&&(s&=~L.UNICODE_GROUPS),(t&Ze.LOOKBEHINDS)!==0&&(s|=L.LOOKBEHIND);let i=new Ze(e,t);return i.re2Input=ET.compileImpl(r,s,(t&Ze.LONGEST_MATCH)!==0),i}static matches(e,t){return Ze.compile(e).testExact(t)}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");let s=new Ze(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return j.isByteArray(e)&&(e=Ir.utf8(e)),new Vg(this,e)}test(e){return j.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){let t=j.isByteArray(e)?fe.fromUTF8(e):fe.fromUTF16(e);return this.re2Input.executeEngine(t,0,L.ANCHOR_BOTH,0)!==null}exec(e){let t=this.matcher(e);return t.find()?Bm(t,e):null}split(e,t=0){let r=this.matcher(e),s=[],i=0,a=0;for(;r.find();){if(a===0&&r.end()===0){a=r.end();continue}if(t>0&&s.length===t-1)break;if(a===r.start()){if(t===0){i+=1,a=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.start())),a=r.end()}if(t===0&&a!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.inputLength()))}return(t!==0||s.length===0&&!(a===r.inputLength()&&a>0))&&s.push(r.substring(a,r.inputLength())),s}*matchAll(e){let t=this.matcher(e);for(;t.find();)yield Bm(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ks="12.19.0";function aE(n){Ks=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Or=new Fn("@firebase/firestore");function Cs(){return Or.logLevel}function K(n,...e){if(Or.logLevel<=ae.DEBUG){let t=e.map(hf);Or.debug(`Firestore (${Ks}): ${n}`,...t)}}function En(n,...e){if(Or.logLevel<=ae.ERROR){let t=e.map(hf);Or.error(`Firestore (${Ks}): ${n}`,...t)}}function kt(n,...e){if(Or.logLevel<=ae.WARN){let t=e.map(hf);Or.warn(`Firestore (${Ks}): ${n}`,...t)}}function hf(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,oE(n,r,t)}function oE(n,e,t){let r=`FIRESTORE (${Ks}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw En(r),new Error(r)}function Q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||oE(e,s,r)}function ne(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yT(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Is=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let s=yT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}};function ue(n,e){return n<e?-1:n>e?1:0}function DB(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let s=n.charAt(r),i=e.charAt(r);if(s!==i)return pB(s)===pB(i)?ue(s,i):pB(s)?1:-1}return ue(n.length,e.length)}var DT=55296,wT=57343;function pB(n){let e=n.charCodeAt(0);return e>=DT&&e<=wT}function Ts(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye=class n{constructor(e,t){this.comparator=e,this.root=t||Xt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Xt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Xt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){let e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ys(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ys(this.root,e,this.comparator,!1)}getReverseIterator(){return new ys(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ys(this.root,e,this.comparator,!0)}},ys=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Xt=class n{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=i??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new n(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Y(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Y(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw Y(27949);return e+(this.isRed()?0:1)}};Xt.EMPTY=null,Xt.RED=!0,Xt.BLACK=!1;Xt.EMPTY=new class{constructor(){this.size=0}get key(){throw Y(57766)}get value(){throw Y(16141)}get color(){throw Y(16727)}get left(){throw Y(29726)}get right(){throw Y(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Xt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe=class n{constructor(e){this.comparator=e,this.data=new ye(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ou(this.data.getIterator())}getIteratorFrom(e){return new ou(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){let e=[];return this.forEach((t=>{e.push(t)})),e}toString(){let e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},ou=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},G=class extends mt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var As="__name__",uu=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&Y(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Y(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let i=n.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),s=n.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?n.extractNumericId(e).compare(n.extractNumericId(t)):DB(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return hn.fromString(e.substring(4,e.length-2))}},Be=class n extends uu{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new G(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new n(t)}static emptyPath(){return new n([])}},IT=/^[_a-zA-Z][_a-zA-Z0-9]*$/,dt=class gs extends uu{construct(e,t,r){return new gs(e,t,r)}static isValidIdentifier(e){return IT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),gs.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===As}static keyField(){return new gs([As])}static fromServerFormat(e){let t=[],r="",s=0,i=()=>{if(r.length===0)throw new G(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;s<e.length;){let u=e[s];if(u==="\\"){if(s+1===e.length)throw new G(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new G(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new G(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new gs(t)}static emptyPath(){return new gs([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ft=class n{constructor(e){this.fields=e,e.sort(dt.comparator)}static empty(){return new n([])}unionWith(e){let t=new xe(dt.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ts(this.fields,e.fields,((t,r)=>t.isEqual(r)))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function tr(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function uE(n,e){let t=[];for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function cE(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X=class n{constructor(e){this.path=e}static fromPath(e){return new n(Be.fromString(e))}static fromName(e){return new n(Be.fromString(e).popFirst(5))}static empty(){return new n(Be.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Be.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Be.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new Be(e.slice()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(n,e,t){if(!t)throw new G(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function BE(n,e,t,r){if(e===!0&&r===!0)throw new G(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Im(n){if(!X.isDocumentKey(n))throw new G(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Tm(n){if(X.isDocumentKey(n))throw new G(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function _a(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ya(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Y(12329,{type:typeof n})}function $r(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new G(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=ya(n);throw new G(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function hE(n,e){if(e<=0)throw new G(k.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(n,e){let t={typeString:n};return e&&(t.value=e),t}function Da(n,e){if(!_a(n))throw new G(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new G(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Am=-62135596800,vm=1e6,_e=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*vm);return new n(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new G(k.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return n._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{let s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new G(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new G(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Am)throw new G(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new G(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vm}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new G(k.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Da(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-Am;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};_e._jsonSchemaVersion="firestore/timestamp/1.0",_e._jsonSchema={type:Pe("string",_e._jsonSchemaVersion),seconds:Pe("number"),nanoseconds:Pe("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lu=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ne=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new lu("Invalid base64 string: "+i):i}})(e);return new n(t)}static fromUint8Array(e){let t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ne.EMPTY_BYTE_STRING=new Ne("");var TT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function _n(n){if(Q(!!n,39018),typeof n=="string"){let e=0,t=TT.exec(n);if(Q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ce(n.seconds),nanos:Ce(n.nanos)}}function Ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yn(n){return typeof n=="string"?Ne.fromBase64String(n):Ne.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dE="server_timestamp",fE="__type__",pE="__previous_value__",CE="__local_write_time__";function wa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[fE])==null?void 0:r.stringValue)===dE}function Ia(n){let e=n.mapValue.fields[pE];return wa(e)?Ia(e):e}function vs(n){let e=_n(n.mapValue.fields[CE].timestampValue);return new _e(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wB=class{constructor(e,t,r,s,i,a,u,c,l,h,f,C,_){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=h,this.apiKey=f,this._customHeaders=C,this.grpcFlowControlWindow=_}},Bu="(default)",Wi=class n{constructor(e,t){this.projectId=e,this.database=t||Bu}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Bu}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function gE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new G(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wi(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var df=-1;function Ta(n){return n==null}function bs(n){return n===0&&1/n==-1/0}function AT(n){return typeof n=="number"&&Number.isInteger(n)&&!bs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function vT(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ff="__type__",mE="__max__",eu={mapValue:{fields:{__type__:{stringValue:mE}}}},pf="__vector__",Fr="value",Ss={nullValue:"NULL_VALUE"},ft={booleanValue:!0},Je={booleanValue:!1};function Oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?wa(n)?4:EE(n)?9007199254740991:$i(n)?10:11:Y(28295,{value:n})}function Lt(n,e,t){if(n===e)return!0;let r=Oe(n);if(r!==Oe(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return vs(n).isEqual(vs(e));case 3:return(function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;let u=_n(i.timestampValue),c=_n(a.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,a){return yn(i.bytesValue).isEqual(yn(a.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,a){return Ce(i.geoPointValue.latitude)===Ce(a.geoPointValue.latitude)&&Ce(i.geoPointValue.longitude)===Ce(a.geoPointValue.longitude)})(n,e);case 2:return(function(i,a,u){if("integerValue"in i&&"integerValue"in a)return Ce(i.integerValue)===Ce(a.integerValue);let c,l;if("doubleValue"in i&&"doubleValue"in a)c=Ce(i.doubleValue),l=Ce(a.doubleValue);else{if(!(u!=null&&u.i))return!1;c=Ce(i.integerValue??i.doubleValue),l=Ce(a.integerValue??a.doubleValue)}return c===l?!!(u!=null&&u.o)||bs(c)===bs(l):!!(u===void 0||u.u)&&isNaN(c)&&isNaN(l)})(n,e,t);case 9:return Ts(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>Lt(s,i,t)));case 10:case 11:return(function(i,a,u){let c=i.mapValue.fields||{},l=a.mapValue.fields||{};if(cu(c)!==cu(l))return!1;for(let h in c)if(c.hasOwnProperty(h)&&(l[h]===void 0||!Lt(c[h],l[h],u)))return!1;return!0})(n,e,t);default:return Y(52216,{left:n})}}function Qi(n,e){return(n.values||[]).find((t=>Lt(t,e)))!==void 0}function pt(n,e){if(n===e)return 0;let t=Oe(n),r=Oe(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return(function(i,a){let u=Ce(i.integerValue||i.doubleValue),c=Ce(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(n,e);case 3:return bm(n.timestampValue,e.timestampValue);case 4:return bm(vs(n),vs(e));case 5:return DB(n.stringValue,e.stringValue);case 6:return(function(i,a){let u=yn(i),c=yn(a);return u.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){let u=i.split("/"),c=a.split("/");for(let l=0;l<u.length&&l<c.length;l++){let h=ue(u[l],c[l]);if(h!==0)return h}return ue(u.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){let u=ue(Ce(i.latitude),Ce(a.latitude));return u!==0?u:ue(Ce(i.longitude),Ce(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Sm(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var C,_,D,P;let u=i.fields||{},c=a.fields||{},l=(C=u[Fr])==null?void 0:C.arrayValue,h=(_=c[Fr])==null?void 0:_.arrayValue,f=ue(((D=l==null?void 0:l.values)==null?void 0:D.length)||0,((P=h==null?void 0:h.values)==null?void 0:P.length)||0);return f!==0?f:Sm(l,h)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===eu.mapValue&&a===eu.mapValue)return 0;if(i===eu.mapValue)return 1;if(a===eu.mapValue)return-1;let u=i.fields||{},c=Object.keys(u),l=a.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){let C=DB(c[f],h[f]);if(C!==0)return C;let _=pt(u[c[f]],l[h[f]]);if(_!==0)return _}return ue(c.length,h.length)})(n.mapValue,e.mapValue);default:throw Y(23264,{l:t})}}function bm(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);let t=_n(n),r=_n(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Sm(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let i=pt(t[s],r[s]);if(i!==void 0&&i!==0)return i}return ue(t.length,r.length)}function Rs(n){return IB(n)}function IB(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){let r=_n(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return yn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return X.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(let i of t.values||[])s?s=!1:r+=",",r+=IB(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){let r=Object.keys(t.fields||{}).sort(),s="{",i=!0;for(let a of r)i?i=!1:s+=",",s+=`${a}:${IB(t.fields[a])}`;return s+"}"})(n.mapValue):Y(61005,{value:n})}function su(n){switch(Oe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Ia(n);return e?16+su(e):16;case 5:return 2*n.stringValue.length;case 6:return yn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+su(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return tr(r.fields,((i,a)=>{s+=i.length+su(a)})),s})(n.mapValue);default:throw Y(13486,{value:n})}}function Cf(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Yt(n){return!!n&&"integerValue"in n}function vr(n){return!!n&&"doubleValue"in n}function qn(n){return Yt(n)||vr(n)}function Ps(n){return!!n&&"arrayValue"in n}function It(n){return!!n&&"nullValue"in n}function Ct(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Rr(n){return!!n&&"mapValue"in n}function $i(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ff])==null?void 0:r.stringValue)===pf}function TB(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Fr])==null?void 0:t.arrayValue}function Ui(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return tr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ui(r))),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ui(n.arrayValue.values[t]);return e}return{...n}}function EE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===mE}var TR={mapValue:{fields:{[ff]:{stringValue:pf},[Fr]:{arrayValue:{}}}}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Rr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ui(t)}setAll(e){let t=dt.emptyPath(),r={},s=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){let c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=Ui(a):s.push(u.lastSegment())}));let i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){let t=this.field(e.popLast());Rr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Lt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Rr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){tr(t,((s,i)=>e[s]=i));for(let s of r)delete e[s]}clone(){return new n(Ui(this.value))}};function _E(n){let e=[];return tr(n.fields,((t,r)=>{let s=new dt([t]);if(Rr(r)){let i=_E(r.mapValue).fields;if(i.length===0)e.push(s);else for(let a of i)e.push(s.child(a))}else e.push(s)})),new Ft(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:bs(e)?"-0":e}}function gf(n){return{integerValue:""+n}}function mf(n,e,t){return AT(e)?gf(e):Xu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ns=class{constructor(){this._=void 0}};function bT(n,e,t){return n instanceof kr?(function(s,i){let a={fields:{[fE]:{stringValue:dE},[CE]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&wa(i)&&(i=Ia(i)),i&&(a.fields[pE]=i),{mapValue:a}})(t,e):n instanceof Lr?DE(n,e):n instanceof xr?wE(n,e):n instanceof Vr?(function(s,i){let a=yE(s,i),u=hu(a)+hu(s.h);return Yt(a)&&Yt(s.h)?gf(u):Xu(s.serializer,u)})(n,e):n instanceof Os?(function(s,i){return Rm(s,i,Math.min)})(n,e):n instanceof Fs?(function(s,i){return Rm(s,i,Math.max)})(n,e):void 0}function ST(n,e,t){return n instanceof Lr?DE(n,e):n instanceof xr?wE(n,e):t}function yE(n,e){return n instanceof Vr?qn(e)?e:{integerValue:0}:null}var kr=class extends Ns{},Lr=class extends Ns{constructor(e){super(),this.elements=e}};function DE(n,e){let t=IE(e);for(let r of n.elements)t.some((s=>Lt(s,r)))||t.push(r);return{arrayValue:{values:t}}}var xr=class extends Ns{constructor(e){super(),this.elements=e}};function wE(n,e){let t=IE(e);for(let r of n.elements)t=t.filter((s=>!Lt(s,r)));return{arrayValue:{values:t}}}var Yi=class extends Ns{constructor(e,t){super(),this.serializer=e,this.h=t}},Vr=class extends Yi{},Os=class extends Yi{},Fs=class extends Yi{};function Rm(n,e,t){if(!qn(e))return n.h;let r=t(hu(e),hu(n.h));return Yt(e)&&Yt(n.h)?gf(r):Xu(n.serializer,r)}function hu(n){return Ce(n.integerValue||n.doubleValue)}function IE(n){return Ps(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var AB=class{constructor(e,t){this.field=e,this.transform=t}};function RT(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Lr&&s instanceof Lr||r instanceof xr&&s instanceof xr?Ts(r.elements,s.elements,Lt):r instanceof Vr&&s instanceof Vr||r instanceof Os&&s instanceof Os||r instanceof Fs&&s instanceof Fs?Lt(r.h,s.h):r instanceof kr&&s instanceof kr})(n.transform,e.transform)}var vB=class{constructor(e,t){this.version=e,this.transformResults=t}},wt=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function iu(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var ks=class{};function TE(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Gr(n.key,wt.none()):new Mr(n.key,n.data,wt.none());{let t=n.data,r=nt.empty(),s=new xe(dt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new nn(n.key,r,new Ft(s.toArray()),wt.none())}}function PT(n,e,t){n instanceof Mr?(function(s,i,a){let u=s.value.clone(),c=Nm(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):n instanceof nn?(function(s,i,a){if(!iu(s.precondition,i))return void i.convertToUnknownDocument(a.version);let u=Nm(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(AE(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Hi(n,e,t,r){return n instanceof Mr?(function(i,a,u,c){if(!iu(i.precondition,a))return u;let l=i.value.clone(),h=Om(i.fieldTransforms,c,a);return l.setAll(h),a.convertToFoundDocument(a.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof nn?(function(i,a,u,c){if(!iu(i.precondition,a))return u;let l=Om(i.fieldTransforms,c,a),h=a.data;return h.setAll(AE(i)),h.setAll(l),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(i,a,u){return iu(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(n,e,t)}function NT(n,e){let t=null;for(let r of n.fieldTransforms){let s=e.data.field(r.field),i=yE(r.transform,s||null);i!=null&&(t===null&&(t=nt.empty()),t.set(r.field,i))}return t||null}function Pm(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ts(r,s,((i,a)=>RT(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Mr=class extends ks{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},nn=class extends ks{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function AE(n){let e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}})),e}function Nm(n,e,t){let r=new Map;Q(n.length===t.length,32656,{T:t.length,P:n.length});for(let s=0;s<t.length;s++){let i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,ST(a,u,t[s]))}return r}function Om(n,e,t){let r=new Map;for(let s of n){let i=s.transform,a=t.data.field(s.field);r.set(s.field,bT(i,a,e))}return r}var Gr=class extends ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},du=class extends ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ur=class{constructor(e,t){this.position=e,this.inclusive=t}};function Fm(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let i=e[s],a=n.position[s];if(i.field.isKeyField()?r=X.comparator(X.fromName(a.referenceValue),t.key):r=pt(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function km(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Lt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fu=class{},ve=class n extends fu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new SB(e,t,r):t==="array-contains"?new NB(e,r):t==="in"?new OB(e,r):t==="not-in"?new FB(e,r):t==="array-contains-any"?new kB(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new RB(e,r):new PB(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(pt(t,this.value)):t!==null&&Oe(this.value)===Oe(t)&&this.matchesComparison(pt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},xt=class n extends fu{constructor(e,t){super(),this.filters=e,this.op=t,this.I=null}static create(e,t){return new n(e,t)}matches(e){return vE(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.I!==null||(this.I=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.I}getFilters(){return Object.assign([],this.filters)}};function vE(n){return n.op==="and"}function bE(n){return OT(n)&&vE(n)}function OT(n){for(let e of n.filters)if(e instanceof xt)return!1;return!0}function bB(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+Rs(n.value);if(bE(n))return n.filters.map((e=>bB(e))).join(",");{let e=n.filters.map((t=>bB(t))).join(",");return`${n.op}(${e})`}}function SE(n,e){return n instanceof ve?(function(r,s){return s instanceof ve&&r.op===s.op&&r.field.isEqual(s.field)&&Lt(r.value,s.value)})(n,e):n instanceof xt?(function(r,s){return s instanceof xt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,u)=>i&&SE(a,s.filters[u])),!0):!1})(n,e):void Y(19439)}function RE(n){return n instanceof ve?(function(t){return`${t.field.canonicalString()} ${t.op} ${Rs(t.value)}`})(n):n instanceof xt?(function(t){return t.op.toString()+" {"+t.getFilters().map(RE).join(" ,")+"}"})(n):"Filter"}var SB=class extends ve{constructor(e,t,r){super(e,t,r),this.key=X.fromName(r.referenceValue)}matches(e){let t=X.comparator(e.key,this.key);return this.matchesComparison(t)}},RB=class extends ve{constructor(e,t){super(e,"in",t),this.keys=PE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}},PB=class extends ve{constructor(e,t){super(e,"not-in",t),this.keys=PE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}};function PE(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>X.fromName(r.referenceValue)))}var NB=class extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Ps(t)&&Qi(t.arrayValue,this.value)}},OB=class extends ve{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Qi(this.value.arrayValue,t)}},FB=class extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Qi(this.value.arrayValue,t)}},kB=class extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Ps(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Qi(this.value.arrayValue,r)))}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function FT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new _e(0,0))}static max(){return new n(new _e(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vt=class n{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new n(e,0,te.min(),te.min(),te.min(),nt.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,te.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,te.min(),te.min(),nt.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,te.min(),te.min(),nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xi=-1,pu=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};pu.UNKNOWN_ID=-1;function kT(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=te.fromTimestamp(r===1e9?new _e(t+1,0):new _e(t,r));return new Hr(s,X.empty(),e)}function LT(n){return new Hr(n.readTime,n.key,Xi)}var Hr=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(te.min(),X.empty(),Xi)}static max(){return new n(te.max(),X.empty(),Xi)}};function xT(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=X.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var LB=class{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.R=null}};function Lm(n,e=null,t=[],r=[],s=null,i=null,a=null){return new LB(n,e,t,r,s,i,a)}function NE(n){let e=ne(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>bB(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ta(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Rs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Rs(r))).join(",")),e.R=t}return e.R}function OE(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!FT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!SE(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!km(n.startAt,e.startAt)&&km(n.endAt,e.endAt)}function Ar(n){return!!n.isCorePipeline}function FE(n){return!!n.path&&X.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kn=class{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.A=null,this.V=null,this.m=null,this.startAt,this.endAt}};function VT(n,e,t,r,s,i,a,u){return new Kn(n,e,t,r,s,i,a,u)}function Zu(n){return new Kn(n)}function xm(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function MT(n){return X.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ef(n){return n.collectionGroup!==null}function Ds(n){let e=ne(n);if(e.A===null){e.A=[];let t=new Set;for(let i of e.explicitOrderBy)e.A.push(i),t.add(i.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new xe(dt.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(u=u.add(l.field))}))})),u})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.A.push(new jn(i,r))})),t.has(dt.keyField().canonicalString())||e.A.push(new jn(dt.keyField(),r))}return e.A}function Zt(n){let e=ne(n);return e.V||(e.V=GT(e,Ds(n))),e.V}function GT(n,e){if(n.limitType==="F")return Lm(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{let i=s.dir==="desc"?"asc":"desc";return new jn(s.field,i)}));let t=n.endAt?new Ur(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ur(n.startAt.position,n.startAt.inclusive):null;return Lm(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ec(n,e){let t=n.filters.concat([e]);return new Kn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function kE(n,e){let t=n.explicitOrderBy.concat([e]);return new Kn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Zi(n,e,t){return new Kn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function UT(n,e){return OE(Zt(n),Zt(e))&&n.limitType===e.limitType}function qi(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>RE(s))).join(", ")}]`),Ta(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Rs(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Rs(s))).join(",")),`Target(${r})`})(Zt(n))}; limitType=${n.limitType})`}function tc(n,e){return e.isFoundDocument()&&(function(r,s){let i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):X.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(let i of Ds(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(let i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,u,c){let l=Fm(a,u,c);return a.inclusive?l<=0:l<0})(r.startAt,Ds(r),s)||r.endAt&&!(function(a,u,c){let l=Fm(a,u,c);return a.inclusive?l>=0:l>0})(r.endAt,Ds(r),s))})(n,e)}function _f(n){return(e,t)=>{let r=!1;for(let s of Ds(n)){let i=HT(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function HT(n,e,t){let r=n.field.isKeyField()?X.comparator(e.key,t.key):(function(i,a,u){let c=a.data.field(i),l=u.data.field(i);return c!==null&&l!==null?pt(c,l):Y(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Y(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xB=class{constructor(e,t){this.count=e,this.unchangedNames=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se,le;function LE(n){switch(n){case k.OK:return Y(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return Y(15467,{code:n})}}function xE(n){if(n===void 0)return En("GRPC error has no .code"),k.UNKNOWN;switch(n){case Se.OK:return k.OK;case Se.CANCELLED:return k.CANCELLED;case Se.UNKNOWN:return k.UNKNOWN;case Se.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case Se.INTERNAL:return k.INTERNAL;case Se.UNAVAILABLE:return k.UNAVAILABLE;case Se.UNAUTHENTICATED:return k.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case Se.NOT_FOUND:return k.NOT_FOUND;case Se.ALREADY_EXISTS:return k.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return k.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case Se.ABORTED:return k.ABORTED;case Se.OUT_OF_RANGE:return k.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return k.UNIMPLEMENTED;case Se.DATA_LOSS:return k.DATA_LOSS;default:return Y(39323,{code:n})}}(le=Se||(Se={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dn=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){tr(this.inner,((t,r)=>{for(let[s,i]of r)e(s,i)}))}isEmpty(){return cE(this.inner)}size(){return this.innerSize}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qT=new ye(X.comparator);function ht(){return qT}var VE=new ye(X.comparator);function ms(...n){let e=VE;for(let t of n)e=e.insert(t.key,t);return e}function ME(n){let e=VE;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Gn(){return ji()}function GE(){return ji()}function ji(){return new Dn((n=>n.toString()),((n,e)=>n.isEqual(e)))}var jT=new ye(X.comparator),KT=new xe(X.comparator);function oe(...n){let e=KT;for(let t of n)e=e.add(t);return e}var JT=new xe(ue);function zT(){return JT}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var CB=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var QT=new hn([4294967295,4294967295],0);function Vm(n){let e=WT().encode(n),t=new Xl;return t.update(e),new Uint8Array(t.digest())}function Mm(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new hn([t,r],0),new hn([s,i],0)]}var VB=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new br(`Invalid padding: ${t}`);if(r<0)throw new br(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new br(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new br(`Invalid padding when bitmap length is 0: ${t}`);this.p=8*e.length-t,this.S=hn.fromNumber(this.p)}v(e,t,r){let s=e.add(t.multiply(hn.fromNumber(r)));return s.compare(QT)===1&&(s=new hn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.S).toNumber()}D(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.p===0)return!1;let t=Vm(e),[r,s]=Mm(t);for(let i=0;i<this.hashCount;i++){let a=this.v(r,s,i);if(!this.D(a))return!1}return!0}static create(e,t,r){let s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new n(i,s,t);return r.forEach((u=>a.insert(u))),a}insert(e){if(this.p===0)return;let t=Vm(e),[r,s]=Mm(t);for(let i=0;i<this.hashCount;i++){let a=this.v(r,s,i);this.C(a)}}C(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},br=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ea=class n{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let s=new Map;return s.set(e,ta.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(te.min(),s,new ye(ue),ht(),ht(),oe())}},ta=class n{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,oe(),oe(),oe())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ws=class{constructor(e,t,r,s){this.F=e,this.removedTargetIds=t,this.key=r,this.O=s}},Cu=class{constructor(e,t){this.targetId=e,this.M=t}},gu=class{constructor(e,t,r=Ne.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}},mu=class{constructor(e){this.targetId=e,this.N=0,this.L=Gm(),this.B=Ne.EMPTY_BYTE_STRING,this.U=!1,this.k=!0}get current(){return this.U}get resumeToken(){return this.B}get q(){return this.N!==0}get $(){return this.k}K(e){e.approximateByteSize()>0&&(this.k=!0,this.B=e)}W(){let e=oe(),t=oe(),r=oe();return this.L.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Y(38017,{changeType:i})}})),new ta(this.B,this.U,e,t,r)}G(){this.k=!1,this.L=Gm()}j(e,t){this.k=!0,this.L=this.L.insert(e,t)}H(e){this.k=!0,this.L=this.L.remove(e)}J(){this.N+=1}Y(){this.N-=1,Q(this.N>=0,3241,{N:this.N,targetId:this.targetId})}Z(){this.k=!0,this.U=!0}},Mi="WatchChangeAggregator",MB=class{constructor(e){this.X=e,this.ee=new Map,this.te=ht(),this.ne=tu(),this.re=ht(),this.ie=tu(),this.se=new ye(ue)}_e(e){for(let t of e.F)e.O&&e.O.isFoundDocument()?this.oe(t,e.O):this.ae(t,e.key,e.O);for(let t of e.removedTargetIds)this.ae(t,e.key,e.O)}ue(e){this.forEachTarget(e,(t=>{let r=this.ee.get(t);if(r)switch(e.state){case 0:this.ce(t)&&r.K(e.resumeToken);break;case 1:r.Y(),r.q||r.G(),r.K(e.resumeToken);break;case 2:r.Y(),r.q||this.removeTarget(t);break;case 3:this.ce(t)&&(r.Z(),r.K(e.resumeToken));break;case 4:this.ce(t)&&(this.le(t),r.K(e.resumeToken));break;default:Y(56790,{state:e.state})}else K(Mi,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ee.forEach(((r,s)=>{this.ce(s)&&t(s)}))}Ee(e){var t;return Ar(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:FE(e)}he(e){let t=e.targetId,r=e.M.count,s=this.Te(t);if(s){let i=s.target;if(this.Ee(i))if(r===0){let a=new X(Ar(i)?Be.fromString(i.getPipelineDocuments()[0]):i.path);this.ae(t,a,vt.newNoDocument(a,te.min()))}else Q(r===1,20013,"Single document existence filter with count: "+r);else{let a=this.Pe(t);if(a!==r){let u=this.Ie(e),c=u?this.Re(u,e,a):1;if(c!==0){this.le(t);let l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.se=this.se.insert(t,l)}CB==null||CB.Ae((function(h,f,C,_,D){var q,z,ie;let P={localCacheCount:h,existenceFilterCount:f.count,databaseId:C.database,projectId:C.projectId},V=f.unchangedNames;return V&&(P.bloomFilter={applied:D===0,hashCount:(V==null?void 0:V.hashCount)??0,bitmapLength:((z=(q=V==null?void 0:V.bits)==null?void 0:q.bitmap)==null?void 0:z.length)??0,padding:((ie=V==null?void 0:V.bits)==null?void 0:ie.padding)??0,mightContain:De=>(_==null?void 0:_.mightContain(De))??!1}),P})(a,e.M,this.X.Ve(),u,c))}}}}Ie(e){let t=e.M.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t,a,u;try{a=yn(r).toUint8Array()}catch(c){if(c instanceof lu)return kt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new VB(a,s,i)}catch(c){return kt(c instanceof br?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.p===0?null:u}Re(e,t,r){return t.M.count===r-this.de(e,t.targetId)?0:2}de(e,t){let r=this.X.getRemoteKeysForTarget(t),s=0;return r.forEach((i=>{let a=this.X.Ve(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.ae(t,i,null),s++)})),s}fe(e){let t=new Map;this.ee.forEach(((i,a)=>{let u=this.Te(a);if(u){if(i.current&&this.Ee(u.target)){let c=Ar(u.target)?Be.fromString(u.target.getPipelineDocuments()[0]):u.target.path,l=new X(c);this.me(l).has(a)||this.pe(a,l)||this.ae(a,l,vt.newNoDocument(l,e))}i.$&&(t.set(a,i.W()),i.G())}}));let r=oe();this.ie.forEach(((i,a)=>{let u=!0;a.forEachWhile((c=>{let l=this.Te(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(i))})),this.te.forEach(((i,a)=>a.setReadTime(e))),this.re.forEach(((i,a)=>a.setReadTime(e)));let s=new ea(e,t,this.se,this.te,this.re,r);return this.te=ht(),this.ne=tu(),this.re=ht(),this.ie=tu(),this.se=new ye(ue),s}oe(e,t){let r=this.ee.get(e);if(!r||!this.ce(e))return void K(Mi,`addDocumentToTarget received document for unknown inactive target (${e})`);let s=this.pe(e,t.key)?2:0;r.j(t.key,s),Ar(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t.key,t):this.te=this.te.insert(t.key,t),this.ne=this.ne.insert(t.key,this.me(t.key).add(e)),this.ie=this.ie.insert(t.key,this.ge(t.key).add(e))}ae(e,t,r){let s=this.ee.get(e);s&&this.ce(e)?(this.pe(e,t)?s.j(t,1):s.H(t),this.ie=this.ie.insert(t,this.ge(t).delete(e)),this.ie=this.ie.insert(t,this.ge(t).add(e)),r&&(Ar(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t,r):this.te=this.te.insert(t,r))):K(Mi,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ee.delete(e)}Pe(e){let t=this.ee.get(e);if(!t)return 0;let r=t.W();return this.X.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}J(e){let t=this.ee.get(e);t||(K(Mi,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new mu(e),this.ee.set(e,t)),t.J()}ge(e){let t=this.ie.get(e);return t||(t=new xe(ue),this.ie=this.ie.insert(e,t)),t}me(e){let t=this.ne.get(e);return t||(t=new xe(ue),this.ne=this.ne.insert(e,t)),t}ce(e){let t=this.Te(e)!==null;return t||K(Mi,"Detected inactive target",e),t}Te(e){let t=this.ee.get(e);return t===void 0||t.q?null:this.X.ye(e)}le(e){this.ee.set(e,new mu(e)),this.X.getRemoteKeysForTarget(e).forEach((t=>{this.ae(e,t,null)}))}pe(e,t){return this.X.getRemoteKeysForTarget(e).has(t)}};function tu(){return new ye(X.comparator)}function Gm(){return new ye(X.comparator)}var $T={asc:"ASCENDING",desc:"DESCENDING"},YT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},XT={and:"AND",or:"OR"},GB=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function UB(n,e){return n.useProto3Json||Ta(e)?e:{value:e}}function Ki(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yf(n){let e=_n(n);return new _e(e.seconds,e.nanos)}function UE(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function au(n,e){return Ki(n,e.toTimestamp())}function Tt(n){return Q(!!n,49232),te.fromTimestamp(yf(n))}function Df(n,e){return HB(n,e).canonicalString()}function HB(n,e){let t=(function(s){return new Be(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function HE(n){let e=Be.fromString(n);return Q(WE(e),10190,{key:e.toString()}),e}function na(n,e){return Df(n.databaseId,e.path)}function Ji(n,e){let t=HE(e);if(t.get(1)!==n.databaseId.projectId)throw new G(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new G(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new X(jE(t))}function qE(n,e){return Df(n.databaseId,e)}function ZT(n){let e=HE(n);return e.length===4?Be.emptyPath():jE(e)}function qB(n){return new Be(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jE(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Um(n,e,t){return{name:na(n,e),fields:t.value.mapValue.fields}}function eA(n,e){return"found"in e?(function(r,s){Q(!!s.found,43571),s.found.name,s.found.updateTime;let i=Ji(r,s.found.name),a=Tt(s.found.updateTime),u=s.found.createTime?Tt(s.found.createTime):te.min(),c=new nt({mapValue:{fields:s.found.fields}});return vt.newFoundDocument(i,a,u,c)})(n,e):"missing"in e?(function(r,s){Q(!!s.missing,3894),Q(!!s.readTime,22933);let i=Ji(r,s.missing),a=Tt(s.readTime);return vt.newNoDocument(i,a)})(n,e):Y(7234,{result:e})}function tA(n,e){let t;if("targetChange"in e){e.targetChange;let r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Y(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,h){return l.useProto3Json?(Q(h===void 0||typeof h=="string",58123),Ne.fromBase64String(h||"")):(Q(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Ne.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(l){let h=l.code===void 0?k.UNKNOWN:xE(l.code);return new G(h,l.message||"")})(a);t=new gu(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let s=Ji(n,r.document.name),i=Tt(r.document.updateTime),a=r.document.createTime?Tt(r.document.createTime):te.min(),u=new nt({mapValue:{fields:r.document.fields}}),c=vt.newFoundDocument(s,i,a,u),l=r.targetIds||[],h=r.removedTargetIds||[];t=new ws(l,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let s=Ji(n,r.document),i=r.readTime?Tt(r.readTime):te.min(),a=vt.newNoDocument(s,i),u=r.removedTargetIds||[];t=new ws([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let s=Ji(n,r.document),i=r.removedTargetIds||[];t=new ws([],i,s,null)}else{if(!("filter"in e))return Y(11601,{we:e});{e.filter;let r=e.filter;r.targetId;let{count:s=0,unchangedNames:i}=r,a=new xB(s,i),u=r.targetId;t=new Cu(u,a)}}return t}function KE(n,e){let t;if(e instanceof Mr)t={update:Um(n,e.key,e.value)};else if(e instanceof Gr)t={delete:na(n,e.key)};else if(e instanceof nn)t={update:Um(n,e.key,e.data),updateMask:BA(e.fieldMask)};else{if(!(e instanceof du))return Y(16599,{be:e.type});t={verify:na(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){let u=a.transform;if(u instanceof kr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Lr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof xr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Vr)return{fieldPath:a.field.canonicalString(),increment:u.h};if(u instanceof Os)return{fieldPath:a.field.canonicalString(),minimum:u.h};if(u instanceof Fs)return{fieldPath:a.field.canonicalString(),maximum:u.h};throw Y(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:au(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Y(27497)})(n,e.precondition)),t}function nA(n,e){return n&&n.length>0?(Q(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Tt(s.updateTime):Tt(i);return a.isEqual(te.min())&&(a=Tt(i)),new vB(a,s.transformResults||[])})(t,e)))):[]}function rA(n,e){return{documents:[qE(n,e.path)]}}function sA(n,e){let t={structuredQuery:{}},r=e.path,s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=qE(n,s);let i=(function(l){if(l.length!==0)return zE(xt.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);let a=(function(l){if(l.length!==0)return l.map((h=>(function(C){return{field:Es(C.field),direction:uA(C.dir)}})(h)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);let u=UB(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{Se:t,parent:s}}function iA(n){let e=ZT(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){Q(r===1,65062);let h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=(function(f){let C=JE(f);return C instanceof xt&&bE(C)?C.getFilters():[C]})(t.where));let a=[];t.orderBy&&(a=(function(f){return f.map((C=>(function(D){return new jn(_s(D.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(C)))})(t.orderBy));let u=null;t.limit&&(u=(function(f){let C;return C=typeof f=="object"?f.value:f,Ta(C)?null:C})(t.limit));let c=null;t.startAt&&(c=(function(f){let C=!!f.before,_=f.values||[];return new Ur(_,C)})(t.startAt));let l=null;return t.endAt&&(l=(function(f){let C=!f.before,_=f.values||[];return new Ur(_,C)})(t.endAt)),VT(e,s,a,i,u,"F",c,l)}function aA(n,e){let t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function oA(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function JE(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=_s(t.unaryFilter.field);return ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=_s(t.unaryFilter.field);return ve.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let i=_s(t.unaryFilter.field);return ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=_s(t.unaryFilter.field);return ve.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Y(61313);default:return Y(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ve.create(_s(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Y(58110);default:return Y(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return xt.create(t.compositeFilter.filters.map((r=>JE(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Y(1026)}})(t.compositeFilter.op))})(n):Y(30097,{filter:n})}function uA(n){return $T[n]}function cA(n){return YT[n]}function lA(n){return XT[n]}function Es(n){return{fieldPath:n.canonicalString()}}function _s(n){return dt.fromServerFormat(n.fieldPath)}function zE(n){return n instanceof ve?(function(t){if(t.op==="=="){if(Ct(t.value))return{unaryFilter:{field:Es(t.field),op:"IS_NAN"}};if(It(t.value))return{unaryFilter:{field:Es(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ct(t.value))return{unaryFilter:{field:Es(t.field),op:"IS_NOT_NAN"}};if(It(t.value))return{unaryFilter:{field:Es(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Es(t.field),op:cA(t.op),value:t.value}}})(n):n instanceof xt?(function(t){let r=t.getFilters().map((s=>zE(s)));return r.length===1?r[0]:{compositeFilter:{op:lA(t.op),filters:r}}})(n):Y(54877,{filter:n})}function BA(n){let e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function WE(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function QE(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function ra(n,e){let t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function $E(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nc(n){return new GB(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var en=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ne.fromBase64String(e))}catch(t){throw new G(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ne.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Da(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};en._jsonSchemaVersion="firestore/bytes/1.0",en._jsonSchema={type:Pe("string",en._jsonSchemaVersion),bytes:Pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new G(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new dt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};function YE(){return new qr(As)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jr=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pn=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new G(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new G(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Da(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};pn._jsonSchemaVersion="firestore/geoPoint/1.0",pn._jsonSchema={type:Pe("string",pn._jsonSchemaVersion),latitude:Pe("number"),longitude:Pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ke=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Ke.UNAUTHENTICATED=new Ke(null),Ke.GOOGLE_CREDENTIALS=new Ke("google-credentials-uid"),Ke.FIRST_PARTY=new Ke("first-party-uid"),Ke.MOCK_USER=new Ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tn=class{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Eu=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},_u=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ke.UNAUTHENTICATED)))}shutdown(){}},jB=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}},yu=class{constructor(e){this.De=e,this.currentUser=Ke.UNAUTHENTICATED,this.xe=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.Ce===void 0,42304);let r=this.xe,s=c=>this.xe!==r?(r=this.xe,t(c)):Promise.resolve(),i=new tn;this.Ce=()=>{this.xe++,this.currentUser=this.Fe(),i.resolve(),i=new tn,e.enqueueRetryable((()=>s(this.currentUser)))};let a=()=>{let c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.Ce&&(this.auth.addAuthTokenListener(this.Ce),a())};this.De.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){let c=this.De.getImmediate({optional:!0});c?u(c):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new tn)}}),0),a()}getToken(){let e=this.xe,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.xe!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{Oe:r}),new Eu(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.Ce&&this.auth.removeAuthTokenListener(this.Ce),this.Ce=void 0}Fe(){let e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{Me:e}),new Ke(e)}},KB=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.Ue=new Map}ke(){return this.Be?this.Be():null}get headers(){this.Ue.set("X-Goog-AuthUser",this.Ne);let e=this.ke();return e&&this.Ue.set("Authorization",e),this.Le&&this.Ue.set("X-Goog-Iam-Authorization-Token",this.Le),this.Ue}},JB=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r}getToken(){return Promise.resolve(new KB(this.Ne,this.Le,this.Be))}start(e,t){e.enqueueRetryable((()=>t(Ke.FIRST_PARTY)))}shutdown(){}invalidateToken(){}},Du=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},wu=class{constructor(e,t){this.qe=t,this.forceRefresh=!1,this.appCheck=null,this.$e=null,this.Ke=null,Ye(e)&&e.settings.appCheckToken&&(this.Ke=e.settings.appCheckToken)}start(e,t){Q(this.Ce===void 0,3512);let r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);let a=i.token!==this.$e;return this.$e=i.token,K("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.Ce=i=>{e.enqueueRetryable((()=>r(i)))};let s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.Ce&&this.appCheck.addTokenListener(this.Ce)};this.qe.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){let i=this.qe.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.Ke)return Promise.resolve(new Du(this.Ke));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Q(typeof t.token=="string",44558,{tokenResult:t}),this.$e=t.token,new Du(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.Ce&&this.appCheck.removeTokenListener(this.Ce),this.Ce=void 0}};function XE(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zB=class{Qe(e){}shutdown(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hm="ConnectivityMonitor",Iu=class{constructor(){this.We=()=>this.Ge(),this.ze=()=>this.je(),this.He=[],this.Je()}Qe(e){this.He.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.ze)}Je(){window.addEventListener("online",this.We),window.addEventListener("offline",this.ze)}Ge(){K(Hm,"Network connectivity changed: AVAILABLE");for(let e of this.He)e(0)}je(){K(Hm,"Network connectivity changed: UNAVAILABLE");for(let e of this.He)e(1)}static Ye(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nu=null;function WB(){return nu===null?nu=(function(){return 268435456+Math.round(2147483648*Math.random())})():nu++,"0x"+nu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gB="RestConnection",hA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},QB=class{get Ze(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Xe=t+"://"+e.host,this.et=`projects/${r}/databases/${s}`,this.tt=this.databaseId.database===Bu?`project_id=${r}`:`project_id=${r}&database_id=${s}`}nt(e,t,r,s,i){let a=WB(),u=this.rt(e,t.toUriEncodedString());K(gB,`Sending RPC '${e}' ${a}:`,u,r);let c={"google-cloud-resource-prefix":this.et,"x-goog-request-params":this.tt};this.it(c,s,i);let{host:l}=new URL(u),h=Br(l);return this.st(e,u,c,r,h).then((f=>(K(gB,`Received RPC '${e}' ${a}: `,f),f)),(f=>{throw kt(gB,`RPC '${e}' ${a} failed with error: `,f,"url: ",u,"request:",r),f}))}_t(e,t,r,s,i,a){return this.nt(e,t,r,s,i)}it(e,t,r){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ks})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(let s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}rt(e,t){let r=hA[e],s=`${this.Xe}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $B=class{constructor(e){this.ot=e.ot,this.ut=e.ut}ct(e){this.lt=e}Et(e){this.ht=e}Tt(e){this.Pt=e}onMessage(e){this.It=e}close(){this.ut()}send(e){this.ot(e)}Rt(){this.lt()}At(){this.ht()}Vt(e){this.Pt(e)}dt(e){this.It(e)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et="WebChannelConnection",Gi=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))},Tu=class n extends QB{constructor(e){super(e),this.ft=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static gt(){if(!n.yt){let e=nB();Gi(e,tB.STAT_EVENT,(t=>{t.stat===qo.PROXY?K(et,"STAT_EVENT: detected buffering proxy"):t.stat===qo.NOPROXY&&K(et,"STAT_EVENT: detected no buffering proxy")})),n.yt=!0}}st(e,t,r,s,i){let a=WB();return new Promise(((u,c)=>{let l=new Zl;l.setWithCredentials(!0),l.listenOnce(eB.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Oi.NO_ERROR:let f=l.getResponseJson();K(et,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(f)),u(f);break;case Oi.TIMEOUT:K(et,`RPC '${e}' ${a} timed out`),c(new G(k.DEADLINE_EXCEEDED,"Request time out"));break;case Oi.HTTP_ERROR:let C=l.getStatus();if(K(et,`RPC '${e}' ${a} failed with status:`,C,"response text:",l.getResponseText()),C>0){let _=l.getResponseJson();Array.isArray(_)&&(_=_[0]);let D=_==null?void 0:_.error;if(D&&D.status&&D.message){let P=(function(q){let z=q.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(z)>=0?z:k.UNKNOWN})(D.status);c(new G(P,D.message))}else c(new G(k.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new G(k.UNAVAILABLE,"Connection failed."));break;default:Y(9055,{wt:e,streamId:a,bt:l.getLastErrorCode(),St:l.getLastError()})}}finally{K(et,`RPC '${e}' ${a} completed.`)}}));let h=JSON.stringify(s);K(et,`RPC '${e}' ${a} sending request:`,s),l.send(t,"POST",h,r,15)}))}vt(e,t,r){let s=WB(),i=[this.Xe,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.it(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let l=i.join("");K(et,`Creating RPC '${e}' stream ${s}: ${l}`,u);let h=a.createWebChannel(l,u);this.Dt(h);let f=!1,C=!1,_=new $B({ot:D=>{C?K(et,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(f||(K(et,`Opening RPC '${e}' stream ${s} transport.`),h.open(),f=!0),K(et,`RPC '${e}' stream ${s} sending:`,D),h.send(D))},ut:()=>h.close()});return Gi(h,Bs.EventType.OPEN,(()=>{C||(K(et,`RPC '${e}' stream ${s} transport opened.`),_.Rt())})),Gi(h,Bs.EventType.CLOSE,(()=>{C||(C=!0,K(et,`RPC '${e}' stream ${s} transport closed`),_.Vt(),this.xt(h))})),Gi(h,Bs.EventType.ERROR,(D=>{C||(C=!0,kt(et,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),_.Vt(new G(k.UNAVAILABLE,"The operation could not be completed")))})),Gi(h,Bs.EventType.MESSAGE,(D=>{var P;if(!C){let V=D.data[0];Q(!!V,16349);let q=V,z=(q==null?void 0:q.error)||((P=q[0])==null?void 0:P.error);if(z){K(et,`RPC '${e}' stream ${s} received error:`,z);let ie=z.status,De=(function(A){let E=Se[A];if(E!==void 0)return xE(E)})(ie),Ae=z.message;ie==="NOT_FOUND"&&Ae.includes("database")&&Ae.includes("does not exist")&&Ae.includes(this.databaseId.database)&&kt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),De===void 0&&(De=k.INTERNAL,Ae="Unknown error status: "+ie+" with message "+z.message),C=!0,_.Vt(new G(De,Ae)),h.close()}else K(et,`RPC '${e}' stream ${s} received:`,V),_.dt(V)}})),n.gt(),setTimeout((()=>{_.At()}),0),_}terminate(){this.ft.forEach((e=>e.close())),this.ft=[]}Dt(e){this.ft.push(e)}xt(e){this.ft=this.ft.filter((t=>t===e))}it(e,t,r){super.it(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return rB()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dA(n){return new Tu(n)}Tu.yt=!1;var sa=class{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ct=e,this.timerId=t,this.Ft=r,this.Ot=s,this.Mt=i,this.Nt=0,this.Lt=null,this.Bt=Date.now(),this.reset()}reset(){this.Nt=0}Ut(){this.Nt=this.Mt}kt(e){this.cancel();let t=Math.floor(this.Nt+this.qt()),r=Math.max(0,Date.now()-this.Bt),s=Math.max(0,t-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lt=this.Ct.enqueueAfterDelay(this.timerId,s,(()=>(this.Bt=Date.now(),e()))),this.Nt*=this.Ot,this.Nt<this.Ft&&(this.Nt=this.Ft),this.Nt>this.Mt&&(this.Nt=this.Mt)}$t(){this.Lt!==null&&(this.Lt.skipDelay(),this.Lt=null)}cancel(){this.Lt!==null&&(this.Lt.cancel(),this.Lt=null)}qt(){return(Math.random()-.5)*this.Nt}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qm="PersistentStream",Au=class{constructor(e,t,r,s,i,a,u,c){this.Ct=e,this.Kt=r,this.Qt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Wt=0,this.Gt=null,this.zt=null,this.stream=null,this.jt=0,this.Ht=new sa(e,t)}Jt(){return this.state===1||this.state===5||this.Yt()}Yt(){return this.state===2||this.state===3}start(){this.jt=0,this.state!==4?this.auth():this.Zt()}async stop(){this.Jt()&&await this.close(0)}Xt(){this.state=0,this.Ht.reset()}en(){this.Yt()&&this.Gt===null&&(this.Gt=this.Ct.enqueueAfterDelay(this.Kt,6e4,(()=>this.tn())))}nn(e){this.rn(),this.stream.send(e)}async tn(){if(this.Yt())return this.close(0)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}sn(){this.zt&&(this.zt.cancel(),this.zt=null)}async close(e,t){this.rn(),this.sn(),this.Ht.cancel(),this.Wt++,e!==4?this.Ht.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(En(t.toString()),En("Using maximum backoff delay to prevent overloading the backend."),this.Ht.Ut()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this._n(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Tt(t)}_n(){}auth(){this.state=1;let e=this.an(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Wt===t&&this.un(r,s)}),(r=>{e((()=>{let s=new G(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.cn(s)}))}))}un(e,t){let r=this.an(this.Wt);this.stream=this.En(e,t),this.stream.ct((()=>{r((()=>this.listener.ct()))})),this.stream.Et((()=>{r((()=>(this.state=2,this.zt=this.Ct.enqueueAfterDelay(this.Qt,1e4,(()=>(this.Yt()&&(this.state=3),Promise.resolve()))),this.listener.Et())))})),this.stream.Tt((s=>{r((()=>this.cn(s)))})),this.stream.onMessage((s=>{r((()=>++this.jt==1?this.hn(s):this.onNext(s)))}))}Zt(){this.state=5,this.Ht.kt((async()=>{this.state=0,this.start()}))}cn(e){return K(qm,`close with error: ${e}`),this.stream=null,this.close(4,e)}an(e){return t=>{this.Ct.enqueueAndForget((()=>this.Wt===e?t():(K(qm,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}},YB=class extends Au{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}En(e,t){return this.connection.vt("Listen",e,t)}hn(e){return this.onNext(e)}onNext(e){this.Ht.reset();let t=tA(this.serializer,e),r=(function(i){if(!("targetChange"in i))return te.min();let a=i.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?Tt(a.readTime):te.min()})(e);return this.listener.Tn(t,r)}Pn(e){let t={};t.database=qB(this.serializer),t.addTarget=(function(i,a){let u,c=a.target;if(u=Ar(c)?{pipelineQuery:oA(i,c)}:FE(c)?{documents:rA(i,c)}:{query:sA(i,c).Se},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=UE(i,a.resumeToken);let l=UB(i,a.expectedCount);l!==null&&(u.expectedCount=l)}else if(a.snapshotVersion.compareTo(te.min())>0){u.readTime=Ki(i,a.snapshotVersion.toTimestamp());let l=UB(i,a.expectedCount);l!==null&&(u.expectedCount=l)}return u})(this.serializer,e);let r=aA(this.serializer,e);r&&(t.labels=r),this.nn(t)}In(e){let t={};t.database=qB(this.serializer),t.removeTarget=e,this.nn(t)}},XB=class extends Au{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Rn(){return this.jt>0}start(){this.lastStreamToken=void 0,super.start()}_n(){this.Rn&&this.An([])}En(e,t){return this.connection.vt("Write",e,t)}hn(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.Vn()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.Ht.reset();let t=nA(e.writeResults,e.commitTime),r=Tt(e.commitTime);return this.listener.dn(r,t)}fn(){let e={};e.database=qB(this.serializer),this.nn(e)}An(e){let t={streamToken:this.lastStreamToken,writes:e.map((r=>KE(this.serializer,r)))};this.nn(t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ZB=class{},eh=class extends ZB{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.mn=!1}pn(){if(this.mn)throw new G(k.FAILED_PRECONDITION,"The client has already been terminated.")}nt(e,t,r,s){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.nt(e,HB(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new G(k.UNKNOWN,i.toString())}))}_t(e,t,r,s,i){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection._t(e,HB(t,r),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new G(k.UNKNOWN,a.toString())}))}terminate(){this.mn=!0,this.connection.terminate()}};function fA(n,e,t,r){return new eh(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pA="ComponentProvider",jm=new Map;function CA(n,e,t,r,s){return new wB(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,XE(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Km={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ZE=41943040,Ot=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};Ot.DEFAULT_COLLECTION_PERCENTILE=10,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ot.DEFAULT=new Ot(ZE,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ot.DISABLED=new Ot(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ls=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.gn(r),this.yn=r=>t.writeSequenceNumber(r))}gn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.yn&&this.yn(e),e}};Ls.wn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",th=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Js(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==gA)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Y(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):n.reject(t)}static resolve(e){return new n(((t,r)=>{t(e)}))}static reject(e){return new n(((t,r)=>{r(e)}))}static waitFor(e){return new n(((t,r)=>{let s=0,i=0,a=!1;e.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&t()}),(c=>r(c)))})),a=!0,i===s&&t()}))}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next((s=>s?n.resolve(s):r()));return t}static forEach(e,t){let r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new n(((r,s)=>{let i=e.length,a=new Array(i),u=0;for(let c=0;c<i;c++){let l=c;t(e[l]).next((h=>{a[l]=h,++u,u===i&&r(a)}),(h=>s(h)))}}))}static doWhile(e,t){return new n(((r,s)=>{let i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mA(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function zs(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jm="LruGarbageCollector",EA=1048576;function zm([n,e],[t,r]){let s=ue(n,t);return s===0?ue(e,r):s}var nh=class{constructor(e){this.Yn=e,this.buffer=new xe(zm),this.Zn=0}Xn(){return++this.Zn}er(e){let t=[e,this.Xn()];if(this.buffer.size<this.Yn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();zm(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},rh=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.nr(6e4)}stop(){this.tr&&(this.tr.cancel(),this.tr=null)}get started(){return this.tr!==null}nr(e){K(Jm,`Garbage collection scheduled in ${e}ms`),this.tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){zs(t)?K(Jm,"Ignoring IndexedDB error during garbage collection: ",t):await Js(t)}await this.nr(3e5)}))}},sh=class{constructor(e,t){this.rr=e,this.params=t}calculateTargetCount(e,t){return this.rr.ir(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return M.resolve(Ls.wn);let r=new nh(t);return this.rr.forEachTarget(e,(s=>r.er(s.sequenceNumber))).next((()=>this.rr.sr(e,(s=>r.er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.rr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.rr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(Km)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Km):this._r(e,t)))}getCacheSize(e){return this.rr.getCacheSize(e)}_r(e,t){let r,s,i,a,u,c,l,h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,a=Date.now(),this.nthSequenceNumber(e,s)))).next((f=>(r=f,u=Date.now(),this.removeTargets(e,r,t)))).next((f=>(i=f,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(l=Date.now(),Cs()<=ae.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${f} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f}))))}};function _A(n,e){return new sh(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var e_="firestore.googleapis.com",Wm=!0,vu=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new G(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=e_,this.ssl=Wm}else this.host=e.host,this.ssl=e.ssl??Wm;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=ZE;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<EA)throw new G(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(BE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=XE(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new G(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new G(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new G(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new G(k.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(r,s){if(r===s)return!0;if(!r||!s)return!1;let i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(let u of i)if(r[u]!==s[u])return!1;return!0})(this._customHeaders,e._customHeaders)}},rc=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new G(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new G(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new _u;switch(r.type){case"firstParty":return new JB(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new G(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){let r=jm.get(t);r&&(K(pA,"Removing Datastore"),jm.delete(t),r.terminate())})(this),Promise.resolve()}};function t_(n,e,t,r={}){var l;n=$r(n,rc);let s=Br(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&eo(`https://${u}`),i.host!==e_&&i.host!==u&&kt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let c={...i,host:u,ssl:s,emulatorOptions:r};if(!Gt(c,a)&&(n._setSettings(c),r.mockUserToken)){let h,f;if(typeof r.mockUserToken=="string")h=r.mockUserToken,f=Ke.MOCK_USER;else{h=iC(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);let C=r.mockUserToken.sub||r.mockUserToken.user_id;if(!C)throw new G(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ke(C)}n._authCredentials=new jB(new Eu(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wn=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Ve=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Da(t,n._jsonSchema))return new n(e,r||null,new X(Be.fromString(t.referencePath)))}};Ve._jsonSchemaVersion="firestore/documentReference/1.0",Ve._jsonSchema={type:Pe("string",Ve._jsonSchemaVersion),referencePath:Pe("string")};var Cn=class n extends wn{constructor(e,t,r){super(e,t,Zu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Ve(this.firestore,null,new X(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function wf(n,e,...t){if(n=de(n),lE("collection","path",e),n instanceof rc){let r=Be.fromString(e,...t);return Tm(r),new Cn(n,null,r)}{if(!(n instanceof Ve||n instanceof Cn))throw new G(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Be.fromString(e,...t));return Tm(r),new Cn(n.firestore,null,r)}}function sc(n,e,...t){if(n=de(n),arguments.length===1&&(e=Is.newId()),lE("doc","path",e),n instanceof rc){let r=Be.fromString(e,...t);return Im(r),new Ve(n,null,new X(r))}{if(!(n instanceof Ve||n instanceof Cn))throw new G(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Be.fromString(e,...t));return Im(r),new Ve(n.firestore,n instanceof Cn?n.converter:null,new X(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var At=class n{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Da(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new n(e.vectorValues);throw new G(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};At._jsonSchemaVersion="firestore/vectorValue/1.0",At._jsonSchema={type:Pe("string",At._jsonSchemaVersion),vectorValues:Pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yA=/^__.*__$/,ih=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Mr(e,this.data,t,this.fieldTransforms)}},bu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new nn(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function n_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y(40011,{dataSource:n})}}var ah=class n{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;let t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;let t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ru(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(n_(this.dataSource)&&yA.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},oh=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||nc(e)}createContext(e,t,r,s=!1){return new ah({dataSource:e,methodName:t,targetDoc:r,path:dt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function If(n){let e=n._freezeSettings(),t=nc(n._databaseId);return new oh(n._databaseId,!!e.ignoreUndefinedProperties,t)}function r_(n,e,t,r,s,i={}){let a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);Tf("Data must be an object, but it was:",a,r);let u=o_(r,a),c,l;if(i.merge)c=new Ft(a.fieldMask),l=a.fieldTransforms;else if(i.mergeFields){let h=[];for(let f of i.mergeFields){let C=zn(e,f,t);if(!a.contains(C))throw new G(k.INVALID_ARGUMENT,`Field '${C}' is specified in your field mask but missing from your input data.`);l_(h,C)||h.push(C)}c=new Ft(h),l=a.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,l=a.fieldTransforms;return new ih(new nt(u),c,l)}var Su=class n extends jr{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};var uh=class n extends jr{_toFieldTransform(e){return new AB(e.path,new kr)}isEqual(e){return e instanceof n}};function s_(n,e,t,r){let s=n.createContext(1,e,t);Tf("Data must be an object, but it was:",s,r);let i=[],a=nt.empty();tr(r,((c,l)=>{let h=Af(e,c,t);l=de(l);let f=s.childContextForFieldPath(h);if(l instanceof Su)i.push(h);else{let C=Jn(l,f);C!=null&&(i.push(h),a.set(h,C))}}));let u=new Ft(i);return new bu(a,u,s.fieldTransforms)}function i_(n,e,t,r,s,i){let a=n.createContext(1,e,t),u=[zn(e,r,t)],c=[s];if(i.length%2!=0)throw new G(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let C=0;C<i.length;C+=2)u.push(zn(e,i[C])),c.push(i[C+1]);let l=[],h=nt.empty();for(let C=u.length-1;C>=0;--C)if(!l_(l,u[C])){let _=u[C],D=c[C];D=de(D);let P=a.childContextForFieldPath(_);if(D instanceof Su)l.push(_);else{let V=Jn(D,P);V!=null&&(l.push(_),h.set(_,V))}}let f=new Ft(l);return new bu(h,f,a.fieldTransforms)}function a_(n,e,t,r=!1){return Jn(t,n.createContext(r?4:3,e))}function Jn(n,e,t){if(c_(n=de(n)))return Tf("Unsupported field value:",e,n),o_(n,e);if(n instanceof jr)return(function(s,i){if(!n_(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);let a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){let a=[],u=0;for(let c of s){let l=Jn(c,i.childContextForArray(u));l==null&&(l={nullValue:"NULL_VALUE"}),a.push(l),u++}return{arrayValue:{values:a}}})(n,e)}return(function(s,i,a){if((s=de(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return mf(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){let u=_e.fromDate(s);return{timestampValue:Ki(i.serializer,u)}}if(s instanceof _e){let u=new _e(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Ki(i.serializer,u)}}if(u_(s)){let u=_e.fromInstant(s),c=new _e(u.seconds,1e3*Math.floor(u.nanoseconds/1e3));return{timestampValue:Ki(i.serializer,c)}}if(s instanceof pn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof en)return{bytesValue:UE(i.serializer,s._byteString)};if(s instanceof Ve){let u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:Df(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof At)return(function(c,l){let h=c instanceof At?c.toArray():c;return{mapValue:{fields:{[ff]:{stringValue:pf},[Fr]:{arrayValue:{values:h.map((C=>{if(typeof C!="number")throw l.createError("VectorValues must only contain numeric values.");return Xu(l.serializer,C)}))}}}}}})(s,i);if(QE(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${ya(s)}`)})(n,e)}function o_(n,e){let t={};return cE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):tr(n,((r,s)=>{let i=Jn(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function u_(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;let e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function c_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof _e||n instanceof pn||n instanceof en||n instanceof Ve||n instanceof jr||n instanceof At||u_(n)||QE(n))}function Tf(n,e,t){if(!c_(t)||!_a(t)){let r=ya(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function zn(n,e,t){if((e=de(e))instanceof qr)return e._internalPath;if(typeof e=="string")return Af(n,e);throw Ru("Field path arguments must be of type string or ",n,!1,void 0,t)}var DA=new RegExp("[~\\*/\\[\\]]");function Af(n,e,t){if(e.search(DA)>=0)throw Ru(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new qr(...e.split("."))._internalPath}catch{throw Ru(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ru(n,e,t,r,s){let i=r&&!r.isEmpty(),a=s!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new G(k.INVALID_ARGUMENT,u+n+c)}function l_(n,e){return n.some((t=>t.isEqual(e)))}function wA(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt=class n{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let r=nt.empty();for(let s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){let i=this.optionDefinitions[s];if(s in e){let a=e[s],u;i.nestedOptions&&_a(a)?u={mapValue:{fields:new n(i.nestedOptions).getOptionsProto(t,a)}}:a&&(u=Jn(a,t)??void 0),u&&r.set(dt.fromServerFormat(i.serverName),u)}}return r}getOptionsProto(e,t,r){let s=this._getKnownOptions(t,e);if(r){let i=new Map(uE(r,((a,u)=>[dt.fromServerFormat(u),a!==void 0?Jn(a,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IA(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!_a(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(){return new uh("serverTimestamp")}function B_(n){return new At(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n){let e;return n instanceof In?n:(e=_a(n)?vA(n):n instanceof Array?bA(n):h_(n,void 0),e)}function mB(n){if(n instanceof In)return n;if(n instanceof At)return ia(n);if(Array.isArray(n))return ia(B_(n));throw new Error("Unsupported value: "+typeof n)}function vf(n){return vT(n)?TA(n):U(n)}var In=class{constructor(){this._protoValueType="ProtoValue"}add(e){return new F("add",[this,U(e)],"add")}asBoolean(){if(this instanceof Wn)return this;if(this instanceof xs)return new Nu(this);if(this instanceof Kr)return new Bh(this);if(this instanceof F)return new Pu(this);throw new G("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new F("subtract",[this,U(e)],"subtract")}multiply(e){return new F("multiply",[this,U(e)],"multiply")}divide(e){return new F("divide",[this,U(e)],"divide")}mod(e){return new F("mod",[this,U(e)],"mod")}equal(e){return new F("equal",[this,U(e)],"equal").asBoolean()}notEqual(e){return new F("not_equal",[this,U(e)],"notEqual").asBoolean()}lessThan(e){return new F("less_than",[this,U(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new F("less_than_or_equal",[this,U(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new F("greater_than",[this,U(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new F("greater_than_or_equal",[this,U(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){let r=[e,...t].map((s=>U(s)));return new F("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new F("array_contains",[this,U(e)],"arrayContains").asBoolean()}arrayContainsAll(e){let t=Array.isArray(e)?new Sr(e.map(U),"arrayContainsAll"):e;return new F("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){let t=Array.isArray(e)?new Sr(e.map(U),"arrayContainsAny"):e;return new F("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new F("array_reverse",[this])}arrayLength(){return new F("array_length",[this],"arrayLength")}equalAny(e){let t=Array.isArray(e)?new Sr(e.map(U),"equalAny"):e;return new F("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){let t=Array.isArray(e)?new Sr(e.map(U),"notEqualAny"):e;return new F("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new F("exists",[this],"exists").asBoolean()}charLength(){return new F("char_length",[this],"charLength")}like(e){return new F("like",[this,U(e)],"like").asBoolean()}regexContains(e){return new F("regex_contains",[this,U(e)],"regexContains").asBoolean()}regexFind(e){return new F("regex_find",[this,U(e)],"regexFind")}regexFindAll(e){return new F("regex_find_all",[this,U(e)],"regexFindAll")}regexMatch(e){return new F("regex_match",[this,U(e)],"regexMatch").asBoolean()}stringContains(e){return new F("string_contains",[this,U(e)],"stringContains").asBoolean()}startsWith(e){return new F("starts_with",[this,U(e)],"startsWith").asBoolean()}endsWith(e){return new F("ends_with",[this,U(e)],"endsWith").asBoolean()}toLower(){return new F("to_lower",[this],"toLower")}toUpper(){return new F("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(U(e)),new F("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(U(e)),new F("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(U(e)),new F("rtrim",t,"rtrim")}type(){return new F("type",[this])}isType(e){return new F("is_type",[this,ia(e)],"isType").asBoolean()}stringConcat(e,...t){let r=[e,...t].map(U);return new F("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new F("string_index_of",[this,U(e)],"stringIndexOf")}stringRepeat(e){return new F("string_repeat",[this,U(e)],"stringRepeat")}stringReplaceAll(e,t){return new F("string_replace_all",[this,U(e),U(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new F("string_replace_one",[this,U(e),U(t)],"stringReplaceOne")}concat(e,...t){let r=[e,...t].map(U);return new F("concat",[this,...r],"concat")}reverse(){return new F("reverse",[this],"reverse")}arrayFilter(e,t){return new F("array_filter",[this,U(e),t],"arrayFilter")}arrayTransform(e,t){return new F("array_transform",[this,U(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new F("array_transform",[this,U(e),U(t),r],"arrayTransformWithIndex")}arraySlice(e,t){let r=[this,U(e)];return t!==void 0&&r.push(U(t)),new F("array_slice",r,"arraySlice")}arrayFirst(){return new F("array_first",[this],"arrayFirst")}arrayFirstN(e){return new F("array_first_n",[this,U(e)],"arrayFirstN")}arrayLast(){return new F("array_last",[this],"arrayLast")}arrayLastN(e){return new F("array_last_n",[this,U(e)],"arrayLastN")}arrayMaximum(){return new F("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new F("maximum_n",[this,U(e)],"arrayMaximumN")}arrayMinimum(){return new F("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new F("minimum_n",[this,U(e)],"arrayMinimumN")}arrayIndexOf(e){return new F("array_index_of",[this,U(e),U("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new F("array_index_of",[this,U(e),U("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new F("array_index_of_all",[this,U(e)],"arrayIndexOfAll")}byteLength(){return new F("byte_length",[this],"byteLength")}ceil(){return new F("ceil",[this])}floor(){return new F("floor",[this])}abs(){return new F("abs",[this])}exp(){return new F("exp",[this])}mapGet(e){return new F("map_get",[this,ia(e)],"mapGet")}mapSet(e,t,...r){let s=[this,U(e),U(t),...r.map(U)];return new F("map_set",s,"mapSet")}mapKeys(){return new F("map_keys",[this],"mapKeys")}mapValues(){return new F("map_values",[this],"mapValues")}mapEntries(){return new F("map_entries",[this],"mapEntries")}getField(e){return new F("get_field",[this,U(e)],"get_field")}count(){return Dt._create("count",[this],"count")}sum(){return Dt._create("sum",[this],"sum")}average(){return Dt._create("average",[this],"average")}minimum(){return Dt._create("minimum",[this],"minimum")}maximum(){return Dt._create("maximum",[this],"maximum")}first(){return Dt._create("first",[this],"first")}last(){return Dt._create("last",[this],"last")}arrayAgg(){return Dt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Dt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Dt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){let r=[e,...t];return new F("maximum",[this,...r.map(U)],"logicalMaximum")}logicalMinimum(e,...t){let r=[e,...t];return new F("minimum",[this,...r.map(U)],"minimum")}vectorLength(){return new F("vector_length",[this],"vectorLength")}cosineDistance(e){return new F("cosine_distance",[this,mB(e)],"cosineDistance")}dotProduct(e){return new F("dot_product",[this,mB(e)],"dotProduct")}euclideanDistance(e){return new F("euclidean_distance",[this,mB(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new F("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new F("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new F("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new F("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new F("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new F("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new F("timestamp_add",[this,U(e),U(t)],"timestampAdd")}timestampSubtract(e,t){return new F("timestamp_subtract",[this,U(e),U(t)],"timestampSubtract")}timestampDiff(e,t){return new F("timestamp_diff",[this,vf(e),U(t)],"timestampDiff")}timestampExtract(e,t){let r=[this,U(e)];return t&&r.push(U(t)),new F("timestamp_extract",r,"timestampExtract")}documentId(){return new F("document_id",[this],"documentId")}parent(){return new F("parent",[this],"parent")}substring(e,t){let r=U(e);return new F("substring",t===void 0?[this,r]:[this,r,U(t)],"substring")}arrayGet(e){return new F("array_get",[this,U(e)],"arrayGet")}isError(){return new F("is_error",[this],"isError").asBoolean()}ifError(e){let t=new F("if_error",[this,U(e)],"ifError");return e instanceof Wn?t.asBoolean():t}isAbsent(){return new F("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new F("map_remove",[this,U(e)],"mapRemove")}mapMerge(e,...t){let r=U(e),s=t.map(U);return new F("map_merge",[this,r,...s],"mapMerge")}pow(e){return new F("pow",[this,U(e)])}trunc(e){return e===void 0?new F("trunc",[this]):new F("trunc",[this,U(e)],"trunc")}round(e){return e===void 0?new F("round",[this]):new F("round",[this,U(e)],"round")}collectionId(){return new F("collection_id",[this])}length(){return new F("length",[this])}ln(){return new F("ln",[this])}sqrt(){return new F("sqrt",[this])}stringReverse(){return new F("string_reverse",[this])}ifAbsent(e){return new F("if_absent",[this,U(e)],"ifAbsent")}ifNull(e){return new F("if_null",[this,U(e)],"ifNull")}coalesce(e,...t){return new F("coalesce",[this,U(e),...t.map(U)],"coalesce")}join(e){return new F("join",[this,U(e)],"join")}log10(){return new F("log10",[this])}arraySum(){return new F("sum",[this])}split(e){return new F("split",[this,U(e)])}timestampTruncate(e,t){let r=[this,U(e)];return t&&r.push(U(t)),new F("timestamp_trunc",r)}ascending(){return SA(this)}descending(){return RA(this)}as(e){return new lh(this,e,"as")}},Dt=class n{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){let s=new n(e,t);return s._methodName=r,s}as(e){return new ch(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}},ch=class{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}},lh=class{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}},Sr=class extends In{constructor(e,t){super(),this.cr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.cr.map((t=>t._toProto(e)))}}}_readUserData(e){this.cr.forEach((t=>t._readUserData(e)))}},Kr=class extends In{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new F("geo_distance",[this,U(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}};function TA(n){return AA(n,"field")}function AA(n,e){return new Kr(typeof n=="string"?As===n?YE()._internalPath:zn("field",n):n._internalPath,e)}var xs=class n extends In{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new n(e,void 0);return t._protoValue=e,t}_toProto(e){return Q(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,IA(this._protoValue)||(this._protoValue=Jn(this.value,e))}};function ia(n,e){return h_(n,"constant")}function h_(n,e){let t=new xs(n,e);return typeof n=="boolean"?new Nu(t):t}var F=class extends In{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new rt({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}},Wn=class n extends In{get _methodName(){return this._expr._methodName}countIf(){return Dt._create("count_if",[this],"countIf")}not(){return new F("not",[this],"not").asBoolean()}conditional(e,t){return new F("conditional",[this,e,t],"conditional")}ifError(e){let t=U(e),r=new F("if_error",[this,t],"ifError");return t instanceof n?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}},Pu=class extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Function"}},Nu=class extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}},Bh=class extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Field"}};function vA(n,e){let t=[];for(let r in n)if(Object.prototype.hasOwnProperty.call(n,r)){let s=n[r];t.push(ia(r)),t.push(U(s))}return new F("map",t,"map")}function bA(n){return(function(t,r){return new F("array",t.map((s=>U(s))),r)})(n,"array")}function SA(n){return new Ou(vf(n),"ascending","ascending")}function RA(n){return new Ou(vf(n),"descending","descending")}var Ou=class{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:$E(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ut=class{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}},Fu=class extends ut{get _name(){return"add_fields"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[ra(e,this.fields)]}}_readUserData(e){super._readUserData(e),Qn(this.fields,e)}};var ku=class extends ut{get _name(){return"aggregate"}get _optionsUtil(){return new rt({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[ra(e,this.accumulators),ra(e,this.groups)]}}_readUserData(e){super._readUserData(e),Qn(this.groups,e),Qn(this.accumulators,e)}},Lu=class extends ut{get _name(){return"distinct"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[ra(e,this.groups)]}}_readUserData(e){super._readUserData(e),Qn(this.groups,e)}},Vs=class extends ut{get _name(){return"collection"}get _optionsUtil(){return new rt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.hr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.hr}]}}_readUserData(e){super._readUserData(e)}},Ms=class extends ut{get _name(){return"collection_group"}get _optionsUtil(){return new rt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}};var aa=class extends ut{get _name(){return"database"}get _optionsUtil(){return new rt({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}},oa=class extends ut{get _name(){return"documents"}get _optionsUtil(){return new rt({})}constructor(e,t){if(super(t),!e||e.length===0)throw new G(k.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new G(k.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.Tr=r,this.Pr=s}_toProto(e){return{...super._toProto(e),args:this.Tr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}},ua=class extends ut{get _name(){return"where"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Qn(this.condition,e)}};var Jr=class extends ut{get _name(){return"limit"}get _optionsUtil(){return new rt({})}constructor(e,t){Q(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[mf(e,this.limit)]}}},xu=class extends ut{get _name(){return"offset"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[mf(e,this.offset)]}}},hh=class extends ut{get _name(){return"select"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[ra(e,this.selections)]}}_readUserData(e){super._readUserData(e),Qn(this.selections,e)}},ca=class extends ut{get _name(){return"sort"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Qn(this.orderings,e)}};var dh=class n extends ut{get _name(){return"replace_with"}get _optionsUtil(){return new rt({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),$E(n.Ir)]}}_readUserData(e){super._readUserData(e),Qn(this.map,e)}};dh.Ir="full_replace";function Qn(n,e){return wA(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
var tt=class{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return ac(this)}getPipelineCollectionGroup(){return bf(this)}getPipelineCollectionId(){return PA(this)}getPipelineDocuments(){return fh(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==Lu.name&&s._name!==ku.name||(r="keyless"),s._name===hh.name&&r==="exact"&&(r="augmented"),s._name===Fu.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return Un(this)}};function Un(n){let e=n.stages[0];return e instanceof Vs||e instanceof Ms||e instanceof aa||e instanceof oa?e._name:"unknown"}function ac(n){if(Un(n)==="collection")return n.stages[0].hr}function bf(n){if(Un(n)==="collection_group")return n.stages[0].collectionId}function PA(n){switch(Un(n)){case"collection":return Be.fromString(ac(n)).lastSegment();case"collection_group":return bf(n);default:return}}function fh(n){if(Un(n)==="documents")return n.stages[0].Tr}var v=class n{constructor(e,t){this.type=e,this.value=t}static mr(){return new n("ERROR",void 0)}static pr(){return new n("UNSET",void 0)}static gr(){return new n("NULL",Ss)}static newValue(e){return It(e)?new n("NULL",Ss):(function(r){return!!r&&"booleanValue"in r})(e)?new n("BOOLEAN",e):Yt(e)?new n("INT",e):vr(e)?new n("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new n("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new n("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new n("BYTES",e):e.referenceValue?new n("REFERENCE",e):e.geoPointValue?new n("GEO_POINT",e):Ps(e)?new n("ARRAY",e):$i(e)?new n("VECTOR",e):Rr(e)?new n("MAP",e):new n("ERROR",void 0)}yr(){return this.type==="ERROR"||this.type==="UNSET"}wr(){return this.type==="NULL"}};function zi(n){if(!n.yr())return n.value}function d_(n){return n instanceof Wn?n._expr:n}function ee(n){if((n=d_(n))instanceof Kr)return new ph(n);if(n instanceof xs)return new Ch(n);if(n instanceof Sr)return new gh(n);if(n instanceof F){if(n.name==="add")return new mh(n);if(n.name==="subtract")return new Eh(n);if(n.name==="multiply")return new _h(n);if(n.name==="divide")return new yh(n);if(n.name==="mod")return new Dh(n);if(n.name==="and")return new wh(n);if(n.name==="equal")return new Lh(n);if(n.name==="not_equal")return new xh(n);if(n.name==="less_than")return new Vh(n);if(n.name==="less_than_or_equal")return new Mh(n);if(n.name==="greater_than")return new Gh(n);if(n.name==="greater_than_or_equal")return new Uh(n);if(n.name==="array_concat")return new Hh(n);if(n.name==="array_reverse")return new qh(n);if(n.name==="array_contains")return new jh(n);if(n.name==="array_contains_all")return new Kh(n);if(n.name==="array_contains_any")return new Jh(n);if(n.name==="array_length")return new zh(n);if(n.name==="array_element")return new Wh(n);if(n.name==="equal_any")return new Vu(n);if(n.name==="not_equal_any")return new Ah(n);if(n.name==="is_nan")return new vh(n);if(n.name==="is_not_nan")return new bh(n);if(n.name==="is_null")return new Sh(n);if(n.name==="is_not_null")return new Rh(n);if(n.name==="is_error")return new Ph(n);if(n.name==="exists")return new Nh(n);if(n.name==="not")return new Gs(n);if(n.name==="or")return new Ih(n);if(n.name==="xor")return new Th(n);if(n.name==="conditional")return new Oh(n);if(n.name==="maximum")return new Fh(n);if(n.name==="minimum")return new kh(n);if(n.name==="reverse")return new Qh(n);if(n.name==="replace_first")return new $h(n);if(n.name==="replace_all")return new Yh(n);if(n.name==="char_length")return new Xh(n);if(n.name==="byte_length")return new Zh(n);if(n.name==="like")return new ed(n);if(n.name==="regex_contains")return new td(n);if(n.name==="regex_match")return new nd(n);if(n.name==="string_contains")return new rd(n);if(n.name==="starts_with")return new sd(n);if(n.name==="ends_with")return new id(n);if(n.name==="to_lower")return new ad(n);if(n.name==="to_upper")return new od(n);if(n.name==="trim")return new ud(n);if(n.name==="string_concat")return new cd(n);if(n.name==="map_get")return new ld(n);if(n.name==="cosine_distance")return new Bd(n);if(n.name==="dot_product")return new hd(n);if(n.name==="euclidean_distance")return new dd(n);if(n.name==="vector_length")return new fd(n);if(n.name==="unix_micros_to_timestamp")return new pd(n);if(n.name==="timestamp_to_unix_micros")return new md(n);if(n.name==="unix_millis_to_timestamp")return new Cd(n);if(n.name==="timestamp_to_unix_millis")return new Ed(n);if(n.name==="unix_seconds_to_timestamp")return new gd(n);if(n.name==="timestamp_to_unix_seconds")return new _d(n);if(n.name==="timestamp_add")return new yd(n);if(n.name==="timestamp_subtract")return new Dd(n)}throw new Error(`Unknown Expr : ${n}`)}var ph=class{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===As)return v.newValue({referenceValue:na(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return v.newValue({timestampValue:au(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return v.newValue({timestampValue:au(e.serializer,t.createTime)});let r=t.data.field(this.expr._fieldPath);return r?wa(r)?v.newValue((function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:au(i.serializer,te.fromTimestamp(vs(a)))};if(i.serverTimestampBehavior==="previous"){let u=Ia(a);if(u)return u}return{nullValue:"NULL_VALUE"}})(e,r)):v.newValue(r):v.pr()}},Ch=class{constructor(e){this.expr=e}evaluate(e,t){return v.newValue(this.expr._getValue())}},gh=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.cr.map((s=>ee(s).evaluate(e,t)));return r.some((s=>s.yr()))?v.mr():v.newValue({arrayValue:{values:r.map((s=>s.value))}})}};function We(n){return vr(n)?Number(n.doubleValue):Number(n.integerValue)}function rn(n){return BigInt(n.integerValue)}var NA=BigInt("0x7fffffffffffffff"),OA=-BigInt("0x8000000000000000"),zr=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length>=2,24778);let r=ee(this.expr.params[0]).evaluate(e,t),s=ee(this.expr.params[1]).evaluate(e,t),i=this.br(r,s);for(let a of this.expr.params.slice(2)){let u=ee(a).evaluate(e,t);i=this.br(i,u)}return i}br(e,t){if(e.yr()||t.yr())return v.mr();if(e.wr()||t.wr())return v.gr();let r=e.value,s=t.value;if(!vr(r)&&!Yt(r)||!vr(s)&&!Yt(s))return v.mr();if(vr(r)||vr(s)){let i=this.Sr(r,s);return i?v.newValue(i):v.mr()}if(Yt(r)&&Yt(s)){let i=this.vr(r,s);return i===void 0?v.mr():typeof i=="number"?v.newValue({doubleValue:i}):i<OA||i>NA?v.mr():v.newValue({integerValue:`${i}`})}return v.mr()}};function Tn(n,e){return Oe(n)!==Oe(e)?"TYPE_MISMATCH":Ct(n)||Ct(e)?"NOT_EQ":It(n)&&It(e)?"EQ":It(n)||It(e)?"NULL":Ps(n)&&Ps(e)?(function(r,s){var a,u,c;if(((a=r.values)==null?void 0:a.length)!==((u=s.values)==null?void 0:u.length))return"NOT_EQ";let i=!1;for(let l=0;l<(((c=r.values)==null?void 0:c.length)??0);l++){let h=r.values[l],f=s.values[l];switch(Tn(h,f)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:Y(44609,{Dr:h,Cr:f})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):$i(n)&&$i(e)||Rr(n)&&Rr(e)?(function(r,s){let i=r.fields||{},a=s.fields||{};if(cu(i)!==cu(a))return"NOT_EQ";let u=!1;for(let c in i)if(i.hasOwnProperty(c)){if(a[c]===void 0)return"NOT_EQ";switch(Tn(i[c],a[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return Lt(r,s,{u:!1,i:!0,o:!0})})(n,e)?"EQ":"NOT_EQ"}var mh=class extends zr{vr(e,t){return rn(e)+rn(t)}Sr(e,t){return{doubleValue:We(e)+We(t)}}},Eh=class extends zr{constructor(e){super(e),this.expr=e}vr(e,t){return rn(e)-rn(t)}Sr(e,t){return{doubleValue:We(e)-We(t)}}},_h=class extends zr{constructor(e){super(e),this.expr=e}vr(e,t){return rn(e)*rn(t)}Sr(e,t){return{doubleValue:We(e)*We(t)}}},yh=class extends zr{constructor(e){super(e),this.expr=e}vr(e,t){let r=rn(t);if(r!==BigInt(0))return rn(e)/r}Sr(e,t){let r=We(t);return r===0?{doubleValue:bs(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:We(e)/r}}},Dh=class extends zr{constructor(e){super(e),this.expr=e}vr(e,t){let r=rn(t);if(r!==BigInt(0))return rn(e)%r}Sr(e,t){let r=We(t);if(r!==0)return{doubleValue:We(e)%r}}},wh=class{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(let a of this.expr.params){let u=ee(a).evaluate(e,t);switch(u.type){case"BOOLEAN":if(!((i=u.value)!=null&&i.booleanValue))return v.newValue(Je);break;case"NULL":s=!0;break;default:r=!0}}return r?v.mr():s?v.gr():v.newValue(ft)}},Gs=class{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,9634);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return v.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return v.gr();default:return v.mr()}}},Ih=class{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(let a of this.expr.params){let u=ee(a).evaluate(e,t);switch(u.type){case"BOOLEAN":if((i=u.value)!=null&&i.booleanValue)return v.newValue(ft);break;case"NULL":s=!0;break;default:r=!0}}return r?v.mr():s?v.gr():v.newValue(Je)}},Th=class n{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(let a of this.expr.params){let u=ee(a).evaluate(e,t);switch(u.type){case"BOOLEAN":r=n.xor(r,!!((i=u.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return v.mr()}}return s?v.gr():v.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}},Vu=class{constructor(e){this.expr=e}evaluate(e,t){var a,u;Q(this.expr.params.length===2,55094);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.mr()}if(r)return v.gr();for(let c of((u=(a=i.value)==null?void 0:a.arrayValue)==null?void 0:u.values)??[])switch(It(s.value)&&It(c)?"EQ":Tn(s.value,c)){case"EQ":return v.newValue(ft);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Y(44608,{value:s.value,candidate:c})}return r?v.gr():v.newValue(Je)}},Ah=class{constructor(e){this.expr=e}evaluate(e,t){return new Gs(new F("not",[new F("equal_any",this.expr.params)])).evaluate(e,t)}},vh=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,23322);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return v.newValue(Je);case"DOUBLE":return v.newValue({booleanValue:isNaN(We(r.value))});case"NULL":return v.gr();default:return v.mr()}}},bh=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,50406),new Gs(new F("not",[new F("is_nan",this.expr.params)])).evaluate(e,t)}},Sh=class{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,23123),ee(this.expr.params[0]).evaluate(e,t).type){case"NULL":return v.newValue(ft);case"UNSET":case"ERROR":return v.mr();default:return v.newValue(Je)}}},Rh=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,23167),new Gs(new F("not",[new F("is_null",this.expr.params)])).evaluate(e,t)}},Ph=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,5228),ee(this.expr.params[0]).evaluate(e,t).type==="ERROR"?v.newValue(ft):v.newValue(Je)}},Nh=class{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,6877),ee(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return v.mr();case"UNSET":return v.newValue(Je);default:return v.newValue(ft)}}},Oh=class{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===3,11706);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?ee(this.expr.params[1]).evaluate(e,t):ee(this.expr.params[2]).evaluate(e,t);case"NULL":return ee(this.expr.params[2]).evaluate(e,t);default:return v.mr()}}},Fh=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||pt(i.value,s.value)>0?i:s}return s===void 0?v.gr():s}},kh=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||pt(i.value,s.value)<0?i:s}return s===void 0?v.gr():s}},$n=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return v.mr()}let s=ee(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return v.mr()}return this.Fr(r,s)}},Lh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){if(e.wr()&&t.wr())return v.newValue(ft);if(e.wr()||t.wr()||Ct(e.value)||Ct(t.value)||Oe(e.value)!==Oe(t.value))return v.newValue(Je);switch(Tn(e.value,t.value)){case"EQ":return v.newValue(ft);case"NOT_EQ":return v.newValue(Je);case"NULL":return v.gr();default:Y(44615,{left:e,right:t})}}},xh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){switch(Tn(e.value,t.value)){case"EQ":return v.newValue(Je);case"NOT_EQ":case"TYPE_MISMATCH":return v.newValue(ft);case"NULL":return v.gr();default:Y(44614,{left:e,right:t})}}},Vh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||Ct(e.value)||Ct(t.value)?v.newValue(Je):v.newValue({booleanValue:pt(e.value,t.value)<0})}},Mh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||Ct(e.value)||Ct(t.value)?v.newValue(Je):Tn(e.value,t.value)==="EQ"?v.newValue(ft):v.newValue({booleanValue:pt(e.value,t.value)<0})}},Gh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||Ct(e.value)||Ct(t.value)?v.newValue(Je):v.newValue({booleanValue:pt(e.value,t.value)>0})}},Uh=class extends $n{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||Ct(e.value)||Ct(t.value)?v.newValue(Je):Tn(e.value,t.value)==="EQ"?v.newValue(ft):v.newValue({booleanValue:pt(e.value,t.value)>0})}},Hh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},qh=class{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,216);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.gr();case"ARRAY":{let i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return v.newValue({arrayValue:{values:[...i].reverse()}})}default:return v.mr()}}},jh=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===2,52884),new Vu(new F("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}},Kh=class{constructor(e){this.expr=e}evaluate(e,t){var c,l,h,f;Q(this.expr.params.length===2,1392);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.mr()}if(r)return v.gr();let a=((l=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:l.values)??[],u=((f=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(let C of a){let _=!1;r=!1;for(let D of u){switch(It(C)&&It(D)?"EQ":Tn(C,D)){case"EQ":_=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Y(44613,{value:D,search:C})}if(_)break}if(!_)return v.newValue(Je)}return v.newValue(ft)}},Jh=class{constructor(e){this.expr=e}evaluate(e,t){var c,l,h,f;Q(this.expr.params.length===2,2680);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.mr()}if(r)return v.gr();let a=((l=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:l.values)??[],u=((f=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(let C of u)for(let _ of a)switch(It(C)&&It(_)?"EQ":Tn(C,_)){case"EQ":return v.newValue(ft);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Y(60403,{value:C,search:_})}return r?v.gr():v.newValue(Je)}},zh=class{constructor(e){this.expr=e}evaluate(e,t){var s,i,a;Q(this.expr.params.length===1,38605);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.gr();case"ARRAY":return v.newValue({integerValue:`${((a=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:a.length)??0}`});default:return v.mr()}}},Wh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Qh=class{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,1508);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.gr();case"BYTES":{let a=(s=r.value)==null?void 0:s.bytesValue;if(typeof a=="string"){let u=Ne.fromBase64String(a).toUint8Array();return u.reverse(),v.newValue({bytesValue:Ne.fromUint8Array(u).toBase64()})}return v.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{let a=(i=r.value)==null?void 0:i.stringValue,u=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),c=Array.from(u,(l=>l.segment)).reverse();return v.newValue({stringValue:c.join("")})}default:return v.mr()}}},$h=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Yh=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Xh=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,19400);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.gr();case"STRING":{let s=(function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){let h=a.codePointAt(c+1);h!==void 0&&h>=56320&&h<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(l<=1114111))return;u+=1,c++}}return u})(r.value.stringValue);return s===void 0?v.mr():v.newValue({integerValue:s})}default:return v.mr()}}},Zh=class{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,8486);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{let a=(s=r.value)==null?void 0:s.bytesValue;return typeof a=="string"?v.newValue({integerValue:Ne.fromBase64String(a).toUint8Array().length}):v.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{let a=(function(c){let l=0;for(let h=0;h<c.length;h++){let f=c.codePointAt(h);if(f===void 0)return;if(f>=55296&&f<=57343){if(!(f<=56319))return;{let C=c.codePointAt(h+1);if(C===void 0||!(C>=56320&&C<=57343))return;l+=4,h++}}else if(f<=127)l+=1;else if(f<=2047)l+=2;else if(f<=65535)l+=3;else{if(!(f<=1114111))return;l+=4,h++}}return l})((i=r.value)==null?void 0:i.stringValue);return a===void 0?v.mr():v.newValue({integerValue:a})}case"NULL":return v.gr();default:return v.mr()}}},Yn=class{constructor(e){this.expr=e}evaluate(e,t){var a,u;Q(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return v.mr()}return r?v.gr():this.Or((a=s.value)==null?void 0:a.stringValue,(u=i.value)==null?void 0:u.stringValue)}},ed=class extends Yn{Or(e,t){try{let r=(function(a){let u="";for(let c=0;c<a.length;c++){let l=a.charAt(c);switch(l){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+l;break;default:u+=l}}return"^"+u+"$"})(t),s=Zo.compile(r);return v.newValue({booleanValue:s.matches(e)})}catch(r){return kt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),v.mr()}}},td=class extends Yn{Or(e,t){try{let r=Zo.compile(t);return v.newValue({booleanValue:r.test(e)})}catch{return kt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),v.mr()}}},nd=class extends Yn{Or(e,t){try{return v.newValue({booleanValue:Zo.compile(t).matches(e)})}catch{return kt(`Invalid regex pattern found in regex_match: ${t}, returning error`),v.mr()}}},rd=class extends Yn{Or(e,t){return v.newValue({booleanValue:e.includes(t)})}},sd=class extends Yn{Or(e,t){return v.newValue({booleanValue:e.startsWith(t)})}},id=class extends Yn{Or(e,t){return v.newValue({booleanValue:e.endsWith(t)})}},ad=class{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,29079);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return v.gr();default:return v.mr()}}},od=class{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,60487);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return v.gr();default:return v.mr()}}},ud=class{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,28544);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return v.gr();default:return v.mr()}}},cd=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((a=>ee(a).evaluate(e,t))),s="",i=!1;for(let a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return v.mr()}return i?v.gr():v.newValue({stringValue:s})}},ld=class{constructor(e){this.expr=e}evaluate(e,t){var a,u,c,l;Q(this.expr.params.length===2,4483);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return v.pr();case"MAP":break;default:return v.mr()}let s=ee(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return v.mr();let i=(l=(u=(a=r.value)==null?void 0:a.mapValue)==null?void 0:u.fields)==null?void 0:l[(c=s.value)==null?void 0:c.stringValue];return i===void 0?v.pr():v.newValue(i)}},la=class{constructor(e){this.expr=e}evaluate(e,t){var l,h;Q(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return v.mr()}if(r)return v.gr();let a=TB(s.value),u=TB(i.value);if(a===void 0||u===void 0||((l=a.values)==null?void 0:l.length)!==((h=u.values)==null?void 0:h.length))return v.mr();let c=this.Mr(a,u);return c===void 0||isNaN(c)?v.mr():v.newValue({doubleValue:c})}},Bd=class extends la{Mr(e,t){let r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return;let i=0,a=0,u=0;for(let l=0;l<r.length;l++){if(!qn(r[l])||!qn(s[l]))return;let h=We(r[l]),f=We(s[l]);i+=h*f,a+=h*h,u+=f*f}let c=Math.sqrt(a)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}},hd=class extends la{Mr(e,t){let r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!qn(r[a])||!qn(s[a]))return;i+=We(r[a])*We(s[a])}return i}},dd=class extends la{Mr(e,t){let r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!qn(r[a])||!qn(s[a]))return;let u=We(r[a]),c=We(s[a]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}},fd=class{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,39044);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{let i=TB(r.value);return v.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return v.gr();default:return v.mr()}}},Ba=BigInt(-62135596800),ha=BigInt(253402300799),Mu=BigInt(1e3),Hn=BigInt(1e6),FA=Ba*Mu,kA=ha*Mu+BigInt(999),LA=Ba*Hn,xA=ha*Hn+BigInt(999999);function Sf(n){return n>=LA&&n<=xA}function f_(n){return n>=Ba&&n<=ha}function da(n,e){let t=BigInt(n);return!(t<Ba||t>ha)&&!(e<0||e>=1e9)&&(t!==Ba||e===0)&&!(t===ha&&e>999999999)}function p_(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Rf(n){return BigInt(n.seconds)*Hn+BigInt(Math.trunc(n.nanoseconds/1e3))}var fa=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return v.gr();default:return v.mr()}}},pd=class extends fa{toTimestamp(e){if(!Sf(e))return v.mr();let t=Number(e/Hn),r=Number(e%Hn*BigInt(1e3)),s=p_(t,r);return t=s.seconds,r=s.nanos,da(t,r)?v.newValue({timestampValue:{seconds:t,nanos:r}}):v.mr()}},Cd=class extends fa{toTimestamp(e){if(!(function(a){return a>=FA&&a<=kA})(e))return v.mr();let t=Number(e/Mu),r=Number(e%Mu*BigInt(1e6)),s=p_(t,r);return t=s.seconds,r=s.nanos,da(t,r)?v.newValue({timestampValue:{seconds:t,nanos:r}}):v.mr()}},gd=class extends fa{toTimestamp(e){if(!f_(e))return v.mr();let t=Number(e);return v.newValue({timestampValue:{seconds:t,nanos:0}})}},pa=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return v.gr();default:return v.mr()}let s=yf(r.value.timestampValue);return da(s.seconds,s.nanoseconds)?this.Nr(s):v.mr()}},md=class extends pa{Nr(e){let t=Rf(e);return Sf(t)?v.newValue({integerValue:`${t.toString()}`}):v.mr()}},Ed=class extends pa{Nr(e){let t=Rf(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?v.newValue({integerValue:r.toString()}):v.newValue({integerValue:(r-BigInt(1)).toString()})}},_d=class extends pa{Nr(e){let t=BigInt(e.seconds);return f_(t)?v.newValue({integerValue:t.toString()}):v.mr()}},Gu=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return v.mr()}let i=ee(this.expr.params[1]).evaluate(e,t),a;switch(i.type){case"STRING":if(a=(function(z){switch(z){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),a===void 0)return v.mr();break;case"NULL":r=!0;break;default:return v.mr()}let u=ee(this.expr.params[2]).evaluate(e,t);switch(u.type){case"INT":break;case"NULL":r=!0;break;default:return v.mr()}if(r)return v.gr();let c=BigInt(u.value.integerValue),l;try{switch(a){case"microsecond":l=c;break;case"millisecond":l=c*BigInt(1e3);break;case"second":l=c*BigInt(1e6);break;case"minute":l=c*BigInt(6e7);break;case"hour":l=c*BigInt(36e8);break;case"day":l=c*BigInt(864e8);break;default:return v.mr()}if(a!=="microsecond"&&c!==BigInt(0)&&l/c!==BigInt(this.Lr(a)))return v.mr()}catch(q){return kt(`Error during timestamp arithmetic: ${q}`),v.mr()}let h=yf(s.value.timestampValue);if(!da(h.seconds,h.nanoseconds))return v.mr();let f=Rf(h),C=this.Br(f,l);if(!Sf(C))return v.mr();let _=Number(C/Hn),D=C%Hn,P=Number((D<0?D+Hn:D)*BigInt(1e3)),V=D<0?_-1:_;return da(V,P)?v.newValue({timestampValue:{seconds:V,nanos:P}}):v.mr()}Lr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}},yd=class extends Gu{Br(e,t){return e+t}},Dd=class extends Gu{Br(e,t){return e-t}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ca(n){if((n=d_(n))instanceof Kr)return`fld(${n.fieldName})`;if(n instanceof xs)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Ve?`ref(${t.path})`:t instanceof At?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof F)return`fn(${n.name},[${n.params.map(Ca).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.cr.map(Ca).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function VA(n){if(n instanceof Fu)return`${n._name}(${ru(n.fields)})`;if(n instanceof ku){let e=`${n._name}(${ru(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${ru(n.groups)})`),e}if(n instanceof Lu)return`${n._name}(${ru(n.groups)})`;if(n instanceof Vs)return`${n._name}(${n.hr})`;if(n instanceof Ms)return`${n._name}(${n.collectionId})`;if(n instanceof aa)return`${n._name}()`;if(n instanceof oa)return`${n._name}(${n.Tr.sort()})`;if(n instanceof ua)return`${n._name}(${Ca(n.condition)})`;if(n instanceof Jr)return`${n._name}(${n.limit})`;if(n instanceof ca)return`${n._name}(${(function(t){return t.map((r=>`${Ca(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function ru(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${Ca(t)}`)).join(",")}`}function gn(n){return n.stages.map((e=>VA(e))).join("|")}function C_(n,e){return gn(n)===gn(e)}function Le(n){return n instanceof tt}function Qm(n){return Le(n)?gn(n):qi(n)}function g_(n){return Le(n)?gn(n):(function(t){return`${NE(Zt(t))}|lt:${t.limitType}`})(n)}function oc(n,e){return n instanceof tt&&e instanceof tt?C_(n,e):!(n instanceof tt&&!(e instanceof tt)||!(n instanceof tt)&&e instanceof tt)&&UT(n,e)}function m_(n){return Ar(n)?gn(n):NE(n)}function E_(n,e){return n instanceof tt&&e instanceof tt?C_(n,e):!(n instanceof tt&&!(e instanceof tt)||!(n instanceof tt)&&e instanceof tt)&&OE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wd=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let i=this.mutations[s];i.key.isEqual(e.key)&&PT(i,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hi(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Hi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=GE();return this.mutations.forEach((s=>{let i=e.get(s.key),a=i.overlayedDocument,u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;let c=TE(a,u);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(te.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),oe())}isEqual(e){return this.batchId===e.batchId&&Ts(this.mutations,e.mutations,((t,r)=>Pm(t,r)))&&Ts(this.baseMutations,e.baseMutations,((t,r)=>Pm(t,r)))}},Id=class n{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Q(e.mutations.length===r.length,58842,{Ur:e.mutations.length,kr:r.length});let s=(function(){return jT})(),i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new n(e,t,r,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var __="";function MA(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$m(e)),e=GA(n.get(t),e);return $m(e)}function GA(n,e){let t=e,r=n.length;for(let s=0;s<r;s++){let i=n.charAt(s);switch(i){case"\0":t+="";break;case __:t+="";break;default:t+=i}}return t}function $m(n){return n+__+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var UA="remoteDocuments",y_="owner";var D_="mutationQueues";var w_="mutations";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I_="documentMutations",HA="remoteDocumentsV14";var T_="remoteDocumentGlobal";var A_="targets";var v_="targetDocuments";var b_="targetGlobal",S_="collectionParents";var R_="clientMetadata";var P_="bundles";var N_="namedQueries";var qA="indexConfiguration";var jA="indexState";var KA="indexEntries";var O_="documentOverlays";var JA="globals";var zA=[D_,w_,I_,UA,A_,y_,b_,v_,R_,T_,S_,P_,N_],vR=[...zA,O_],WA=[D_,w_,I_,HA,A_,y_,b_,v_,R_,T_,S_,P_,N_,O_],QA=WA,$A=[...QA,qA,jA,KA];var bR=[...$A,JA];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Td=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Us=class n{constructor(e,t,r,s,i=te.min(),a=te.min(),u=Ne.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ad=class{constructor(e){this.$r=e}};function YA(n){let e=iA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Zi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Uu=class{constructor(){}ei(e,t){this.ti(e,t),t.ni()}ti(e,t){if("nullValue"in e)this.ri(t,5);else if("booleanValue"in e)this.ri(t,10),t.ii(e.booleanValue?1:0);else if("integerValue"in e)this.ri(t,15),t.ii(Ce(e.integerValue));else if("doubleValue"in e){let r=Ce(e.doubleValue);isNaN(r)?this.ri(t,13):(this.ri(t,15),bs(r)?t.ii(0):t.ii(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ri(t,20),typeof r=="string"&&(r=_n(r)),t.si(`${r.seconds||""}`),t.ii(r.nanos||0)}else if("stringValue"in e)this._i(e.stringValue,t),this.oi(t);else if("bytesValue"in e)this.ri(t,30),t.ai(yn(e.bytesValue)),this.oi(t);else if("referenceValue"in e)this.ui(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.ri(t,45),t.ii(r.latitude||0),t.ii(r.longitude||0)}else"mapValue"in e?EE(e)?this.ri(t,Number.MAX_SAFE_INTEGER):$i(e)?this.ci(e.mapValue,t):(this.li(e.mapValue,t),this.oi(t)):"arrayValue"in e?(this.Ei(e.arrayValue,t),this.oi(t)):Y(19022,{hi:e})}_i(e,t){this.ri(t,25),this.Ti(e,t)}Ti(e,t){t.si(e)}li(e,t){let r=e.fields||{};this.ri(t,55);for(let s of Object.keys(r))this._i(s,t),this.ti(r[s],t)}ci(e,t){var a,u;let r=e.fields||{};this.ri(t,53);let s=Fr,i=((u=(a=r[s].arrayValue)==null?void 0:a.values)==null?void 0:u.length)||0;this.ri(t,15),t.ii(Ce(i)),this._i(s,t),this.ti(r[s],t)}Ei(e,t){let r=e.values||[];this.ri(t,50);for(let s of r)this.ti(s,t)}ui(e,t){this.ri(t,37),X.fromName(e).path.forEach((r=>{this.ri(t,60),this.Ti(r,t)}))}ri(e,t){e.ii(t)}oi(e){e.ii(2)}};Uu.Pi=new Uu;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vd=class{constructor(){this.Zi=new bd}addToCollectionParentIndex(e,t){return this.Zi.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Zi.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Hr.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Hr.min())}updateCollectionGroup(e,t,r){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}},bd=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new xe(Be.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new xe(Be.comparator)).toArray()}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var SR=new Uint8Array(0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wr=class n{constructor(e){this.ys=e}next(){return this.ys+=2,this.ys}static ws(){return new n(0)}static bs(){return new n(-1)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
function F_(n,e){var r;let t=e;for(let s of n.stages)t=ZA({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,t);return t}function uc(n,e){return F_(n,[e]).length>0}function XA(n,e){return Le(n)?uc(n,e):tc(n,e)}function ZA(n,e,t){if(e instanceof Vs)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.hr))})(0,e,t);if(e instanceof ua)return(function(s,i,a){return a.filter((u=>{let c=zi(ee(i.condition).evaluate(s,u));return c!==void 0&&Lt(c,ft)}))})(n,e,t);if(e instanceof Ms)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof aa)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()))})(0,0,t);if(e instanceof oa)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&i.Pr.has(u.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof Jr)return(function(s,i,a){return a.slice(0,i.limit)})(0,e,t);if(e instanceof ca)return(function(s,i,a){let u=i.orderings.map((c=>({Ms:ee(c.expr),direction:c.direction})));return[...a].sort(((c,l)=>{for(let{Ms:h,direction:f}of u){let C=zi(h.evaluate(s,c)),_=zi(h.evaluate(s,l)),D=pt(C??Ss,_??Ss);if(D!==0)return f==="ascending"?D:-D}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Sd(n){let e=(function(r){for(let s=r.stages.length-1;s>=0;s--){let i=r.stages[s];if(i instanceof ca)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(let s of e){let i=zi(ee(s.expr).evaluate({serializer:n.serializer},t)),a=zi(ee(s.expr).evaluate({serializer:n.serializer},r)),u=pt(i||Ss,a||Ss);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function EB(n){for(let e=n.stages.length-1;e>=0;e--){let t=n.stages[e];if(t instanceof Jr)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rd=class{constructor(){this.changes=new Dn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,vt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?M.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pd=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nd=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Hi(r.mutation,s,Ft.empty(),_e.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,oe()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=oe()){let s=Gn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=ms();return i.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){let r=Gn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,oe())))}populateOverlays(e,t,r){let s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,r,s){let i=ht(),a=ji(),u=(function(){return ji()})();return t.forEach(((c,l)=>{let h=r.get(l.key);s.has(l.key)&&(h===void 0||h.mutation instanceof nn)?i=i.insert(l.key,l):h!==void 0?(a.set(l.key,h.mutation.getFieldMask()),Hi(h.mutation,l,h.mutation.getFieldMask(),_e.now())):a.set(l.key,Ft.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((l,h)=>a.set(l,h))),t.forEach(((l,h)=>u.set(l,new Pd(h,a.get(l)??null)))),u)))}recalculateAndSaveOverlays(e,t){let r=ji(),s=new ye(((a,u)=>a-u)),i=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(let u of a)u.keys().forEach((c=>{let l=t.get(c);if(l===null)return;let h=r.get(c)||Ft.empty();h=u.applyToLocalView(l,h),r.set(c,h);let f=(s.get(u.batchId)||oe()).add(c);s=s.insert(u.batchId,f)}))})).next((()=>{let a=[],u=s.getReverseIterator();for(;u.hasNext();){let c=u.getNext(),l=c.key,h=c.value,f=GE();h.forEach((C=>{if(!i.has(C)){let _=TE(t.get(C),r.get(C));_!==null&&f.set(C,_),i=i.add(C)}})),a.push(this.documentOverlayCache.saveOverlays(e,l,f))}return M.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Le(t)?this.getDocumentsMatchingPipeline(e,t,r,s):MT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ef(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{let a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):M.resolve(Gn()),u=Xi,c=i;return a.next((l=>M.forEach(l,((h,f)=>(u<f.largestBatchId&&(u=f.largestBatchId),i.get(h)?M.resolve():this.remoteDocumentCache.getEntry(e,h).next((C=>{c=c.insert(h,C)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,c,l,oe()))).next((h=>({batchId:u,changes:ME(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new X(t)).next((r=>{let s=ms();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let i=t.collectionGroup,a=ms();return this.indexManager.getCollectionParents(e,i).next((u=>M.forEach(u,(c=>{let l=(function(f,C){return new Kn(C,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((h=>{h.forEach(((f,C)=>{a=a.insert(f,C)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>tc(t,u)))))}getDocumentsMatchingPipeline(e,t,r,s){if(Un(t)==="collection_group"){let i=bf(t),a=ms();return this.indexManager.getCollectionParents(e,i).next((u=>M.forEach(u,(c=>{let l=(function(f,C){let _=f.stages.map((D=>D instanceof Ms?new Vs(C.canonicalString(),{}):D));return new tt(f.serializer,_)})(t,c.child(i));return this.getDocumentsMatchingPipeline(e,l,r,s).next((h=>{h.forEach(((f,C)=>{a=a.insert(f,C)}))}))})).next((()=>a))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((a=>{switch(i=a,Un(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let u=oe();for(let c of fh(t))u=u.add(X.fromPath(c));return this.remoteDocumentCache.getEntries(e,u);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new G("invalid-argument",`Invalid pipeline source to execute offline: ${gn(t)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>uc(t,u)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,a)=>{let u=a.getKey();t.get(u)===null&&(t=t.insert(u,vt.newInvalidDocument(u)))}));let s=ms();return t.forEach(((i,a)=>{let u=e.get(i);u!==void 0&&Hi(u.mutation,a,Ft.empty(),_e.now()),r(a)&&(s=s.insert(i,a))})),s}getOverlaysForPipeline(e,t,r){switch(Un(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Be.fromString(ac(t)),r);case"collection_group":throw new G("invalid-argument",`Unexpected collection group pipeline: ${gn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,fh(t).map((s=>X.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new G("invalid-argument",`Failed to get overlays for pipeline: ${gn(t)}`)}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Od=class{constructor(e){this.serializer=e,this.Qs=new Map,this.Ws=new Map}getBundleMetadata(e,t){return M.resolve(this.Qs.get(t))}saveBundleMetadata(e,t){return this.Qs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Tt(s.createTime)}})(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,(function(s){return{name:s.name,query:YA(s.bundledQuery),readTime:Tt(s.readTime)}})(t)),M.resolve()}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fd=class{constructor(){this.overlays=new ye(X.comparator),this.Gs=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Gn();return M.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){let r=Gn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),M.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Zr(e,t,i)})),M.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Gs.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Gs.delete(r)),M.resolve()}getOverlaysForCollection(e,t,r){let s=Gn(),i=t.length+1,a=new X(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let c=u.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ye(((l,h)=>l-h)),a=this.overlays.getIterator();for(;a.hasNext();){let l=a.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let h=i.get(l.largestBatchId);h===null&&(h=Gn(),i=i.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}let u=Gn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,h)=>u.set(l,h))),!(u.size()>=s)););return M.resolve(u)}Zr(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let a=this.Gs.get(s.largestBatchId).delete(r.key);this.Gs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Td(t,r));let i=this.Gs.get(t);i===void 0&&(i=oe(),this.Gs.set(t,i)),this.Gs.set(t,i.add(r.key))}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var kd=class{constructor(){this.sessionToken=Ne.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ga=class{constructor(){this.zs=new xe(Re.js),this.Hs=new xe(Re.Js)}isEmpty(){return this.zs.isEmpty()}addReference(e,t){let r=new Re(e,t);this.zs=this.zs.add(r),this.Hs=this.Hs.add(r)}Ys(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Zs(new Re(e,t))}Xs(e,t){e.forEach((r=>this.removeReference(r,t)))}e_(e){let t=new X(new Be([])),r=new Re(t,e),s=new Re(t,e+1),i=[];return this.Hs.forEachInRange([r,s],(a=>{this.Zs(a),i.push(a.key)})),i}t_(){this.zs.forEach((e=>this.Zs(e)))}Zs(e){this.zs=this.zs.delete(e),this.Hs=this.Hs.delete(e)}n_(e){let t=new X(new Be([])),r=new Re(t,e),s=new Re(t,e+1),i=oe();return this.Hs.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){let t=new Re(e,0),r=this.zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},Re=class{constructor(e,t){this.key=e,this.r_=t}static js(e,t){return X.comparator(e.key,t.key)||ue(e.r_,t.r_)}static Js(e,t){return ue(e.r_,t.r_)||X.comparator(e.key,t.key)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ld=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Gr=1,this.i_=new xe(Re.js)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let i=this.Gr;this.Gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new wd(i,t,r,s);this.mutationQueue.push(a);for(let u of s)this.i_=this.i_.add(new Re(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.s_(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.__(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?df:this.Gr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new Re(t,0),s=new Re(t,Number.POSITIVE_INFINITY),i=[];return this.i_.forEachInRange([r,s],(a=>{let u=this.s_(a.r_);i.push(u)})),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new xe(ue);return t.forEach((s=>{let i=new Re(s,0),a=new Re(s,Number.POSITIVE_INFINITY);this.i_.forEachInRange([i,a],(u=>{r=r.add(u.r_)}))})),M.resolve(this.o_(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,i=r;X.isDocumentKey(i)||(i=i.child(""));let a=new Re(new X(i),0),u=new xe(ue);return this.i_.forEachWhile((c=>{let l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(u=u.add(c.r_)),!0)}),a),M.resolve(this.o_(u))}o_(e){let t=[];return e.forEach((r=>{let s=this.s_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Q(this.a_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.i_;return M.forEach(t.mutations,(s=>{let i=new Re(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.i_=r}))}Hr(e){}containsKey(e,t){let r=new Re(t,0),s=this.i_.firstAfterOrEqual(r);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}a_(e,t){return this.__(e)}__(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}s_(e){let t=this.__(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xd=class{constructor(e){this.u_=e,this.docs=(function(){return new ye(X.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.u_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return M.resolve(r?r.document.mutableCopy():vt.newInvalidDocument(t))}getEntries(e,t){let r=ht();return t.forEach((s=>{let i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():vt.newInvalidDocument(s))})),M.resolve(r)}getAllEntries(e){let t=ht();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),M.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;Le(t)?(i=Be.fromString(ac(t)),a=h=>uc(t,h)):(i=t.path,a=h=>tc(t,h));let u=ht(),c=new X(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:h,value:{document:f}}=l.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||xT(LT(f),r)<=0||(s.has(f.key)||a(f))&&(u=u.insert(f.key,f.mutableCopy()))}return M.resolve(u)}getAllFromCollectionGroup(e,t,r,s){Y(9500)}c_(e,t){return M.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Vd(this)}getSize(e){return M.resolve(this.size)}},Vd=class extends Rd{constructor(e){super(),this.$s=e}applyChanges(e){let t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.$s.addEntry(e,s)):this.$s.removeEntry(r)})),M.waitFor(t)}getFromCache(e,t){return this.$s.getEntry(e,t)}getAllFromCache(e,t){return this.$s.getEntries(e,t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Md=class{constructor(e){this.persistence=e,this.l_=new Dn((t=>m_(t)),E_),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.E_=0,this.h_=new ga,this.targetCount=0,this.T_=Wr.ws()}forEachTarget(e,t){return this.l_.forEach(((r,s)=>t(s))),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.E_)}allocateTargetId(e){return this.highestTargetId=this.T_.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.E_&&(this.E_=t),M.resolve()}Ds(e){this.l_.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.T_=new Wr(t),this.highestTargetId=t),e.sequenceNumber>this.E_&&(this.E_=e.sequenceNumber)}addTargetData(e,t){return this.Ds(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Ds(t),M.resolve()}removeTargetData(e,t){return this.l_.delete(t.target),this.h_.e_(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,r){let s=0,i=[];return this.l_.forEach(((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.l_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),M.waitFor(i).next((()=>s))}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){let r=this.l_.get(t)||null;return M.resolve(r)}addMatchingKeys(e,t,r){return this.h_.Ys(t,r),M.resolve()}removeMatchingKeys(e,t,r){this.h_.Xs(t,r);let s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.h_.e_(t),M.resolve()}getMatchingKeysForTargetId(e,t){let r=this.h_.n_(t);return M.resolve(r)}containsKey(e,t){return M.resolve(this.h_.containsKey(t))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hu=class{constructor(e,t){this.P_={},this.overlays={},this.I_=new Ls(0),this.R_=!1,this.R_=!0,this.A_=new kd,this.referenceDelegate=e(this),this.V_=new Md(this),this.indexManager=new vd,this.remoteDocumentCache=(function(s){return new xd(s)})((r=>this.referenceDelegate.d_(r))),this.serializer=new Ad(t),this.f_=new Od(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Fd,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.P_[e.toKey()];return r||(r=new Ld(t,this.referenceDelegate),this.P_[e.toKey()]=r),r}getGlobalsCache(){return this.A_}getTargetCache(){return this.V_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.f_}runTransaction(e,t,r){K("MemoryPersistence","Starting transaction:",e);let s=new Gd(this.I_.next());return this.referenceDelegate.m_(),r(s).next((i=>this.referenceDelegate.p_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}g_(e,t){return M.or(Object.values(this.P_).map((r=>()=>r.containsKey(e,t))))}},Gd=class extends th{constructor(e){super(),this.currentSequenceNumber=e}},Ud=class n{constructor(e){this.persistence=e,this.y_=new ga,this.w_=null}static b_(e){return new n(e)}get S_(){if(this.w_)return this.w_;throw Y(60996)}addReference(e,t,r){return this.y_.addReference(r,t),this.S_.delete(r.toString()),M.resolve()}removeReference(e,t,r){return this.y_.removeReference(r,t),this.S_.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.S_.add(t.toString()),M.resolve()}removeTarget(e,t){this.y_.e_(t.targetId).forEach((s=>this.S_.add(s.toString())));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.S_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}m_(){this.w_=new Set}p_(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.S_,(r=>{let s=X.fromPath(r);return this.v_(e,s).next((i=>{i||t.removeEntry(s,te.min())}))})).next((()=>(this.w_=null,t.apply(e))))}updateLimboDocument(e,t){return this.v_(e,t).next((r=>{r?this.S_.delete(t.toString()):this.S_.add(t.toString())}))}d_(e){return 0}v_(e,t){return M.or([()=>M.resolve(this.y_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.g_(e,t)])}},qu=class n{constructor(e,t){this.persistence=e,this.D_=new Dn((r=>MA(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=_A(this,t)}static b_(e,t){return new n(e,t)}m_(){}p_(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}ir(e){let t=this.Cs(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Cs(e){let t=0;return this.sr(e,(r=>{t++})).next((()=>t))}sr(e,t){return M.forEach(this.D_,((r,s)=>this.Os(e,r,s).next((i=>i?M.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.c_(e,(a=>this.Os(e,a,t).next((u=>{u||(r++,i.removeEntry(a,te.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.D_.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.D_.set(t,e.currentSequenceNumber),M.resolve()}d_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=su(e.data.value)),t}Os(e,t,r){return M.or([()=>this.persistence.g_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let s=this.D_.get(t);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hd=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Vo=r,this.fo=s}static mo(e,t){let r=oe(),s=oe();for(let i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new n(e,t.fromCache,r,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(n,e){return X.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qd=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jd=class{constructor(){this.po=!1,this.yo=!1,this.wo=100,this.bo=(function(){return BC()?8:mA(He())>0?6:4})()}initialize(e,t){this.So=e,this.indexManager=t,this.po=!0}getDocumentsMatchingQuery(e,t,r,s){let i={result:null};return this.vo(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Do(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;let a=new qd;return this.xo(e,t,a).next((u=>{if(i.result=u,this.yo)return this.Co(e,t,a,u.size)}))})).next((()=>i.result))}Co(e,t,r,s){return Le(t)?M.resolve():r.documentReadCount<this.wo?(Cs()<=ae.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",qi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.wo,"documents"),M.resolve()):(Cs()<=ae.DEBUG&&K("QueryEngine","Query:",qi(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.bo*s?(Cs()<=ae.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",qi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Zt(t))):M.resolve())}vo(e,t){if(Le(t))return M.resolve(null);let r=t;if(xm(r))return M.resolve(null);let s=Zt(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=Zi(r,null,"F"),s=Zt(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((a=>{let u=oe(...a);return this.So.getDocuments(e,u).next((c=>this.indexManager.getMinOffset(e,s).next((l=>{let h=this.Fo(r,c);return this.Oo(r,h,u,l.readTime)?this.vo(e,Zi(r,null,"F")):this.Mo(e,h,r,l)}))))})))))}Do(e,t,r,s){return(Le(t)?(function(a){for(let u of a.stages){if(u instanceof Jr||u instanceof xu)return!1;if(u instanceof ua){if(u.condition instanceof Pu&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof Kr&&u.condition._expr.params[0].fieldName===As)continue;return!1}}return!0})(t):xm(t))||s.isEqual(te.min())?M.resolve(null):this.So.getDocuments(e,r).next((i=>{let a=this.Fo(t,i);return this.Oo(t,a,r,s)?M.resolve(null):(Cs()<=ae.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Qm(t)),this.Mo(e,a,t,kT(s,Xi)).next((u=>u)))}))}Fo(e,t){let r,s;return Le(e)?(r=new xe(ev),s=i=>uc(e,i)):(r=new xe(_f(e)),s=i=>tc(e,i)),t.forEach(((i,a)=>{s(a)&&(r=r.add(a))})),r}Oo(e,t,r,s){if(Le(e))return(function(u){return u.stages.some((c=>c instanceof Jr||c instanceof xu))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;let i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}xo(e,t,r){return Cs()<=ae.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",Qm(t)),this.So.getDocumentsMatchingQuery(e,t,Hr.min(),r)}Mo(e,t,r,s){return this.So.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pf="LocalStore",tv=3e8,Kd=class{constructor(e,t,r,s){this.persistence=e,this.No=t,this.serializer=s,this.Lo=new ye(ue),this.Bo=new Dn((i=>m_(i)),E_),this.Uo=new Map,this.ko=e.getRemoteDocumentCache(),this.V_=e.getTargetCache(),this.f_=e.getBundleCache(),this.qo(r)}qo(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Nd(this.ko,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ko.setIndexManager(this.indexManager),this.No.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Lo)))}};function nv(n,e,t,r){return new Kd(n,e,t,r)}async function k_(n,e){let t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.qo(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{let a=[],u=[],c=oe();for(let l of s){a.push(l.batchId);for(let h of l.mutations)c=c.add(h.key)}for(let l of i){u.push(l.batchId);for(let h of l.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(r,c).next((l=>({$o:l,removedBatchIds:a,addedBatchIds:u})))}))}))}function rv(n,e){let t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{let s=e.batch.keys(),i=t.ko.newChangeBuffer({trackRemovals:!0});return(function(u,c,l,h){let f=l.batch,C=f.keys(),_=M.resolve();return C.forEach((D=>{_=_.next((()=>h.getEntry(c,D))).next((P=>{let V=l.docVersions.get(D);Q(V!==null,48541),P.version.compareTo(V)<0&&(f.applyToRemoteDocument(P,l),P.isValidDocument()&&(P.setReadTime(l.commitVersion),h.addEntry(P)))}))})),_.next((()=>u.mutationQueue.removeMutationBatch(c,f)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let c=oe();for(let l=0;l<u.mutationResults.length;++l)u.mutationResults[l].transformResults.length>0&&(c=c.add(u.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function L_(n){let e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.V_.getLastRemoteSnapshotVersion(t)))}function sv(n,e){let t=ne(n),r=e.snapshotVersion,s=t.Lo;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{let a=t.ko.newChangeBuffer({trackRemovals:!0});s=t.Lo;let u=[];e.targetChanges.forEach(((h,f)=>{let C=s.get(f);if(!C)return;u.push(t.V_.removeMatchingKeys(i,h.removedDocuments,f).next((()=>t.V_.addMatchingKeys(i,h.addedDocuments,f))));let _=C.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?_=_.withResumeToken(Ne.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,r)),s=s.insert(f,_),(function(P,V,q){return P.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=tv?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(C,_,h)&&u.push(t.V_.updateTargetData(i,_))}));let c=ht(),l=oe();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))})),u.push(iv(i,a,e.documentUpdates).next((h=>{c=h.Ko,l=h.Qo}))),!r.isEqual(te.min())){let h=t.V_.getLastRemoteSnapshotVersion(i).next((f=>t.V_.setTargetsMetadata(i,i.currentSequenceNumber,r)));u.push(h)}return M.waitFor(u).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,l))).next((()=>c))})).then((i=>(t.Lo=s,i)))}function iv(n,e,t){let r=oe(),s=oe();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=ht();return t.forEach(((u,c)=>{let l=i.get(u);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(te.min())?(e.removeEntry(u,c.readTime),a=a.insert(u,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),a=a.insert(u,c)):K(Pf,"Ignoring outdated watch update for ",u,". Current version:",l.version," Watch version:",c.version)})),{Ko:a,Qo:s}}))}function av(n,e){let t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=df),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function ov(n,e){let t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.V_.getTargetData(r,e).next((i=>i?(s=i,M.resolve(s)):t.V_.allocateTargetId(r).next((a=>(s=new Us(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.V_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{let s=t.Lo.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Lo=t.Lo.insert(r.targetId,r),t.Bo.set(e,r.targetId)),r}))}async function Jd(n,e,t){let r=ne(n),s=r.Lo.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!zs(a))throw a;K(Pf,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Lo=r.Lo.remove(e),r.Bo.delete(s.target)}function Ym(n,e,t){let r=ne(n),s=te.min(),i=oe();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,l,h){let f=ne(c),C=f.Bo.get(h);return C!==void 0?M.resolve(f.Lo.get(C)):f.V_.getTargetData(l,h)})(r,a,Le(e)?e:Zt(e)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.V_.getMatchingKeysForTargetId(a,u.targetId).next((c=>{i=c}))})).next((()=>r.No.getDocumentsMatchingQuery(a,e,t?s:te.min(),t?i:oe()))).next((u=>(uv(r,u),{documents:u,Wo:i})))))}function uv(n,e){e.forEach(((t,r)=>{let s=r.key.getCollectionGroup(),i=n.Uo.get(s)||te.min();r.readTime.compareTo(i)>0&&n.Uo.set(s,r.readTime)}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zd=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Yo=0,this.Zo=null,this.Xo=!0}ea(){this.Yo===0&&(this.ta("Unknown"),this.Zo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Zo=null,this.na("Backend didn't respond within 10 seconds."),this.ta("Offline"),Promise.resolve()))))}ra(e){this.state==="Online"?this.ta("Unknown"):(this.Yo++,this.Yo>=1&&(this.ia(),this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ta("Offline")))}set(e){this.ia(),this.Yo=0,e==="Online"&&(this.Xo=!1),this.ta(e)}ta(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}na(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Xo?(En(t),this.Xo=!1):K("OnlineStateTracker",t)}ia(){this.Zo!==null&&(this.Zo.cancel(),this.Zo=null)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sn="RemoteStore",Wd=class{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.sa=[],this._a=new Map,this.oa=new Map,this.aa=new Map,this.ua=new Wr(1e3),this.ca=new Wr(1001),this.la=new Set,this.Ea=[],this.ha=i,this.ha.Qe((a=>{r.enqueueAndForget((async()=>{Yr(this)&&(K(sn,"Restarting streams for network reachability change."),await(async function(c){let l=ne(c);l.la.add(4),await Aa(l),l.Ta.set("Unknown"),l.la.delete(4),await cc(l)})(this))}))})),this.Ta=new zd(r,s)}};async function cc(n){if(Yr(n))for(let e of n.Ea)await e(!0)}async function Aa(n){for(let e of n.Ea)await e(!1)}function Qd(n,e){return n.oa.get(e)||void 0}function x_(n,e){let t=ne(n),r=Qd(t,e.targetId);if(r!==void 0&&t._a.has(r))return;let s=(function(u,c){let l=Qd(u,c);l!==void 0&&u.aa.delete(l);let h=(function(C,_){return _%2!=0?C.ca.next():C.ua.next()})(u,c);return u.oa.set(c,h),u.aa.set(h,c),h})(t,e.targetId);K(sn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);let i=new Us(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t._a.set(s,i),kf(t)?Ff(t):Ws(t).Yt()&&Of(t,i)}function Nf(n,e){let t=ne(n),r=Ws(t),s=Qd(t,e);K(sn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t._a.delete(s),t.oa.delete(e),t.aa.delete(s),r.Yt()&&V_(t,s),t._a.size===0&&(r.Yt()?r.en():Yr(t)&&t.Ta.set("Unknown"))}function Of(n,e){if(n.Pa.J(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){let t=n.aa.get(e.targetId);if(t===void 0)return void K(sn,"SDK target ID not found for remote ID: "+e.targetId);let r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}Ws(n).Pn(e)}function V_(n,e){n.Pa.J(e),Ws(n).In(e)}function Ff(n){n.Pa=new MB({getRemoteKeysForTarget:e=>{let t=n.aa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):oe()},ye:e=>n._a.get(e)||null,Ve:()=>n.datastore.serializer.databaseId}),Ws(n).start(),n.Ta.ea()}function kf(n){return Yr(n)&&!Ws(n).Jt()&&n._a.size>0}function Yr(n){return ne(n).la.size===0}function M_(n){n.Pa=void 0}async function cv(n){n.Ta.set("Online")}async function lv(n){n._a.forEach(((e,t)=>{Of(n,e)}))}async function Bv(n,e){M_(n),kf(n)?(n.Ta.ra(e),Ff(n)):n.Ta.set("Unknown")}async function hv(n,e,t){if(n.Ta.set("Online"),e instanceof gu&&e.state===2&&e.cause)try{await(async function(s,i){let a=i.cause;for(let u of i.targetIds){if(s._a.has(u)){let c=s.aa.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,a),s.oa.delete(c),s.aa.delete(u)),s._a.delete(u)}s.Pa.removeTarget(u)}})(n,e)}catch(r){K(sn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ju(n,r)}else if(e instanceof ws?n.Pa._e(e):e instanceof Cu?n.Pa.he(e):n.Pa.ue(e),!t.isEqual(te.min()))try{let r=await L_(n.localStore);t.compareTo(r)>=0&&await(function(i,a){let u=i.Pa.fe(a);u.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){let f=i._a.get(h);f&&i._a.set(h,f.withResumeToken(l.resumeToken,a))}})),u.targetMismatches.forEach(((l,h)=>{let f=i._a.get(l);if(!f)return;i._a.set(l,f.withResumeToken(Ne.EMPTY_BYTE_STRING,f.snapshotVersion)),V_(i,l);let C=new Us(f.target,l,h,f.sequenceNumber);Of(i,C)}));let c=(function(h,f){let C=new Map;f.targetChanges.forEach(((D,P)=>{let V=h.aa.get(P);V!==void 0&&C.set(V,D)}));let _=new ye(ue);return f.targetMismatches.forEach(((D,P)=>{let V=h.aa.get(D);V!==void 0&&(_=_.insert(V,P))})),new ea(f.snapshotVersion,C,_,f.documentUpdates,f.augmentedDocumentUpdates,f.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){K(sn,"Failed to raise snapshot:",r),await ju(n,r)}}async function ju(n,e,t){if(!zs(e))throw e;n.la.add(1),await Aa(n),n.Ta.set("Offline"),t||(t=()=>L_(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{K(sn,"Retrying IndexedDB access"),await t(),n.la.delete(1),await cc(n)}))}function G_(n,e){return e().catch((t=>ju(n,t,e)))}async function lc(n){let e=ne(n),t=Xn(e),r=e.sa.length>0?e.sa[e.sa.length-1].batchId:df;for(;dv(e);)try{let s=await av(e.localStore,r);if(s===null){e.sa.length===0&&t.en();break}r=s.batchId,fv(e,s)}catch(s){await ju(e,s)}U_(e)&&H_(e)}function dv(n){return Yr(n)&&n.sa.length<10}function fv(n,e){n.sa.push(e);let t=Xn(n);t.Yt()&&t.Rn&&t.An(e.mutations)}function U_(n){return Yr(n)&&!Xn(n).Jt()&&n.sa.length>0}function H_(n){Xn(n).start()}async function pv(n){Xn(n).fn()}async function Cv(n){let e=Xn(n);for(let t of n.sa)e.An(t.mutations)}async function gv(n,e,t){let r=n.sa.shift(),s=Id.from(r,e,t);await G_(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await lc(n)}async function mv(n,e){e&&Xn(n).Rn&&await(async function(r,s){if((function(a){return LE(a)&&a!==k.ABORTED})(s.code)){let i=r.sa.shift();Xn(r).Xt(),await G_(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await lc(r)}})(n,e),U_(n)&&H_(n)}async function Xm(n,e){let t=ne(n);t.asyncQueue.verifyOperationInProgress(),K(sn,"RemoteStore received new credentials");let r=Yr(t);t.la.add(3),await Aa(t),r&&t.Ta.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.la.delete(3),await cc(t)}async function Ev(n,e){let t=ne(n);e?(t.la.delete(2),await cc(t)):e||(t.la.add(2),await Aa(t),t.Ta.set("Unknown"))}function Ws(n){return n.Ia||(n.Ia=(function(t,r,s){let i=ne(t);return i.pn(),new YB(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{ct:cv.bind(null,n),Et:lv.bind(null,n),Tt:Bv.bind(null,n),Tn:hv.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ia.Xt(),kf(n)?Ff(n):n.Ta.set("Unknown")):(await n.Ia.stop(),M_(n))}))),n.Ia}function Xn(n){return n.Ra||(n.Ra=(function(t,r,s){let i=ne(t);return i.pn(),new XB(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{ct:()=>Promise.resolve(),Et:pv.bind(null,n),Tt:mv.bind(null,n),Vn:Cv.bind(null,n),dn:gv.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ra.Xt(),await lc(n)):(await n.Ra.stop(),n.sa.length>0&&(K(sn,`Stopping write stream with ${n.sa.length} pending writes`),n.sa=[]))}))),n.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $d=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Aa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Aa(this.observer.error,e):En("Uncaught Error in snapshot listener:",e.toString()))}Va(){this.muted=!0}Aa(e,t){setTimeout((()=>{this.muted||e(t)}),0)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yd=class n{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new tn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){let a=Date.now()+r,u=new n(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new G(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Lf(n,e){if(En("AsyncQueue",`${e}: ${n}`),zs(n))return new G(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ku=class{constructor(){this.activeTargetIds=zT()}Ba(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ua(e){this.activeTargetIds=this.activeTargetIds.delete(e)}La(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Xd=class{constructor(){this.fu=new Ku,this.mu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.fu.Ba(e),this.mu[e]||"not-current"}updateQueryState(e,t,r){this.mu[e]=t}removeLocalQueryTarget(e){this.fu.Ua(e)}isLocalQueryTarget(e){return this.fu.activeTargetIds.has(e)}clearQueryState(e){delete this.mu[e]}getAllActiveQueryTargets(){return this.fu.activeTargetIds}isActiveQueryTarget(e){return this.fu.activeTargetIds.has(e)}start(){return this.fu=new Ku,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _B(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ma=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||X.comparator(t.key,r.key):(t,r)=>X.comparator(t.key,r.key),this.keyedMap=ms(),this.sortedSet=new ye(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){let e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ju=class{constructor(){this.pu=new ye(X.comparator)}track(e){let t=e.doc.key,r=this.pu.get(t);r?e.type!==0&&r.type===3?this.pu=this.pu.insert(t,e):e.type===3&&r.type!==1?this.pu=this.pu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.pu=this.pu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.pu=this.pu.remove(t):e.type===1&&r.type===2?this.pu=this.pu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):Y(63341,{we:e,gu:r}):this.pu=this.pu.insert(t,e)}yu(){let e=[];return this.pu.inorderTraversal(((t,r)=>{e.push(r)})),e}},Hs=class n{constructor(e,t,r,s,i,a,u,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){let a=[];return t.forEach((u=>{a.push({type:0,doc:u})})),new n(e,t,ma.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zd=class{constructor(){this.wu=void 0,this.bu=[]}Su(){return this.bu.some((e=>e.vu()))}},ef=class{constructor(){this.queries=Zm(),this.onlineState="Unknown",this.Du=new Set}terminate(){(function(t,r){let s=ne(t),i=s.queries;s.queries=Zm(),i.forEach(((a,u)=>{for(let c of u.bu)c.onError(r)}))})(this,new G(k.ABORTED,"Firestore shutting down"))}};function Zm(){return new Dn((n=>g_(n)),oc)}async function _v(n,e){let t=ne(n),r=3,s=e.query,i=t.queries.get(s);i?!i.Su()&&e.vu()&&(r=2):(i=new Zd,r=e.vu()?0:1);try{switch(r){case 0:i.wu=await t.onListen(s,!0);break;case 1:i.wu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){let u=Lf(a,`Initialization of query '${Le(e.query)?gn(e.query):qi(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.bu.push(e),e.xu(t.onlineState),i.wu&&e.Cu(i.wu)&&xf(t)}async function yv(n,e){let t=ne(n),r=e.query,s=3,i=t.queries.get(r);if(i){let a=i.bu.indexOf(e);a>=0&&(i.bu.splice(a,1),i.bu.length===0?s=e.vu()?0:1:!i.Su()&&e.vu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Dv(n,e){let t=ne(n),r=!1;for(let s of e){let i=s.query,a=t.queries.get(i);if(a){for(let u of a.bu)u.Cu(s)&&(r=!0);a.wu=s}}r&&xf(t)}function wv(n,e,t){let r=ne(n),s=r.queries.get(e);if(s)for(let i of s.bu)i.onError(t);r.queries.delete(e)}function xf(n){n.Du.forEach((e=>{e.next()}))}var tf;(function(n){n.Default="default",n.Cache="cache"})(tf||(tf={}));var nf=class{constructor(e,t,r){this.query=e,this.Fu=t,this.Ou=!1,this.Mu=null,this.onlineState="Unknown",this.options=r||{}}Cu(e){if(!this.options.includeMetadataChanges){let r=[];for(let s of e.docChanges)s.type!==3&&r.push(s);e=new Hs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Ou?this.Nu(e)&&(this.Fu.next(e),t=!0):this.Lu(e,this.onlineState)&&(this.Bu(e),t=!0),this.Mu=e,t}onError(e){this.Fu.error(e)}xu(e){this.onlineState=e;let t=!1;return this.Mu&&!this.Ou&&this.Lu(this.Mu,e)&&(this.Bu(this.Mu),t=!0),t}Lu(e,t){if(!e.fromCache||!this.vu())return!0;let r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Nu(e){if(e.docChanges.length>0)return!0;let t=this.Mu&&this.Mu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Bu(e){e=Hs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Ou=!0,this.Fu.next(e)}vu(){return this.options.source!==tf.Cache}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zu=class{constructor(e){this.key=e}},Wu=class{constructor(e){this.key=e}},rf=class{constructor(e,t){this.query=e,this.zu=t,this.ju=null,this.hasCachedResults=!1,this.current=!1,this.Hu=oe(),this.mutatedKeys=oe(),this.Ju=Le(e)?Sd(e):_f(e),this.Yu=new ma(this.Ju)}get Zu(){return this.zu}Xu(e,t){let r=t?t.ec:new Ju,s=t?t.Yu:this.Yu,i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1,[c,l]=this.tc(this.query,s);e.inorderTraversal(((f,C)=>{let _=s.get(f),D=XA(this.query,C)?C:null,P=!!_&&this.mutatedKeys.has(_.key),V=!!D&&(D.hasLocalMutations||this.mutatedKeys.has(D.key)&&D.hasCommittedMutations),q=!1;_&&D?_.data.isEqual(D.data)?P!==V&&(r.track({type:3,doc:D}),q=!0):this.nc(_,D)||(r.track({type:2,doc:D}),q=!0,(c&&this.Ju(D,c)>0||l&&this.Ju(D,l)<0)&&(u=!0)):!_&&D?(r.track({type:0,doc:D}),q=!0):_&&!D&&(r.track({type:1,doc:_}),q=!0,(c||l)&&(u=!0)),q&&(D?(a=a.add(D),i=V?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}));let h=this.rc(this.query);if(h)if(Le(this.query)){let f=[];a.forEach((D=>f.push(D)));let C=F_(this.query,f),_=new ma(Sd(this.query));for(let D of C)_=_.add(D);a.forEach((D=>{_.has(D.key)||(i=i.delete(D.key),r.track({type:1,doc:D}))})),a=_}else{let f=this.sc(this.query);for(;a.size>h;){let C=f==="F"?a.last():a.first();a=a.delete(C.key),i=i.delete(C.key),r.track({type:1,doc:C})}}return{Yu:a,ec:r,Oo:u,mutatedKeys:i}}rc(e){var t;return Le(e)?(t=EB(e))==null?void 0:t.limit:e.limit||void 0}sc(e){if(Le(e)){let t=EB(e);return t&&t.limit<0?"L":"F"}return e.limitType}tc(e,t){var r;if(Le(e)){let s=(r=EB(e))==null?void 0:r.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.rc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.rc(this.query)?t.first():null]}nc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){let i=this.Yu;this.Yu=e.Yu,this.mutatedKeys=e.mutatedKeys;let a=e.ec.yu();a.sort(((h,f)=>(function(_,D){let P=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y(20277,{we:V})}};return P(_)-P(D)})(h.type,f.type)||this.Ju(h.doc,f.doc))),this._c(r),s=s??!1;let u=t&&!s?this.oc():[],c=this.Hu.size===0&&this.current&&!s?1:0,l=c!==this.ju;return this.ju=c,a.length!==0||l?{snapshot:new Hs(this.query,e.Yu,i,a,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),ac:u}:{ac:u}}xu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Yu:this.Yu,ec:new Ju,mutatedKeys:this.mutatedKeys,Oo:!1},!1)):{ac:[]}}uc(e){return!this.zu.has(e)&&!!this.Yu.has(e)&&!this.Yu.get(e).hasLocalMutations}_c(e){e&&(e.addedDocuments.forEach((t=>this.zu=this.zu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.zu=this.zu.delete(t))),this.current=e.current)}oc(){if(!this.current)return[];let e=this.Hu;this.Hu=oe(),this.Yu.forEach((r=>{this.uc(r.key)&&(this.Hu=this.Hu.add(r.key))}));let t=[];return e.forEach((r=>{this.Hu.has(r)||t.push(new Wu(r))})),this.Hu.forEach((r=>{e.has(r)||t.push(new zu(r))})),t}cc(e){this.zu=e.Wo,this.Hu=oe();let t=this.Xu(e.documents);return this.applyChanges(t,!0)}lc(){return Hs.fromInitialDocuments(this.query,this.Yu,this.mutatedKeys,this.ju===0,this.hasCachedResults)}},Vf="SyncEngine",sf=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},af=class{constructor(e){this.key=e,this.Ec=!1}},of=class{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hc={},this.Tc=new Dn((u=>g_(u)),oc),this.Pc=new Map,this.Ic=new Set,this.Rc=new ye(X.comparator),this.Ac=new Map,this.Vc=new ga,this.dc={},this.fc=new Map,this.mc=Wr.bs(),this.onlineState="Unknown",this.gc=void 0}get isPrimaryClient(){return this.gc===!0}};async function Iv(n,e,t=!0){let r=W_(n),s,i=r.Tc.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lc()):s=await q_(r,e,t,!0),s}async function Tv(n,e){let t=W_(n);await q_(t,e,!0,!1)}async function q_(n,e,t,r){let s=await ov(n.localStore,Le(e)?e:Zt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t),u;return r&&(u=await Av(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&x_(n.remoteStore,s),u}async function Av(n,e,t,r,s){n.yc=(f,C,_)=>(async function(P,V,q,z){let ie=V.view.Xu(q);ie.Oo&&(ie=await Ym(P.localStore,V.query,!1).then((({documents:A})=>V.view.Xu(A,ie))));let De=z&&z.targetChanges.get(V.targetId),Ae=z&&z.targetMismatches.get(V.targetId)!=null,we=V.view.applyChanges(ie,P.isPrimaryClient,De,Ae);return tE(P,V.targetId,we.ac),we.snapshot})(n,f,C,_);let i=await Ym(n.localStore,e,!0),a=new rf(e,i.Wo),u=a.Xu(i.documents),c=ta.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=a.applyChanges(u,n.isPrimaryClient,c);tE(n,t,l.ac);let h=new sf(e,t,a);return n.Tc.set(e,h),n.Pc.has(t)?n.Pc.get(t).push(e):n.Pc.set(t,[e]),l.snapshot}async function vv(n,e,t){let r=ne(n),s=r.Tc.get(e),i=r.Pc.get(s.targetId);if(i.length>1)return r.Pc.set(s.targetId,i.filter((a=>!oc(a,e)))),void r.Tc.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Jd(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Nf(r.remoteStore,s.targetId),uf(r,s.targetId)})).catch(Js)):(uf(r,s.targetId),await Jd(r.localStore,s.targetId,!0))}async function bv(n,e){let t=ne(n),r=t.Tc.get(e),s=t.Pc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Nf(t.remoteStore,r.targetId))}async function Sv(n,e,t){let r=Lv(n);try{let s=await(function(a,u){let c=ne(a),l=_e.now(),h=u.reduce(((_,D)=>_.add(D.key)),oe()),f,C;return c.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let D=ht(),P=oe();return c.ko.getEntries(_,h).next((V=>{D=V,D.forEach(((q,z)=>{z.isValidDocument()||(P=P.add(q))}))})).next((()=>c.localDocuments.getOverlayedDocuments(_,D))).next((V=>{f=V;let q=[];for(let z of u){let ie=NT(z,f.get(z.key).overlayedDocument);ie!=null&&q.push(new nn(z.key,ie,_E(ie.value.mapValue),wt.exists(!0)))}return c.mutationQueue.addMutationBatch(_,l,q,u)})).next((V=>{C=V;let q=V.applyToLocalDocumentSet(f,P);return c.documentOverlayCache.saveOverlays(_,V.batchId,q)}))})).then((()=>({batchId:C.batchId,changes:ME(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,u,c){let l=a.dc[a.currentUser.toKey()];l||(l=new ye(ue)),l=l.insert(u,c),a.dc[a.currentUser.toKey()]=l})(r,s.batchId,t),await va(r,s.changes),await lc(r.remoteStore)}catch(s){let i=Lf(s,"Failed to persist write");t.reject(i)}}async function j_(n,e){let t=ne(n);try{let r=await sv(t.localStore,e);e.targetChanges.forEach(((s,i)=>{let a=t.Ac.get(i);a&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Ec=!0:s.modifiedDocuments.size>0?Q(a.Ec,14607):s.removedDocuments.size>0&&(Q(a.Ec,42227),a.Ec=!1))})),await va(t,r,e)}catch(r){await Js(r)}}function eE(n,e,t){let r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Tc.forEach(((i,a)=>{let u=a.view.xu(e);u.snapshot&&s.push(u.snapshot)})),(function(a,u){let c=ne(a);c.onlineState=u;let l=!1;c.queries.forEach(((h,f)=>{for(let C of f.bu)C.xu(u)&&(l=!0)})),l&&xf(c)})(r.eventManager,e),s.length&&r.hc.Tn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Rv(n,e,t){let r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);let s=r.Ac.get(e),i=s&&s.key;if(i){let a=new ye(X.comparator);a=a.insert(i,vt.newNoDocument(i,te.min()));let u=oe().add(i),c=new ea(te.min(),new Map,new ye(ue),a,ht(),u);await j_(r,c),r.Rc=r.Rc.remove(i),r.Ac.delete(e),Mf(r)}else await Jd(r.localStore,e,!1).then((()=>uf(r,e,t))).catch(Js)}async function Pv(n,e){let t=ne(n),r=e.batch.batchId;try{let s=await rv(t.localStore,e);J_(t,r,null),K_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await va(t,s)}catch(s){await Js(s)}}async function Nv(n,e,t){let r=ne(n);try{let s=await(function(a,u){let c=ne(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let h;return c.mutationQueue.lookupMutationBatch(l,u).next((f=>(Q(f!==null,37113),h=f.keys(),c.mutationQueue.removeMutationBatch(l,f)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h))).next((()=>c.localDocuments.getDocuments(l,h)))}))})(r.localStore,e);J_(r,e,t),K_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await va(r,s)}catch(s){await Js(s)}}function K_(n,e){(n.fc.get(e)||[]).forEach((t=>{t.resolve()})),n.fc.delete(e)}function J_(n,e,t){let r=ne(n),s=r.dc[r.currentUser.toKey()];if(s){let i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.dc[r.currentUser.toKey()]=s}}function uf(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Pc.get(e))n.Tc.delete(r),t&&n.hc.wc(r,t);n.Pc.delete(e),n.isPrimaryClient&&n.Vc.e_(e).forEach((r=>{n.Vc.containsKey(r)||z_(n,r)}))}function z_(n,e){n.Ic.delete(e.path.canonicalString());let t=n.Rc.get(e);t!==null&&(Nf(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ac.delete(t),Mf(n))}function tE(n,e,t){for(let r of t)r instanceof zu?(n.Vc.addReference(r.key,e),Ov(n,r)):r instanceof Wu?(K(Vf,"Document no longer in limbo: "+r.key),n.Vc.removeReference(r.key,e),n.Vc.containsKey(r.key)||z_(n,r.key)):Y(19791,{bc:r})}function Ov(n,e){let t=e.key,r=t.path.canonicalString();n.Rc.get(t)||n.Ic.has(r)||(K(Vf,"New document in limbo: "+t),n.Ic.add(r),Mf(n))}function Mf(n){for(;n.Ic.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){let e=n.Ic.values().next().value;n.Ic.delete(e);let t=new X(Be.fromString(e)),r=n.mc.next();n.Ac.set(r,new af(t)),n.Rc=n.Rc.insert(t,r),x_(n.remoteStore,new Us(Zt(Zu(t.path)),r,"TargetPurposeLimboResolution",Ls.wn))}}async function va(n,e,t){let r=ne(n),s=[],i=[],a=[];r.Tc.isEmpty()||(r.Tc.forEach(((u,c)=>{a.push(r.yc(c,e,t).then((l=>{var h;if((l||t)&&r.isPrimaryClient){let f=l?!l.fromCache:(h=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){s.push(l);let f=Hd.mo(c.targetId,l);i.push(f)}})))})),await Promise.all(a),r.hc.Tn(s),await(async function(c,l){let h=ne(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>M.forEach(l,(C=>M.forEach(C.Vo,(_=>h.persistence.referenceDelegate.addReference(f,C.targetId,_))).next((()=>M.forEach(C.fo,(_=>h.persistence.referenceDelegate.removeReference(f,C.targetId,_)))))))))}catch(f){if(!zs(f))throw f;K(Pf,"Failed to update sequence numbers: "+f)}for(let f of l){let C=f.targetId;if(!f.fromCache){let _=h.Lo.get(C),D=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(D);h.Lo=h.Lo.insert(C,P)}}})(r.localStore,i))}async function Fv(n,e){let t=ne(n);if(!t.currentUser.isEqual(e)){K(Vf,"User change. New user:",e.toKey());let r=await k_(t.localStore,e);t.currentUser=e,(function(i,a){i.fc.forEach((u=>{u.forEach((c=>{c.reject(new G(k.CANCELLED,a))}))})),i.fc.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await va(t,r.$o)}}function kv(n,e){let t=ne(n),r=t.Ac.get(e);if(r&&r.Ec)return oe().add(r.key);{let s=oe(),i=t.Pc.get(e);if(!i)return s;for(let a of i??[]){let u=t.Tc.get(a);s=s.unionWith(u.view.Zu)}return s}}function W_(n){let e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=j_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=kv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Rv.bind(null,e),e.hc.Tn=Dv.bind(null,e.eventManager),e.hc.wc=wv.bind(null,e.eventManager),e}function Lv(n){let e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Pv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Nv.bind(null,e),e}var Qr=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=nc(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Dc(e),await this.persistence.start(),this.localStore=this.xc(e),this.gcScheduler=this.Cc(e,this.localStore),this.indexBackfillerScheduler=this.Fc(e,this.localStore)}Cc(e,t){return null}Fc(e,t){return null}xc(e){return nv(this.persistence,new jd,e.initialUser,this.serializer)}Dc(e){return new Hu(Ud.b_,this.serializer)}vc(e){return new Xd}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Qr.provider={build:()=>new Qr};var Qu=class extends Qr{constructor(e){super(),this.cacheSizeBytes=e}Cc(e,t){Q(this.persistence.referenceDelegate instanceof qu,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new rh(r,e.asyncQueue,t)}Dc(e){let t=this.cacheSizeBytes!==void 0?Ot.withCacheSize(this.cacheSizeBytes):Ot.DEFAULT;return new Hu((r=>qu.b_(r,t)),this.serializer)}};var qs=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>eE(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Fv.bind(null,this.syncEngine),await Ev(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new ef})()}createDatastore(e){let t=nc(e.databaseInfo.databaseId),r=dA(e.databaseInfo);return fA(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,u){return new Wd(r,s,i,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>eE(this.syncEngine,t,0)),(function(){return Iu.Ye()?new Iu:new zB})())}createSyncEngine(e,t){return(function(s,i,a,u,c,l,h){let f=new of(s,i,a,u,c,l);return h&&(f.gc=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){let i=ne(s);K(sn,"RemoteStore shutting down."),i.la.add(5),await Aa(i),i.ha.shutdown(),i.Ta.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}};qs.provider={build:()=>new qs};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cf=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new G(k.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await(async function(s,i){let a=ne(s),u={documents:i.map((f=>na(a.serializer,f)))},c=await a._t("BatchGetDocuments",a.serializer.databaseId,Be.emptyPath(),u,i.length),l=new Map;c.forEach((f=>{let C=eA(a.serializer,f);l.set(C.key.toString(),C)}));let h=[];return i.forEach((f=>{let C=l.get(f.toString());Q(!!C,55234,{key:f}),h.push(C)})),h})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Gr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{let s=X.fromPath(r);this.mutations.push(new du(s,this.precondition(s)))})),await(async function(r,s){let i=ne(r),a={writes:s.map((u=>KE(i.serializer,u)))};await i.nt("Commit",i.serializer.databaseId,Be.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw Y(50498,{Mc:e.constructor.name});t=te.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new G(k.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(te.min())?wt.exists(!1):wt.updateTime(t):wt.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(te.min()))throw new G(k.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return wt.updateTime(t)}return wt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lf=class{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Nc=r.maxAttempts,this.Ht=new sa(this.asyncQueue,"transaction_retry")}Lc(){this.Nc-=1,this.Bc()}Bc(){this.Ht.kt((async()=>{let e=new cf(this.datastore),t=this.Uc(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.kc(s)}))))})).catch((r=>{this.kc(r)}))}))}Uc(e){try{let t=this.updateFunction(e);return!Ta(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}kc(e){this.Nc>0&&this.qc(e)?(this.Nc-=1,this.asyncQueue.enqueueAndForget((()=>(this.Bc(),Promise.resolve())))):this.deferred.reject(e)}qc(e){if((e==null?void 0:e.name)==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!LE(t)}return!1}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zn="FirestoreClient",Bf=class{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ke.UNAUTHENTICATED,this.clientId=Is.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{K(Zn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(K(Zn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new tn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Lf(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}};async function yB(n,e){n.asyncQueue.verifyOperationInProgress(),K(Zn,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await k_(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function nE(n,e){n.asyncQueue.verifyOperationInProgress();let t=await xv(n);K(Zn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Xm(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Xm(e.remoteStore,s))),n._onlineComponents=e}async function xv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K(Zn,"Using user provided OfflineComponentProvider");try{await yB(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;kt("Error using user provided cache. Falling back to memory cache: "+t),await yB(n,new Qr)}}else K(Zn,"Using default OfflineComponentProvider"),await yB(n,new Qu(void 0));return n._offlineComponents}async function Gf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K(Zn,"Using user provided OnlineComponentProvider"),await nE(n,n._uninitializedComponentsProvider._online)):(K(Zn,"Using default OnlineComponentProvider"),await nE(n,new qs))),n._onlineComponents}function Vv(n){return Gf(n).then((e=>e.syncEngine))}function Mv(n){return Gf(n).then((e=>e.datastore))}async function rE(n){let e=await Gf(n),t=e.eventManager;return t.onListen=Iv.bind(null,e.syncEngine),t.onUnlisten=vv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Tv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=bv.bind(null,e.syncEngine),t}function Q_(n,e,t,r){let s=new $d(r),i=new nf(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>_v(await rE(n),i))),()=>{s.Va(),n.asyncQueue.enqueueAndForget((async()=>yv(await rE(n),i)))}}function $_(n,e){let t=new tn;return n.asyncQueue.enqueueAndForget((async()=>Sv(await Vv(n),e,t))),t.promise}function Y_(n,e,t){let r=new tn;return n.asyncQueue.enqueueAndForget((async()=>{let s=await Mv(n);new lf(n.asyncQueue,s,t,e,r).Lc()})),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ba=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ve(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Gv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){let t=this._document.data.field(zn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Gv=class extends ba{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ea=class{convertValue(e,t="none"){switch(Oe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Y(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return tr(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;let t=(i=(s=(r=e.fields)==null?void 0:r[Fr].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>Ce(a.doubleValue)));return new At(t)}convertGeoPoint(e){return new pn(Ce(e.latitude),Ce(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Ia(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(vs(e));default:return null}}convertTimestamp(e){let t=_n(e);return new _e(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Be.fromString(e);Q(WE(r),9688,{name:e});let s=new Wi(r.get(1),r.get(3)),i=new X(r.popFirst(5));return s.isEqual(t)||En(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var $u=class extends Ea{constructor(e){super(),this.firestore=e}convertBytes(e){return new en(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ve(this.firestore,null,t)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sE="AsyncQueue",Yu=class{constructor(e=Promise.resolve()){this.$c=[],this.Kc=!1,this.Qc=[],this.Wc=null,this.Gc=!1,this.zc=!1,this.jc=[],this.Ht=new sa(this,"async_queue_retry"),this.Hc=()=>{let r=_B();r&&K(sE,"Visibility state changed to "+r.visibilityState),this.Ht.$t()},this.Jc=e;let t=_B();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Yc(),this.Zc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;let t=_B();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Yc(),this.Kc)return new Promise((()=>{}));let t=new tn;return this.Zc((()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.$c.push(e),this.Xc())))}async Xc(){if(this.$c.length!==0){try{await this.$c[0](),this.$c.shift(),this.Ht.reset()}catch(e){if(!zs(e))throw e;K(sE,"Operation failed with retryable error: "+e)}this.$c.length>0&&this.Ht.kt((()=>this.Xc()))}}Zc(e){let t=this.Jc.then((()=>(this.Gc=!0,e().catch((r=>{throw this.Wc=r,this.Gc=!1,En("INTERNAL UNHANDLED ERROR: ",iE(r)),r})).then((r=>(this.Gc=!1,r))))));return this.Jc=t,t}enqueueAfterDelay(e,t,r){this.Yc(),this.jc.indexOf(e)>-1&&(t=0);let s=Yd.createAndSchedule(this,e,t,r,(i=>this.el(i)));return this.Qc.push(s),s}Yc(){this.Wc&&Y(47125,{tl:iE(this.Wc)})}verifyOperationInProgress(){}async nl(){let e;do e=this.Jc,await e;while(e!==this.Jc)}rl(e){for(let t of this.Qc)if(t.timerId===e)return!0;return!1}il(e){return this.nl().then((()=>{this.Qc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(let t of this.Qc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.nl()}))}sl(e){this.jc.push(e)}el(e){let t=this.Qc.indexOf(e);this.Qc.splice(t,1)}};function iE(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var er=class extends rc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Yu,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Yu(e),this._firestoreClient=void 0,await e}}};function Uf(n,e){let t=typeof n=="object"?n:ro(),r=typeof n=="string"?n:e||Bu,s=gi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let i=sC("firestore");i&&t_(s,...i)}return s}function Bc(n){if(n._terminated)throw new G(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Uv(n),n._firestoreClient}function Uv(n){var r,s,i,a;let e=n._freezeSettings(),t=CA(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Bf(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(c){let l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}})(n._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var js=class extends Ea{constructor(e){super(),this.firestore=e}convertBytes(e){return new en(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ve(this.firestore,null,t)}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},mn=class n extends ba{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Pr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(zn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new G(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};mn._jsonSchemaVersion="firestore/documentSnapshot/1.0",mn._jsonSchema={type:Pe("string",mn._jsonSchemaVersion),bundleSource:Pe("string","DocumentSnapshot"),bundleName:Pe("string"),bundle:Pe("string")};var Pr=class extends mn{data(e={}){return super.data(e)}},Nr=class n{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new fn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){let e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Pr(this._firestore,this._userDataWriter,r.key,r,new fn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new G(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{Le(s._snapshot.query)?Sd(s._snapshot.query):_f(s.query._query);let c=new Pr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{let c=new Pr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter),l=-1,h=-1;return u.type!==0&&(l=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),h=a.indexOf(u.doc.key)),{type:Hv(u.type),doc:c,oldIndex:l,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new G(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Is.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function Hv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y(61501,{type:n})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nr._jsonSchemaVersion="firestore/querySnapshot/1.0",Nr._jsonSchema={type:Pe("string",Nr._jsonSchemaVersion),bundleSource:Pe("string","QuerySnapshot"),bundleName:Pe("string"),bundle:Pe("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new G(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Ra=class{},Pa=class extends Ra{};function sy(n,e,...t){let r=[];e instanceof Ra&&r.push(e),r=r.concat(t),(function(i){let a=i.filter((c=>c instanceof qf)).length,u=i.filter((c=>c instanceof Hf)).length;if(a>1||a>0&&u>0)throw new G(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(let s of r)n=s._apply(n);return n}var Hf=class n extends Pa{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return oy(e._query,t),new wn(e.firestore,e.converter,ec(e._query,t))}_parse(e){let t=If(e.firestore);return(function(i,a,u,c,l,h,f){let C;if(l.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new G(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){ey(f,h);let D=[];for(let P of f)D.push(Z_(c,i,P));C={arrayValue:{values:D}}}else C=Z_(c,i,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||ey(f,h),C=a_(u,a,f,h==="in"||h==="not-in");return ve.create(l,h,C)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};var qf=class n extends Ra{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:xt.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s,u=i.getFlattenedFilters();for(let c of u)oy(a,c),a=ec(a,c)})(e._query,t),new wn(e.firestore,e.converter,ec(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var jf=class n extends Pa{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=(function(s,i,a){if(s.startAt!==null)throw new G(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new G(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new jn(i,a)})(e._query,this._field,this._direction);return new wn(e.firestore,e.converter,kE(e._query,t))}};function iy(n,e="asc"){let t=e,r=zn("orderBy",n);return jf._create(r,t)}var Kf=class n extends Pa{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new wn(e.firestore,e.converter,Zi(e._query,this._limit,this._limitType))}};function ay(n){return hE("limit",n),Kf._create("limit",n,"F")}function Z_(n,e,t){if(typeof(t=de(t))=="string"){if(t==="")throw new G(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ef(e)&&t.indexOf("/")!==-1)throw new G(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(Be.fromString(t));if(!X.isDocumentKey(r))throw new G(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Cf(n,new X(r))}if(t instanceof Ve)return Cf(n,t._key);throw new G(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ya(t)}.`)}function ey(n,e){if(!Array.isArray(n)||n.length===0)throw new G(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function oy(n,e){let t=(function(s,i){for(let a of s)for(let u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new G(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new G(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;let s=t;for(let i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jv={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n,e){if((n=de(n)).firestore!==e)throw new G(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kv=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=If(e)}get(e){let t=Sa(e,this._firestore),r=new $u(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return Y(24041);let i=s[0];if(i.isFoundDocument())return new ba(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new ba(this._firestore,r,t._key,null,t.converter);throw Y(18433,{doc:i})}))}set(e,t,r){let s=Sa(e,this._firestore),i=X_(s.converter,t,r),a=r_(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){let i=Sa(e,this._firestore),a;return a=typeof(t=de(t))=="string"||t instanceof qr?i_(this._dataReader,"Transaction.update",i._key,t,r,s):s_(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){let t=Sa(e,this._firestore);return this._transaction.delete(t._key),this}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jf=class extends Kv{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=Sa(e,this._firestore),r=new js(this._firestore);return super.get(e).then((s=>new mn(this._firestore,r,t._key,s._document,new fn(!1,!1),t.converter)))}};function uy(n,e,t){n=$r(n,er);let r={...jv,...t};(function(a){if(a.maxAttempts<1)throw new G(k.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);let s=Bc(n);return Y_(s,(i=>e(new Jf(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(n){return Jv($r(n.firestore,er),[new Gr(n._key,wt.none())])}function zf(n,...e){var l,h,f;n=de(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||ty(e[r])||(t=e[r++]);let s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ty(e[r])){let C=e[r];e[r]=(l=C.next)==null?void 0:l.bind(C),e[r+1]=(h=C.error)==null?void 0:h.bind(C),e[r+2]=(f=C.complete)==null?void 0:f.bind(C)}let i,a,u;if(n instanceof Ve)a=$r(n.firestore,er),u=Zu(n._key.path),i={next:C=>{e[r]&&e[r](zv(a,n,C))},error:e[r+1],complete:e[r+2]};else{let C=$r(n,wn);a=$r(C.firestore,er),u=C._query;let _=new js(a);i={next:D=>{e[r]&&e[r](new Nr(a,_,C,D))},error:e[r+1],complete:e[r+2]},qv(n._query)}let c=Bc(a);return Q_(c,u,s,i)}function Jv(n,e){let t=Bc(n);return $_(t,e)}function zv(n,e,t){let r=t.docs.get(e._key),s=new js(n);return new mn(n,s,e._key,r,new fn(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ny="@firebase/firestore",ry="4.17.2";(function(e,t=!0){aE(Ln),kn(new Rt("firestore",((r,{instanceIdentifier:s,options:i})=>{let a=r.getProvider("app").getImmediate(),u=new er(new yu(r.getProvider("auth-internal")),new wu(a,r.getProvider("app-check-internal")),gE(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),Ut(ny,ry,e),Ut(ny,ry,"esm2020")})();var Qf="sinav-kampi-firebase-config-v1",cy="sinav-kampi-cloud-opt-v1",nr=window.KampCore,bt,An,Fe,Zr,Vt=null,Te=null,Qe=0,me=null,Ee=null,fc=null,Na=!1,sr=!1,Me=!1,jt=!1,Ys="",gc=0,st="",Mt="Ba\u011Flant\u0131 yap\u0131land\u0131r\u0131lmad\u0131",Xr=!1,Xs=[],dc=!1,Qs=Wv(),$f="",rr=0,vn=null;function Wv(){try{let n=localStorage.getItem(Qf);return n?ly(JSON.parse(n)):{...so}}catch{return{...so}}}function ly(n){if(!n||typeof n!="object")return null;let e=String(n.projectId||"").trim(),t=String(n.apiKey||"").trim(),r=String(n.appId||"").trim(),s=String(n.authDomain||e+".firebaseapp.com").trim();return!/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(e)||!/^[A-Za-z0-9_-]{20,200}$/.test(t)||r&&!/^1:\d+:web:[a-fA-F0-9]+$/.test(r)||!/^[a-z0-9.-]+(?::\d+)?$/.test(s)?null:{apiKey:t,authDomain:s,projectId:e,...r?{appId:r}:{},...n.storageBucket?{storageBucket:String(n.storageBucket)}:{},...n.messagingSenderId?{messagingSenderId:String(n.messagingSenderId)}:{}}}function By(){try{let n=JSON.parse(localStorage.getItem(cy)||"{}");return n&&typeof n=="object"?n:{}}catch{return{}}}function Oa(){if(Te)try{let n=By();n[Te]={sync:Me,leaderboard:jt,nickname:Ys},localStorage.setItem(cy,JSON.stringify(n))}catch{hy("Tercihler cihazda kaydedilemedi.")}}function Ge(){var n;(n=bt==null?void 0:bt.render)==null||n.call(bt)}function hy(n){let e=(n==null?void 0:n.code)||"";return{"auth/invalid-email":"E-posta adresini kontrol et.","auth/email-already-in-use":"Bu e-posta ile bir hesap var. Giri\u015F yapmay\u0131 veya \u015Fifre s\u0131f\u0131rlamay\u0131 dene.","auth/invalid-credential":"E-posta veya \u015Fifre do\u011Fru de\u011Fil.","auth/wrong-password":"E-posta veya \u015Fifre do\u011Fru de\u011Fil.","auth/user-not-found":"E-posta veya \u015Fifre do\u011Fru de\u011Fil.","auth/weak-password":"\u015Eifre en az 8 karakter olmal\u0131.","auth/too-many-requests":"\xC7ok fazla deneme yap\u0131ld\u0131. Biraz bekle veya \u015Fifreni s\u0131f\u0131rla.","auth/operation-not-allowed":"Firebase Console\u2019da Authentication \u2192 Email/Password sa\u011Flay\u0131c\u0131s\u0131n\u0131 etkinle\u015Ftir.","auth/unauthorized-domain":"Bu web adresi Firebase Auth izinli alanlar\u0131nda de\u011Fil. FIREBASE.md dosyas\u0131ndaki alan ayar\u0131n\u0131 uygula.","auth/network-request-failed":"Firebase ba\u011Flant\u0131s\u0131 kurulamad\u0131. \u0130nternetini ve proje bilgilerini kontrol et.","permission-denied":"Firestore eri\u015Fimi reddedildi. sinavkam projesinde firestore.rules kurallar\u0131n\u0131 yay\u0131mla.",unavailable:"Firebase\u2019e ula\u015F\u0131lam\u0131yor. Yerel kayd\u0131n korunuyor; ba\u011Flant\u0131 gelince tekrar deneyebilirsin.","failed-precondition":"Firestore veritaban\u0131 hen\xFCz haz\u0131r de\u011Fil. Firebase Console\u2019da Firestore\u2019u olu\u015Ftur.","auth/invalid-api-key":"Firebase apiKey bilgisini kontrol et.","auth/popup-blocked":"Giri\u015F penceresi engellendi. Taray\u0131c\u0131 a\xE7\u0131l\u0131r pencere iznini kontrol et veya tekrar dene.","auth/popup-closed-by-user":"Giri\u015F penceresi kapat\u0131ld\u0131. Tekrar deneyebilirsin.","auth/cancelled-popup-request":"\xD6nceki giri\u015F penceresi h\xE2l\xE2 a\xE7\u0131k. Onu kapat\u0131p tekrar dene.","auth/account-exists-with-different-credential":"Bu e-posta ba\u015Fka bir giri\u015F y\xF6ntemiyle kay\u0131tl\u0131. \xD6nce o y\xF6ntemle giri\u015F yap.","auth/operation-not-supported-in-this-environment":"Bu ortamda sa\u011Flay\u0131c\u0131 giri\u015Fi desteklenmiyor. E-posta/\u015Fifre ile giri\u015F yapmay\u0131 dene.","auth/web-storage-unsupported":"Giri\u015F i\xE7in taray\u0131c\u0131 depolamas\u0131 gerekli. Gizli mod veya WebView k\u0131s\u0131tlamas\u0131 olabilir.","auth/internal-error":"Giri\u015F sa\u011Flay\u0131c\u0131s\u0131 yan\u0131t\u0131 i\u015Flenemedi. Tekrar dene veya e-posta/\u015Fifre kullan.","app/invalid-app-argument":"Firebase uygulama bilgileri e\u015Fle\u015Fmiyor. Web uygulamas\u0131 yap\u0131land\u0131rmas\u0131n\u0131 kontrol et."}[e]||"\u0130\u015Flem tamamlanamad\u0131. Ba\u011Flant\u0131n\u0131 ve Firebase ayarlar\u0131n\u0131 kontrol edip tekrar dene."}function St(n){return st=hy(n),Mt="Ba\u011Flant\u0131 kurulamad\u0131",Ge(),{ok:!1,message:st}}function Fa(){return typeof navigator<"u"&&!navigator.onLine}async function Wf(){let n=++Qe;if(me==null||me(),Ee==null||Ee(),me=null,Ee=null,Vt=null,Te=null,Me=!1,jt=!1,Xs=[],st="",gc=0,An){let e=An;An=null,Fe=null,Zr=null,await hl(e).catch(()=>{})}if(!Qs){Mt="Ba\u011Flant\u0131 yap\u0131land\u0131r\u0131lmad\u0131",Ge();return}try{if(An=Bl(Qs,"sinav-kampi-"+n),Fe=Yl(An),Zr=Uf(An),await ql(Fe,Mo),n!==Qe)return;Mt="Giri\u015F bekleniyor",$l(Fe).catch(e=>{n===Qe&&St(e)}),jl(Fe,async e=>{if(n!==Qe)return;me==null||me(),Ee==null||Ee(),me=null,Ee=null,rr++,Na=!1,sr=!1,Vt=e,Te=(e==null?void 0:e.uid)||null,Xs=[],st="";let t=Te?By()[Te]:null;Me=!!(t!=null&&t.sync),jt=!!(t!=null&&t.leaderboard),Ys=typeof(t==null?void 0:t.nickname)=="string"?t.nickname:"",Mt=Vt?Me?"E\u015Fitleniyor":"Giri\u015F yap\u0131ld\u0131":"Giri\u015F bekleniyor",Ge(),Vt&&(mc(),Ec(),Me&&$s(300))},e=>{n===Qe&&St(e)})}catch(e){n===Qe&&St(e)}}function pc(){return sc(Zr,"users",Te)}function Cc(){return sc(Zr,"leaderboard",Te)}function mc(){if(me==null||me(),!Te||!Me)return;let n=Qe,e=Te;me=zf(pc(),{includeMetadataChanges:!1},t=>{if(!(n!==Qe||e!==Te||!Me)&&!t.metadata.hasPendingWrites)try{let r=t.data();if(r!=null&&r.progress){let s=JSON.parse(r.progress);if(!dy(s))throw Error();let i=nr.mergeStates(bt.getState(),s);bt.applyRemote(i)}t.exists()?(gc=Date.now(),Mt=sr?"De\u011Fi\u015Fiklikler bekliyor":"E\u015Fitlendi"):Mt="\u0130lk bulut kayd\u0131 bekleniyor",st="",Ge(),sr&&$s(500)}catch{st="Bulut kayd\u0131 okunamad\u0131. Yerel ilerlemen korunuyor.",Ge()}},t=>{n===Qe&&St(t)})}function dy(n){return nr.validateSyncPayload(n)}function $s(n=1600,e=!1){let t=JSON.stringify(nr.syncPayload(bt.getState()));!e&&t===$f||($f=t,sr=!0,clearTimeout(fc),Me&&Te&&!Fa()&&(fc=setTimeout(()=>ka(),n)))}function ka(){return vn=Qv().finally(()=>{vn=null}),vn}async function Qv(){if(!Te||!Me)return{ok:!1,message:"\xD6nce giri\u015F yap ve bulut e\u015Fitlemeyi a\xE7."};if(Na)return{ok:!1,message:"E\u015Fitleme zaten s\xFCr\xFCyor."};if(Fa())return Mt="\xC7evrimd\u0131\u015F\u0131 \xB7 cihazda kay\u0131tl\u0131",Ge(),{ok:!1,message:"\u0130nternet yok. \u0130lerlemen bu cihazda korunuyor."};Na=!0,st="",Mt="E\u015Fitleniyor",Ge();let n=Te,e=Qe,t=rr;try{let r=await uy(Zr,async s=>{if(t!==rr||n!==Te||!Me)throw Error("Sync cancelled");let i=await s.get(pc()),a=jt?await s.get(Cc()):null,u=i.data(),c=u!=null&&u.progress?JSON.parse(u.progress):null;if(c&&!dy(c))throw Error("Invalid remote data");let l=nr.syncPayload(nr.mergeStates(bt.getState(),c)),h=JSON.stringify(l);if(h.length>45e4)throw Error("Payload too large");if((u==null?void 0:u.progress)!==h&&s.set(pc(),{progress:h,revision:((u==null?void 0:u.revision)||0)+1,updatedAt:ic()},{merge:!1}),jt){if(!Yf(Ys))throw Error("Invalid nickname");let f=a.data(),C={nickname:Ys,...nr.studyPoints(l)};(!f||Object.keys(C).some(_=>f[_]!==C[_]))&&s.set(Cc(),{...C,updatedAt:ic()},{merge:!1})}return l},{maxAttempts:3});return e!==Qe||n!==Te?{ok:!1,message:"Hesap de\u011Fi\u015Fti."}:(sr=!1,bt.applyRemote(r),$f=JSON.stringify(nr.syncPayload(bt.getState())),gc=Date.now(),Mt="E\u015Fitlendi",JSON.stringify(nr.syncPayload(bt.getState()))!==JSON.stringify(r)&&$s(800,!0),Ge(),{ok:!0,message:"\u0130lerlemen Firebase\u2019e e\u015Fitlendi."})}catch(r){return e===Qe&&(sr=!0,St(r)),{ok:!1,message:st}}finally{e===Qe&&t===rr&&(Na=!1,Ge())}}function Yf(n){return typeof n=="string"&&n.trim().length>=3&&n.trim().length<=20&&/^[\p{L}\p{N} _-]+$/u.test(n.trim())&&!n.includes("@")}function Ec(){if(Ee==null||Ee(),!Te){Xs=[];return}dc=!0,Ge();let n=Qe;Ee=zf(sy(wf(Zr,"leaderboard"),iy("points","desc"),ay(50)),e=>{n===Qe&&(Xs=e.docs.map(t=>({id:t.id,...t.data()})),dc=!1,st="",Ge())},e=>{dc=!1,n===Qe&&St(e)})}async function $v(){return Te?(Ec(),{ok:!0,message:"Skor tablosu yenileniyor."}):{ok:!1,message:"Skor tablosu i\xE7in giri\u015F yap."}}async function Yv(n){return Te?(Me=!!n,Oa(),st="",Me?(mc(),await ka()):(rr++,vn&&await vn.catch(()=>{}),rr++,st="",me==null||me(),me=null,clearTimeout(fc),sr=!1,Mt="Bulut e\u015Fitleme kapal\u0131",Ge(),{ok:!0,message:"Bulut e\u015Fitleme kapat\u0131ld\u0131. Cihaz\u0131ndaki kay\u0131t korunuyor."})):{ok:!1,message:"\xD6nce giri\u015F yap."}}async function Xv(n,e){if(!Te)return{ok:!1,message:"\xD6nce giri\u015F yap."};if(n){if(!Yf(e))return{ok:!1,message:"3\u201320 karakterlik takma ad kullan. Harf, rakam, bo\u015Fluk, _ ve - olabilir; e-posta yazma."};Ys=e.trim(),jt=!0,Me=!0,Oa(),mc(),Ec();let t=await ka();return{...t,message:t.ok?"Skor tablosun ve bulut e\u015Fitlemen a\xE7\u0131ld\u0131.":t.message}}jt=!1,rr++,Oa(),Ee==null||Ee(),Ee=null,vn&&await vn.catch(()=>{});try{return await hc(Cc()),st="",Ge(),{ok:!0,message:"Takma ad\u0131n ve skorun listeden kald\u0131r\u0131ld\u0131."}}catch(t){return jt=!0,Oa(),St(t)}}async function Zv(n){if(!Fe)return{ok:!1,message:"Ba\u011Flant\u0131 haz\u0131r de\u011Fil. Uygulamay\u0131 yeniden a\xE7may\u0131 dene."};if(Xr)return{ok:!1,message:"\xD6nce devam eden giri\u015F i\u015Flemini bekle."};let e=n==="google"?new mr:n==="github"?new Er:null;if(!e)return{ok:!1,message:"Bilinmeyen giri\u015F y\xF6ntemi."};n==="google"&&e.setCustomParameters({prompt:"select_account"}),Xr=!0,st="",Ge();try{return window.AndroidBridge?(await Uo(Fe,e),{ok:!0,message:"Giri\u015F sayfas\u0131na y\xF6nlendiriliyorsun\u2026"}):(await Ql(Fe,e),{ok:!0,message:"Giri\u015F yap\u0131ld\u0131."})}catch(t){if((t==null?void 0:t.code)==="auth/popup-blocked"&&!window.AndroidBridge)try{return await Uo(Fe,e),{ok:!0,message:"Giri\u015F sayfas\u0131na y\xF6nlendiriliyorsun\u2026"}}catch(r){return St(r)}return St(t)}finally{Xr=!1,Ge()}}async function eb(n,e,t){if(Xr)return{ok:!1,message:"\xD6nce devam eden giri\u015F i\u015Flemini bekle."};if(!Fe)return{ok:!1,message:"\xD6nce Firebase ba\u011Flant\u0131 bilgilerini kaydet."};if(typeof e!="string"||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())||e.length>254)return{ok:!1,message:"Ge\xE7erli bir e-posta adresi yaz."};if(typeof t!="string"||t.length<8||t.length>128)return{ok:!1,message:"\u015Eifren 8\u2013128 karakter olmal\u0131."};Xr=!0,st="",Ge();try{return n==="register"?await Ul(Fe,e.trim(),t):await Hl(Fe,e.trim(),t),{ok:!0,message:n==="register"?"Hesab\u0131n olu\u015Fturuldu. Bulut e\u015Fitlemeyi ayr\u0131ca a\xE7abilirsin.":"Giri\u015F yap\u0131ld\u0131."}}catch(r){return St(r)}finally{Xr=!1,Ge()}}async function tb(n){if(!Fe)return{ok:!1,message:"\xD6nce ba\u011Flant\u0131y\u0131 yap\u0131land\u0131r."};if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))return{ok:!1,message:"\xD6nce e-posta alan\u0131na adresini yaz."};try{return await Gl(Fe,n.trim()),{ok:!0,message:"\u015Eifre s\u0131f\u0131rlama e-postas\u0131 g\xF6nderildi. Gelen ve spam kutunu kontrol et."}}catch(e){return St(e)}}async function nb(){if(Fe)try{return Me&&sr&&!Fa()&&await ka(),me==null||me(),Ee==null||Ee(),await Vo(Fe),{ok:!0,message:"\xC7\u0131k\u0131\u015F yap\u0131ld\u0131. Bu cihazdaki \xE7al\u0131\u015Fma kayd\u0131 silinmedi."}}catch(n){return St(n)}}async function rb(n){if(!Vt||!Fe)return{ok:!1,message:"\xD6nce giri\u015F yap."};try{return Fa()?{ok:!1,message:"Hesap silmek i\xE7in internet ba\u011Flant\u0131s\u0131 gerekli."}:(await Ml(Vt,Bn.credential(Vt.email,n)),Me=!1,jt=!1,rr++,Oa(),me==null||me(),Ee==null||Ee(),clearTimeout(fc),vn&&await vn.catch(()=>{}),await hc(pc()),await hc(Cc()),await Kl(Vt),{ok:!0,message:"Hesab\u0131n, bulut kayd\u0131n ve skor tablosu verin silindi. Cihaz\u0131ndaki yerel kay\u0131t duruyor."})}catch(e){return St(e)}}window.KampCloud={init(n){bt=n,Wf(),window.addEventListener("online",()=>{Me&&(mc(),$s(400)),Ec(),Ge()}),window.addEventListener("offline",()=>{Mt="\xC7evrimd\u0131\u015F\u0131 \xB7 cihazda kay\u0131tl\u0131",Ge()}),window.addEventListener("focus",()=>{Me&&$s(1e3)})},configure(n){let e=ly(n);if(!e)return{ok:!1,message:"apiKey ve projectId gerekli. Web App ID bu s\xFCr\xFCmde iste\u011Fe ba\u011Fl\u0131; Android App ID\u2019yi bu alana yazma. Servis hesab\u0131 anahtar\u0131 kullanma."};Qs=e;try{localStorage.setItem(Qf,JSON.stringify(e))}catch{return{ok:!1,message:"Ba\u011Flant\u0131 bilgileri cihazda kaydedilemedi."}}return Wf(),{ok:!0,message:"Firebase bilgileri kaydedildi. \u015Eimdi giri\u015F yapabilirsin."}},async disconnect(){let n=++Qe;return me==null||me(),Ee==null||Ee(),Fe&&await Vo(Fe).catch(()=>{}),An&&await hl(An).catch(()=>{}),An=null,Fe=null,Zr=null,Vt=null,Te=null,Me=!1,jt=!1,Qs={...so},Xs=[],st="",localStorage.removeItem(Qf),Wf(),{ok:!0,message:"Oturum kapat\u0131ld\u0131 ve varsay\u0131lan sinavkam ayarlar\u0131na d\xF6n\xFCld\xFC. Bulut kayd\u0131 silinmedi."}},changed(){$s()},syncNow:ka,enableSync:Yv,enableBoard:Xv,refreshBoard:$v,authenticate:eb,authenticateWithProvider:Zv,resetPassword:tb,logout:nb,removeCloudData:rb,validNickname:Yf,getState(){return{configured:!!Qs,config:Qs,uid:Te,email:(Vt==null?void 0:Vt.email)||"",syncEnabled:Me,boardEnabled:jt,nickname:Ys,status:Mt,error:st,lastSync:gc,busy:Xr,syncing:Na,rows:Xs,boardLoading:dc,online:!Fa()}}};})();
