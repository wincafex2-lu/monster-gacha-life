/* 獎勵 */
let giftOpen=false;
function giveGift(g){let title,img,text;
 if(g.type==='tur'){S.tur[g.k]={lv:1};if(S.turTeam.length<turSlots())S.turTeam.push(g.k);title='獲得新的塔！';img=SRC['t_'+g.k+'_1'];text=`${TUR[g.k].n}：${TUR[g.k].d}。擺在山門前面自動攻擊。`}
 else if(g.type==='arr'){S.arr[g.k]=S.arr[g.k]||{lv:1};if(ARR[g.k].t==='a'&&!S.arrA)S.arrA=g.k;title='獲得陣法！';img=SRC['i_'+g.k];text=`${ARR[g.k].n}：${ARR[g.k].d}。`}
 else{S.beast[g.k]={lv:1};if(S.beastTeam.length<beastSlots()&&!S.beastTeam.includes(g.k))S.beastTeam.push(g.k);title='神獸來了！';img=SRC['b_'+g.k];text=`神獸 ${BEAST[g.k].n} 願意守護山門！${BEAST[g.k].d}。`}
 giftOpen=true;SND.play('rare');$('gfTitle').textContent=title;$('gfImg').src=img;$('gfText').textContent=text;$('gift').classList.add('open');refreshField()}
$('gfOk').onclick=()=>{$('gift').classList.remove('open');giftOpen=false};
/* 離線收穫 */
function ascend(){const g=xyGain(S.best||0);if(!g)return;const b0=S.best||0;S.xy=(S.xy||0)+g;S.asc=(S.asc||0)+1;
 S.stage=1;S.best=0;S.farm=0;S.farmN=0;S.gateLv=1;S.coin=0;S.stone=0;S.train={atk:0,hp:0,coin:0,ult:0};
 // 快速起跑：前一半的關卡直接算過關，拿到那些關卡打怪和過關的銅錢、山門石
 const sk=Math.floor(b0/2);let fc=0,fs=0;for(let st=1;st<=sk;st++){const bs=st%10===0,tens=Math.floor(st/10);fc+=(5*Math.pow(1.088,st-1)*(bs?4:1)+30*coinKill(st,1))*XYR();fs+=(bs?20+5*tens:4+2*tens)*XYR()}
 S.coin=Math.round(fc);S.stone=Math.round(fs);S.best=sk;S.stage=sk+1;
 for(const id in S.roster)S.roster[id].lv=1;for(const k in S.tur)S.tur[k].lv=1;for(const k in S.arr)S.arr[k].lv=1;
 persist();closePanel();if(typeof updFarm==='function')updFarm();refreshField();startStage();
 giftOpen=true;$('gfTitle').textContent=`飛升成功！（第 ${S.asc} 次）`;$('gfImg').src=charImg(S.team[0]);$('gfText').textContent=`拿到 ${g} 仙元，現在共 ${S.xy}（攻擊 ×${XYA0().toFixed(2)}）、銅錢和山門石 ×${XYR().toFixed(2)}，境界升到「${realmName(S.asc)}」：攻擊再 ×${RLM_MUL}、等級上限 +${RLM_LV}。前 ${S.best} 關直接算過關，拿到 ${fmt(S.coin)} 銅錢、${fmt(S.stone)} 山門石，從第 ${S.stage} 關出發！`;$('gift').classList.add('open');SND.play('rare');updHud()}
