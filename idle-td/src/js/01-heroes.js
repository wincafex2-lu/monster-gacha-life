/* ---------- 資料 ---------- */
const RAR={S:{n:'起始',mul:1.0},N:{n:'普通',mul:1.0},R:{n:'稀有',mul:1.3},E:{n:'史詩',mul:1.8},L:{n:'傳說',mul:3.0}};
// range：從弟子站的位置往右能打多遠（世界座標）
const ROLE={
 melee:{n:'近戰',atk:9,rate:1.15,proj:'slash',range:560,reach:600,rd:'近',d:'只打靠近山門的怪，傷害最高'},
 ranged:{n:'遠程',atk:4,rate:1.5,proj:'arrow',range:99999,reach:99999,rd:'全場',d:'整個畫面都打得到，一次打一隻'},
 magic:{n:'法術',atk:7.5,rate:0.7,proj:'orb',aoe:90,range:1000,reach:950,rd:'中',d:'中距離，打中會炸到旁邊一群'},
 tank:{n:'坦克',atk:6,rate:0.85,proj:'spear',knock:28,range:600,reach:650,rd:'近',d:'近距離，把怪物撞退'},
 support:{n:'輔助',atk:2.2,rate:0.8,proj:'pill',range:900,reach:850,rd:'中',d:'自己打得很弱，靠被動技能幫全隊'}
};
// 被動技能（上陣就有效，每升 1 階變強）
const PASSIVE={
 alchemist:{n:'九轉仙丹',d:t=>`全隊攻擊 +${20+8*t}%、山門每秒回血 ${(0.3+0.15*t).toFixed(2)}%`,k:'atk',v:t=>(20+8*t)/100,k2:'regen',v2:t=>(0.3+0.15*t)/100,sp:'普攻會順便補山門 0.4% 血'},
 fox:{n:'九尾靈氣',d:t=>`全隊爆擊率 +${10+4*t}%（爆擊 2 倍傷害）、遠程・法術攻擊 +${10+4*t}%`,k:'crit',v:t=>(10+4*t)/100,k2:'back',v2:t=>(10+4*t)/100,sp:'普攻爆炸會留下狐火，持續燒傷'},
 archer:{n:'星辰之眼',d:t=>`遠程・法術攻擊 +${20+6*t}%、全隊大招充能快 ${10+4*t}%（冷卻最多降一半）`,k:'back',v:t=>(20+6*t)/100,k2:'charge',v2:t=>(10+4*t)/100,sp:'箭會穿透，後面 2 隻也打到（60%）'},
 grandma:{n:'熱騰騰便當',d:t=>`山門每秒回血 ${(0.6+0.3*t).toFixed(1)}%`,k:'regen',v:t=>(0.6+0.3*t)/100},
 jiangshi:{n:'定身符陣',d:t=>`山門前的怪物走路變慢 ${20+5*t}%`,k:'slow',v:t=>(20+5*t)/100},
 pharaoh:{n:'黃金之力',d:t=>`打怪銅錢 +${15+10*t}%`,k:'coin',v:t=>(15+10*t)/100},
 witch:{n:'星星魔力',d:t=>`全隊大招充能快 ${15+5*t}%（冷卻最多降一半）`,k:'charge',v:t=>(15+5*t)/100},
 dragon:{n:'龍騎守護',d:t=>`山門血量 +${20+8*t}%、近戰・坦克攻擊 +${15+5*t}%`,k:'hp',v:t=>(20+8*t)/100,k2:'front',v2:t=>(15+5*t)/100,sp:'長槍射程中等；普攻 25% 機會把怪物震暈 1 秒；坦克傳說攻擊 ×1.5'},
 mecha:{n:'鋼鐵城牆',d:t=>`山門血量 +${20+8*t}%、山門受到的傷害 -${8+3*t}%`,k:'hp',v:t=>(20+8*t)/100,k2:'dr',v2:t=>(8+3*t)/100,sp:'砲管射程中等；每打 3 下發一次雷射，打一整排（120%）；坦克傳說攻擊 ×1.5'},
 general:{n:'將軍令',d:t=>`近戰、坦克弟子攻擊 +${15+5*t}%`,k:'front',v:t=>(15+5*t)/100},
 elf:{n:'森林祝福',d:t=>`遠程、法術弟子攻擊 +${15+5*t}%`,k:'back',v:t=>(15+5*t)/100},
 yangjian:{n:'天眼通',d:t=>`全隊爆擊率 +${8+3*t}%、打 Boss 傷害 +${15+5*t}%`,k:'crit',v:t=>(8+3*t)/100,k2:'boss',v2:t=>(15+5*t)/100,sp:'每打 5 下，哮天犬從山門衝出去，沿路咬每隻怪（普攻 ×3），被咬的怪受傷 +25%（4 秒）；咬到 Boss 會咬住 1.5 秒'},
 nezha:{n:'風火輪',d:t=>`全隊攻擊速度 +${8+3*t}%、遠程・法術攻擊 +${15+5*t}%`,k:'spd',v:t=>(8+3*t)/100,k2:'back',v2:t=>(15+5*t)/100,sp:'丟乾坤圈，打中後彈跳 2 次打別隻（各 100%）'},
 aobing:{n:'東海龍息',d:t=>`遠程・法術攻擊 +${20+6*t}%、山門受傷 -${6+2*t}%`,k:'back',v:t=>(20+6*t)/100,k2:'dr',v2:t=>(6+2*t)/100,sp:'冰珠打中範圍內的怪，變慢 30%（2 秒）'},
 monkey:{n:'齊天之力',d:t=>`近戰・坦克攻擊 +${20+6*t}%、全隊爆擊率 +${5+2*t}%`,k:'front',v:t=>(20+6*t)/100,k2:'crit',v2:t=>(5+2*t)/100,sp:'金箍棒會變長：近戰但射程中等（跟法術一樣遠）；長棍會打到目標身後 150 內的怪（60%）'},
 slingkid:{n:'頑童眼力',d:t=>`全隊爆擊率 +${3+2*t}%`,k:'crit',v:t=>(3+2*t)/100},
 drummer:{n:'行軍鼓',d:t=>`全隊攻擊速度 +${8+4*t}%`,k:'spd',v:t=>(8+4*t)/100},
 tanuki:{n:'煙霧彈',d:t=>`全場怪物走路變慢 ${5+3*t}%`,k:'mslow',v:t=>(5+3*t)/100},
 moonrabbit:{n:'月光結界',d:t=>`山門受到的傷害 -${6+3*t}%、全場怪物走路變慢 ${5+3*t}%`,k:'dr',v:t=>(6+3*t)/100,k2:'mslow',v2:t=>(5+3*t)/100,sp:'大招會讓山門張開月光護盾 4 秒（不受傷）'}
};
// 滿階極意：每隻角色滿階（傳說 5 階、其他 3 階）後上陣，解鎖自己獨特的團隊效果
const MAXFX={
 disciple:{s:'自身＋全隊近戰坦克',n:'清風掃塵',d:'普攻會順便打到後面 2 隻；全隊近戰、坦克攻擊 +20%'},
 fox:{s:'全隊',n:'九尾天狐',d:'燒傷中的怪物受到全隊傷害 ×2；燒傷中的怪物死掉時，火會燒到旁邊的怪'},
 dragon:{s:'全隊',n:'真龍附體',d:'暈眩中的怪物受到全隊傷害 ×2；龍騎放大招時全場怪物暈 3 秒'},
 archer:{s:'自身',n:'星隕一擊',d:'普攻 20% 機會觸發星隕：目標和周圍（範圍 260）的怪受到這一箭 8 倍傷害，爆擊時也算進去'},
 mecha:{s:'全隊',n:'超載核心',d:'機甲少年放大招時，其他弟子大招充能 +50；之後 6 秒內全隊大招傷害 ×2'},
 alchemist:{s:'全隊',n:'仙丹爐火',d:'全隊攻擊永遠 +30%（仙丹爐火不會熄）；每 20 秒山門回血 10%'},
 pharaoh:{s:'全隊',n:'黃金詛咒',d:'怪物 10% 會變成黃金怪，打死銅錢 ×5'},
 vampire:{s:'全隊',n:'血之契約',d:'弟子每次普攻打中，山門回血 0.2%'},
 general:{s:'全隊',n:'鐵壁軍令',d:'隊上每有 1 位近戰或坦克，山門受傷 -4%'},
 swordsman:{s:'全隊',n:'劍意連斬',d:'任何弟子普攻爆擊時，再追加一刀（爆擊傷害 ×1.5）；大招打中時有爆擊率的機會追加一刀（那下的 3 倍）；普攻爆擊帶出來的技能傷害（星隕、穿透、雷射、大棍等）也會追加一刀（×1.5）'},
 elf:{s:'全隊',n:'森林之歌',d:'緩速或暈眩中的怪物，受到全隊傷害 +30%'},
 kitsune:{s:'限法術弟子',n:'狐火連鎖',d:'法術弟子打中後，火會跳到附近另一隻（50%）'},
 panda:{s:'自身',n:'熊貓連拳',d:'熊貓每打 3 下來一記重拳：暈 1 秒、擊退'},
 pirate:{s:'全隊',n:'海盜寶藏',d:'打倒 Boss 和魔頭的靈石 ×1.5'},
 jiangshi:{s:'全隊',n:'屍變連鎖',d:'暈眩中的怪物被打死時，旁邊的怪物也被定身 1 秒'},
 witch:{s:'限遠程・法術',n:'破盾詛咒',d:'金盾精英的盾失效，遠程、法術也能全力打'},
 mummy:{s:'全隊',n:'千年怨念',d:'山門血量低於 30% 時，全隊攻擊 +50%'},
 yukionna:{s:'全隊',n:'永凍之息',d:'緩速中的怪物被打時，8% 機會凍住 2 秒'},
 catsamurai:{s:'全隊',n:'居合斬殺',d:'全隊對血量低於 30% 的怪物，傷害 ×2'},
 grandma:{s:'全隊',n:'滿漢全席',d:'全隊大招充能 +25%（冷卻最多降一半）；任何人放大招時山門回血 5%'},
 shark:{s:'限遠程弟子',n:'嗅血狂鯊',d:'遠程弟子打血量低於 50% 的怪物，傷害 +40%'},
 yangjian:{s:'全隊',n:'識破',d:'被哮天犬咬過的怪，受全隊傷害再 ×1.5'},
 nezha:{s:'自身',n:'混天綾',d:'普攻 20% 機會甩出混天綾，把目標附近一小群怪捲在一起綁住 1.5 秒'},
 aobing:{s:'全隊',n:'萬龍甲',d:'每 20 秒，鱗片飛到山門前排成冰鱗盾 3 秒（山門不受傷），盾散掉時鱗片飛出去打 6 隻怪（各 60%）'},
 monkey:{s:'自身',n:'齊天大聖',d:'每打 6 下，金箍棒變巨大砸下，全場怪物受到這一下 10 倍傷害，並且破甲 4 秒：受到全隊傷害 ×1.5'},
 slingkid:{s:'自身',n:'打水漂',d:'彈弓石子打中後，會再彈到旁邊 2 隻怪（各 50%）'},
 drummer:{s:'全隊',n:'激昂鼓點',d:'任何弟子放大招後，全隊攻擊速度再 +30%（6 秒）'},
 tanuki:{s:'自身',n:'影分身',d:'普攻 30% 機會分身，多丟 2 支手裡劍打別的怪（各 100%）'},
 moonrabbit:{s:'全隊',n:'月華滿盈',d:'每 25 秒自動張開月光護盾 3 秒（山門不受傷）；護盾期間全隊傷害 +40%'}
};
// 傳說 3 階覺醒：改變普攻打法
const AWAKE={yangjian:{n:'天眼神光',d:'普攻 25% 機會額頭射出神光，貫穿一整排（150%）'},nezha:{n:'三頭六臂',d:'每次普攻同時丟 3 個乾坤圈打 3 隻'},aobing:{n:'冰錐拔地',d:'普攻時地上冒出一排冰錐往前長，打中目標前後一整排（100%）'},monkey:{n:'毫毛分身',d:'普攻 30% 機會吹出 3 隻分身猴，各打一隻怪（各 80%），分身也會爆擊、也會觸發追加刀'},fox:{n:'狐火分身',d:'普攻會多射 2 團狐火，打另外 2 隻怪（各 60%）'},dragon:{n:'龍息',d:'普攻會噴出龍息，打中目標身後 350 距離內所有怪（40%）並緩速 40%'},archer:{n:'連珠箭',d:'攻擊速度 ×2'},mecha:{n:'核心超頻',d:'自己大招充能速度 ×1.6，大招傷害 ×1.5'},alchemist:{n:'丹藥精煉',d:'被動「九轉仙丹」效果 ×2'}};
const isAw=id=>AWAKE[id]&&S.roster[id]&&S.roster[id].tier>=3;
const isMax=id=>S.roster[id]&&S.roster[id].tier>=CH[id].t;
// 紅星：傳說滿 5 階後，用傳說碎片再升 6～10 星（紅星 1～5），每顆攻擊 ×1.5；10 星解鎖第二個極意
const RS_MAX=5,rsCost=n=>150+100*n,rsOf=id=>(S.roster[id]&&S.roster[id].rs)||0,isR10=id=>rsOf(id)>=RS_MAX;
// 神話進化：10 星（紅星 5 顆）後用 1000 傳說碎片進化，攻擊 ×4、大招 ×1.5；有 t6 圖就換圖，沒有先用 5 階圖加金光
const MYN={fox:'天狐神姬',dragon:'龍神將',archer:'月神星弓',mecha:'神機天將',alchemist:'丹仙真人',monkey:'齊天神猴',yangjian:'清源妙道真君',nezha:'蓮花太子',aobing:'東海龍太子'},chName=id=>isMy(id)&&MYN[id]?MYN[id]:CH[id].n;
// 神話極意：進化成神話後多一個效果，照各自流派再往上強化
const MYFX={yangjian:{n:'天眼看穿',d:'全隊對 Boss 的爆擊傷害 ×2。和齊天神猴（神話）一起上場「天宮鬥法」：哮天犬咬過、或在裂縫裡的怪，猴王打中 ×3；被猴王破甲的怪，楊戩打中 ×3；一人放大招，2 秒後另一人跟一招'},nezha:{n:'蓮花化身',d:'每關一次，山門血量掉到 30% 時開出蓮花，回到 60% 並 3 秒不受傷。和敖丙（神話）一起上場「冰火兩重天」：同時燒傷又凍住的怪受全隊傷害 ×4；一人放大招另一人跟一招；兩人都充滿時放大招變成合體「冰火合璧」'},aobing:{n:'冰封碎裂',d:'凍住（暈眩）中的怪受全隊傷害 ×2；凍住中死掉會碎裂，濺傷旁邊的怪（敖丙普攻 ×3）'},fox:{n:'狐火燎原',d:'燒傷中的怪物死掉會爆炸，周圍的怪受到牠最大血量 20% 的傷害（會連鎖；全隊增傷只吃 1/4；炸王最多天狐普攻 ×30）'},dragon:{n:'神龍擺尾',d:'每 8 秒，全場怪物暈 1.5 秒'},archer:{n:'月華連星',d:'爆擊時再多 30% 機會觸發星隕一擊'},mecha:{n:'天機全開',d:'神機天將放大招後 6 秒，全隊所有傷害 ×1.5（多出來的傷害算進神機天將）'},alchemist:{n:'九轉金丹',d:'全隊所有傷害再 ×1.5（多出來的傷害算進丹仙真人）'},monkey:{n:'七十二變',d:'毫毛分身變成 6 隻，每隻 100% 傷害'}};
// 合擊：神話弟子＋指定的非傳說搭檔一起上陣才生效（搭檔自己攻擊 ×10）
const CB={yangjian:{p:['general'],n:'天兵天將',d:'將軍放大招時，楊戩跟著劈一刀開出裂縫；裂縫裡的怪受近戰攻擊再 ×2'},fox:{p:['kitsune'],n:'九尾狐火陣',d:'狐火地面變 8 秒、範圍 2 倍；站在狐火地面上的怪受傷 ×3；妖狐藍火連鎖也會留下小火地'},dragon:{p:['mummy'],n:'龍捲縛天',d:'木乃伊聚怪後，龍神將自動把那一團挑飛；挑飛中的怪受傷 ×1.5 變 ×4'},archer:{p:['witch'],n:'星蛙標記',d:'星光標記一次標 3 隻；變成青蛙的怪也算被標記（受傷 ×2）'},mecha:{p:['pirate'],n:'天機艦砲',d:'每 8 秒全場艦砲齊射（全隊平均普攻 ×30），打中的怪都熔甲；熔甲受傷 +30% 變 +100%'},alchemist:{p:['drummer'],n:'丹鼓齊鳴',d:'丹仙和擊鼓小樂師大招給的充能都 ×2；戰鼓聲響期間仙丹爐火變 +300%'},monkey:{p:['tanuki'],n:'花果山迷陣',d:'毫毛分身數量 ×2；迷路的怪會被分身圍毆；破甲的增傷 ×1.5 變 ×3'}};
const CB_P=10,cbOn=id=>!!(PS.cb&&PS.cb[id]),cbPart=id=>!!(PS.cbp&&PS.cbp[id]);
const MY_COST=1000,isMy=id=>!!(S.roster[id]&&S.roster[id].my),myKey=id=>`c_${id}_${isMy(id)&&SRC[`c_${id}_6`]?6:S.roster[id].tier}`;
const R10FX={yangjian:{n:'哮天神犬',d:'哮天犬改成每 3 下就衝一次'},nezha:{n:'摘下乾坤圈',d:'每 30 秒摘下乾坤圈魔化 8 秒：攻擊 ×3、攻速 ×2、普攻帶火（燒傷）、乾坤圈彈跳 4 次'},aobing:{n:'寒冰封海',d:'普攻變慢改成 20% 機會直接凍住 1.5 秒'},fox:{n:'天狐焚天',d:'燒傷傷害 ×3'},dragon:{n:'龍王降臨',d:'普攻暈眩機率 25% → 50%，暈 2 秒'},archer:{n:'星河倒懸',d:'星隕一擊觸發機率 20% → 40%'},mecha:{n:'無限核心',d:'放完大招，自己馬上回 50 充能'},alchemist:{n:'金丹大成',d:'仙丹爐火的全隊攻擊 +30% 變成 +100%'},monkey:{n:'大鬧天宮',d:'齊天大聖改成每 3 下就砸一次'}};
const PS0=()=>({fbatk:0,atk:0,regen:0,slow:0,coin:0,charge:0,hp:0,front:0,back:0,crit:0,dr:0,mslow:0,boss:0,cap:0,spd:0,wind:0,bind:0,seal:0,ultm:0,critd:0,ctrl:0,burnm:0,bdmg:0,elite:0,flyd:0,burnc:0,burnv:0});
let PS=PS0();
function calcPassives(){PS=PS0();PS.mx={};PS.aw={};PS.r10={};PS.my={};S.team.slice(0,slots()).forEach(id=>{if(isMax(id))PS.mx[id]=1;if(isAw(id))PS.aw[id]=1;if(isR10(id))PS.r10[id]=1;if(isMy(id))PS.my[id]=1});
 if(PS.mx.disciple)PS.front+=.2;if(PS.mx.grandma)PS.charge+=.25;if(PS.mx.general)PS.dr+=.04*S.team.slice(0,slots()).filter(id=>['melee','tank'].includes(CH[id].role)).length;(S.fbOn||[]).slice(0,fbSlots()).forEach(k=>{if(S.fb[k])PS[FB[k].k]+=fbV(k)});
 S.team.slice(0,slots()).forEach(id=>{const p=PASSIVE[id];if(p){const t=S.roster[id].tier,m=id==='alchemist'&&isAw(id)?2:1;PS[p.k]+=p.v(t)*m;if(p.k2)PS[p.k2]+=p.v2(t)*m}});bTeam().forEach(k=>{if(S.beast[k]){PS[BAURA[k].k]+=bAuraV(k);for(let i=0;i<bFxN(k);i++)PS[BFX[k][i].k]+=bFxV(k,i)}});if(S.arrD&&S.arr[S.arrD]&&DV2[S.arrD])PS[DV2[S.arrD].k]+=dv2(S.arrD,S.arr[S.arrD].lv);{const tm=S.team.slice(0,slots());PS.cb={};PS.cbp={};for(const id in PS.my){const c=CB[id];if(!c)continue;const q=c.p.filter(x=>tm.includes(x));if(q.length){PS.cb[id]=1;q.forEach(x=>PS.cbp[x]=1)}}}PS.dr=Math.min(.6,PS.dr);PS.cap=Math.min(.3,PS.cap||0);PS.bind=Math.min(.6,PS.bind||0);if(fb10('taiji'))PS.regen=(PS.regen||0)+.01;PS.mslow=Math.min(.5,PS.mslow);PS.crit=Math.min(.6,PS.crit)}
