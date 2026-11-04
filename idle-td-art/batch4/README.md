# 放置塔防第四批點陣圖：工單 D1　魔頭 3 隻

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這是新遊戲「放置塔防（掃帚守山門）」**第四批美術（魔頭、法寶）**的交接處，負責驗收的是 Claude 討論串「畫魔頭與法寶美術」。
角色、怪物、山門、塔陣神獸、第三批是別組工單，和這裡無關。
不要改動 `idle-td-art/batch4/` 以外的檔案。

## 這批的順序

| 順序 | 工單 | 內容 | 分支 |
|---|---|---|---|
| 1 | README.md（這份） | 魔頭 3 隻，每隻站立、蓄力、出招 3 張單張 | dot/idle-td-d1 |
| 2 | ORDER-D2.md | 法寶圖示 12 張（方形單張） | dot/idle-td-d2 |

一張工單出現「完成通知」就接下一張，不用等人轉達。

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-gq54hn`，讀這份最新版（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-gq54hn/idle-td-art/batch4/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-gq54hn` 開分支 **`dot/idle-td-d1`**，把「狀態」改成「進行中：<誰> <時間>」，馬上推。之後成品和狀態都只推 `dot/idle-td-d1`，不要推 main 或 claude/ 分支。
3. 開一個**新的** ChatGPT 畫圖對話（和其他批分開），照下面畫。檔案放 `idle-td-art/batch4/images/`，檔名照「待辦」。
4. **先畫第 1 張（混世魔王站立）推上來，接著不用停**：照待辦順序一張接一張畫、畫好就推。Claude 每張都會量，有問題寫在「意見與待辦」，每推一張就 fetch 一次看意見，有意見先改。
5. 置中偏一點、背景洋紅有色差：**不用修**，去背、對齊由 Claude 用程式做。
6. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `ORDER-D2.md`。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色方式全部照 **`ref/STANDARD__t2__stand.png`**（我方角色，本體高約 700px）。
- 魔頭是**比 Boss 更大一級**的敵人：每 100 關出現一隻（Boss 每 10 關一隻）。遊戲裡顯示成 Boss 的 **1.5 倍**大（程式縮放）。
  `ref/BOSS__bullking__stand.png` 是已通過的 Boss（高約 1040px）。因為畫布放不下 1.5 倍，**魔頭請畫到畫布裝得下的最大**：畫布 1254×1254，本體高約 **1120～1160px**，腳底 y≈1210，左右各留 30px 以上不要被切到。
  魔頭要**看起來比 Boss 更壯、更厚重、細節更多**（更寬的肩、更多盔甲和裝飾），**像素格子大小和標準圖一樣**（不是把小圖放大）。
- 側 3/4 **朝右**。威風、有點兇，但給 9～11 歲：搞笑帥氣，不恐怖、不要血。
- 背景純洋紅 `#FF00FF`，整片均勻；魔頭身上不要用洋紅、粉紫色。不畫影子、地板、光暈、特效、投射物、文字。
- **大頭小身體**：頭約佔身高 1/3（Q 版），和 Boss 一樣的比例感。

### 站立圖指令（附 `ref/STANDARD__t2__stand.png` 第 1 張、`ref/BOSS__bullking__stand.png` 第 2 張）

```
Draw a DEMON LORD (a final super-boss) for the SAME game as the attached images, in EXACTLY the same pixel-art style: same pixel size (do NOT use bigger pixels), same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
Image 1 is a normal hero (about 700 px tall). Image 2 is a normal boss (about 1040 px tall). The demon lord is one rank ABOVE the boss: draw it as big as the canvas allows, about 1120-1160 px tall on a 1254x1254 canvas, feet at y=1210, centered, at least 30 px margin left and right. It must look bulkier, heavier and more detailed than image 2 (broader shoulders, more armor and ornaments). Same pixel size means much more detail, not upscaled pixels.
Chibi proportions: big head, about 1/3 of total height, short sturdy body.
Side 3/4 view facing RIGHT. Imposing and a little fierce for kids aged 9-11, but funny-cool, never gory or creepy. No blood.
Do not use magenta or pink-purple on the character. Solid flat magenta #FF00FF background. No shadow, no floor, no text, no glow, no effects, no projectiles.
```

接著貼：

```
Demon lord: <外型那一格的英文>
```

### 蓄力、出招指令（**只附 1 張：該魔頭已通過的站立圖**，拿站立圖直接改）

前傾、蹲低、震動、刀光、衝擊波由程式加，**圖裡頭、身體、腿、腳都不要動**，只改手和武器。

