# 放置塔防第二批點陣圖：工單 B2　塔 5 種 × 3 階

狀態：待接手（`README.md`（B1 神獸）出現「完成通知」後才接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-giiil5`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-giiil5/idle-td-art/batch2/ORDER-B2.md
2. 從 `origin/claude/project-thread-giiil5` 開分支 **`dot/idle-td-b2`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-b2`。
3. 用畫神獸的同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch2/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序一張接一張畫、畫好就推。Claude 每張都會看，有問題寫在「意見與待辦」，每推一張就 fetch 一次看意見，有意見先改。
   大小差一點、底座差幾 px、沒置中、背景洋紅有色差都**不用修**，程式處理。
5. 全部交完狀態改「待驗收」；看到「完成通知」就接 `ORDER-B3.md`。

## 鎖死規則（不准改）

- 像素粗細、畫風、上色方式照 **`ref/STANDARD__t2__stand.png`**（畫布 1254×1254，人物本體高約 700px，腳底 y≈978）。
- 塔的底座底部在 y≈978、左右置中。高度：**1 階 100%、2 階 110%、3 階 125%**（以標準圖人物 700px 為 100%），升階只能往上、往外加東西，底座大小盡量不變。
- 側 3/4 **朝右**（塔的武器、炮口、法器朝右邊，敵人從右邊來）。
- 升階要一眼看出來：1 階樸素（木、石），2 階加金屬和顏色，3 階華麗（金、玉、寶石、會飄的配件）。
- 背景純洋紅 `#FF00FF`；不要畫影子、地板、文字、光暈、火焰、雷電、冰霧、子彈（程式加）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a NEW defense tower for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The attached girl is the size reference (her body is about 700 px tall on a 1254x1254 canvas, feet at y=978). Draw the tower at the height I give below, the bottom of its base on the same ground line, centered.
Side 3/4 view, the weapon or magic device faces RIGHT. Cute chunky fantasy-Chinese style for kids aged 9-11, sturdy and cool.
Solid flat magenta #FF00FF background, 1254x1254. No shadow, no floor, no text, no glow, no fire, no lightning, no effects, no projectiles.
```

## 塔設計

| # | 代號 | 名字 | 作用（給你參考） | 1 階（100%） | 2 階（110%） | 3 階（125%） | 攻擊 4 格 |
|---|---|---|---|---|---|---|---|
| 1 | crossbow | 弩箭塔 | 單體、射得快 | a small wooden watchtower on a stone base, a big wooden crossbow on top pointing right, rope bindings, a little red pennant | taller stone-and-wood tower with bronze bands, a double bronze crossbow, a red banner with a gold edge | a white jade pagoda tower with gold roof tiles and dragon-head corners, a golden triple crossbow with a jade arrow loaded, two floating golden feathers beside it | 1: crossbow pulled back, string tight. 2: string releases, crossbow kicks back. 3: crossbow tilts up from recoil. 4: reloads back to start. The string, pennant/banner and feathers move every frame. |
| 2 | furnace | 丹爐炮塔 | 範圍爆炸 | a round iron alchemy furnace on three stubby legs on a stone base, a short cannon spout pointing right, a lid with a knob | a bigger bronze furnace with copper rivets and handles, a wider cannon spout, a chimney | a golden eight-trigram alchemy cauldron with red jade gems, a dragon-mouth cannon spout pointing right, the lid floating slightly above it | 1: furnace swells, lid lifts. 2: lid drops back down, spout pulls back slightly. 3: lid pops up high, spout recoils back. (The furnace body itself NEVER squashes or stretches; code adds squash.) 4: settles back. The lid moves in every frame. (No fire or smoke; code adds them.) |
| 3 | bell | 雷音鐘塔 | 連鎖雷擊 | a wooden frame on a stone base holding a small bronze bell with a wooden striker hanging beside it | a red lacquered bell pavilion with a curved roof, a bigger engraved bronze bell, the striker carved like a fish | a purple-and-gold bell tower with a golden bell covered in thunder-cloud patterns, two small drums on the sides, small gold cloud ornaments floating around the roof | 1: striker swings back. 2: striker hits the bell. 3: bell swings to the right from the hit. 4: bell and striker swing back. The bell and striker must be in a different position every frame. |
| 4 | frost | 寒冰燈塔 | 減速 | a stone lantern tower (Japanese/Chinese garden lantern style) with a pale blue crystal shard inside the lantern window | a taller white stone lantern with silver frost patterns, a bigger ice-blue crystal, small icicles hanging from the roof | an ice-crystal pagoda lantern with a silver roof, a large floating blue crystal orb inside, ice-crystal spikes growing on the base, small snowflake-shaped crystals floating around it | 1: crystal pulls back inside. 2: crystal glows brighter in color (no glow effect, just lighter pixels) and rises. 3: crystal pushes forward to the right, icicles swing. 4: back to rest. The crystal and floating crystals move in every frame. |
| 5 | talisman | 符咒塔 | 穿透、降防 | a short wooden pillar on a stone base with yellow paper talismans tied on it with red string, a brush and ink stone on top | a red lacquered pillar with gold bands, many yellow talismans fluttering, a bronze ink pot on top | a tall gold-and-black lacquered pillar with a jade dragon coiled around it, rows of yellow and purple paper talismans orbiting it, a floating calligraphy brush on top | 1: talismans pull back and flutter. 2: the top talisman lifts off. 3: talismans fly out to the right in a fan (still attached near the tower, no projectiles). 4: talismans flutter back. The talismans must flutter differently in every frame. |

## 待辦（每種塔照這個順序，塔照 1→5）

| # | 檔名（`idle-td-art/batch2/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `<代號>__t1__stand.png` | 1 階站立（交了先等驗收） | 標準圖 |
| 2 | `<代號>__t2__stand.png`、`<代號>__t3__stand.png` | 2、3 階 | 標準圖＋已通過的 1 階 |
| 3 | `<代號>__t1__attack.png` | 1 階攻擊 4 格橫排 | 標準圖＋1 階站立＋`ref/LAYOUT__attack-strip.png` |
| 4 | `<代號>__t2__attack.png`、`<代號>__t3__attack.png` | 2、3 階攻擊 | 圖 A＝該階站立，圖 B＝1 階攻擊 |

