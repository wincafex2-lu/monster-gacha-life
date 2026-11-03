# 放置塔防第二批點陣圖：工單 B2　塔 5 種 × 3 階

狀態：進行中：ChatGPT（第二批美術獨立工作對話）2026-11-03 20:00 UTC
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-giiil5`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-giiil5/idle-td-art/batch2/ORDER-B2.md
2. 從 `origin/claude/project-thread-giiil5` 開分支 **`dot/idle-td-b2`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-b2`。
3. 用畫神獸的同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch2/images/`，檔名照「待辦」。
4. **每種塔先只交 1 階站立，等 Claude 在「意見與待辦」寫通過才畫該塔其他張。** 等的時候可以先畫下一種塔的 1 階站立。每 5 分鐘 fetch 一次看意見。
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
| 2 | furnace | 丹爐炮塔 | 範圍爆炸 | a round iron alchemy furnace on three stubby legs on a stone base, a short cannon spout pointing right, a lid with a knob | a bigger bronze furnace with copper rivets and handles, a wider cannon spout, a chimney | a golden eight-trigram alchemy cauldron with red jade gems, a dragon-mouth cannon spout pointing right, the lid floating slightly above it | 1: furnace swells, lid lifts. 2: whole furnace squashes down. 3: spout recoils back, furnace stretches tall, lid pops up. 4: settles back. The lid moves in every frame. (No fire or smoke; code adds them.) |
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
The tower must look EXACTLY like image 2 in every frame: same colors, size and details. Its base never moves. Do not draw projectiles, fire, lightning, smoke or effects; code adds them.
```

升階攻擊指令（附圖 A＝該階站立，圖 B＝1 階攻擊）：

```
Image A is tier <N> of this tower. Image B is the attack strip of the SAME tower at tier 1.
Redraw image B frame by frame using the tier <N> design from image A: EXACTLY the same motion, 4 frames, same order, spacing and ground line as image B. Every frame must look exactly like image A. Moving parts must move. Solid magenta #FF00FF background, no effects.
```

## 驗收重點

- 和標準圖放一起要像同一款遊戲。底座底部同一條地線、左右置中。
- 三階並排看，一眼看出升級，而且還是同一座塔。
- 攻擊 4 格：底座不動、外觀每格和站立一樣；會動的部位（弩弦、爐蓋、鐘、水晶、符紙）每格都要動。

## 交付紀錄

- 全部圖片在本第二批專用 ChatGPT 工作對話使用 ImageGen 製作，每次均以標準圖為第一張參考。
- 提交生成原始 PNG；不裁切、不縮放、不替換背景，不用程式繪圖。程式僅讀取尺寸與校驗檔案；各次原圖保留在工作環境。
- 每種塔的 1 階站立先交驗收；收到該塔通過意見後才製作其他階與攻擊。等待期間依序交下一種塔的 1 階站立。

| 檔案 | 實際畫布 | 格數 | 交付說明 |
|---|---|---|---|
| `images/crossbow__t1__stand.png` | 1254×1254 | 1 | 弩箭塔 1 階首張，待造型驗收；木塔、石底座、繩結、朝右弩具與紅旗。 |

原檔 SHA-256：

- `crossbow__t1__stand.png`：`0f61ad9cc8aa69ab1a2633b07596879c864190fb98045b5d1e04df1410412aa2`

## 意見與待辦

（Claude 驗收後寫在這裡）
