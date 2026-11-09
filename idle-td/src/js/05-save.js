/* ---------- 存檔 ---------- */
const SKEY='idle-td-save-v1';
function fresh(){return{v:1,coin:30,gem:100,stone:0,pill:0,gateLv:1,stage:1,best:0,pull:0,pityR:0,pityE:0,pityL:0,
 roster:{disciple:{lv:1,tier:1,dup:0}},team:['disciple'],tur:{},turTeam:[],arr:{},arrA:null,arrD:null,beast:{},beastTeam:[],train:{atk:0,hp:0,coin:0,ult:0},gpull:0,seen:Date.now(),firstGacha:true}}
let S;
try{S=JSON.parse(localStorage.getItem(SKEY)||'null')}catch(e){S=null}
if(!S||S.v!==1)S=fresh();
// 舊存檔補欄位
S.train=Object.assign({atk:0,hp:0,coin:0,ult:0},S.train||{});S.arr=S.arr||{};S.beast=S.beast||{};for(const k in S.beast){const b=S.beast[k];if(!b.st){b.st=Math.min(B_MAX,1+Math.floor((b.lv||1)/50))}}S.bfr=S.bfr||{};S.bpull=S.bpull||0;
if(S.arrA===undefined){S.arrA=S.arrOn||null;S.arrD=null}
if(!S.beastTeam){S.beastTeam=S.beastOn?[S.beastOn]:[]}
S.gpull=S.gpull||0;S.fb=S.fb||{};S.fbOn=S.fbOn||[];if(!S.turRef){let c=0;for(const k in (S.tur||{}))c+=14*(Math.pow(1.13,(S.tur[k].lv||1)-1)-1)/.13;S.coin+=Math.round(c);S.turRef=1;S.turTeam=[]}// 塔移除：升級花的銅錢退回
let wiped=false;
function persist(){if(wiped)return;S.seen=Date.now();try{localStorage.setItem(SKEY,JSON.stringify(S))}catch(e){}}
setInterval(persist,5000);
document.addEventListener('visibilitychange',()=>{if(document.hidden)persist();else offline()});

