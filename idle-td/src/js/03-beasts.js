// 神獸光環（上陣就有效，神獸等級越高越強）、大招、陣法搭配
const BAURA={baihu:{k:'crit',v:.10,t:'全隊爆擊率'},qinglong:{k:'charge',v:.15,t:'全隊大招充能'},zhuque:{k:'coin',v:.20,t:'打怪銅錢'},xuanwu:{k:'hp',v:.20,t:'山門血量'},qilin:{k:'ultm',v:.5,t:'全隊大招傷害'},baize:{k:'critd',v:.5,t:'全隊爆擊傷害'},tengshe:{k:'ctrl',v:.5,t:'被控住（暈、慢、迷路）的怪受傷'},bifang:{k:'burnm',v:1,t:'全隊燒傷傷害'}};
// 神獸每 50 級多一個效果（Lv50／100／150／200 共 4 個），超過 200 級後每 50 級全部效果再升一級（每級 +50%）
const P1=v=>`+${Math.round(v*100)}%`,P2=v=>`+${(v*100).toFixed(1)}%`;
const BFX={baihu:[{k:'front',v:.15,t:'近戰・坦克傷害',f:P1},{k:'atk',v:.08,t:'全隊攻擊',f:P1},{k:'bind',v:.03,t:'普攻定身 1 秒機率',f:P1},{k:'boss',v:.15,t:'打 Boss・魔頭傷害',f:P1}],
 qinglong:[{k:'back',v:.15,t:'遠程・法術傷害',f:P1},{k:'spd',v:.08,t:'全隊攻擊速度',f:P1},{k:'seal',v:.5,t:'每 12 秒天雷打全場（平均攻擊 ×',f:v=>`${(3*v).toFixed(1)}）`},{k:'charge',v:.10,t:'全隊大招充能',f:P1}],
 zhuque:[{k:'coin',v:.15,t:'打怪銅錢',f:P1},{k:'atk',v:.08,t:'全隊攻擊',f:P1},{k:'back',v:.15,t:'遠程・法術傷害',f:P1},{k:'cap',v:.015,t:'普攻直接燒掉小怪機率',f:P2}],
 xuanwu:[{k:'dr',v:.05,t:'山門受傷減少',f:P1},{k:'regen',v:.005,t:'山門每秒回血',f:P2},{k:'mslow',v:.06,t:'怪物走路變慢',f:P1},{k:'hp',v:.20,t:'山門血量',f:P1}],
 qilin:[{k:'ultm',v:.15,t:'全隊大招傷害',f:P1},{k:'bdmg',v:.2,t:'神獸傷害',f:P1},{k:'regen',v:.003,t:'山門每秒回血',f:P2},{k:'charge',v:.1,t:'全隊大招充能',f:P1}],
 baize:[{k:'critd',v:.2,t:'全隊爆擊傷害',f:P1},{k:'elite',v:.2,t:'打精英怪傷害',f:P1},{k:'crit',v:.05,t:'全隊爆擊率',f:P1},{k:'boss',v:.15,t:'打 Boss・魔頭傷害',f:P1}],
 tengshe:[{k:'ctrl',v:.15,t:'被控住的怪受傷',f:P1},{k:'mslow',v:.05,t:'怪物走路變慢',f:P1},{k:'bind',v:.03,t:'普攻定身 1 秒機率',f:P1},{k:'flyd',v:.2,t:'打飛行怪傷害',f:P1}],
 bifang:[{k:'burnm',v:.2,t:'全隊燒傷傷害',f:P1},{k:'burnc',v:.05,t:'普攻點燃機率',f:P1},{k:'atk',v:.08,t:'全隊攻擊',f:P1},{k:'burnv',v:.1,t:'燒傷中的怪受全隊傷害',f:P1}]};