站立指令（接在鎖死那段後面）：

```
Tower, tier <N>: <該階那一格的英文>
Height about <100/110/125>% of the girl. Whole tower visible.
```

升階站立（附標準圖＋已通過的 1 階）：

```
Image 2 is the approved tier 1 of this tower. Draw tier <N> of the SAME tower: <該階英文>.
Keep the same base position, ground line and general shape so it clearly reads as an upgrade of image 2. Height about <110/125>% of the girl.
```

1 階攻擊指令（附標準圖、1 階站立、`ref/LAYOUT__attack-strip.png`）：

```
Image 2 is this tower's approved design. Draw a 4-frame attack animation strip of the SAME tower, frames side by side in ONE image with clear empty space between frames, with the same frame spacing and ground line as image 3 (image 3 is ONLY a layout reference).
<攻擊 4 格那一格的英文>
The tower must look EXACTLY like image 2 in every frame: same colors, size and details. Its base never moves. LOCKED PROPORTIONS: tower height, tower width and base width match image 2 within 3% in every frame; frame 4 looks almost exactly like image 2. Do not draw projectiles, fire, lightning, smoke or effects; code adds them.
```

升階攻擊指令（附圖 A＝該階站立，圖 B＝1 階攻擊）：

```
Image A is tier <N> of this tower. Image B is the attack strip of the SAME tower at tier 1.
Redraw image B frame by frame using the tier <N> design from image A: EXACTLY the same motion, 4 frames, same order, spacing and ground line as image B. Every frame must look exactly like image A. Moving parts must move. Solid magenta #FF00FF background, no effects.
```

## 比例鎖（2026-11-04 泓定）

- 升階站立：底座寬度和高度不變（只能往上、往外加東西）。
- 攻擊圖每一格都量：塔身高度、塔身寬度、底座寬度，跟同階站立圖差超過 **3%** 就退件。**第 4 格要跟站立圖幾乎一模一樣**。

## 驗收重點

- 和標準圖放一起要像同一款遊戲。底座底部同一條地線、左右置中。
- 三階並排看，一眼看出升級，而且還是同一座塔。
- 攻擊 4 格：底座不動、外觀每格和站立一樣；會動的部位（弩弦、爐蓋、鐘、水晶、符紙）每格都要動。

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 04:25 TW　**弩箭塔、丹爐炮塔、雷音鐘塔、寒冰燈塔 1 階站立全部通過。** 畫風和標準圖一致，大小剛好，1 階樸素的感覺對。
  - 寒冰燈塔：升到 2、3 階時晶體要明顯變大、變藍，讓人一看就知道是冰塔。
  - 工單第 4 步已改成**不用停下來等驗收**：符咒塔 1 階之後，直接照待辦一路畫（各塔 2、3 階站立 → 1 階攻擊 → 2、3 階攻擊），畫好就推。
- 2026-11-04 09:35 TW　**30 張驗收（站立看升階、攻擊照比例鎖每格量）。**
  - **通過（24 張）**：5 種塔 1～3 階站立全部通過（升階一眼看得出來，還是同一座塔）；攻擊圖：弩箭塔 1～3 階、雷音鐘塔 2～3 階、寒冰燈塔 1 階、符咒塔 1～3 階。
  - **重畫（6 張）**，用更新後的「1 階攻擊／升階攻擊」指令（已加比例鎖）：
    - `furnace__t1__attack.png`、`furnace__t2__attack.png`、`furnace__t3__attack.png`：爐身在格子裡被壓扁拉高（高度差 10～20%），第 4 格也不等於站立。改成**爐身每格完全不變形**，只有爐蓋上下、炮口往後縮一點（擠壓感程式做）。第 4 格＝站立。
    - `bell__t1__attack.png`：整座塔比站立圖矮胖約 4～5%。照站立圖的高寬重畫。
    - `frost__t2__attack.png`、`frost__t3__attack.png`：水晶（2 階）和水晶球（3 階）在攻擊格裡變小，第 4 格跟站立圖不一樣。水晶大小每格照站立圖，只移動位置；第 4 格＝站立。
  - 順序：先畫完 README 的神獸 v2 站立 4 張，再補這 6 張，推 `dot/idle-td-b2`。
- 2026-11-04 09:50 TW　**`furnace__t1__attack.png`、`furnace__t2__attack.png` 重畫版通過**：爐身每格不變形，只有爐蓋上下，第 4 格＝站立（量到的高度變化只來自爐蓋）。剩 furnace t3、bell t1、frost t2、frost t3。
- 2026-11-04 10:00 TW　**`furnace__t3__attack.png`、`bell__t1__attack.png` 重畫版通過**（丹爐只有爐蓋在動；鐘塔每格高寬差 2～3%）。
- 2026-11-04 10:12 TW　**`frost__t2__attack.png` 重畫版通過**（水晶每格同大小，高寬差 0～1%，第 4 格＝站立）。剩 frost t3。
