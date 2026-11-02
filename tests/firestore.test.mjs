import {initializeTestEnvironment,assertFails,assertSucceeds} from '@firebase/rules-unit-testing';
import {readFileSync} from 'node:fs';
import {doc,getDoc,getDocs,setDoc,updateDoc,deleteDoc,collection,query,orderBy,limit,serverTimestamp} from 'firebase/firestore';
import {after,before,test} from 'node:test';
let env;
const progress=JSON.stringify({version:1,completed:{task:true},hidden:[],customExams:[],history:[],taskUpdatedAt:{task:1},hiddenUpdatedAt:{},deletedExams:{}});
const payload=()=>({progress,revision:1,updatedAt:serverTimestamp()});
const score=()=>({nickname:'Kampçı 6',points:15,completed:1,correct:1,updatedAt:serverTimestamp()});
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-sinav-kampi',firestore:{rules:readFileSync('firestore.rules','utf8'),host:'127.0.0.1',port:8080}});});
after(async()=>{await env?.cleanup();});
test('private records require the owner, never public listing',async()=>{
 await env.withSecurityRulesDisabled(async c=>{await setDoc(doc(c.firestore(),'users/alice'),payload());});
 await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'users/alice')));
 await assertFails(getDoc(doc(env.authenticatedContext('bob').firestore(),'users/alice')));
 await assertSucceeds(getDoc(doc(env.authenticatedContext('alice').firestore(),'users/alice')));
 await assertFails(getDocs(collection(env.authenticatedContext('alice').firestore(),'users')));
});
test('only scoped private progress with server time and monotonic revision can be saved',async()=>{
 await env.withSecurityRulesDisabled(async c=>{await deleteDoc(doc(c.firestore(),'users/alice')).catch(()=>{});});
 const alice=env.authenticatedContext('alice').firestore(),bob=env.authenticatedContext('bob').firestore();
 await assertFails(setDoc(doc(bob,'users/alice'),payload()));
 await assertSucceeds(setDoc(doc(alice,'users/alice'),payload()));
 await assertFails(setDoc(doc(alice,'users/alice'),{...payload(),revision:1}));
 await assertFails(setDoc(doc(alice,'users/alice'),{...payload(),revision:3}));
 await assertFails(setDoc(doc(alice,'users/alice'),{...payload(),revision:2,email:'private@example.com'}));
 await assertFails(setDoc(doc(alice,'users/alice'),{...payload(),revision:2,updatedAt:new Date()}));
 await assertFails(setDoc(doc(alice,'users/alice'),{...payload(),revision:2,progress:'x'.repeat(450001)}));
 await assertSucceeds(setDoc(doc(alice,'users/alice'),{...payload(),revision:2}));
});
test('leaderboard is opt-in data, readable only after sign-in',async()=>{
 await assertFails(getDocs(collection(env.unauthenticatedContext().firestore(),'leaderboard')));
 await assertSucceeds(getDocs(query(collection(env.authenticatedContext('bob').firestore(),'leaderboard'),orderBy('points','desc'),limit(50))));
});
test('only own bounded, correctly calculated score without email is accepted',async()=>{
 const alice=env.authenticatedContext('alice').firestore(),bob=env.authenticatedContext('bob').firestore();
 await assertFails(setDoc(doc(bob,'leaderboard/alice'),score()));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),points:100001}));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),points:16}));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),nickname:'a@b.com'}));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),email:'private@example.com'}));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),nickname:'x'}));
 await assertFails(setDoc(doc(alice,'leaderboard/alice'),{...score(),points:-5,completed:-1}));
 await assertSucceeds(setDoc(doc(alice,'leaderboard/alice'),score()));
 await assertSucceeds(updateDoc(doc(alice,'leaderboard/alice'),{points:25,completed:3,updatedAt:serverTimestamp()}));
 await assertFails(updateDoc(doc(bob,'leaderboard/alice'),{points:35,completed:5,updatedAt:serverTimestamp()}));
 await assertSucceeds(deleteDoc(doc(alice,'leaderboard/alice')));
});
test('unknown collections fail closed and users can delete their private record',async()=>{
 const alice=env.authenticatedContext('alice').firestore();
 await assertFails(setDoc(doc(alice,'admin/root'),{value:1}));
 await assertFails(getDocs(collection(alice,'settings')));
 await assertSucceeds(deleteDoc(doc(alice,'users/alice')));
});