// 神獸改成碎片升星（泓 2026-11-06）：1～10 星，每升一星只加一項：2～5 星先開 4 個加成效果，6～10 星大招各升一級
// 星數上限 30（泓：反正要慢慢抽、跟人物搶靈石）；第 n 星要的碎片
const B_MAX=30,B_FXAT=[2,3,4,5],B_BRK=20,B_BRKMAX=0,B_STAR=[0,100,30,40,60,80,100,130,160,200,250].concat(Array.from({length:20},(_,i)=>300+50*i));
// 神獸召喚分兩個系列池
const CODES={'封神降臨':{k:'fengshen',n:'封神系列'},'山海現世':{k:'shanhai',n:'山海經神獸'},'凶獸出世':{k:'xiong',n:'上古凶獸'},'測試跳關':{k:'jump',n:'跳關按鈕'}},unl=k=>!!(S.unl&&S.unl[k]);
const BSER={sishen:{n:'四神獸',ks:['baihu','qinglong','zhuque','xuanwu']},shanhai:{n:'山海經神獸',ks:['qilin','baize','tengshe','bifang']}};
const bTeamHas=k=>S.beastTeam.slice(0,beastSlots()).includes(k)&&!!S.beast[k],wufang=()=>bTeamHas('qilin')&&['baihu','qinglong','zhuque','xuanwu'].every(bTeamHas);
const RES=[{n:'五方神獸齊聚',ks:['qilin','baihu','qinglong','zhuque','xuanwu'],d:'麒麟坐鎮中央、四神獸守四方：全部神獸傷害 ×3，四神獸光環 ×2（要 5 格神獸欄）',on:()=>wufang()},{n:'龜蛇合體',ks:['tengshe','xuanwu'],d:'玄甲護盾期間起霧，小怪迷路往回走',on:()=>bTeamHas('tengshe')&&bTeamHas('xuanwu')},{n:'洞悉萬物',ks:['baize'],hero:'archer',d:'白澤標記的怪，星弓少女的星隕一擊必定觸發',on:()=>bTeamHas('baize')&&S.team.slice(0,slots()).includes('archer')},{n:'雙火鳥',ks:['bifang','zhuque'],d:'朱雀火雨時畢方一起降天火，燒傷 ×2',on:()=>bTeamHas('bifang')&&bTeamHas('zhuque')}];
const bSt=k=>S.beast[k]?S.beast[k].st||1:0;
const bFxN=k=>B_FXAT.filter(x=>bSt(k)>=x).length;
const bFxLv=(k,i)=>{const st=bSt(k);let n=1;for(let x=6;x<=Math.min(st,15);x++)if((x-6)%4===i)n++;return n},bUlv=k=>Math.max(1,bSt(k)-14);
const bFxV=(k,i)=>BFX[k][i].v*(1+.5*(bFxLv(k,i)-1));
// 上古凶獸（兌換碼「凶獸出世」）：300 關後每過一關 2% 遭遇，打贏丟葫蘆收服（25%，沒收到下次 +25%）；重複打贏 +1 星（最多 10 星：1～5 星光環變強、6～10 星大招升級）；葫蘆欄 1 格，不佔神獸欄
const XB={taotie:{n:'饕餮',atk:30,rate:.6,d:'大嘴貪吃，見什麼吞什麼',a:v=>`每 6 秒吞掉最前面血最少的一隻小怪（不吞 Boss），每吞一隻本關全隊傷害 +${Math.round(v*2)}%（最多 +100%）`,u:'吞天',ud:'吸進全場血量 20% 以下的小怪，Boss 受饕餮攻擊 ×30'},
 qiongqi:{n:'窮奇',atk:30,rate:.7,fly:1,d:'長翅膀的凶虎，專挑大的打',a:v=>`全隊打飛行怪和 Boss・魔頭的傷害 ×${+(1+v).toFixed(2)}`,u:'凶翼撲殺',ud:'俯衝血最多的敵人，窮奇攻擊 ×50'},
 taowu:{n:'檮杌',atk:26,rate:.5,d:'頑固不倒的老山豬',a:v=>`山門血量低於 50% 時全隊傷害 ×${+(1+.5*v).toFixed(2)}；每關一次山門快破時 5 秒血量不會低於 1`,u:'頑石鎮門',ud:'全場小怪擊退並暈 3 秒'},
 hundun:{n:'混沌',atk:24,rate:.6,d:'沒有臉的一團毛球，誰都分不清',a:v=>`每 10 秒讓 ${Math.min(3,Math.floor(v))} 隻小怪混亂 4 秒，轉頭打旁邊的怪`,u:'混沌之霧',ud:'6 秒內一半的小怪混亂互打'}};