// ult: sweep 劍氣橫掃 / rain 從天而降 / slam 震地衝擊波 / laser 光砲 / heal 補山門 / freeze 定身 / drain 吸血
const CH={
 disciple:{n:'掃地弟子',r:'S',t:5,role:'melee',c:'#9fe3ff',ult:'sweep',un:'掃地風暴'},
 fox:{n:'狐仙少女',r:'L',t:5,role:'magic',c:'#ff8a3d',ult:'rain',rk:'fire',un:'狐火流星'},
 dragon:{n:'龍騎小將',r:'L',t:5,role:'tank',c:'#ff5a40',ult:'slam',un:'龍槍震地'},
 archer:{n:'星弓少女',r:'L',t:5,role:'ranged',c:'#9dffb0',ult:'focus',rk:'arrow',un:'鷹眼星瞳'},
 mecha:{n:'機甲少年',r:'L',t:5,role:'tank',c:'#59c8ff',ult:'laser',un:'能量砲'},
 alchemist:{n:'煉丹童子',r:'L',t:5,role:'support',c:'#ffd84a',ult:'heal',un:'九轉回春丹'},
 pharaoh:{n:'法老王',r:'R',t:3,role:'ranged',c:'#ffd24a',ult:'rain',rk:'sand',un:'黃金沙暴'},
 vampire:{n:'吸血鬼',r:'E',t:3,role:'melee',c:'#ff3a6a',ult:'drain',un:'血月之宴'},
 general:{n:'鐵甲將軍',r:'N',t:3,role:'tank',c:'#ffb04a',ult:'slam',un:'大刀震山'},
 swordsman:{n:'流浪劍士',r:'N',t:3,role:'melee',c:'#c8e8ff',ult:'sweep',un:'疾風劍'},
 elf:{n:'森林精靈',r:'R',t:3,role:'magic',c:'#7dff6a',ult:'freeze',fk:'root',un:'古樹纏繞'},
 kitsune:{n:'妖狐',r:'R',t:3,role:'ranged',c:'#5ab8ff',ult:'rain',rk:'bluefire',un:'藍狐火'},
 panda:{n:'熊貓拳師',r:'N',t:3,role:'melee',c:'#ffffff',ult:'slam',un:'熊貓震地拳'},
 pirate:{n:'海盜船長',r:'N',t:3,role:'ranged',c:'#ffcf6a',ult:'rain',rk:'bomb',un:'加農砲齊射'},
 jiangshi:{n:'殭屍道士',r:'N',t:3,role:'support',c:'#ffe86a',ult:'freeze',fk:'talisman',un:'定身符'},
 witch:{n:'巫婆學徒',r:'N',t:3,role:'magic',c:'#c88aff',ult:'rain',rk:'star',un:'星星墜落'},
 mummy:{n:'木乃伊',r:'N',t:3,role:'tank',c:'#f0e2b0',ult:'slam',un:'繃帶捆綁'},
 yukionna:{n:'雪女',r:'E',t:3,role:'magic',c:'#bdf4ff',ult:'freeze',fk:'ice',un:'暴風雪'},
 catsamurai:{n:'貓武士',r:'E',t:3,role:'melee',c:'#ffe0a0',ult:'sweep',un:'貓爪居合斬'},
 grandma:{n:'廚師阿嬤',r:'N',t:3,role:'support',c:'#ffb07a',ult:'heal',un:'滿漢全席'},
 shark:{n:'鯊魚潛水兵',r:'R',t:3,role:'ranged',c:'#6ae0ff',ult:'rain',rk:'harpoon',un:'三叉戟雨'},
 yangjian:{n:'楊戩',r:'L',t:5,role:'melee',c:'#c8d8ff',ult:'slam',un:'劈山裂地',fs:1},
 nezha:{n:'哪吒',r:'L',t:5,role:'ranged',c:'#ff5a7a',ult:'sweep',un:'魔焰衝陣',fs:1},
 aobing:{n:'敖丙',r:'L',t:5,role:'magic',c:'#7ae0ff',ult:'freeze',fk:'ice',un:'萬龍甲・鱗暴',fs:1},
 monkey:{n:'小猴王',r:'L',t:5,role:'melee',c:'#ffc23a',ult:'slam',un:'金箍棒震天'},
 slingkid:{n:'彈弓頑童',r:'N',t:3,role:'ranged',c:'#e0b070',ult:'rain',rk:'bomb',un:'漫天石雨'},
 drummer:{n:'擊鼓小樂師',r:'N',t:3,role:'support',c:'#ff7a5a',ult:'slam',un:'戰鼓震天'},
 tanuki:{n:'狸貓忍者',r:'R',t:3,role:'ranged',c:'#d0a878',ult:'sweep',un:'手裡劍旋風'},
 moonrabbit:{n:'月兔仙子',r:'E',t:3,role:'support',c:'#e6dcff',ult:'freeze',fk:'ice',un:'月華護界'}
};
const POOL={N:[],R:[],E:[],L:[]};for(const k in CH){if(CH[k].r!=='S')POOL[CH[k].r].push(k)}
const lPool=()=>POOL.L.filter(i=>!CH[i].fs||unl('fengshen')),fsOk=i=>!CH[i].fs||unl('fengshen')||!!S.roster[i];
const MON={
 slime:{n:'果凍史萊姆',hp:.7,spd:52,dmg:.6,coin:1,from:1,hop:1},
 mushroom:{n:'蘑菇妖',hp:1,spd:44,dmg:.8,coin:1,from:2},
 bat:{n:'蝙蝠妖',hp:.6,spd:82,dmg:.6,coin:1,from:4,fly:1},
 imp:{n:'小鬼',hp:1.2,spd:58,dmg:1,coin:1.2,from:5},
 umbrella:{n:'紙傘妖',hp:1,spd:72,dmg:.9,coin:1.1,from:7,hop:1},
 skeleton:{n:'骷髏兵',hp:1.6,spd:44,dmg:1.2,coin:1.4,from:11},
 wolf:{n:'狼妖',hp:1.3,spd:92,dmg:1.2,coin:1.4,from:13},
 golem:{n:'石頭怪',hp:3.4,spd:30,dmg:2,coin:2.5,from:16}
};
