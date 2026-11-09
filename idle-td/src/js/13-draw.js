/* ---------- 特效 ---------- */
function addFx(f){if(B.fx.length>140)return;if(f.upd)f.src=DSRC;B.fx.push(f)}
let sprN=0;function sprFx(pre,x,y,sc){if(!pre||!MAN[pre+'_0'])return;let n=0;for(const f of B.fx)if(f.k==='spr')n++;if(n>26)return;addFx({k:'spr',pre,n:4,x,y,sc:sc||1,life:.34})}
function ultFx(pre,x,y,sc,delay){addFx({k:'ult',pre,x,y,sc:sc||1,delay:delay||0,life:1+(delay||0)})}
const SHAKE_ON=false;// 泓：技能畫面震動先取消（會讓人以為卡畫面）
function shake(a){if(SHAKE_ON)B.shake=Math.max(B.shake,a)}
function dmgText(x,y,v,big,crit){if(B.txt.length>14){const i=B.txt.findIndex(q=>!q.shout);if(i>=0)B.txt.splice(i,1)}B.txt.push({x,y,v:(crit?'爆擊 ':'')+fmt(Math.max(1,v)),t:0,big,crit})}
function coinText(e){B.txt.push({x:e.x,y:e.y-e.ay-24,v:'+'+fmt(e.coin),t:0,coin:1})}

/* ---------- 繪圖 ---------- */
let SKY='#7fd0f2';const SKYS={};const BGS=['bg_meadow','bg_bamboo','bg_nightwood'];const curBg=()=>BGS[Math.floor((Math.max(1,S.stage)-1)/50)%3];
function img(k){return IMG[k]}
function heroScale(){if(L._hsSp===L.spots)return L._hs;let d=999;const sp=L.spots||[];for(const a of sp)for(const b of sp)if(a!==b&&Math.abs(a[1]-b[1])<20)d=Math.min(d,Math.abs(a[0]-b[0]));L._hsSp=sp;L._hs=Math.max(.75,Math.min(1,d/160));return L._hs}
// 每個站位能用的寬度：同一層最近的鄰居距離 ×1.12（最多 112）
function spotW(x,y){let d=999;for(const [sx,sy] of (L.spots||[]))if(Math.abs(sy-y)<20&&Math.abs(sx-x)>1)d=Math.min(d,Math.abs(sx-x));return Math.min(112,d*1.12)}
function drawSprite(k,x,y,o={}){const m=MAN[k],im=IMG[k];if(!m||!im)return;const w=m[0]/2,h=m[1]/2,ax=m[2]/2,ay=m[3]/2;
 ctx.save();ctx.translate(x+(o.dx||0),y+(o.dy||0));if(o.rot)ctx.rotate(o.rot);ctx.scale(o.sx||1,o.sy||1);
 if(o.alpha!=null)ctx.globalAlpha=o.alpha;
 if(o.spin){ctx.translate(0,-h*.45);ctx.rotate(o.spin);ctx.translate(0,h*.45)}
 ctx.drawImage(im,-ax,-ay,w,h);
 if(o.flash){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=o.flash;ctx.drawImage(im,-ax,-ay,w,h)}
 if(o.tint){ctx.globalCompositeOperation='source-atop';}
 ctx.restore()}