```
Edit this exact sprite. Keep the head, face, body, legs, feet, armor, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the weapon to this pose: <動作那一格的英文>. Moving accessories (cape, robe, mane, flames, vines, leaves, fruits) may swing a little.
Do not make the body or legs longer, do not shrink the head, do not move the feet, do not resize anything. Same 1254x1254 canvas, same magenta #FF00FF background.
```

## 魔頭設計

| # | 代號 | 名字 | 外型（英文） | 蓄力 windup（英文） | 出招 strike（英文） |
|---|---|---|---|---|---|
| 1 | hunshi | 混世魔王 | a huge chibi demon king: dark crimson skin, two big curved black horns with gold rings, a wild orange flame-shaped mane (solid colors, not glowing), heavy black-and-gold spiked armor with a snarling tiger face on the chest plate, a tattered dark red cape, holding a giant black iron spiked mace in his right hand. Grinning arrogant face with one fang showing. | both hands raise the giant spiked mace high over the head | the mace smashed down in front (right side), mace head near the ground |
| 2 | jiuyou | 九幽冥帝 | a huge chibi underworld emperor: a skeletal demon king with a big skull face wearing a tall dark-iron emperor crown with deep blue-violet gems, cold cyan-blue ghost flames (solid colors, not glowing) burning in the eye sockets and on the crown, heavy black-and-silver imperial armor with a bone-and-cloud pattern, a long tattered deep-indigo royal robe and cape, holding a tall black scepter-halberd topped with a skull ornament. Cool and spooky-funny, not gory. | the scepter-halberd raised high in both hands, robe and ghost flames flaring up | the scepter-halberd swung down forward to the right, robe and flames flying back |
| 3 | moshu | 萬年魔樹 | a huge chibi ten-thousand-year demon tree, much bigger and darker than a normal tree spirit: a massive twisted dark-brown trunk body with a grumpy ancient face (thick moss beard, angry glowing yellow-green eyes drawn as solid shapes), a crown of dark-green and black leaves with thorny vines, two huge thick branch arms ending in claw-like twig hands, thick root legs, a few big purple-blue poison fruits hanging (blue-violet, not pink). | both huge branch arms pulled back behind the trunk, vines and leaves swinging | both branch arms whipping forward to the right, mouth open roaring, fruits swinging |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch4/images/`） | 內容 |
|---|---|---|
| 1 | `hunshi__stand.png` | 混世魔王站立（推上來後不用停，接著畫） |
| 2 | `hunshi__windup.png`、`hunshi__strike.png` | 混世魔王蓄力、出招（拿通過的站立圖改） |
| 3 | `jiuyou__stand.png`、`jiuyou__windup.png`、`jiuyou__strike.png` | 九幽冥帝 |
| 4 | `moshu__stand.png`、`moshu__windup.png`、`moshu__strike.png` | 萬年魔樹 |

站立圖還沒通過就先畫下一隻的站立圖；蓄力、出招一定要拿**通過的**站立圖改。

GPT 畫歪時可以回它：
- 畫風不同（粗黑框、大像素）：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines, no big pixels.`
- 太小：`Make it bigger: about 1150 px tall on the 1254x1254 canvas, feet at y=1210, bulkier than image 2.`
- 被切到：`Keep the whole demon inside the canvas with 30 px margin on the left and right.`
- 蓄力出招時頭變小、身體變長：`Keep the head and body EXACTLY the same size as the input sprite. Only the arms and weapon move.`

## 驗收重點（每一張都量）

- 和標準圖比：像素格子一樣小、畫風一致。
- 站立圖：高 1120～1160px、腳底 y≈1210、沒被切到；放在 Boss 旁邊明顯更壯、更華麗。
- 蓄力、出招和站立圖比：**頭高、身高差 3% 以內；肩寬、站姿寬、鞋寬差 6% 以內**；只有手、武器、披風鬃毛尾巴在動。
- 三隻剪影一眼分得出（紅色角魔王、骷髏帝王、巨大魔樹）；也要一眼看得出比 Boss 牛魔大王、骷髏將軍、千年樹妖高一級。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 19:10 TW　**`hunshi__stand`、`jiuyou__stand`、`moshu__stand` 3 張站立通過。** 高 1161／1194／1195px，沒有被畫布切到；放在牛魔大王旁邊明顯更壯、更華麗，三隻剪影一眼分得出。像素粗細、描邊和 Boss 一致。九幽冥帝、萬年魔樹比 1160 高一點、腳底位置三張不一樣（1183～1222），都**不用重畫**，Claude 用程式對齊。
  接下來拿這 3 張站立圖照「蓄力、出招指令」改：`hunshi__windup`、`hunshi__strike`，然後九幽冥帝、萬年魔樹。只動手和武器，頭和身體一格都不要動。不用停。
