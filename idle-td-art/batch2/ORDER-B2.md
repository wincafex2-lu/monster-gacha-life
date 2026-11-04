# 放置塔防第二批點陣圖：工單 B2　塔 5 種 × 3 階

狀態：進行中：ChatGPT 六張攻擊圖比例修訂
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

## 交付紀錄

- 依 2026-11-04 09:35 TW 驗收，24 張已通過；本輪僅修訂丹爐三階、鐘塔一階、冰塔二三階的六張攻擊圖。
- 全部圖片在本第二批專用 ChatGPT 工作對話使用 ImageGen 製作，每次均以標準圖為第一張參考。
- 提交生成原始 PNG；不裁切、不縮放、不替換背景，不用程式繪圖。程式僅讀取尺寸與校驗檔案；各次原圖保留在工作環境。
- 依 2026-11-04 04:25 TW 最新流程，不用停等驗收；每張推送後 fetch 意見，有意見先改。寒冰塔升階晶體需明顯變大、變藍。

| 檔案 | 實際畫布 | 格數 | 交付說明 |
|---|---|---|---|
| `images/crossbow__t1__stand.png` | 1254×1254 | 1 | 弩箭塔 1 階首張已於 2026-11-04 04:25 TW 通過；木塔、石底座、繩結、朝右弩具與紅旗。 |
| `images/furnace__t1__stand.png` | 1254×1254 | 1 | 丹爐炮塔 1 階首張已於 2026-11-04 04:25 TW 通過；鐵爐、三短腳、石底座、帶鈕爐蓋與朝右短炮口。 |
| `images/bell__t1__stand.png` | 1254×1254 | 1 | 雷音鐘塔 1 階首張已於 2026-11-04 04:25 TW 通過；木架、石底座、銅鐘與雙繩吊木槌。 |
| `images/frost__t1__stand.png` | 1254×1254 | 1 | 寒冰燈塔 1 階首張已於 2026-11-04 04:25 TW 通過；樸素石燈與朝右淡藍晶片，無光暈或冰霧。 |
| `images/talisman__t1__stand.png` | 1254×1254 | 1 | 符咒塔 1 階首張；木柱、石座、紅繩黃符與頂部筆硯。使用已保留原檔重傳，未重畫。 |
| `images/crossbow__t2__stand.png` | 1254×1254 | 1 | 弩箭塔 2 階：加高木石結構、青銅箍帶、雙弩與金邊紅旗。 |
| `images/crossbow__t3__stand.png` | 1254×1254 | 1 | 弩箭塔 3 階：白玉塔身、金瓦龍角、三聯金弩、已裝填玉箭與兩枚浮空金羽。 |
| `images/crossbow__t1__attack.png` | 2172×724 | 4 | 1 階攻擊：拉弦、釋放後座、抬弩、復位；旗幟與弩弦逐格變化，塔身底座固定。 |
| `images/crossbow__t2__attack.png` | 2172×724 | 4 | 2 階雙弩沿用 1 階動作與四格配置；雙弩後座、弩弦與旗幟擺動，底座固定。 |
| `images/crossbow__t3__attack.png` | 2172×724 | 4 | 3 階三聯金弩沿用攻擊節奏；弩具、旗幟與兩枚金羽逐格變化，無空中投射物。 |
| `images/furnace__t2__stand.png` | 1254×1254 | 1 | 丹爐炮塔 2 階：青銅爐體、銅鉚釘與把手、加寬炮口、後方煙囪。 |
| `images/furnace__t3__stand.png` | 1254×1254 | 1 | 丹爐炮塔 3 階：金色八卦爐、紅玉寶石、朝右龍口炮嘴、微浮爐蓋。 |
| `images/bell__t2__stand.png` | 1254×1254 | 1 | 雷音鐘塔 2 階：紅漆曲簷鐘亭、雕雲紋青銅鐘、魚形木槌。 |
| `images/bell__t3__stand.png` | 1254×1254 | 1 | 雷音鐘塔 3 階：紫金鐘樓、雷雲紋金鐘、雙鼓與三枚浮雲飾件。 |
| `images/bell__t2__attack.png` | 2172×724 | 4 | 雷音鐘塔 2 階攻擊四格：魚形木槌敲擊與雕紋銅鐘擺動，紅漆鐘亭固定。 |
| `images/bell__t3__attack.png` | 2172×724 | 4 | 雷音鐘塔 3 階攻擊四格：金鐘與魚形槌擺動，保留紫金鐘樓、雙鼓及浮雲。 |
| `images/frost__t2__stand.png` | 1254×1254 | 1 | 寒冰燈塔 2 階：白石銀霜紋、屋簷冰柱，依意見把晶體顯著放大並加深藍色。 |
| `images/frost__t3__stand.png` | 1254×1254 | 1 | 寒冰燈塔 3 階：大型深藍懸浮晶球、銀色塔頂、冰晶立柱與底座尖晶、三枚浮雪晶。 |
| `images/frost__t1__attack.png` | 2172×724 | 4 | 寒冰燈塔 1 階攻擊四格：晶體後縮、升高變亮、向右推與復位，燈座不動。 |
| `images/talisman__t2__stand.png` | 1254×1254 | 1 | 符咒塔 2 階：紅漆金箍柱、六張黃符、青銅墨盂與朝右毛筆。 |
| `images/talisman__t3__stand.png` | 1254×1254 | 1 | 符咒塔 3 階：金黑漆柱、盤柱玉龍、兩排黃紫符紙與懸浮毛筆。 |
| `images/talisman__t1__attack.png` | 2172×724 | 4 | 符咒塔 1 階攻擊四格：三張黃符後揚、抬起、向右展扇與回落；紙根維持連接。 |
| `images/talisman__t2__attack.png` | 2172×724 | 4 | 符咒塔 2 階攻擊四格：六張黃符後揚、抬起、右展、回落；已修正初稿符紙缺張。 |
| `images/talisman__t3__attack.png` | 2172×724 | 4 | 符咒塔 3 階攻擊四格：兩排黃紫符紙共八張，後揚、抬起、右展與回落；毛筆與流蘇起伏。 |
| `images/furnace__t1__attack.png` | 2172×724 | 4 | 09:35 返工修正版：爐身、三足與底座固定，只動爐蓋與炮口；第 4 格關蓋回站立。 |
| `images/furnace__t2__attack.png` | 2172×724 | 4 | 09:35 返工修正版：青銅爐身不擠壓、不拉長，只動蓋與炮口；第 4 格關蓋，比例已重新對照站立。 |
| `images/furnace__t3__attack.png` | 2172×724 | 4 | 09:35 返工修正版：金色爐身固定，只有爐蓋起落與龍口微縮；第 4 格回到站立圖微浮蓋位置。 |
| `images/bell__t1__attack.png` | 2172×724 | 4 | 09:35 返工修正版：重對木架高寬與底座比例；鐘槌敲擊、鐘身擺動，第 4 格回原站立。 |
| `images/frost__t2__attack.png` | 2172×724 | 4 | 09:35 返工修正版：保留大藍晶體，四格只移位；冰柱擺動、塔身固定，第 4 格回到站立。 |
| `images/frost__t3__attack.png` | 2172×724 | 4 | 09:35 返工修正版：大水晶球保持四格同尺寸，只做左移、上浮、右推、回位；雪花移動，第 4 格回到站立。 |

