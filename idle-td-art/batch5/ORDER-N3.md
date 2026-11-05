# 放置塔防：工單 N3　五傳說「神話型態」（6 階）

狀態：進行中：dot 2026-11-05 04:11 UTC
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

泓 2026-11-05 要加比傳說更高的「神話」進化。工單 N2（小猴王）出現「完成通知」後再接（小猴王的神話型態之後另補）。
流程、驗收標準照 `README.md`（工單 N1）；分支 **`dot/idle-td-n3`**（從 `origin/claude/project-thread-7a7c7v` 開），檔案放 `idle-td-art/batch5/images/`。
網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/ORDER-N3.md

## 原圖在哪

5 階站立和攻擊格都在分支 **`dot/idle-td-10`** 的 `idle-td-art/images/`：
`<id>__t5__stand.png`、`<id>__t5__attack_f1.png`～`_f3.png`（id = fox／dragon／archer／mecha／alchemist）。

## 鎖死規則

- **用 5 階站立圖直接改，不准重畫整個人**：頭、臉、身體、腿、腳、大小、位置完全不動（臉和比例不能變大），只換衣服配色、加配件、換武器。
- 比 5 階更華麗、有「神」的感覺：背後實體光環（金屬或玉做的圓環／日輪／月輪，**不要畫發光光暈**，光由程式加）、更大的法器或翅膀。配件加在身體外面。
- 背景純洋紅 `#FF00FF`。
- 攻擊格：從 6 階站立圖逐格改，動作照 5 階同一格（圖 B），武器留在原本那隻手。第 4 格不用畫。

## 指令

6 階站立（附 `<id>__t5__stand.png`）：

```
Edit this exact sprite (tier 5). Keep the head, face, body, legs, feet, size and position EXACTLY the same (same pixels where possible). Do not make anything bigger.
Upgrade it to a MYTHIC god form: <英文>.
Accessories go outside the body. No glow, no light effects (added by code). Solid magenta #FF00FF background.
```

6 階攻擊（附圖 A＝已通過的 `<id>__t6__stand.png`、圖 B＝`<id>__t5__attack_fN.png`）：

```
Edit image A (mythic tier sprite). Keep its head, face, body, legs, feet, outfit, size and position EXACTLY the same.
ONLY change the arms and the weapon so the pose matches image B (same character, tier 5). Use the mythic weapon from image A.
Moving accessories may swing a little. Do not resize anything. Same magenta #FF00FF background.
The weapon must stay in the SAME hand as in image A. Do not move it to the other hand.
```

## 角色

| id | 神話名 | 外型（中文） | 英文（貼給 GPT） |
|---|---|---|---|
| fox | 天狐神姬 | 九尾變白金、尾尖藍色；白金神官服＋金紅寶石；背後一面金色日輪（實體圓環，掛小鈴）；金鈴杖變更長、頂端是狐首 | nine tails turn white-gold with blue tips; white-and-gold shrine-priestess robes with red jewels; a golden sun-wheel ring (solid metal ring with small bells) floating behind her; longer golden bell staff topped with a fox head |
| dragon | 龍神將 | 金紅龍鱗甲加黑曜石邊；頭盔龍角變大；背後盤一條完整的金龍（頭在肩上）；龍翼變成兩對；槍變巨大雙刃龍戟 | gold-and-red dragon-scale armor with obsidian trims; bigger dragon horns on the helmet; a full golden dragon coiled behind him with its head resting on his shoulder; two pairs of dragon wings; a huge double-bladed dragon halberd |
| archer | 月神星弓 | 白銀＋深藍星空披風、上面有星座圖；背後一面銀色月輪（新月形實體環）；光羽翼變三對；星光鳳凰停在肩上；弓變成更大的雙月神弓 | silver and deep-blue starry cape with constellation patterns; a silver crescent-moon ring floating behind her; three pairs of feather wings; the star phoenix perched on her shoulder; a bigger twin-crescent divine bow |
| mecha | 神機天將 | 白金機甲加藍色能量紋（畫成實色線條，不發光）；背後六個浮遊砲圍成一圈像光環；推進翼更大；巨拳變成金藍雙巨拳 | white-and-gold mech armor with blue energy line patterns (solid color, no glow); six floating gun pods arranged in a ring behind him like a halo; bigger thruster wings; giant gold-and-blue twin mech fists |
| alchemist | 丹仙真人 | 金紫仙袍加雲紋和八卦紋；道冠變蓮花金冠；背後浮空一座更大的九轉金丹爐＋太極玉環；白鶴變一對；金葫蘆＋玉拂塵變更華麗 | gold-and-purple immortal robes with cloud and bagua patterns; golden lotus crown; a bigger floating nine-turn golden cauldron and a jade taiji ring behind him; a pair of white cranes; more ornate golden gourd and jade whisk |

## 待辦（檔名）

每支：`<id>__t6__stand.png` → `<id>__t6__attack_f1.png`、`_f2.png`、`_f3.png`。順序 fox → dragon → archer → mecha → alchemist。共 20 張。
每支先交站立，Claude 寫通過再畫攻擊；等的時候可以先畫下一支站立。

## 意見與待辦

（Claude 驗收後寫在這裡）
