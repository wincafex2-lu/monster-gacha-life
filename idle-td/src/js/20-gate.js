/* 山門 */
let gtab = 'gate';
const giftAt = k => {
  const g = Object.entries(GIFTS).find(([, v]) => v.k === k);
  return g ? g[0] : 0;
};
// 還沒解鎖的東西：圖片變暗
const lockImg = (src, f) =>
  `<div class="th"><img src="${src}" alt="" style="filter:${f || 'brightness(0) opacity(.35)'}"></div>`;
function renderGate() {
  $('shTitle').textContent = '山門';
  const T = [
    ['gate', '山門・修煉'],
    ['arr', '陣法'],
    ['beast', '神獸'],
    ['fb', '法寶']
  ];
  $('shTabs').innerHTML = T.map(
    ([k, n]) => `<button class="btn ${gtab === k ? 'on' : ''}" data-gk="${k}">${n}</button>`
  ).join('');
  $('shTabs')
    .querySelectorAll('[data-gk]')
    .forEach(
      b =>
        (b.onclick = () => {
          gtab = b.dataset.gk;
          renderGate();
        })
    );
  const lv = S.gateLv,
    c = gateCost(lv);
  const nx = SLOT_LV.find(([l]) => l > lv),
    nb = BEAST_SLOT.find(([l]) => l > lv);
  let h = '';
  if (gtab === 'gate') h += gateTabGate(lv, c, nx, nb);
  if (gtab === 'tur') h += gateTabTur();
  if (gtab === 'arr') h += gateTabArr(lv);
  if (gtab === 'beast') h += gateTabBeast();
  if (gtab === 'fb') h += gateTabFb(lv);
  $('shBody').innerHTML = h;
  const Q = (sel, f) =>
    $('shBody')
      .querySelectorAll(sel)
      .forEach(b => (b.onclick = () => f(b)));
  Q('[data-fb]', b => {
    const k = b.dataset.fb;
    if (S.fbOn.includes(k)) S.fbOn = S.fbOn.filter(x => x !== k);
    else {
      if (S.fbOn.length >= fbSlots()) {
        toast(`法寶只能裝 ${fbSlots()} 件，升級山門可以多裝`);
        return;
      }
      S.fbOn.push(k);
    }
    refreshField();
    renderGate();
  });
  if ($('gAsc')) {
    let armed = 0;
    $('gAsc').onclick = () => {
      if ((S.best || 0) < ascMin()) return;
      if (!armed) {
        armed = 1;
        $('gAsc').textContent = '確定飛升？再按一次';
        $('gAscTip').textContent = `3 秒內再按一次，拿 ${xyGain(S.best)} 仙元從第 1 關重來`;
        setTimeout(() => {
          armed = 0;
          if ($('gAsc')) {
            $('gAsc').textContent = '飛升';
            $('gAscTip').textContent = '';
          }
        }, 3000);
        return;
      }
      ascend();
    };
  }
  if ($('gXBtn'))
    $('gXBtn').onclick = () => {
      xOffer();
      closePanel();
      toast('凶獸出沒！按畫面上方的按鈕挑戰');
    };
  if ($('gJumpBtn'))
    $('gJumpBtn').onclick = () => {
      const n = Math.floor(+$('gJump').value || 0);
      if (n < 1 || n > 99999) {
        toast('只能跳到 1～99999 關');
        return;
      }
      if (B.trial) return;
      S.stage = n;
      S.farm = 1;
      S.farmN = 0;
      closePanel();
      startStage();
      persist();
      updHud();
      toast(`跳到第 ${n} 關`);
    };
  if ($('gCodeBtn'))
    $('gCodeBtn').onclick = () => {
      const c = CODES[($('gCode').value || '').trim()];
      if (!c) {
        toast('兌換碼不正確');
        return;
      }
      if (unl(c.k)) {
        toast(`${c.n} 已經開放了`);
        return;
      }
      S.unl = S.unl || {};
      S.unl[c.k] = 1;
      SND.play('rare');
      toast(`🎉 ${c.n} 開放了！快去召喚看看`);
      persist();
      renderGate();
    };
  if ($('gReset')) {
    let armed = 0;
    $('gReset').onclick = () => {
      if (!armed) {
        armed = 1;
        $('gReset').textContent = '真的要清除？再按一次';
        $('gResetTip').textContent = '3 秒內再按一次就會清除';
        setTimeout(() => {
          armed = 0;
          if ($('gReset')) {
            $('gReset').textContent = '清除存檔，從頭開始';
            $('gResetTip').textContent = '所有弟子、關卡、資源都會消失，不能復原';
          }
        }, 3000);
        return;
      }
      wiped = true;
      try {
        localStorage.removeItem(SKEY);
      } catch (e) {}
      location.reload();
    };
  }
  if ($('gUpAll'))
    $('gUpAll').onclick = () => {
      let n = 0;
      while (S.stone >= gateCost(S.gateLv)) {
        S.stone -= gateCost(S.gateLv);
        S.gateLv++;
        n++;
      }
      if (!n) return;
      refreshField();
      B.gateHp = B.gateMax;
      toast(`山門連升 ${n} 級，到 Lv${S.gateLv}！`);
      renderGate();
      updHud();
    };
  if ($('gUp'))
    $('gUp').onclick = () => {
      if (S.stone < c) return;
      S.stone -= c;
      S.gateLv++;
      refreshField();
      B.gateHp = B.gateMax;
      toast(`山門升到 Lv${S.gateLv}！`);
      renderGate();
      updHud();
    };
  const trn = (k, n) => {
    let d = 0;
    while (n-- > 0 && S.coin >= trainCost(S.train[k] || 0)) {
      S.coin -= trainCost(S.train[k] || 0);
      S.train[k] = (S.train[k] || 0) + 1;
      d++;
    }
    if (d) {
      if (k === 'hp') {
        const r = B.gateHp / B.gateMax;
        B.gateMax = gateMax(S.gateLv) * (1 + PS.hp);
        B.gateHp = B.gateMax * r;
      }
      persist();
    }
    renderGate();
    updLive();
  };
  Q('[data-tr]', b => trn(b.dataset.tr, 1));
  Q('[data-tr10]', b => trn(b.dataset.tr10, 10));
  Q('[data-trmax]', b => trn(b.dataset.trmax, 1e5));
  const upTur = (k, n) => {
    const t0 = tierOf(S.tur[k].lv);
    let c = 0;
    while (c < n) {
      const cc = turCost(S.tur[k].lv);
      if (S.coin < cc) break;
      S.coin -= cc;
      S.tur[k].lv++;
      c++;
    }
    if (!c) return;
    if (tierOf(S.tur[k].lv) > t0) {
      toast(`${TUR[k].n} 進化了！`);
      refreshField();
    } else if (n > 1) toast(`${TUR[k].n} 升了 ${c} 級`);
    persist();
    renderGate();
    updLive();
  };
  Q('[data-tu]', b => upTur(b.dataset.tu, 1));
  Q('[data-tu99]', b => upTur(b.dataset.tu99, 99));
  Q('[data-tt]', b => {
    const k = b.dataset.tt;
    if (S.turTeam.includes(k)) S.turTeam = S.turTeam.filter(x => x !== k);
    else {
      if (S.turTeam.length >= turSlots()) {
        toast(`塔位只有 ${turSlots()} 座，升級山門可以多擺`);
        return;
      }
      S.turTeam.push(k);
    }
    refreshField();
    renderGate();
  });
  const upArr = (k, n) => {
    let c = 0;
    while (c < n) {
      const cc = turCost(S.arr[k].lv);
      if (S.coin < cc) break;
      S.coin -= cc;
      S.arr[k].lv++;
      c++;
    }
    if (!c) return;
    if (S.arrD === k) refreshField();
    if (n > 1) toast(`${ARR[k].n} 升了 ${c} 級`);
    persist();
    renderGate();
    updLive();
  };
  Q('[data-au]', b => upArr(b.dataset.au, 1));
  Q('[data-au99]', b => upArr(b.dataset.au99, 99));
  Q('[data-as]', b => {
    const k = b.dataset.as,
      sl = b.dataset.sl;
    S[sl] = S[sl] === k ? null : k;
    refreshField();
    renderGate();
  });
  Q('[data-bs]', b => {
    const k = b.dataset.bs,
      has = S.beast[k],
      fr = S.bfr[k] || 0;
    if (!has) {
      if (fr < B_STAR[1]) return;
      S.bfr[k] = fr - B_STAR[1];
      S.beast[k] = {st: 1};
      if (S.beastTeam.length < beastSlots()) S.beastTeam.push(k);
      SND.play('rare');
      toast(`神獸 ${BEAST[k].n} 合成成功！`);
    } else {
      const st = bSt(k);
      if (st < B_MAX) {
        if (fr < B_STAR[st + 1]) return;
        S.bfr[k] = fr - B_STAR[st + 1];
        has.st = st + 1;
        SND.play('rare');
        toast(
          `${BEAST[k].n} 升到 ${has.st} 星！${B_FXAT.includes(has.st) ? `學會新效果：${BFX[k][B_FXAT.indexOf(has.st)].t}` : has.st <= 5 ? `光環提升` : has.st <= 15 ? `${BFX[k][(has.st - 6) % 4].t} 升到 Lv${bFxLv(k, (has.st - 6) % 4)}` : `大招升到 Lv${bUlv(k)}`}`
        );
      } else {
        if (fr < B_BRK || (has.brk || 0) >= B_BRKMAX) return;
        S.bfr[k] = fr - B_BRK;
        has.brk = (has.brk || 0) + 1;
        toast(`${BEAST[k].n} 突破 +${has.brk}`);
      }
    }
    refreshField();
    renderGate();
    updLive();
  });
  Q('[data-trial]', b => {
    trialStart(+b.dataset.trial);
  });
  Q('[data-xo]', b => {
    const k = b.dataset.xo;
    S.xOn = S.xOn === k ? null : k;
    X.charge = 0;
    persist();
    renderGate();
  });
  Q('[data-bt]', b => {
    const k = b.dataset.bt;
    if (S.beastTeam.includes(k)) S.beastTeam = S.beastTeam.filter(x => x !== k);
    else {
      if (S.beastTeam.length >= beastSlots()) {
        toast(`現在只能帶 ${beastSlots()} 隻神獸，升級山門可以多帶`);
        return;
      }
      S.beastTeam.push(k);
    }
    refreshField();
    renderGate();
  });
}
// 山門頁「山門：升級、站位、飛升、兌換碼、設定」分頁的內容
function gateTabGate(lv, c, nx, nb) {
  let h = '';
  h += `<div class="gateinfo"><div class="pic"><img src="${SRC[gateKey(false)]}" alt=""></div><div class="info" style="flex:1;min-width:200px"><h3 style="margin:0;font-family:var(--title);font-size:24px">山門 Lv${lv}</h3>
  <div class="stat"><b>城門血量</b><span>${fmt(gateMax(lv))} → ${fmt(gateMax(lv + 1))}${PS.hp ? `（弟子被動再 +${Math.round(PS.hp * 100)}%）` : ''}</span><b>樓閣站位</b><span>${slots()} 位${nx ? `（Lv${nx[0]} 變 ${nx[1]} 位）` : ''}</span><b>神獸</b><span>${beastSlots()} 隻${nb ? `（Lv${nb[0]} 變 ${nb[1]} 隻）` : ''}</span><b>防禦陣</b><span>${lv >= 5 ? '已開放' : 'Lv5 開放'}</span><b>弟子等級上限</b><span>Lv${lv * 5 + 10}（所有弟子一樣）</span></div>
  <div class="row" style="margin-top:8px"><button class="btn gold" id="gUp" ${S.stone < c ? 'disabled' : ''}>升級山門 <span class="cost"><span class="ico stone"></span>${fmt(c)}</span></button><button class="btn gold" id="gUpAll" ${S.stone < c ? 'disabled' : ''}>連升</button><span class="hint">山門石：每次過關都會拿到，Boss 給比較多</span></div></div></div>
  <h3 class="sec">修煉（用銅錢，沒有上限）</h3><div class="list">`;
  for (const k in TRAIN) {
    const t = TRAIN[k],
      l = S.train[k] || 0,
      cc = trainCost(l);
    h += `<div class="item"><div class="th" style="display:grid;place-items:center;font-family:var(--title);font-size:28px;color:#7a4a20">${t.n[0]}</div><div class="tx"><b>${t.n} Lv${l}</b><div>${t.d} +${Math.round(t.per * l * 100)}%（下一級 +${Math.round(t.per * (l + 1) * 100)}%）</div></div>
   <button class="btn green" data-tr="${k}" ${S.coin < cc ? 'disabled' : ''}>修煉 <span class="cost"><span class="ico coin"></span>${fmt(cc)}</span></button><button class="btn green" data-tr10="${k}" ${S.coin < cc ? 'disabled' : ''}>×10</button><button class="btn green" data-trmax="${k}" ${S.coin < cc ? 'disabled' : ''}>全部</button></div>`;
  }
  {
    const best = S.best || 0,
      g = xyGain(best),
      ok = best >= ascMin();
    h += `</div><h3 class="sec">飛升</h3><div class="item" style="display:block"><div class="tx"><b>境界「${realmName(S.asc || 0)}」・仙元 ${S.xy || 0}${S.asc ? `（已飛升 ${S.asc} 次）` : ''}</b><div>永久：境界攻擊 ×${fmt(RLM())}、等級上限 +${RLM_LV * (S.asc || 0)}；仙元攻擊 ×${XYA0().toFixed(2)}、銅錢和山門石 ×${XYR().toFixed(2)}</div><div style="opacity:.75;font-size:.9em">每次飛升：境界升一級（攻擊再 ×${RLM_MUL}、等級上限 +${RLM_LV}），前一半關卡直接算過關</div>
   <div style="margin-top:4px">${ok ? `現在飛升可以拿到 <b style="color:#c2410c">${g} 仙元</b>（最高第 ${best} 關，打越遠拿越多）` : `第 ${(S.asc || 0) + 1} 次飛升要打到第 ${ascMin()} 關（現在最高第 ${best} 關）`}</div>
   <div style="opacity:.75;font-size:.9em;margin-top:2px">重來：關卡、山門等級、弟子等級、銅錢、山門石、修煉、陣法神獸等級<br>保留：所有弟子和階級、突破、法寶、靈石、進階丹、陣法神獸</div></div>
   <div class="row" style="margin-top:6px"><button class="btn gold" id="gAsc" ${ok ? '' : 'disabled'}>飛升</button><span class="hint" id="gAscTip"></span></div></div>`;
  }
  h += `<h3 class="sec">兌換碼</h3><div class="row"><input id="gCode" placeholder="輸入兌換碼" style="font-size:16px;padding:6px 10px;border-radius:8px;border:2px solid #b08a4a;width:180px"><button class="btn gold" id="gCodeBtn">兌換</button><span class="hint">${Object.values(
    CODES
  )
    .filter(c => unl(c.k))
    .map(c => '✓ ' + c.n)
    .join('　')}</span></div>`;
  if (unl('jump'))
    h += `<h3 class="sec">跳關（測試用）</h3><div class="row"><input id="gJump" type="number" min="1" value="${Math.min(1000, Math.max(1, S.best || 1))}" style="font-size:16px;padding:6px 10px;border-radius:8px;border:2px solid #b08a4a;width:110px"><button class="btn gold" id="gJumpBtn">跳到這關</button>${unl('xiong') ? '<button class="btn" id="gXBtn">叫凶獸出來</button>' : ''}<span class="hint">測試用：任何關都能跳（1～99999），跳過去會先原地刷關</span></div>`;
  h += `<h3 class="sec">設定</h3><div class="row"><button class="btn" id="gReset" style="background:linear-gradient(#e2523a,#a8281a);color:#fff">清除存檔，從頭開始</button><span class="hint" id="gResetTip">所有弟子、關卡、資源都會消失，不能復原</span></div>`;
  return h;
}
// 山門頁「塔（已移除）」分頁的內容
function gateTabTur() {
  let h = '';
  h += `<h3 class="sec" style="margin-top:0">塔（擺上 ${S.turTeam.length}/${turSlots()}）</h3><div class="list">`;
  for (const k in TUR) {
    const has = S.tur[k];
    const d = TUR[k];
    const g = giftAt(k);
    if (!has) {
      h += `<div class="item lock">${lockImg(SRC['t_' + k + '_1'])}<div class="tx"><b>${d.n}</b><div>${d.d}｜${g ? `第 ${g} 關第一次過關送，` : ''}召喚「陣法」可以抽到</div></div></div>`;
      continue;
    }
    const l = has.lv,
      cc = turCost(l);
    const on = S.turTeam.includes(k);
    h += `<div class="item ${on ? 'on' : ''}"><div class="th"><img src="${SRC['t_' + k + '_' + tierOf(l)]}" alt=""></div><div class="tx"><b>${d.n} Lv${l}${has.brk ? ` 突破+${has.brk}` : ''}</b><div>${d.d}｜攻擊 ${fmt(turAtk(k))}｜Lv10 換外型並一次打 2 隻、Lv20 打 3 隻</div></div>
   <button class="btn green" data-tu="${k}" ${S.coin < cc ? 'disabled' : ''}>升級 <span class="cost"><span class="ico coin"></span>${fmt(cc)}</span></button><button class="btn green" data-tu99="${k}" ${S.coin < cc ? 'disabled' : ''}>連升</button><button class="btn blue" data-tt="${k}">${on ? '收起' : '擺上'}</button></div>`;
  }
  h += '</div>';
  return h;
}
// 山門頁「陣法」分頁的內容
function gateTabArr(lv) {
  let h = '';
  for (const [tt, title, sl] of [
    ['a', '攻擊陣（鋪在山門前到神獸，選 1 個）', 'arrA'],
    ['d', '防禦陣（鋪在樓閣下，選 1 個）', 'arrD']
  ]) {
    h += `<h3 class="sec" ${tt === 'a' ? 'style="margin-top:0"' : ''}>${title}${tt === 'd' && lv < 5 ? '　<span class="hint">山門 Lv5 開放</span>' : ''}</h3><div class="list">`;
    for (const k in ARR) {
      const d = ARR[k];
      if (d.t !== tt) continue;
      const has = S.arr[k];
      const g = giftAt(k);
      const desc = tt === 'a' ? (has ? aDesc(k, has.lv) : d.d) : d.d(has ? has.lv : 1);
      if (!has) {
        h += `<div class="item lock">${lockImg(SRC['i_' + k], 'grayscale(1) opacity(.4)')}<div class="tx"><b>${d.n}</b><div>${desc}｜${g ? `第 ${g} 關第一次過關送，` : ''}召喚「陣法」可以抽到</div></div></div>`;
        continue;
      }
      const cc = turCost(has.lv),
        on = S[sl] === k;
      h += `<div class="item ${on ? 'on' : ''}"><div class="th"><img src="${SRC['i_' + k]}" alt=""></div><div class="tx"><b>${d.n} Lv${has.lv}${has.brk ? ` 突破+${has.brk}` : ''}</b><div>${desc}${tt === 'a' ? `｜每秒 ${fmt(arrDps(k) * (d.m || 0) + (k === 'a_thunder' ? (arrDps(k) * 2.6) / 1.5 : 0))}` : ''}</div></div>
    <button class="btn green" data-au="${k}" ${S.coin < cc ? 'disabled' : ''}>升級 <span class="cost"><span class="ico coin"></span>${fmt(cc)}</span></button><button class="btn green" data-au99="${k}" ${S.coin < cc ? 'disabled' : ''}>連升</button><button class="btn blue" data-as="${k}" data-sl="${sl}" ${tt === 'd' && lv < 5 ? 'disabled' : ''}>${on ? '使用中' : '使用'}</button></div>`;
    }
    h += '</div>';
  }
  return h;
}
// 山門頁「神獸、試煉塔」分頁的內容
function gateTabBeast() {
  let h = '';
  h += `<h3 class="sec" style="margin-top:0">神獸試煉塔（${trCnt()}/10 層）</h3><div class="hint" style="margin-bottom:6px">神獸當 Boss 來挑戰你的隊伍，第 n 層約等於第 100×n 關的魔頭（第 9、10 層四隻一起上）。打輸不會掉關。第一次通過拿靈石和那隻神獸的碎片，<b>10 層全通開第 5 格神獸欄</b>${S.slot5 ? '（已開放）' : ''}。</div><div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:12px">${TRIAL.map(
    (ks, i) => {
      const f = i + 1,
        done = trDone(f),
        op = trOpen(f),
        can = trCan(f) && !B.trial;
      return `<button class="btn ${done ? '' : can ? 'gold' : ''}" data-trial="${f}" ${can ? '' : 'disabled'} style="padding:4px 10px;min-width:96px">${f} 層 ${TRN(f)}<span style="font-size:11px;display:block">${!op ? '即將開放' : done ? '✓ 已通過（可重打）' : !can && !B.trial ? '先過前面的層' : f === 9 ? '獎勵 3000 靈石' : f === 10 ? '獎勵 第 5 格' : `獎勵 ${200 * f} 靈石`}</span></button>`;
    }
  ).join('')}</div>`;
  h += `<h3 class="sec">神獸（上陣 ${S.beastTeam.length}/${beastSlots()}）</h3><div class="hint" style="margin-bottom:8px">神獸用碎片升星：召喚頁「神獸」分頁用靈石抽碎片。100 片合成。每升一星只加一項：1～5 星光環每星 +50%，2～5 星開 4 個加成效果；6～15 星輪流升加成效果；16～30 星只升大招（每級傷害 +50%）。另外每升一星攻擊 +50%。</div><div class="list">`;
  for (const k in BEAST) {
    if (BEAST[k].sh && !S.beast[k] && !unl('shanhai')) continue;
    const has = S.beast[k],
      d = BEAST[k],
      fr = S.bfr[k] || 0;
    if (!has) {
      h += `<div class="item lock">${lockImg(SRC['b_' + k])}<div class="tx"><b>神獸 ${d.n}</b><div>${d.d}｜碎片 ${fr}/${B_STAR[1]}</div></div><button class="btn gold" data-bs="${k}" ${fr >= B_STAR[1] ? '' : 'disabled'}>合成</button></div>`;
      continue;
    }
    const st = bSt(k),
      nc = st < B_MAX ? B_STAR[st + 1] : B_BRK,
      canUp = st < B_MAX ? fr >= nc : (has.brk || 0) < B_BRKMAX && fr >= B_BRK,
      on = S.beastTeam.includes(k);
    h += `<div class="item ${on ? 'on' : ''}"><div class="th"><img src="${SRC['b_' + k]}" alt=""></div><div class="tx"><b>神獸 ${d.n} <span style="color:#ff9a1e">${st <= 10 ? '★'.repeat(Math.min(5, st)) : ''}</span><span style="color:#ff3a2a">${st <= 10 ? '★'.repeat(Math.max(0, st - 5)) : `★×${st}`}</span>${has.brk ? `+${has.brk}` : ''}${paired(k) ? ' <span style="color:#e3561e">搭配中 ×1.5</span>' : ''}</b><div>${d.d}｜攻擊 ${fmt(beastAtk(k))}｜碎片 ${fr}${st < B_MAX ? `/${nc}` : ''}<br>光環：${BAURA[k].t} +${Math.round(bAuraV(k) * 100)}%｜大招「${BULT[k].n}」Lv${bUlv(k)}：${BULT[k].d}${bUlv(k) > 1 ? `（傷害 ×${1 + 0.5 * (bUlv(k) - 1)}${k === 'xuanwu' ? '、護盾更久、回血更多' : ''}）` : ''}${st < 16 ? '<span style="opacity:.55">（16 星起大招升級）</span>' : ''}<br>${BFX[k].map((x, i) => (i < bFxN(k) ? `<span style="color:#2a8a3a">✓ ${x.t} ${x.f(bFxV(k, i))} Lv${bFxLv(k, i)}</span>` : `<span style="opacity:.55">${B_FXAT[i]} 星解鎖：${x.t} ${x.f(x.v)}</span>`)).join('、')}<br>${PAIR[k] ? `搭配${ARR[PAIR[k]].n}：神獸和陣法傷害 ×1.5${k === 'xuanwu' ? '、金剛陣減傷再 +10%' : ''}` : ''}${RES.filter(
      q => q.ks.includes(k)
    )
      .map(
        q =>
          `${PAIR[k] || RES.filter(z => z.ks.includes(k))[0] !== q ? '<br>' : ''}<span style="color:${q.on() ? '#0a7a8a' : '#999'}">共鳴「${q.n}」${q.ks.map(x => BEAST[x].n).join('＋')}${q.hero ? '＋' + CH[q.hero].n : ''}：${q.d}${q.on() ? '（生效中）' : ''}</span>`
      )
      .join(
        ''
      )}</div></div><button class="btn gold" data-bs="${k}" ${canUp ? '' : 'disabled'}>${st < B_MAX ? `升星 <span class="cost">碎片 ${nc}</span>` : '已滿星'}</button><button class="btn blue" data-bt="${k}">${on ? '休息' : '上陣'}</button></div>`;
  }
  h += `</div><div class="hint" style="margin-top:8px">山門 Lv15、30、45 可以多帶一隻神獸</div>`;
  if (unl('xiong')) {
    h += `<h3 class="sec">葫蘆・上古凶獸（派出 ${xCur() ? XB[xCur()].n : '無'}）</h3><div class="hint" style="margin-bottom:6px">第 300 關以後，每過一關 2% 機率「凶獸出沒」，畫面上方出現挑戰鈕（60 秒內按）。凶獸血量是 Boss 的 30 倍，限時 90 秒，打輸不會掉關。打贏丟葫蘆收服（25%，沒收到下次同一隻 +25%）；已經有的再打贏 +1 星（最多 10 星：1～5 星光環變強、6～10 星大招升級）。葫蘆只有 1 格，不佔神獸欄；凶獸自己會出手，大招充滿自動放。</div><div class="list">`;
    for (const k in XB) {
      const d = XB[k],
        st = xSt(k),
        on = S.xOn === k && st;
      if (!st) {
        h += `<div class="item lock">${lockImg(SRC['x_' + k])}<div class="tx"><b>凶獸 ${d.n}</b><div>${d.d}｜光環：${d.a(1)}｜還沒收服（下次收服機率 ${Math.round(xCap(k) * 100)}%）</div></div></div>`;
        continue;
      }
      h += `<div class="item ${on ? 'on' : ''}"><div class="th"><img src="${SRC['x_' + k]}" alt=""></div><div class="tx"><b>凶獸 ${d.n} <span style="color:#ff9a1e">${'★'.repeat(Math.min(5, st))}</span><span style="color:#ff3a2a">${'★'.repeat(Math.max(0, st - 5))}</span></b><div>${d.d}｜攻擊 ${fmt(xAtk(k))}<br>光環：${d.a(xAv(k))}<br>大招「${d.u}」Lv${xUl(k)}：${d.ud}${xUl(k) > 1 ? `（傷害 ×${1 + 0.5 * (xUl(k) - 1)}）` : ''}</div></div><button class="btn blue" data-xo="${k}">${on ? '收回' : '派出'}</button></div>`;
    }
    h += '</div>';
  }
  return h;
}
// 山門頁「法寶」分頁的內容
function gateTabFb(lv) {
  let h = '';
  const own = Object.keys(S.fb);
  const fn = FB_SLOT.find(([l]) => l > lv);
  h += `<h3 class="sec" style="margin-top:0">法寶（裝備 ${S.fbOn.length}/${fbSlots()}${fn ? `，山門 Lv${fn[0]} 變 ${fn[1]} 格` : ''}）</h3><div class="hint" style="margin-bottom:8px">打倒 Boss 有機會掉法寶（第一次 35%），每 100 關的魔頭一定掉 2 件。拿到重複的會升星：5 星之後變紅星，最多 10 星，效果照星數倍增（10 星是 1 星的 10 倍），10 星再解鎖特效。已收集 ${own.length}/12。</div><div class="list">`;
  for (const k in FB) {
    const d = FB[k],
      has = S.fb[k];
    const ic = SRC['i_fb_' + k]
      ? `<div class="th" style="background:radial-gradient(circle at 50% 45%,#fff8e6,${d.c}55);${has ? '' : 'filter:grayscale(1) opacity(.45)'}"><img src="${SRC['i_fb_' + k]}" alt="" style="object-fit:contain;padding:4px"></div>`
      : `<div class="th" style="display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#fff,${d.c});font-family:var(--title);font-size:30px;color:#3a2008;${has ? '' : 'filter:grayscale(1) opacity(.45)'}">${d.g}</div>`;
    if (!has) {
      h += `<div class="item lock">${ic}<div class="tx"><b>${d.n}</b><div>${d.t(d.v)}｜還沒拿到</div></div></div>`;
      continue;
    }
    const on = S.fbOn.includes(k);
    h += `<div class="item ${on ? 'on' : ''}">${ic}<div class="tx"><b>${d.n} ${'★'.repeat(Math.min(5, has.star))}<span style="opacity:.3">${'★'.repeat(Math.max(0, 5 - has.star))}</span>${has.star > 5 ? `<i style="color:#ff3a2a;font-style:normal">${'★'.repeat(has.star - 5)}</i>` : ''}</b><div>${d.t(Math.min(fbV(k), FBCAP[d.k] || 1e9))}${FBCAP[d.k] && fbV(k) > FBCAP[d.k] ? '（已到上限）' : ''}</div><div style="font-size:12px;${has.star >= FB_MAX ? 'color:#e0241a;font-weight:800' : 'opacity:.6'}">10 星「${FB10[k].n}」：${FB10[k].d}${has.star >= FB_MAX ? '（已解鎖）' : ''}</div></div><button class="btn blue" data-fb="${k}">${on ? '卸下' : '裝備'}</button></div>`;
  }
  h += '</div>';
  return h;
}
