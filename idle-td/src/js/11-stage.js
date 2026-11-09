/* ---------- 過關、失敗、試煉塔 ---------- */
function stageWin() {
  if (B.trial) {
    trialEnd(true);
    return;
  }
  if (B.xf) {
    xEnd(true);
    return;
  }
  const s = S.stage,
    first = s > S.best,
    boss = s % 10 === 0;
  const coin = Math.round(5 * Math.pow(1.088, s - 1) * (boss ? 4 : 1) * TR('coin') * XYR() * (fb10('jubao') ? 3 : 1));
  const tens = Math.floor(s / 10);
  const gem = first ? (boss ? 60 + tens * 2 : 10 + Math.floor(tens / 2)) : boss ? 20 + tens : 5 + Math.floor(tens / 2);
  const stone = Math.round((first ? (boss ? 20 + 5 * tens : 4 + 2 * tens) : boss ? 8 + 2 * tens : 2 + tens) * XYR());
  const pill = boss ? (first ? 3 : 1) : 0;
  const demon = s % 100 === 0;
  let fbMsg = '';
  if (demon) {
    const gm2 = first ? 300 : 60,
      st2 = stone * 2,
      pl2 = first ? 10 : 3;
    S.gem += gm2;
    S.stone += st2;
    S.pill += pl2;
  }
  S.coin += coin;
  S.gem += gem;
  S.stone += stone;
  S.pill += pill;
  // 離線收益用：記下這關「刷關」能拿多少（首通加成不算），和過關時間
  {
    const rg = boss ? 20 + tens : 5 + Math.floor(tens / 2),
      rst = Math.round((boss ? 8 + 2 * tens : 2 + tens) * XYR());
    const now = Date.now();
    S.wlog = (S.wlog || []).filter(w => now - w[0] < 3600e3).slice(-59);
    S.wlog.push([now, coin, rg, rst]);
  }
  if (boss && PS.mx && PS.mx.pirate) S.gem += Math.round(gem * 0.5);
  if (boss) {
    const n = demon ? (first ? 2 : 1) : (first && Math.random() < 0.35) || (!first && Math.random() < 0.08) ? 1 : 0;
    for (let i = 0; i < n; i++) {
      const r = giveFb();
      fbMsg += `${FB[r.k].n} ${r.txt}　`;
    }
  }
  if (fbMsg) setTimeout(() => toast('法寶：' + fbMsg), 1600);
  if (first) S.best = s;
  if (S.farm) {
    S.farmN = (S.farmN || 0) + 1;
  } else S.stage = s + 1;
  toast(
    `${S.farm ? `刷關 ${S.farmN} 次｜` : ''}過關！ +${fmt(coin)} 銅錢　+${gem} 靈石　+${stone} 山門石${pill ? `　+${pill} 進階丹` : ''}`
  );
  banner('過關！');
  SND.play('win');
  SND.setBoss(false);
  if (first && GIFTS[s]) giveGift(GIFTS[s]);
  if (unl('xiong') && s >= 300 && !B.xenc && Math.random() < 0.02) xOffer();
  persist();
  updHud();
}
function stageLose() {
  if (B.trial) {
    trialEnd(false);
    return;
  }
  if (B.xf) {
    xEnd(false);
    return;
  }
  B.state = 'lose';
  B.stateT = 0;
  const s = S.stage;
  const back = Math.max(1, s - 1);
  S.stage = back;
  S.farm = 1;
  S.farmN = 0;
  banner('山門被打破了…', true);
  SND.play('lose');
  SND.setBoss(false);
  toast(`退回第 ${back} 關原地刷資源。變強後按左上「挑戰」再往前！`);
  B.enemies.forEach(e => {
    if (!e.dead) {
      e.dead = 0.001;
    }
  });
  document.getElementById('bossBar').style.display = 'none';
  persist();
  updHud();
}

function trialStart(f) {
  if (!trCan(f) || B.trial || B.xf) return;
  B.trial = {f};
  closePanel();
  startStage();
}
function trialEnd(win) {
  const f = B.trial.f;
  B.state = win ? 'win' : 'lose';
  B.stateT = 0;
  B.enemies.forEach(e => {
    if (!e.dead) e.dead = 0.001;
  });
  document.getElementById('bossBar').style.display = 'none';
  SND.setBoss(false);
  if (win) {
    let msg = `試煉塔第 ${f} 層通過！`;
    const first = !trDone(f);
    if (first) {
      S.trDone = S.trDone || {};
      S.trDone[f] = 1;
      const gm = f === 9 ? 3000 : f === 10 ? 0 : 200 * f;
      S.gem += gm;
      const fr = f <= 8 ? 50 : 100;
      TRIAL[f - 1].forEach(k => (S.bfr[k] = (S.bfr[k] || 0) + fr));
      msg += `${gm ? `　+${gm} 靈石` : ''}　${TRIAL[f - 1].map(k => BEAST[k].n).join('、')}碎片各 +${fr}`;
      if (f === 10) {
        S.slot5 = 1;
        msg += '　🎉 第 5 格神獸欄開放！';
      }
    } else msg += '（獎勵只有第一次）';
    banner('試煉通過！');
    SND.play('win');
    toast(msg);
  } else {
    banner('試煉失敗…', true);
    SND.play('lose');
    toast('試煉失敗，弟子和神獸變強後再來！打輸不會掉關');
  }
  B.trial = null;
  persist();
  updHud();
}