const xSt=k=>(S.xb&&S.xb[k]&&S.xb[k].st)||0,xAv=k=>1+.5*(Math.min(5,Math.max(1,xSt(k)))-1),xUl=k=>Math.max(1,xSt(k)-4),xOnK=k=>unl('xiong')&&S.xOn===k&&xSt(k)>0,xCur=()=>unl('xiong')&&S.xOn&&xSt(S.xOn)>0?S.xOn:null;
const xAtk=k=>teamAvgAtk()*XB[k].atk/10*(1+.5*(xSt(k)-1))*(1+(PS.bdmg||0));
const xCap=k=>Math.min(1,.25*(1+((S.xMiss||{})[k]||0)));
const X={cd:1,charge:0,pz:0,tgt:null,hd:0,ttT:6,hdT:10};
function xDevour(e){if(!e||e.dead||e.boss)return;const[gx,gy]=gourdPos();addFx({k:'xsuck',key:e.key,x0:e.x,y0:e.y-e.ay*.5,x1:gx,y1:gy,life:.6,sc:.6});hit(e,e.hp*1.01+1,{c:'#ff5a3a',small:1,src:'x:taotie',nodps:1});B.ttN=Math.min(50/xAv('taotie'),(B.ttN||0)+1)}
function xUpd(dt){
 if(B.xenc){B.xenc.t-=dt;const b=$('xBtn');if(B.xenc.t<=0||B.trial||B.xf){B.xenc=null;b.style.display='none'}else{const tx=`⚠ 上古凶獸「${XB[B.xenc.k].n}」出沒！點我挑戰（${Math.ceil(B.xenc.t)}）`;if(b.textContent!==tx)b.textContent=tx;b.style.display='block'}}
 if(B.xf&&B.state==='run'){B.xf.t+=dt;const left=Math.max(0,90-B.xf.t),tx=`上古凶獸 ${XB[B.xf.k].n}（剩 ${Math.ceil(left)} 秒）`,el=$('bossName');if(el.textContent!==tx)el.textContent=tx;if(left<=0){xEnd(false);return}}
 if(B.twT>0)B.twT-=dt;
 const k=xCur();if(!k||B.state!=='run')return;DSRC='x:'+k;
 const T=B.enemies.filter(e=>!e.dead&&e.x<VW-60);
 if(X.pz>0){const o=X.pz;X.pz-=dt;if(o>.25&&X.pz<=.25&&X.tgt&&!X.tgt.dead){const e=X.tgt,a=xAtk(k);
  if(k==='taotie'){hit(e,a*1.3,{c:'#ff8a3a'})}else if(k==='qiongqi'){hit(e,a*(e.boss||e.fly?1.5:1),{c:'#c08aff'})}else if(k==='taowu'){B.enemies.forEach(o=>{if(!o.dead&&Math.abs(o.x-e.x)<100)hit(o,a,{c:'#d8b88a',kb:40})});addFx({k:'dust',x:e.x,y:G,life:.4})}else{hit(e,a,{c:'#8a7aff'});if(!e.boss&&Math.random()<.25){e.xcz=Math.max(e.xcz||0,2);e.conf=Math.max(e.conf||0,2)}}
  addFx({k:'ring',x:e.x,y:e.y-e.ay*.5,life:.35,c:{taotie:'#ff8a3a',qiongqi:'#c08aff',taowu:'#d8b88a',hundun:'#8a7aff'}[k],r:80});if(k==='qiongqi'&&MAN.xu_qiongqi)addFx({k:'xslash',x:e.x,y:e.y-e.ay*.5,life:.3});shake(3)}}
 X.cd-=dt;if(X.cd<=0&&T.length&&X.pz<=0){X.cd=1/(XB[k].rate*(1+spdBonus()));X.tgt=k==='qiongqi'?T.slice().sort((p,q)=>(q.boss-p.boss)||(q.hp-p.hp))[0]:T.slice().sort((p,q)=>p.x-q.x)[0];X.pz=.5}
 if(k==='taotie'){X.ttT-=dt;if(X.ttT<=0){X.ttT=6;const c=T.filter(e=>!e.boss).sort((p,q)=>p.x-q.x).slice(0,5).sort((p,q)=>p.hp-q.hp)[0];if(c){xDevour(c);B.txt.push({x:c.x,y:G-200,v:'吞！',t:0})}}}
 if(k==='hundun'){X.hdT-=dt;if(X.hdT<=0){X.hdT=10;T.filter(e=>!e.boss).sort(()=>Math.random()-.5).slice(0,Math.min(3,Math.floor(xAv(k)))).forEach(e=>{e.xcz=4;e.conf=Math.max(e.conf||0,4);addFx({k:'ring',x:e.x,y:e.y-e.ay*.5,life:.5,c:'#8a7aff',r:70})})}}
 X.hd-=dt;if(X.hd<=0){X.hd=.5;const a=xAtk('hundun')*.6;for(const e of T)if(e.xcz>0){e.xcz-=.5;B.enemies.forEach(o=>{if(o!==e&&!o.dead&&Math.abs(o.x-e.x)<120)hit(o,a,{c:'#b0a0ff',small:1,src:'x:hundun'})})}}
 X.charge=Math.min(100,X.charge+dt*100/26*(1+PS.charge));if(X.charge>=100&&T.length)xUlt(k);DSRC='etc'}
