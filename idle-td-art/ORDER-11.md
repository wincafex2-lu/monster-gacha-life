# 放置塔防角色點陣圖：工單 11　掃地弟子攻擊圖逐格重畫

狀態：進行中：D 2026-11-04 18:2x
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

泓 2026-11-04 17:33（台灣時間）同意。掃地弟子的攻擊圖還是舊的一次畫 4 格，用新標準量都不合格：
1～4 階身體比站立短 5～10%、頭大 1～6%；5 階整個人大 15～42%。
其他 20 個角色都已經改用「站立圖逐格改」，掃地弟子也照做。**臉、站立圖都不動**（它是標準臉）。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-11.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-11`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-11`。
3. 站立圖在 `dot/idle-td-1` 的 `idle-td-art/images/disciple__t<階>__stand.png`（不要改）。舊攻擊長條 `disciple__t<階>__attack.png` 只拿來看動作。
4. 每階交 3 張單格，推到 `dot/idle-td-11` 的 `idle-td-art/images/`：
   `disciple__t<階>__attack_f1.png`、`disciple__t<階>__attack_f2.png`、`disciple__t<階>__attack_f3.png`。第 4 格不用畫（用站立圖）。
5. 順序：1 階 f1～f3 → 等 Claude 寫通過 → 2～5 階（可以連續交，Claude 逐階驗）。每 5 分鐘 fetch 一次看意見。
6. 全部交完狀態改「待驗收」；看到「完成通知」就停，接 `QUEUE.md` 下一張。

## 動作（照舊攻擊長條）

掃帚在站立圖是**前面那隻手**（畫面右邊的手）拿著。每一格都要留在這隻手，可以加另一隻手一起握，但不能換到另一隻手。

- f1：蓄力，雙手握掃帚往後拉到身體後方，掃帚頭在身後偏上。
- f2：往前橫掃，掃帚橫在身前，掃帚頭往前伸出。
- f3：掃到底，雙手往前推出，掃帚頭在最前面。

身體前傾、踏步、壓扁、塵土、刀光都由程式加，**圖裡身體、腿、腳都不要動**（舊長條裡的蹲馬步、張腳不要畫）。

## 指令

1 階（附 1 階站立圖）：

```
Edit this exact sprite. Keep the head, face, body, legs, feet, outfit, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the broom to this pose: <f1／f2／f3 的動作，翻成英文>. Moving accessories (hair ribbon) may swing a little.
Do not make the body or legs longer, do not move the feet, do not resize anything. Same magenta #FF00FF background.
The broom must stay in the SAME hand as in the original sprite (the front hand). The other hand may also grip it. Do not move it to the other hand.
```

英文動作：
- f1：`both hands grip the broom and pull it back behind the body, broom head behind her, a little high`
- f2：`sweeping forward, the broom held horizontally in front of the body, broom head pointing forward`
- f3：`follow-through, both arms pushed forward, broom head at the very front`

2～5 階（附圖 A＝該階站立圖、圖 B＝已通過的 1 階同一格）：

```
Edit image A (tier N sprite). Keep its head, face, body, legs, feet, outfit, size and position EXACTLY the same.
ONLY change the arms and the broom so the pose matches image B (same character at tier 1). Use the tier N broom from image A.
Moving accessories (ribbons, cape, effects attached to the body) may swing a little. Do not resize anything. Same magenta #FF00FF background.
The broom must stay in the SAME hand as in the original sprite. Do not move it to the other hand.
```

## 驗收標準（同工單 9、10）

- 每一格頭高（頭頂到下巴）、身體高（下巴到鞋底）跟站立圖差 ≤3%；站寬、肩寬、鞋寬差 ≤6%。
- 臉、衣服、配件跟站立圖一樣；掃帚同一隻手。
- 先交最好的一版，Claude 量完決定。

## 意見與待辦

- 18:30 台灣時間 1 階 f1～f3 **通過**（頭 +0.7%、身體 +0.3～+0.5%；腳、身體沒動，掃帚一直在前手，另一手幫忙握，臉不變）。可以做 2～5 階了，附圖 A＝該階站立圖、圖 B＝這次的 1 階同一格，可以連續交。
