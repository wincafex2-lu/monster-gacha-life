/* ---------- 戰場 ---------- */
const B={heroes:[],enemies:[],proj:[],fx:[],txt:[],turrets:[],beasts:[],arr:null,arrD:null,spawnQ:[],spawnT:0,total:0,killed:0,state:'run',stateT:0,gateHp:100,gateMax:100,shake:0,hitstop:0,buff:0,speed:1,time:0,boss:null,stageFail:false};
let L={};// layout
function layout(){
 const tk=towerKey(),tm=MAN[tk];if(!tm)return;
 const TS=1.5,tw=tm[0]/2*TS,th=tm[1]/2*TS,tx=20;// 樓閣放大 1.5 倍，人物大小不變，站位不互擋
 const gk=gateKey(false),gm=MAN[gk];const gw=gm[0]/2;
 const gx=tx+tw-gw/3+gw/2;
 L={tk,tx,tw,th,spots:tm[4].map(([sx,sy])=>[tx+sx/2*TS,G-(th-sy/2*TS)]),gk,gx,gw,front:gx+gw/2};
 L.tur=[L.front+38,L.front+118,L.front+198];
 const b0=L.front+100;L.beastXs=[b0,b0+110,b0+220,b0+330];
 // 神獸兩排：會飛的（朱雀、青龍）在上排，地上的（白虎、玄武）在下排
 {let gi=0,fi=0;L.bpos=bTeam().map(k=>BEAST[k]&&BEAST[k].fly?{x:b0+40+140*fi++,y:G-150}:{x:b0+140*gi++,y:G});}
 L.beastX=Math.max(b0,...L.bpos.map(p=>p.x));
 L.arr0=L.front-30;L.arr1=L.beastX+90;L.dX=(L.tx+L.front)/2;L.dR=(L.front-L.tx)/2+10;L.arrR=Math.max(260,(VW-60-L.front)*.25);L.arrX=(L.front+VW-60)/2;// 攻擊陣法：放在山門前到畫面右邊的正中間，半徑是這段的 1/4（最少 260）
 B.heroes.forEach((h,i)=>{const s=L.spots[i];if(s){h.x=s[0];h.y=s[1]}});
 B.turrets.forEach((t,i)=>t.x=L.tur[i]);
 B.beasts.forEach((b,i)=>{const q=L.bpos[i]||{x:L.beastXs[i],y:G};b.x=q.x;b.y=q.y});
 if(B.arr)B.arr.x=L.arrX;
}
function buildField(){
 layout();
 B.heroes=S.team.slice(0,slots()).map((id,i)=>({id,x:L.spots[i][0],y:L.spots[i][1],cd:.5+i*.2,anim:null,charge:0,jump:0}));
 B.turrets=S.turTeam.slice(0,turSlots()).map((k,i)=>({k,x:L.tur[i],cd:.6,anim:0}));
 B.beasts=bTeam().map((k,i)=>({k,x:(L.bpos[i]||{x:L.beastXs[i]}).x,y:(L.bpos[i]||{y:G}).y,cd:1+i*.3,anim:0,charge:0}));
 B.arr=S.arrA&&S.arr[S.arrA]?{k:S.arrA,x:L.arrX,t:0,tick:0,big:0}:null;
 B.arrD=S.arrD&&S.arr[S.arrD]?S.arrD:null;
 calcPassives();B.gateMax=Math.round(gateMax(S.gateLv)*(1+PS.hp));B.gateHp=Math.min(B.gateHp,B.gateMax);
 buildUlts();
}
function startStage(){B.ttN=0;B.twUsed=0;B.twT=0;X.charge=Math.min(X.charge,60);B.shield=0;B.dhUsed=0;B.lotus=0;B.alT=0;B.dmg={};B.dmgT=0;
 const s=curS();B.enemies=[];B.proj=[];B.spawnQ=[];B.zones=[];B.sched=[];B.killed=0;B.boss=null;B.stageFail=false;
 B.gateMax=Math.round(gateMax(S.gateLv)*(1+PS.hp));B.gateHp=B.gateMax;
 const pool=Object.keys(MON).filter(k=>MON[k].from<=s);
 const n=Math.min(s>=30?30:24,5+Math.floor(s*0.6));
 if(s<30){for(let i=0;i<n;i++){
  let k=pool[Math.floor(Math.random()*pool.length)];
  if(i<2&&s<4)k='slime';
  B.spawnQ.push({k,delay:i===0?.6:(.75+Math.random()*.7)*(s>20?.8:1)});
 }}else{// 30 關後：成群衝鋒，40 關後群裡可能有精英（盾怪）
  let left=n,first=true;while(left>0){const g=Math.min(left,3+Math.floor(Math.random()*(2+Math.min(3,Math.floor(s/60)))));const k0=pool[Math.floor(Math.random()*pool.length)];
   const el=s>=40&&Math.random()<Math.min(.3,.15+s/1500);
   for(let j=0;j<g;j++){const k=Math.random()<.6?k0:pool[Math.floor(Math.random()*pool.length)];B.spawnQ.push({k,elite:el&&j===0,delay:j===0?(first?.6:2.2+Math.random()*1.2):.12+Math.random()*.18})}
   left-=g;first=false}}
 if(B.trial)B.spawnQ=[];
 if(B.trial){const pl=Object.keys(MON).filter(k=>MON[k].from<=s);for(let i=0;i<12;i++)B.spawnQ.push({k:pl[Math.floor(Math.random()*pl.length)],elite:i%6===5,delay:i===0?.6:i%3===0?2.5:.2});TRIAL[B.trial.f-1].forEach((k,i)=>B.spawnQ.push({k:'TBEAST',b:k,i,n:TRIAL[B.trial.f-1].length,delay:i?.5:2}))}// 試煉：小怪先衝，神獸 Boss 隨後登場
 else if(B.xf){B.spawnQ=[{k:'XBEAST',delay:1.5}]}
 else if(s%100===0){B.spawnQ.push({k:'DEMON',delay:2.6})}else if(s%10===0){B.spawnQ.push({k:'BOSS',delay:2.2})}
 // 碾壓模式：全隊最弱的一下也能秒殺這關最硬的精英，而且不是 Boss／魔頭關 → 怪一出來就被秒，出怪間隔縮短，推關快很多
 {const mh=Math.max(...pool.map(k=>MON[k].hp))*hpBase(s)*3,hs=S.team.slice(0,slots()).filter(id=>S.roster[id]);
  B.crush=!B.trial&&!B.xf&&s%10!==0&&hs.length&&Math.min(...hs.map(id=>heroAtk(id)*NA))>=mh;if(B.crush)B.spawnQ.forEach(q=>q.delay=.06)}
 B.total=B.spawnQ.length;B.spawnT=0;B.state='run';
 B.heroes.forEach(h=>h.charge=Math.max(h.charge,0));
 banner(B.xf?`上古凶獸　${XB[B.xf.k].n} 出現！`:B.trial?`神獸試煉塔 第 ${B.trial.f} 層　${TRN(B.trial.f)}`:s%100===0?`第 ${s} 關　魔頭降臨！`:s%10===0?`第 ${s} 關　Boss 來襲！`:`第 ${s} 關`,s%10===0);
 updHud();
}
function spawn(q){
 const s=curS();
 if(q.k==='BOSS'){
  const b=BOSS[(Math.floor(s/10)-1)%BOSS.length];const cyc=Math.floor((s/10-1)/BOSS.length);
  const e=mkEnemy(b.k,true);e.n=b.n+(cyc?` ${'ⅡⅢⅣⅤ'[Math.min(3,cyc-1)]}`:'');B.boss=e;
  document.getElementById('bossName').textContent=e.n;document.getElementById('bossBar').style.display='block';SND.play('bossin');SND.setBoss(true);
  shake(8);return;
 }
 if(q.k==='XBEAST'){const k=B.xf.k,e=mkEnemy('bullking',true),m=MAN['x_'+k];e.demon=1;e.xbz=1;e.hp*=30;e.max=e.hp;e.dmg*=2;e.coin*=5;e.c='#ff7aa8';e.sc=1.8;e.flip=1;e.key='x_'+k;e.frames=[e.key,'xa_'+k];e.w=m[0]/2;e.h=m[1]/2;e.ax=m[2]/2;e.ay=m[3]/2;if(XB[k].fly)e.y-=170;e.n='上古凶獸 '+XB[k].n;B.boss=e;document.getElementById('bossName').textContent=e.n;document.getElementById('bossBar').style.display='block';SND.play('bossin');SND.play('L_dragon');SND.setBoss(true);shake(14);return}
 if(q.k==='TBEAST'){const e=mkEnemy('bullking',true),m=MAN['b_'+q.b];e.demon=1;e.hp*=3.5*(q.n>1?.5:1);e.max=e.hp;e.dmg*=1.6/(q.n>1?2:1);e.coin*=3;e.c=BEAST[q.b].fly?'#7ad0ff':'#ffcf4a';e.sc=1.8;e.flip=1;e.key='b_'+q.b;e.frames=[e.key,e.key];e.w=m[0]/2;e.h=m[1]/2;e.ax=m[2]/2;e.ay=m[3]/2;e.stop+=(q.i||0)*120;e.x+=(q.i||0)*90;if(BEAST[q.b].fly)e.y-=170;e.n='試煉 '+BEAST[q.b].n;if(!B.boss||B.boss.dead){B.boss=e;document.getElementById('bossName').textContent=q.n>1?'試煉 '+TRN(B.trial.f):e.n;document.getElementById('bossBar').style.display='block'}SND.play('bossin');SND.setBoss(true);shake(12);return}
 if(q.k==='DEMON'){const n=s/100,d=DEMON[(n-1)%DEMON.length],cyc=Math.floor((n-1)/DEMON.length);
  const e=mkEnemy(d.k,true);e.demon=1;e.sc=1.5;e.hp*=3.5;e.max=e.hp;e.dmg*=1.6;e.coin*=3;e.c=d.c;
  if(MAN['d_'+d.a]){e.sc=0;e.key='d_'+d.a;e.frames=['d_'+d.a+'_windup','d_'+d.a+'_strike'];const mm=MAN[e.key];e.w=mm[0]/2;e.h=mm[1]/2;e.ax=mm[2]/2;e.ay=mm[3]/2}else{e.key=tinted(e.key,d.c);e.frames=e.frames.map(f=>tinted(f,d.c));e.w*=1.5;e.h*=1.5;e.ax*=1.5;e.ay*=1.5}e.n='魔頭 '+d.n+(cyc?` ${'ⅡⅢⅣⅤ'[Math.min(3,cyc-1)]}`:'');B.boss=e;
  document.getElementById('bossName').textContent=e.n;document.getElementById('bossBar').style.display='block';SND.play('bossin');SND.play('L_dragon');SND.setBoss(true);
  shake(16);B.hitstop=.2;return}
 const e=mkEnemy(q.k,false);
 if(q.elite&&!e.fly){e.elite=1;e.sc=1.3;e.c='#ffd84a';e.hp*=3;e.max=e.hp;e.dmg*=2;e.coin*=4;e.w*=1.3;e.h*=1.3;e.ax*=1.3;e.ay*=1.3}
 if(B.crush){e.x=VW*.45+Math.random()*VW*.45;e.crushT=.12+Math.random()*.15}
 else{e.x=VW-110-Math.random()*50;addFx({k:'dust',x:e.x,y:G,life:.45});if(!e.fly)addFx({k:'ring',x:e.x,y:G-30,life:.35,c:'#b48aff',r:80})}// 小怪直接在畫面右邊冒出來，不再從場外走進來
}
function mkEnemy(k,boss){
 const s=curS();const m=boss?{hp:26,spd:26,dmg:4,coin:20,fly:0}:MON[k];
 const hp=hpBase(s)*m.hp;
 const key=boss?'k_'+k:(k==='bat'?'m_bat_0':'m_'+k);
 const e={k,boss,key,x:VW+60+Math.random()*30,y:G+(m.fly?(ZM>1?-200-Math.random()*340:-150-Math.random()*30):(Math.random()*14-7)),hp,max:hp,spd:m.spd*1.35*(0.92+Math.random()*.16),dmg:dmgBase(s)*m.dmg,coin:Math.round(coinKill(s,m.coin)*(1+PS.coin)*TR('coin')),
  fly:!!m.fly,hop:!!m.hop,state:'walk',t:Math.random()*6,at:0,flash:0,stun:0,slow:0,slowT:0,burn:0,dead:0,stop:L.front+6+Math.random()*46+(boss?40:0),kb:0};
 const mm=MAN[key];e.w=mm[0]/2;e.h=mm[1]/2;e.ax=mm[2]/2;e.ay=mm[3]/2;
 e.frames=boss?['k_'+k+'_windup','k_'+k+'_strike']:[1,2,3].map(i=>'m_'+k+'_a'+i).filter(f=>MAN[f]);
 if(!boss&&PS.mx&&PS.mx.pharaoh&&Math.random()<.1){e.goldm=1;e.coin*=5}
 B.enemies.push(e);return e;
}