function xUlt(k){X.charge=0;DSRC='x:'+k;const u=1+.5*(xUl(k)-1),a=xAtk(k)*u,al=()=>B.enemies.filter(e=>!e.dead&&e.x<VW-60);SND.play('ult','magic');
 {const o=xLay();shout(o.x,o.y-o.mh-24,XB[k].u,'#ff7aa8')}shake(10);B.hitstop=.08;
 if(MAN['xu_'+k]){const o=xLay();addFx({k:'bult',key:'xu_'+k,life:1.2,ox:o.x+o.hw,oy:o.y-o.mh*.5,fly:k==='qiongqi'})};
 if(k==='taotie'){al().forEach(e=>{if(e.boss)hit(e,a*30,{c:'#ff5a3a',big:1});else if(e.hp<e.max*.2)xDevour(e);else hit(e,a*2,{c:'#ff8a3a',big:1})})}
 else if(k==='qiongqi'){const e=al().sort((p,q)=>q.hp-p.hp)[0];if(e){hit(e,a*50,{c:'#c08aff',big:1});addFx({k:'ring',x:e.x,y:e.y-e.ay*.5,life:.6,c:'#c08aff',r:220})}}
 else if(k==='taowu'){al().forEach(e=>{hit(e,a*5,{c:'#d8b88a',kb:160,big:1});if(!e.boss)e.stun=Math.max(e.stun,3)});shake(14)}
 else{const T=al().filter(e=>!e.boss).sort(()=>Math.random()-.5);T.slice(0,Math.ceil(T.length/2)).forEach(e=>{e.xcz=6;e.conf=Math.max(e.conf||0,6)});al().forEach(e=>hit(e,a*3,{c:'#8a7aff',big:1}))}
 DSRC='etc'}
function xLay(){const k=xCur(),m=k&&MAN['x_'+k],sc=.85,hw=m?m[0]*.25*sc:90,mh=m?m[1]*.5*sc:150,t=B.time;
 const x=L.gx+70+hw,y=G-(ZM>1?570:455)+Math.sin(t*2.2)*6;return {k,m,sc,hw,mh,x,y,gx:x-hw*1.5+Math.sin(t*.9)*4,gy:y-mh*1.4+Math.sin(t*1.5)*5}}
