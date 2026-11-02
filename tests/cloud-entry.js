import '../src/cloud.js';
import {getApps} from 'firebase/app';
import {getAuth,connectAuthEmulator} from 'firebase/auth';
import {getFirestore,connectFirestoreEmulator} from 'firebase/firestore';
window.__connectTestEmulators=()=>{
 const app=getApps().find(a=>a.name.startsWith('sinav-kampi-'));
 connectAuthEmulator(getAuth(app),'http://127.0.0.1:9099',{disableWarnings:true});
 connectFirestoreEmulator(getFirestore(app),'127.0.0.1',8080);
};