原檔 SHA-256：

- `crossbow__t1__stand.png`：`0f61ad9cc8aa69ab1a2633b07596879c864190fb98045b5d1e04df1410412aa2`
- `furnace__t1__stand.png`：`f8d5149cbdd8328d910d40ed43a0130f868fa1d138d2c2d24949c8f5e49c6042`
- `bell__t1__stand.png`：`8c9581b21bc6a7f04fa8f9181aadca94761caaf078af48b29afc65fa17638107`
- `frost__t1__stand.png`：`5dedc88bb006cdc965aeb154b0c6db00d174d6dc1cb1615c9b44bef838eb8f86`
- `talisman__t1__stand.png`：`cd23a8ceb3c7914b4839364ea0242207bd96c0140b554d1c05e5a22babfe14c3`
- `crossbow__t2__stand.png`：`54a7d8d42aacdf17f69b29b197495f8400016f9af772275dadb75ea29281d4b7`
- `crossbow__t3__stand.png`：`5d6ca5f2c572ec6a6f53328b6b1a5db0ed47911f9ea0d59e3fc1ed3affc468c7`
- `crossbow__t1__attack.png`：`772c89f24d345c660b4e9af63a77d8441a72e0640ae9ac8357aa26dda6bb6fdb`
- `crossbow__t2__attack.png`：`aa6f623406398c60b0f5b3567fdc45cfec570506acb3ea54a618b6a036875189`
- `crossbow__t3__attack.png`：`2b25d12eccc02864864061856ae375fba9c78b1f5555a0ebecaf1b5ee6bcb7fb`
- `furnace__t2__stand.png`：`781f15cbfc6efc76796b2c149109255b5ae95f5ad1888a0e9d963bd8a5a9466e`
- `furnace__t3__stand.png`：`df186ad507579341121b437695ed75fc48eb59ec2d980169994577354251a868`
- `bell__t2__stand.png`：`2a3be635c6d519583d30175a87678bfd4fcf153d0381a4049b85c586093e01ea`
- `bell__t3__stand.png`：`105f8b94be9cf7f084b91bc69212e23db8b898d0e2eadb51dbde364412474484`
- `bell__t2__attack.png`：`cfdf30b880f32dad590889c2004b1e08fac8919f79e45238d5f34015beffac49`
- `bell__t3__attack.png`：`898f4b505ef165c2c53510f9380c5a57f855857478e0d3c295b7cb5fc636f36f`
- `frost__t2__stand.png`：`c3fe63374ec323955fb38c2c3dc30efce17f39bff1c0a3a7d88c39d5ab8d6992`
- `frost__t3__stand.png`：`348c981ebe13266de7a0d3b480add7c01d3cd011070032ed2fc522fb1ca73e83`
- `frost__t1__attack.png`：`9cad659cccd92dd1e1c4497c2a842356f2e8c043c633f761c0e80fd875428161`
- `talisman__t2__stand.png`：`d6b50b25a8e41c9daf5f601d97959f8937a7d276f835b9d052437fa9bfc69f20`
- `talisman__t3__stand.png`：`e92044a870344eec44bf536c0af002e9c29aa96f8c9b9e244b0cdd5ae2df8342`
- `talisman__t1__attack.png`：`576ccac0df753056e7d531c252d91cdc21491e7f38ca0e6ab4a6d0b88af48bd9`
- `talisman__t2__attack.png`：`3e819d5920fab3d44ae707d5c801c2be48d615bb9b912b15068ae16380953a89`
- `talisman__t3__attack.png`：`0a585c1d00ce61b2523bb5fc2adcb56b1a5ab396b6b02e970298adabbd91db6f`
- `furnace__t1__attack.png`：`d5c2b44fa5d3a8c4fc2852cf410b7fb3692249ecd5b4fc28dc3e0853ce76a84d`
- `furnace__t2__attack.png`：`b07f508a27710703821c57f6f54329d6914c35e869678b5435d12a9e692f4509`
- `furnace__t3__attack.png`：`2f4ea2ec5dad341e75289008a46422ecab203214e04f8400cd5464ba826adbab`
- `bell__t1__attack.png`：`d82d8e56bc2600421dce9e52ebc5f0480949a19a86671ae530694a85e3eae07e`
- `frost__t2__attack.png`：`63cfed072f1b986b96f84be9ea42f33d07887d1b121ec1dafb55152d8c359296`
- `frost__t3__attack.png`：`27e8bf6df22fccf028f0f81ef60b5ffe468cd369d539a7f7789b8e8dc666076e`

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
- 2026-11-04 10:00 TW　**`furnace__t3__attack.png`、`bell__t1__attack.png` 重畫版通過**（丹爐只有爐蓋在動；鐘塔每格高寬差 2～3