// 離線收益：照最近實際刷關速度（最近一小時內、中間沒有斷超過 10 分鐘的過關紀錄）給 50%，最多算 12 小时；沒紀錄就用舊的保底
function farmRate(){const w=S.wlog||[];let i=w.length-1;while(i>0&&w[i][0]-w[i-1][0]<600e3)i--;const seg=w.slice(i);if(seg.length<3)return null;const span=(seg[seg.length-1][0]-seg[0][0])/1000;if(span<60)return null;let c=0,g=0,st=0;for(let k=1;k<seg.length;k++){c+=seg[k][1];g+=seg[k][2];st+=seg[k][3]}return{c:c/span,g:g/span,s:st/span,wph:(seg.length-1)/span*3600}}
function offline(){const dt=(Date.now()-(S.seen||Date.now()))/1000;if(dt<120)return;const t=Math.min(dt,12*3600);const s=Math.max(1,S.best);
 const perMin=coinKill(s,1.1)*(5+s*.6)/1.2;const fr=farmRate(),H=.5;let c=Math.round(perMin*t/60*.5*TR('coin')*XYR()),gm=Math.min(120,Math.floor(t/3600*10)),stn=0;
 if(fr){c=Math.max(c,Math.round(fr.c*t*H));gm=Math.max(gm,Math.round(fr.g*t*H));stn=Math.round(fr.s*t*H)}if(c<1)return;S.coin+=c;S.gem+=gm;S.stone+=stn;S.seen=Date.now();S.wlog=[];
 giftOpen=true;$('gfTitle').textContent='閉關回來了';$('gfImg').src=charImg(S.team[0]);$('gfText').textContent=`你不在的 ${t>=3600?Math.floor(t/3600)+' 小時 ':''}${Math.floor(t%3600/60)} 分鐘，弟子們守住山門，賺到 ${fmt(c)} 銅錢${gm?`、${gm} 靈石`:''}${stn?`、${fmt(stn)} 山門石`:''}！${fr?`（照你最近每小時過 ${Math.round(fr.wph)} 關的速度，算一半）`:'（還沒有刷關紀錄，先給保底）'}`;$('gift').classList.add('open');persist()}
/* 啟動 */
loadAll().then(()=>{
 try{for(const k of BGS){if(!IMG[k])continue;const c=document.createElement('canvas');c.width=4;c.height=4;const g=c.getContext('2d');g.drawImage(IMG[k],0,0,1536,3,0,0,1,1);const d=g.getImageData(0,0,1,1).data;SKYS[k]=`rgb(${d[0]},${d[1]},${d[2]})`}SKY=SKYS.bg_meadow||SKY}catch(e){}
 try{const R=document.documentElement.style,u=k=>`url(${SRC[k]})`;[['--i-coin','u_res_coin'],['--i-gem','u_res_spirit'],['--i-stone','u_res_gatestone'],['--i-pill','u_res_pill'],['--f-N','u_card_common'],['--f-R','u_card_rare'],['--f-E','u_card_epic'],['--f-L','u_card_legend'],['--f-back','u_card_back'],['--altar','u_gacha_altar'],['--ultring','u_ui_ult_frame']].forEach(([a,b])=>{if(SRC[b])R.setProperty(a,u(b))});document.documentElement.classList.add('uiimg')}catch(e){}
 $('loading').style.display='none';resize();buildField();startStage();
 {const got=[];for(const st in GIFTS){if(S.best>=+st){const g=GIFTS[st];const box=g.type==='tur'?S.tur:g.type==='arr'?S.arr:S.beast;if(!box[g.k]){box[g.k]={lv:1};
   if(g.type==='tur'&&S.turTeam.length<turSlots())S.turTeam.push(g.k);if(g.type==='arr'&&ARR[g.k].t==='a'&&!S.arrA)S.arrA=g.k;if(g.type==='beast'&&S.beastTeam.length<beastSlots())S.beastTeam.push(g.k);
   got.push(g.type==='tur'?TUR[g.k].n:g.type==='arr'?ARR[g.k].n:'神獸'+BEAST[g.k].n)}}}
  if(!S.fbGiven){S.fbGiven=1;const n=Math.floor(S.best/10*.35)+Math.floor(S.best/100)*2;for(let i=0;i<n;i++){const r=giveFb();got.push('法寶'+FB[r.k].n)}}
  if(got.length){refreshField();giftOpen=true;$('gfTitle').textContent='補發過關獎勵';$('gfImg').src=SRC['b_'+(S.beastTeam[0]||'baihu')];$('gfText').textContent=`你之前已經過的關卡，獎勵補給你：${got.join('、')}。到「山門」裡可以設定上陣。`;$('gift').classList.add('open')}}
 if(!giftOpen)offline();requestAnimationFrame(t=>{last=t;frame(t)});
 window.__B=B;window.__pick=()=>pick;window.__S=S;window.__fast=sec=>{for(let t=0;t<sec;t+=.05){step(.05);if(giftOpen){$('gift').classList.remove('open');giftOpen=false}}};window.__api={startStage,levelUp,pull,gpOne,trainCost,beastSlots,setG:t=>{gTab=t},heroAtk,lvCost,lvCap,gateCost,turCost,refreshField};
});