function shadow(x,y,w,a=.22){ctx.fillStyle=`rgba(40,30,10,${a})`;ctx.beginPath();ctx.ellipse(x,y,w,w*.18,0,0,Math.PI*2);ctx.fill()}
const ease=x=>1-Math.pow(1-x,3);
function draw(real){if((B.bfT=(B.bfT||0)+1)%10===0)renderBuffs();
 ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=SKYS[curBg()]||SKY;ctx.fillRect(0,0,cv.width,cv.height);
 const k=SC*DPR;let sx=0,sy=0;if(B.shake>0){sx=(Math.random()-.5)*B.shake;sy=(Math.random()-.5)*B.shake}
 ctx.setTransform(k,0,0,k,sx*k,(-TOPY+sy)*k);
 // 背景
 const bg=IMG[curBg()]||IMG.bg_meadow,bw=1536*ZM,bh=1024*ZM,by=G-G*ZM;for(let x=0,i=0;x<VW+10;x+=bw,i++){if(i%2){ctx.save();ctx.translate(x+bw,0);ctx.scale(-1,1);ctx.drawImage(bg,0,by,bw,bh);ctx.restore()}else ctx.drawImage(bg,x,by,bw,bh)}// 縮小模式：背景放大 ×2、地平線對齊，只有人物怪物變小
 // 陣法
 if(B.arr){const a=B.arr,c=ARR[a.k].c;const pul=.75+.25*Math.sin(B.time*4);
  ctx.save();ctx.globalAlpha=.85;{const f=L.arrR*2/(MAN['g_'+a.k][0]/2);drawSprite('g_'+a.k,a.x,G+4,{sx:f,sy:f*.36})}ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';const gr=ctx.createRadialGradient(a.x,G+4,20,a.x,G+4,L.arrR*1.1);gr.addColorStop(0,`rgba(${c},${.45*pul})`);gr.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=gr;ctx.beginPath();ctx.ellipse(a.x,G+4,L.arrR*1.15,L.arrR*.3,0,0,Math.PI*2);ctx.fill();
  for(let i=0;i<8;i++){const ph=(B.time*.8+i/4)%1;ctx.fillStyle=`rgba(${c},${(1-ph)*.7})`;ctx.beginPath();ctx.arc(a.x-L.arrR*.85+i*L.arrR*.24+Math.sin(i*7)*10,G-ph*110,4+3*(1-ph),0,Math.PI*2);ctx.fill()}ctx.restore()}
 // 大招地面效果：狐火地面／沙暴／暴風雪
 if(B.zones&&B.zones.length)for(const z of B.zones){const a=Math.min(1,z.t/.5);ctx.save();ctx.globalCompositeOperation='lighter';const gr=ctx.createRadialGradient(z.x,G,10,z.x,G,z.r);gr.addColorStop(0,z.k==='fire'?`rgba(255,120,40,${.55*a})`:z.k==='sand'?`rgba(255,210,120,${.45*a})`:`rgba(190,235,255,${.45*a})`);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.ellipse(z.x,G,z.r,z.r*.28,0,0,Math.PI*2);ctx.fill();
  const n=z.k==='fire'?10:16;for(let i=0;i<n;i++){const ph=(B.time*(z.k==='fire'?1.2:2)+i/n)%1,px=z.x+Math.sin(i*12.9)*z.r*.9+(z.k==='fire'?0:(ph-.5)*120);const py=z.k==='fire'?G-ph*90:G-30-Math.abs(Math.sin(i*3.1))*160*ph;ctx.globalAlpha=(1-ph)*a*.9;ctx.fillStyle=z.k==='fire'?'#ff9a3a':z.k==='sand'?'#ffe0a0':'#ffffff';ctx.beginPath();ctx.arc(px,py,z.k==='fire'?6*(1-ph)+2:3,0,Math.PI*2);ctx.fill()}ctx.restore()}
 // 防禦陣（樓閣下）
 if(B.arrD){const c=ARR[B.arrD].c;ctx.save();ctx.globalAlpha=.8;{const f=L.dR*2/(MAN['g_'+B.arrD][0]/2);drawSprite('g_'+B.arrD,L.dX,G+4,{sx:f,sy:f*.7})}ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.3+.1*Math.sin(B.time*3);const gr=ctx.createRadialGradient(L.dX,G,10,L.dX,G,L.dR);gr.addColorStop(0,`rgba(${c},.8)`);gr.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=gr;ctx.beginPath();ctx.ellipse(L.dX,G+4,L.dR,L.dR*.25,0,0,Math.PI*2);ctx.fill();ctx.restore()}
 // 定身符陣地面
 if(PS.slow>0){ctx.save();ctx.globalAlpha=.32+.08*Math.sin(B.time*3);ctx.fillStyle='#ffe86a';ctx.beginPath();ctx.ellipse(L.front+225,G+6,225,22,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.9;for(let i=0;i<6;i++){const x=L.front+30+i*75,y=G-8-Math.abs(Math.sin(B.time*2+i))*10;ctx.fillStyle='#ffe86a';ctx.fillRect(x-6,y-14,12,20);ctx.fillStyle='#d0302a';ctx.fillRect(x-2,y-11,4,14)}ctx.restore()}
 // 樓閣
 const tm=MAN[L.tk];ctx.drawImage(IMG[L.tk],L.tx,G-L.th,L.tw,L.th);
 // 換站位提示
 if(pick>=0){L.spots.forEach(([x,y],i)=>{const me=i===pick;ctx.save();ctx.globalAlpha=me?.35:.18+.1*Math.sin(B.time*6);ctx.fillStyle=me?'#ffd86a':'#ffffff';ctx.fillRect(x-42,y-150,84,150);ctx.globalAlpha=me?1:.8;ctx.strokeStyle=me?'#ffb020':'#ffffff';ctx.lineWidth=7;ctx.setLineDash([14,8]);ctx.strokeRect(x-42,y-150,84,150);ctx.setLineDash([]);if(!me){ctx.fillStyle='#fff';ctx.font='900 30px sans-serif';ctx.textAlign='center';ctx.fillText('⇄',x,y-160)}ctx.restore()})}
 // 英雄
 for(const h of B.heroes){const o={};const A=h.anim;if(h.id==='archer'&&B.focusT>0)glow(h.x,h.y-60,80,'rgba(170,255,210,.7)',.55+.25*Math.sin(B.time*8));
  if(A&&A.type==='atk'){const t=A.t;if(t<.2){const p=ease(t/.2);o.rot=-.06*p;o.sy=1+.04*p;o.sx=1-.02*p;o.dx=-3*p}else if(t<.28){o.rot=.09;o.sy=.94;o.sx=1.05;o.dx=6}else{const q=1-ease((t-.28)/.22);o.rot=.09*q;o.sy=1-.06*q;o.sx=1+.05*q;o.dx=6*q}}
  if(A&&A.type==='ult'){const t=A.t;if(t<.3){const p=ease(t/.3);o.sy=1-.08*p;o.sx=1+.06*p}else if(t<.7){const p=(t-.3)/.4,q=Math.sin(p*Math.PI);o.dy=-90*q;o.spin=p*Math.PI*2;o.sy=1+.06*q}else if(t<.78){o.sy=.88;o.sx=1.12}else{const q=1-ease(Math.min(1,(t-.78)/.42));o.sy=1-.12*q;o.sx=1+.12*q}
   ctx.save();ctx.globalCompositeOperation='lighter';const gr=ctx.createRadialGradient(h.x,h.y-60,5,h.x,h.y-60,110);gr.addColorStop(0,CH[h.id].c);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=.5;ctx.fillStyle=gr;ctx.fillRect(h.x-120,h.y-180,240,240);ctx.restore()}
  if(!A){o.sy=1+Math.sin(B.time*2.2+h.x)*.012}
  if(h.charge>=100){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25+.15*Math.sin(B.time*6);const gr=ctx.createRadialGradient(h.x,h.y-60,5,h.x,h.y-60,80);gr.addColorStop(0,CH[h.id].c);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gr;ctx.fillRect(h.x-90,h.y-150,180,180);ctx.restore()}
  if(PASSIVE[h.id]){const c=CH[h.id].c;ctx.save();ctx.globalAlpha=.55+.25*Math.sin(B.time*3+h.x);ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(h.x,h.y-2,38,8,0,0,Math.PI*2);ctx.stroke();ctx.restore();
   const ph=(B.time*.7+h.x*.01)%1;ctx.save();ctx.globalAlpha=(1-ph)*.8;ctx.fillStyle=c;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(h.x-24+i*24,h.y-10-ph*70-i*8,3,0,Math.PI*2);ctx.fill()}ctx.restore()}
  let hk=myKey(h.id);if(isMy(h.id)&&!SRC[`c_${h.id}_6`])glow(h.x,h.y-60,95,'rgba(255,210,90,.75)',.5+.2*Math.sin(B.time*4+h.x));
  if(A){const t=A.t;const f=A.type==='atk'?(t<.2?1:t<.3?2:t<.42?3:0):(t<.3?1:t<.7?2:t<.95?3:0);if(f&&MAN[hk+'_a'+f])hk+='_a'+f}
  {const k=heroScale();if(k<1){o.sx=(o.sx||1)*k;o.sy=(o.sy||1)*k}}// 所有弟子同一個比例（臉一樣大），依樓閣最擠那層的站位間距決定
drawSprite(hk,h.x,h.y,o);
  if(A&&A.type==='atk'&&CH[h.id].role==='melee'&&A.t>.18&&A.t<.36){swoosh(h.x+40,h.y-70,CH[h.id].c,1-(A.t-.18)/.18,70)}
 }
 // 山門
 const broken=B.gateHp<B.gateMax*.35;const gk=gateKey(broken);const gm=MAN[gk];
 const gdx=B.gateHit>0?(Math.random()-.5)*6:0;if(B.gateHit>0)B.gateHit-=real;
 drawSprite(gk,L.gx+gdx,G,{flash:B.gateHit>0?.35:0});
 // 塔
 for(const t of B.turrets){const tier=tierOf(S.tur[t.k].lv);const p=t.anim>0?t.anim/.25:0;shadow(t.x,G+2,34);drawSprite(`t_${t.k}_${tier}`,t.x,G,{sx:1+.05*p,sy:1-.06*p,dx:-4*p})}
 // 神獸
 if(B.shield>0){ctx.save();ctx.globalAlpha=Math.min(1,B.shield)*(.35+.1*Math.sin(B.time*8));ctx.fillStyle='#8fe0ff';ctx.strokeStyle='#e6fbff';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(L.gx,G-120,170,190,0,Math.PI,0);ctx.closePath();ctx.fill();ctx.globalAlpha*=1.8;ctx.stroke();ctx.restore()}
 for(const b of B.beasts){const fly=BEAST[b.k].fly;const p=b.anim>0?b.anim/.45:0;let o={sy:1+Math.sin(B.time*3+b.x)*.015,dy:fly?Math.sin(B.time*2.5+b.x)*8:0};
  if(p>0){const q=p>.6?(1-p)/.4:p/.6;o={dx:(fly?14:30)*q,rot:.12*q,sy:1-.06*q,sx:1+.05*q,dy:o.dy}}
  if(b.pounce>0){const t=1-b.pounce/.55,sn=Math.sin(Math.PI*t);o={dx:(b.pdx||0)*sn,dy:-70*Math.sin(Math.PI*Math.min(1,t*2))*(t<.5?1:0)-10*sn,rot:t<.5?-.15:.1,sx:1.04,sy:.97}}
  shadow(b.x+(o.dx||0),G+2,fly?36:50,fly?.12:.22);drawSprite('b_'+b.k,b.x,b.y||G,o)}
 // 裝備中的法寶：在山門和神獸上方飄著轉圈（10 星的有紅光）
 {const fo=(S.fbOn||[]).slice(0,fbSlots()).filter(k=>S.fb[k]);if(fo.length){const xs=B.beasts.map(b=>b.x),x0=L.gx-120,x1=Math.max(L.gx+260,...xs)+40;fo.forEach((k,i)=>{const t=B.time,fx=x0+(x1-x0)*(i+.5)/fo.length+Math.sin(t*.9+i*2.1)*26,fy=G-(ZM>1?420:330)+Math.sin(t*1.7+i*1.3)*16,st=S.fb[k].star,red=st>5;
  ctx.save();const gr=ctx.createRadialGradient(fx,fy,4,fx,fy,62);gr.addColorStop(0,red?'rgba(255,90,60,.55)':'rgba(255,240,170,.55)');gr.addColorStop(1,'rgba(255,220,120,0)');ctx.globalAlpha=.75+.25*Math.sin(t*3+i);ctx.fillStyle=gr;ctx.beginPath();ctx.arc(fx,fy,62,0,7);ctx.fill();ctx.restore();
  drawSprite('i_fb_'+k,fx,fy,{rot:Math.sin(t*1.3+i)*.18,sx:1.15,sy:1.15})})}}
 xDraw();
 // 敵人
 const es=B.enemies.slice().sort((a,b)=>(a.fly-b.fly)||(a.y-b.y));
 for(const e of es){let key=e.key,o={},alpha=1;
  if(e.dead){const p=Math.min(1,e.dead/.45);o.sx=1+p*.3;o.sy=1-p*.6;o.alpha=1-p;}
  else if(e.lift>0){o.dy=-110*Math.sin(Math.min(1,(1.5-e.lift)/.3)*Math.PI/2);o.rot=Math.sin(e.t*12)*.15}
  else if(e.state==='walk'||e.stun>0){const st=e.stun>0?0:1;const ph=e.t*(e.spd/18);
   if(e.hop){const q=Math.abs(Math.sin(ph*.5));o.dy=-12*q*st;o.sy=1+.06*q*st-(.06*(1-q))*st;o.sx=1-.04*q*st}
   else if(e.fly){o.dy=Math.sin(e.t*5)*8;key=Math.floor(e.t*8)%2?'m_bat_1':'m_bat_0'}
   else{o.dy=-Math.abs(Math.sin(ph*.5))*5*st;o.rot=Math.sin(ph*.5)*.04*st}
  }else{// 攻擊
   const a=e.at;
   if(e.boss){if(a<.9){key=e.frames[0];o.dx=8*ease(a/.9)}else if(a<1.6){key=e.frames[1];o.dx=-10}else{o.dx=-10*(1-ease((a-1.6)/.6))}}
   else if(e.fly){key=a<.5?'m_bat_0':'m_bat_1';o.dy=a<.5?-10:10*Math.sin(Math.min(1,(a-.5)/.3)*Math.PI);o.dx=a>.5&&a<.8?-16:0}
   else if(e.frames.length){const fr=e.frames;if(a<.3){key=fr[0];o.dx=3}else if(a<.45){key=fr[1]||fr[0];o.dx=-4}else if(a<.75){key=fr[2]||fr[fr.length-1];o.dx=-10;o.sx=1.04;o.sy=.96}else{o.dx=-10*(1-ease((a-.75)/.55))}}
   else{if(a<.35){const p=ease(a/.35);o.dx=6*p;o.sy=1-.06*p;o.sx=1+.04*p}else if(a<.5){o.dx=-16;o.sy=1.05;o.sx=.97}else{o.dx=-16*(1-ease((a-.5)/.8))}}
  }
  if(e.flash>0)o.flash=.6;
  if(!e.fly)shadow(e.x,G+2,e.w*.33,e.dead?.1:.22);else shadow(e.x,G+2,e.w*.22,.12);
  if(e.stun>0&&!e.dead){o.dx=(o.dx||0)+(Math.random()-.5)*2}
  if(e.flip)o.sx=-(o.sx||1);
  if(e.sc){o.sx=(o.sx||1)*e.sc;o.sy=(o.sy||1)*e.sc;o.dx=(o.dx||0)*e.sc;
   if(!e.dead){ctx.save();const r=e.h*.55,gx=e.x,gy=e.y-e.ay*.5;const gr=ctx.createRadialGradient(gx,gy,r*.2,gx,gy,r);gr.addColorStop(0,e.c+'88');gr.addColorStop(1,e.c+'00');ctx.globalAlpha=.55+.25*Math.sin(B.time*4);ctx.fillStyle=gr;ctx.fillRect(gx-r,gy-r,r*2,r*2);ctx.restore()}}
  drawSprite(key,e.x,e.y,o);
  if(e.goldm&&!e.dead){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.35+.2*Math.sin(B.time*6+e.x);ctx.fillStyle='#ffd84a';ctx.beginPath();ctx.ellipse(e.x,e.y-e.ay*.5,e.w*.4,e.ay*.55,0,0,Math.PI*2);ctx.fill();ctx.restore()}
  if(e.elite&&!e.dead){ctx.save();ctx.translate(e.x,e.y-e.ay-16);ctx.fillStyle='#ffd84a';ctx.strokeStyle='#6b3d06';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-13);ctx.lineTo(11,-8);ctx.lineTo(9,6);ctx.lineTo(0,13);ctx.lineTo(-9,6);ctx.lineTo(-11,-8);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
  if(!e.dead&&e.stun>0){ctx.save();ctx.globalAlpha=.8;for(let i=0;i<3;i++){const a=B.time*5+i*2.1;ctx.fillStyle='#fff6a0';star(e.x+Math.cos(a)*22,e.y-e.ay-8+Math.sin(a)*6,5)}ctx.restore()}
  if(!e.dead){const bd=[];if(e.burn>0)bd.push(['燒','#ff6a2a']);if(e.stun>0)bd.push(['暈','#e0b000']);if(e.slow>0)bd.push(['慢','#3a9ae0']);if(e.armor>0)bd.push(['破','#c07a10']);if(e.mark>0)bd.push(['標','#3a8ae0']);if(e.melt>0)bd.push(['熔','#ff6a3a']);if(e.frog>0)bd.push(['蛙','#3aa040']);if(e.bleed>0)bd.push(['血','#c02040']);if(e.conf>0)bd.push(['迷','#a070c0']);if(e.vuln>0)bd.push(['弱','#8a2050']);if(bd.length){ctx.save();ctx.font='bold 19px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const by=e.y-e.ay-(e.boss?36:30);bd.forEach(([t,c],i)=>{const bx=e.x+(i-(bd.length-1)/2)*36;ctx.fillStyle=c;ctx.beginPath();ctx.arc(bx,by,16,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff';ctx.fillText(t,bx,by+1)});ctx.restore()}}
  if(!e.dead&&e.slow>0){ctx.save();ctx.globalAlpha=.35;ctx.fillStyle='#bdf4ff';ctx.beginPath();ctx.ellipse(e.x,G,e.w*.35,8,0,0,Math.PI*2);ctx.fill();ctx.restore()}
  if(!e.dead&&!e.boss&&e.hp<e.max){const w=Math.max(30,e.w*.5);ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(e.x-w/2,e.y-e.ay-10,w,5);ctx.fillStyle='#ff5a3a';ctx.fillRect(e.x-w/2,e.y-e.ay-10,w*Math.max(0,e.hp/e.max),5)}
 }
 // 投射物
 for(const p of B.proj)drawProj(p);
 // 特效
 for(const f of B.fx)drawFx(f);
 // 字
 ctx.textAlign='center';ctx.lineJoin='round';
 for(const t of B.txt){const L0=t.life||.8,a=1-Math.max(0,(t.t-(L0-.3))/.3);ctx.globalAlpha=a;if(t.shout){const sz=Math.round(34*(t.t<.15?1+(.15-t.t)*3:1));ctx.font=`900 ${sz}px "Noto Sans TC",sans-serif`;ctx.lineWidth=7;ctx.strokeStyle='#2a1206';ctx.strokeText(t.v,t.x,t.y);ctx.fillStyle=t.c||'#fff2a0';ctx.fillText(t.v,t.x,t.y);ctx.lineWidth=2;ctx.strokeStyle='rgba(255,255,255,.9)';ctx.strokeText(t.v,t.x,t.y);continue}const sz=t.crit?Math.round(52*(t.t<.12?1+(.12-t.t)*4:1)):t.coin?26:t.big?40:30;ctx.font=`900 ${sz}px "Noto Sans TC",sans-serif`;
  ctx.lineWidth=5;ctx.strokeStyle=t.coin?'#5a3a06':'#3a1408';ctx.strokeText(t.v,t.x,t.y);ctx.fillStyle=t.crit?'#ff5a2a':t.coin?'#ffe066':t.big?'#fff2a0':'#ffffff';ctx.fillText(t.v,t.x,t.y)}
 ctx.globalAlpha=1;
 // 大招全螢幕色
 for(const f of B.fx){if(f.k==='frost'){ctx.fillStyle=`rgba(190,240,255,${.35*(1-f.t/f.life)})`;ctx.fillRect(0,TOPY,VW,VH)}if(f.k==='moon'){ctx.fillStyle=`rgba(120,0,30,${.3*Math.sin(f.t/f.life*Math.PI)})`;ctx.fillRect(0,TOPY,VW,VH)}}
 updLive();
}
function star(x,y,r){ctx.beginPath();for(let i=0;i<10;i++){const rr=i%2?r*.45:r,a=i/10*Math.PI*2-Math.PI/2;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.closePath();ctx.fill()}
function swoosh(x,y,c,a,r){ctx.save();ctx.translate(x,y);ctx.strokeStyle=c;ctx.lineCap='round';for(let k=0;k<3;k++){ctx.lineWidth=12-k*4;ctx.globalAlpha=Math.max(0,a)*(.9-k*.25);ctx.beginPath();ctx.arc(0,0,r-k*5,-1.9,.55);ctx.stroke()}ctx.restore()}
function glow(x,y,r,c,a=1){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}
function drawProj(p){const a=p.ang||0;
 if(p.spr&&MAN[p.spr]){glow(p.x,p.y,22,p.c,.45);const round=p.spr==='p_pill'||p.spr==='p_bullet'||p.spr==='p_bun'||p.spr==='p_firebomb';drawSprite(p.spr,p.x,p.y,{rot:round?B.time*8:a});return}
 ctx.save();ctx.translate(p.x,p.y);
 switch(p.kind){
  case 'arrow':case 'bolt':case 'harpoon':ctx.rotate(a);ctx.strokeStyle=p.kind==='bolt'?'#8a5a2a':'#f4f0e0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-26,0);ctx.lineTo(8,0);ctx.stroke();ctx.fillStyle=p.c;ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(4,-5);ctx.lineTo(4,5);ctx.fill();ctx.fillStyle=p.c;ctx.globalAlpha=.6;ctx.fillRect(-28,-3,6,6);ctx.restore();glow(p.x,p.y,18,p.c,.5);return;
  case 'slash':ctx.rotate(a);ctx.strokeStyle=p.c;ctx.lineCap='round';ctx.lineWidth=6;ctx.beginPath();ctx.arc(-6,0,20,-1.2,1.2);ctx.stroke();ctx.globalAlpha=.5;ctx.lineWidth=3;ctx.beginPath();ctx.arc(-16,0,18,-1.1,1.1);ctx.stroke();ctx.restore();glow(p.x,p.y,26,p.c,.5);return;
  case 'spear':ctx.rotate(a);ctx.fillStyle=p.c;ctx.beginPath();ctx.moveTo(18,0);ctx.lineTo(-10,-6);ctx.lineTo(-24,0);ctx.lineTo(-10,6);ctx.fill();ctx.restore();glow(p.x,p.y,24,p.c,.6);return;
  case 'orb':case 'fire':ctx.restore();glow(p.x,p.y,30,p.c,.9);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,6,0,Math.PI*2);ctx.fill();for(let i=1;i<4;i++){ctx.globalAlpha=.4/i;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x-Math.cos(a)*i*10,p.y-Math.sin(a)*i*10,8-i,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;return;
  case 'pill':ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(0,0,7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-2,-2,2.5,0,Math.PI*2);ctx.fill();ctx.restore();glow(p.x,p.y,16,p.c,.4);return;
  case 'ice':ctx.rotate(a);ctx.fillStyle='#e8fbff';ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(0,-6);ctx.lineTo(-14,0);ctx.lineTo(0,6);ctx.fill();ctx.restore();glow(p.x,p.y,20,p.c,.6);return;
  case 'tali':ctx.rotate(B.time*10);ctx.fillStyle='#ffe86a';ctx.fillRect(-6,-10,12,20);ctx.fillStyle='#d0302a';ctx.fillRect(-2,-7,4,14);ctx.restore();return;
 }
 ctx.restore()}
function drawFx(f){const p=Math.min(1,f.t/f.life);
 if(f.k==='spr'){const i=Math.min(f.n-1,Math.floor(p*f.n));glow(f.x,f.y,40*f.sc,'rgba(255,255,255,.9)',.35*(1-p));ctx.save();ctx.globalAlpha=i===f.n-1?.7:1;drawSprite(f.pre+'_'+i,f.x,f.y,{sx:f.sc,sy:f.sc});ctx.restore();return}
 if(f.k==='ult'){if(f.t<f.delay)return;const q=Math.min(1,(f.t-f.delay)/(f.life-f.delay));const i=Math.min(5,Math.floor(q*6));glow(f.x,f.y,200*f.sc,f.c||'rgba(255,230,160,1)',.45*(1-q));drawSprite(f.pre+'_'+i,f.x,f.y,{sx:f.sc,sy:f.sc});return}
 switch(f.k){
  case 'spark':glow(f.x,f.y,28*(1-p)+8,f.c,1-p);break;
  case 'muzzle':glow(f.x,f.y,22,f.c,1-p);break;
  case 'boom':{const r=(f.r||60)*(.4+.8*ease(p));glow(f.x,f.y,r,f.c,1-p);ctx.save();ctx.strokeStyle=f.c;ctx.globalAlpha=1-p;ctx.lineWidth=4*(1-p)+1;ctx.beginPath();ctx.arc(f.x,f.y,r*.8,0,Math.PI*2);ctx.stroke();ctx.restore();break}
  case 'coin':{f.vy+=600*(1/60);const x=f.x+f.vx*f.t,y=f.y+f.vy*f.t*.6+300*f.t*f.t;ctx.globalAlpha=1-p;ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.arc(x,Math.min(G,y),5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;break}
  case 'claw':ctx.save();ctx.strokeStyle='#ffffff';ctx.lineCap='round';ctx.globalAlpha=1-p;for(let i=0;i<3;i++){ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(f.x-30+i*18,f.y-40);ctx.lineTo(f.x+i*18,f.y+30);ctx.stroke()}ctx.restore();break;
  case 'dust':for(let i=0;i<8;i++){ctx.fillStyle=`rgba(190,170,140,${.6*(1-p)})`;ctx.beginPath();ctx.arc(f.x+(i-4)*14*(.5+p),f.y-6-p*20*(i%3),6+p*10,0,Math.PI*2);ctx.fill()}break;
  case 'xslash':{const m=MAN.xu_qiongqi;ctx.save();ctx.globalAlpha=1-p;drawSprite('xu_qiongqi',f.x,f.y+m[3]*.15,{sx:.3+.1*p,sy:.3+.1*p});ctx.restore();break}
  case 'xsuck':{const q=Math.min(1,p*1.25),e2=q*q;ctx.save();ctx.globalAlpha=1-Math.max(0,p-.8)*5;drawSprite(f.key,f.x0+(f.x1-f.x0)*e2,f.y0+(f.y1-f.y0)*e2,{sx:f.sc*(1-q*.92),sy:f.sc*(1-q*.92),rot:q*6});ctx.restore();break}
  case 'bult':{const m=MAN[f.key];if(m){ctx.save();ctx.globalAlpha=p<.15?p/.15:p>.7?(1-p)/.3:1;drawSprite(f.key,VW*.52,TOPY+VH*.42+m[3]/2,{sx:1.3*(1+.08*p),sy:1.3*(1+.08*p)});ctx.restore()}break}
  case 'dog':{const bite=f.bite>0,fr=bite?'dog_bite_f'+(1+Math.floor(f.t*8)%2):'dog_run_f'+(1+Math.floor(f.t*14)%4);glow(f.x,f.y-30,46,'rgba(255,230,160,.8)',.35);ctx.save();ctx.globalAlpha=f.t>f.life-.2?(f.life-f.t)/.2:1;drawSprite(fr,f.x,f.y,{});ctx.restore();break}
  case 'ride':{const k=myKey('nezha');ctx.save();if(MAN.wheel_firetrail)drawSprite('wheel_firetrail',f.x-(f.dir>0?20:-20),f.y-14,{sx:f.dir>0?1.3:-1.3,sy:1.3});glow(f.x,f.y-60,90,'rgba(255,90,60,.9)',.5);drawSprite(k,f.x,f.y,{sx:f.dir>0?1.1:-1.1,sy:1.1});ctx.restore();break}
  case 'fly':{const q=ease(Math.min(1,p*1.1)),x=f.x0+(f.x1-f.x0)*q;ctx.save();ctx.globalAlpha=p>.8?(1-p)/.2:1;glow(x,f.y,140,f.c||'rgba(160,230,255,.9)',.5);drawSprite(f.key,x,f.y+Math.sin(p*9)*16,{sx:f.sc||1.6,sy:f.sc||1.6});ctx.restore();break}
  case 'crack':{ctx.save();ctx.globalAlpha=Math.min(1,(f.life-f.t)/.5)*.85;ctx.strokeStyle='#2a1a10';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(f.x0,G+6);let zi=0;for(let x=f.x0;x<f.x1;x+=40){ctx.lineTo(x+20,G+(zi++%2?16:-4));}ctx.stroke();ctx.strokeStyle='rgba(255,220,140,.8)';ctx.lineWidth=3;ctx.stroke();glow((f.x0+f.x1)/2,G,Math.max(100,(f.x1-f.x0)/2),'rgba(255,200,120,.6)',.25);ctx.restore();break}
  case 'clone':{// 毫毛分身：分身猴在怪旁邊冒出來敲一下（半透明、小一號）
   const k2=MAN[f.key+'_a2']?f.key+'_a2':f.key;glow(f.x,f.y-60,70,'rgba(255,210,90,.9)',.5*(1-p));ctx.save();ctx.globalAlpha=p<.15?p/.15*.9:p>.7?(1-p)/.3*.9:.9;{const fl=f.fl||1,dy=f.top?(p<.3?-300*(1-p/.3)*(1-p/.3):-Math.sin(Math.min(1,(p-.3)*3)*Math.PI)*14):-Math.sin(Math.min(1,p*2)*Math.PI)*26;drawSprite(p<.35?f.key:k2,f.x,f.y,{sx:.85*fl,sy:.85,dy,rot:f.top&&p<.3?f.rt*fl*3:0})}ctx.restore();break}
  case 'staff':{// 齊天大聖：巨大金箍棒從天上砸下來
   const fall=Math.min(1,p/.28),yb=TOPY-200+(f.y-(TOPY-200))*fall*fall,L=760,W=46;ctx.save();ctx.globalAlpha=p<.75?1:(1-p)/.25;ctx.translate(f.x,yb);
   glow(0,-L/2,170,'rgba(255,210,80,.55)',.9);if(MAN.fx_staff){ctx.restore();ctx.save();ctx.globalAlpha=p<.75?1:(1-p)/.25;drawSprite('fx_staff',f.x,yb,{sx:1.4,sy:1.4})}ctx.restore();// 金箍棒：從齊天神猴原圖摳下來的棒頭＋棒身，後段淡出
   if(p>=.28){const q=(p-.28)/.72;ctx.save();ctx.globalAlpha=(1-q)*.9;ctx.strokeStyle='#ffd84a';ctx.lineWidth=14*(1-q)+3;ctx.beginPath();ctx.ellipse(f.x,f.y+20,600*q+60,110*q+14,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle=`rgba(255,230,140,${.35*(1-q)})`;ctx.fillRect(0,TOPY,VW,VH);ctx.restore()}
   break}
  case 'ring':ctx.save();ctx.strokeStyle=f.c;ctx.globalAlpha=1-p;ctx.lineWidth=8*(1-p)+2;ctx.beginPath();ctx.ellipse(f.x,f.y+30,f.r*ease(p),f.r*.3*ease(p),0,0,Math.PI*2);ctx.stroke();ctx.restore();break;
  case 'shock':ctx.save();ctx.strokeStyle=f.c;ctx.globalAlpha=1-p;ctx.lineWidth=6*(1-p)+1;ctx.beginPath();ctx.ellipse(f.x,f.y,30+p*120,6+p*24,0,0,Math.PI*2);ctx.stroke();ctx.restore();glow(f.x,f.y-50,90,f.c,.6*(1-p));break;
  case 'sweep':{ctx.save();ctx.translate(f.x,f.y);ctx.strokeStyle=f.c;ctx.lineCap='round';const a=1-Math.max(0,(p-.7)/.3);for(let k=0;k<4;k++){ctx.globalAlpha=a*(.9-k*.2);ctx.lineWidth=30-k*7;ctx.beginPath();ctx.arc(-k*30,0,150-k*8,-1.3,1.3);ctx.stroke()}ctx.restore();glow(f.x,f.y,170,f.c,.5*a);break}
  case 'wave':{const a=1-p;ctx.save();ctx.fillStyle=f.c;ctx.globalAlpha=.7*a;ctx.beginPath();ctx.moveTo(f.x-160,G+6);ctx.quadraticCurveTo(f.x-40,G-110,f.x,G-20);ctx.lineTo(f.x+10,G+6);ctx.fill();ctx.restore();glow(f.x-40,G-30,120,f.c,.6*a);for(let i=0;i<5;i++){ctx.fillStyle=`rgba(150,120,80,${a})`;ctx.fillRect(f.x-30-i*26,G-20-((i*37+Math.floor(f.t*20))%40),8,8)}break}
  case 'rainp':{if(f.t<f.delay)break;const q=Math.min(1,(f.t-f.delay)/(f.life-f.delay));const x=f.x+(f.tx-f.x)*q,y=f.y+(f.ty-f.y)*q;const ang=Math.atan2(f.ty-f.y,f.tx-f.x);
   if(RAINSPR[f.rk]&&MAN[RAINSPR[f.rk]]){glow(x,y,34,f.c,.6);drawSprite(RAINSPR[f.rk],x,y,{rot:ang,sx:1.6,sy:1.6})}
   else if(f.rk==='arrow'||f.rk==='harpoon'){ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-40,0);ctx.lineTo(10,0);ctx.stroke();ctx.fillStyle=f.c;ctx.beginPath();ctx.moveTo(18,0);ctx.lineTo(4,-7);ctx.lineTo(4,7);ctx.fill();ctx.restore();glow(x,y,30,f.c,.7)}
   else if(f.rk==='star'){ctx.fillStyle=f.c;star(x,y,16);glow(x,y,40,f.c,.8)}
   else if(f.rk==='bomb'){ctx.fillStyle='#2a2a30';ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.fill();glow(x-8,y-8,14,'#ffb040',1)}
   else{glow(x,y,44,f.c,.95);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();for(let i=1;i<5;i++){ctx.globalAlpha=.5/i;ctx.fillStyle=f.c;ctx.beginPath();ctx.arc(x-Math.cos(ang)*i*16,y-Math.sin(ang)*i*16,12-i*2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
   break}
  case 'laser':{const a=p<.15?p/.15:1-Math.max(0,(p-.7)/.3);const w=(18+Math.sin(f.t*60)*4)*a;ctx.save();ctx.globalCompositeOperation='lighter';const gr=ctx.createLinearGradient(0,f.y-w*2,0,f.y+w*2);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,f.c);gr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gr;ctx.fillRect(f.x,f.y-w*2,VW,w*4);ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillRect(f.x,f.y-w*.3,VW,w*.6);ctx.restore();
   // 地面打擊線
   ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4*a;ctx.fillStyle=f.c;ctx.beginPath();ctx.moveTo(f.x,f.y);ctx.lineTo(VW,G-80);ctx.lineTo(VW,G-20);ctx.closePath();ctx.fill();ctx.restore();glow(f.x,f.y,60,f.c,a);break}
  case 'heal':for(let i=0;i<14;i++){const ph=(p*1.4+i/14)%1;ctx.fillStyle=`rgba(140,255,150,${1-ph})`;ctx.font='900 26px sans-serif';ctx.fillText('+',f.x-90+(i*37)%180,f.y-ph*260)}glow(f.x,f.y-100,160,'#8cff90',.5*(1-p));break;
  case 'frost':{const a=1-p;for(let i=0;i<30;i++){const x=(i*97+f.t*40)%VW,y=TOPY+((i*53+f.t*260)%VH);ctx.fillStyle=f.fk==='root'?`rgba(120,220,90,${a})`:f.fk==='talisman'?`rgba(255,230,100,${a})`:`rgba(255,255,255,${a})`;if(f.fk==='talisman')ctx.fillRect(x,y,8,14);else{ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill()}}break}
  case 'drain':{const q=ease(p);const x=f.x+(f.tx-f.x)*q,y=f.y+(f.ty-f.y)*q-Math.sin(q*Math.PI)*80;glow(x,y,20,f.c,1-p*.5);break}
 }}