function gourdPos(){const o=xLay();return [o.gx,o.gy]}
function xDraw(){
 if(!unl('xiong')||!Object.keys(S.xb||{}).length)return;const o=xLay(),k=o.k,t=B.time,gx=o.gx,gy=o.gy;
 // 葫蘆在凶獸左上方，口朝右下倒出仙煙，凶獸踩在煙上
 const th=k?1.99+Math.sin(t*1.2)*.06:Math.sin(t*1.2)*.1,mx=gx+Math.sin(th)*26,my=gy-Math.cos(th)*26;
 ctx.save();{const full=k&&X.charge>=95,ga=k?.2+.35*X.charge/100+(full?.25*Math.sin(t*10):0):.2;const gr=ctx.createRadialGradient(gx,gy,4,gx,gy,56);gr.addColorStop(0,`rgba(255,236,160,${ga})`);gr.addColorStop(1,'rgba(255,220,120,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(gx,gy,56,0,7);ctx.fill()}
 ctx.restore();
 if(k&&o.m){let key='x_'+k,sc=o.sc,x=o.x,y=o.y;const m=o.m,hw=o.hw;
  if(X.pz>0){const q=Math.sin(Math.PI*(1-X.pz/.5));x+=46*q;y-=10*q;key='xa_'+k;sc+=.08*q}
  // 仙煙（卡通描邊）：從葫蘆口順著口的方向倒出，彎到凶獸身後，流到腳下聚成一朵祥雲；整條煙一起描邊、裡面有往前流的鼓包
  const P0x=mx,P0y=my,D=Math.max(60,Math.hypot(x-mx,y-my)*.55),P1x=mx+Math.sin(th)*D,P1y=my-Math.cos(th)*D,P2x=x-hw*1.05,P2y=y-o.mh*.15,P3x=x-hw*.35,P3y=y+2;
  const P=u=>{const v=1-u;return [v*v*v*P0x+3*v*v*u*P1x+3*v*u*u*P2x+u*u*u*P3x,v*v*v*P0y+3*v*v*u*P1y+3*v*u*u*P2y+u*u*u*P3y]};
  const C=[];for(let i=0;i<=60;i++){const u=i/60,[px,py]=P(u);C.push([px,py,5+u*hw*.3+(2+u*6)*Math.max(0,Math.sin(u*22-t*7))])}
  for(let i=0;i<6;i++){const f2=i/5-.5;C.push([x+f2*hw*1.7+Math.sin(t*1.3+i)*4,y+6+Math.sin(t*1.7+i*2)*3-(i%2)*8,hw*.22+6*Math.sin(t*2+i*1.9)+(i===2||i===3?8:0)])}
  ctx.save();ctx.globalAlpha=.95;ctx.fillStyle='#7a52c8';for(const[cx2,cy2,rr]of C){ctx.beginPath();ctx.arc(cx2,cy2,rr+3.5,0,7);ctx.fill()}
  ctx.fillStyle='#e6dcff';for(const[cx2,cy2,rr]of C){ctx.beginPath();ctx.arc(cx2,cy2,rr,0,7);ctx.fill()}
  ctx.fillStyle='#ffffff';for(const[cx2,cy2,rr]of C){if(rr<5)continue;ctx.beginPath();ctx.arc(cx2-rr*.25,cy2-rr*.3,rr*.45,0,7);ctx.fill()}
  // 小捲雲：沿著煙往前飄的漩渦
  ctx.strokeStyle='#7a52c8';ctx.lineWidth=2.5;for(let i=0;i<3;i++){const u=(t*.35+i/3)%1;if(u<.12||u>.85)continue;const[px,py]=P(u),rr=4+u*hw*.12;ctx.globalAlpha=Math.min(1,(u-.12)*8,(.85-u)*8);ctx.beginPath();ctx.arc(px,py-rr*.2,rr*.55,Math.PI*.2+t*3,Math.PI*1.9+t*3);ctx.stroke()}
  ctx.restore();drawSprite(key,x,XB[k].fly?y-m[1]*.25*sc:y,{sx:sc,sy:sc})}
 drawSprite(k?'g_open':'g_closed',gx,gy,{rot:th,sx:.45,sy:.45})}
function xOffer(k){if(!unl('xiong')||B.trial||B.xf)return;B.xenc={k:k||Object.keys(XB)[Math.floor(Math.random()*4)],t:60}}
function xStart(){if(!B.xenc||B.trial||B.xf)return;B.xf={k:B.xenc.k,t:0};B.xenc=null;$('xBtn').style.display='none';closePanel();startStage()}
function xEnd(win){const k=B.xf.k,d=XB[k];B.state=win?'win':'lose';B.stateT=0;const boss=B.enemies.find(e=>e.xbz);const bx=boss?boss.x:VW*.7,by=boss?boss.y-boss.ay*.5:G-150;B.enemies.forEach(e=>{if(!e.dead)e.dead=.001});document.getElementById('bossBar').style.display='none';SND.setBoss(false);
 S.xb=S.xb||{};S.xMiss=S.xMiss||{};
 if(win){SND.play('win');const[gx,gy]=gourdPos();
  if(S.xb[k]){if(S.xb[k].st<10){S.xb[k].st++;toast(`收服成功！${d.n} 升到 ${S.xb[k].st} 星　${S.xb[k].st<=5?'光環變強':'大招升到 Lv'+xUl(k)}`)}else{S.gem+=500;toast(`${d.n} 已經 10 星，換成 500 靈石`)}addFx({k:'xsuck',key:'x_'+k,x0:bx,y0:by,x1:gx,y1:gy,life:1.4,sc:1.8});banner(`收服 ${d.n}！`)}
  else if(Math.random()<xCap(k)){S.xb[k]={st:1};S.xMiss[k]=0;if(!S.xOn)S.xOn=k;addFx({k:'xsuck',key:'x_'+k,x0:bx,y0:by,x1:gx,y1:gy,life:1.4,sc:1.8});banner(`收服 ${d.n}！`);toast(`葫蘆收服了上古凶獸 ${d.n}！到山門・神獸頁可以派出`)}
  else{S.xMiss[k]=(S.xMiss[k]||0)+1;banner(`${d.n} 逃走了…`);toast(`打贏了，可是葫蘆沒收住 ${d.n}。下次遇到收服機率 ${Math.round(xCap(k)*100)}%`)}}
 else{banner(`${d.n} 跑掉了…`,true);SND.play('lose');toast('沒打倒凶獸，牠跑掉了。打輸不會掉關')}
 B.xf=null;persist();updHud()}
const bAuraV=k=>BAURA[k].v*(1+.5*(Math.min(5,Math.max(1,bSt(k)))-1))*(!BEAST[k].sh&&wufang()?2:1);
const BULT={baihu:{n:'虎嘯山林',d:'全場地上的怪物被震退、暈 1.5 秒',r:'melee'},qinglong:{n:'青龍雷暴',d:'2 秒內落下 10 道雷',r:'magic'},zhuque:{n:'朱雀火雨',d:'全場怪物受傷並燒傷 5 秒',r:'ranged'},xuanwu:{n:'玄甲護盾',d:'山門 4 秒不受傷，回血 10%',r:'support'},qilin:{n:'祥雲降瑞',d:'8 秒內全隊所有傷害 ×2，山門回血 30%',r:'support'},baize:{n:'萬妖圖鑑',d:'全場標記 6 秒，受全隊傷害 ×2（Boss ×3）',r:'magic'},tengshe:{n:'騰雲駕霧',d:'全場起大霧 6 秒：小怪迷路往回走，霧裡的怪受傷 ×1.5',r:'magic'},bifang:{n:'畢方天火',d:'天火落滿全場：全部受傷並燒傷 5 秒',r:'ranged'}};
const PAIR={baihu:'a_sword',qinglong:'a_thunder',zhuque:'a_fire',xuanwu:'d_gold'};
const paired=k=>!!PAIR[k]&&S.beastTeam.includes(k)&&(S.arrA===PAIR[k]||S.arrD===PAIR[k])&&S.beastTeam.indexOf(k)<beastSlots();
const arrPaired=a=>Object.keys(PAIR).some(k=>PAIR[k]===a&&paired(k));
const BEAST_SLOT=[[1,1],[15,2],[30,3],[45,4]];
const beastSlots=()=>{let n=0;for(const[l,c]of BEAST_SLOT)if(S.gateLv>=l)n=c;return n+(S.slot5?1:0)};
const bTeam=()=>S.beastTeam.slice(0,beastSlots());
const curS=()=>B.trial?B.trial.f*100:S.stage;
// 神獸試煉塔：弟子照常上場，神獸當 Boss，第 n 層 ≈ 第 100n 關魔頭；10 層通關開第 5 格神獸欄
const TRIAL=[['baihu'],['qinglong'],['zhuque'],['xuanwu'],['qilin'],['baize'],['tengshe'],['bifang'],['baihu','qinglong','zhuque','xuanwu'],['qilin','baize','tengshe','bifang']];
const TRN=f=>f===9?'四聖獸':f===10?'上古四神獸':(BEAST[TRIAL[f-1][0]]||{n:'山海經神獸'}).n;
const trOpen=f=>TRIAL[f-1].every(k=>BEAST[k]&&(!BEAST[k].sh||unl('shanhai')));
const trDone=f=>!!(S.trDone&&S.trDone[f]),trCnt=()=>TRIAL.filter((x,i)=>trDone(i+1)).length;
const trCan=f=>trOpen(f)&&TRIAL.every((x,i)=>i+1>=f||!trOpen(i+1)||trDone(i+1));
