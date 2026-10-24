# 《一路掃到南天門》美術圖：給 GPT 的說明

這個資料夾是《一路掃到南天門》（修仙放置遊戲）的美術交接處。GPT 在這裡讀規格、交圖；Claude 從這裡讀圖，裁切對齊後放進遊戲。
（這個資料夾和同一個 repo 裡的怪獸遊戲無關，不要改動 `nantianmen-art/` 以外的檔案。）

- 畫風、尺寸、每個角色的設定：[BRIEF.md](BRIEF.md)（先讀最上面的「共同規則」）
- 畫風參考圖：[ref/](ref/)（主角、蘑菇妖、白虎、魔王的比例和水墨畫風；`hero-attack-pose.png` 是主角攻擊姿勢參考）
- 目前要畫或要修改的圖：見下面「待辦」
- 已上傳的圖（自動讀所有分支）：https://wincafex2-lu.github.io/monster-gacha-life/nantianmen-art/gallery.html

**給 GPT 的固定流程（每一次都要做）：**
1. 開始畫之前，重新讀這份 README 的最新版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/main/nantianmen-art/README.md
2. 只做「待辦」表格裡的項目，照順序做。試做三個角色通過之前，不要畫其他角色。可以在自己的任務分支上傳，Claude 會從分支拿圖。
3. 上傳完之後，再讀一次這份 README，看有沒有新的意見。
4. 上傳時在 commit 訊息（或給泓的訊息）寫清楚上傳了哪些檔名。

## 交圖格式

1. 一張圖只畫一個角色、一個姿勢，面朝右邊，用四分之三側面（稍微轉向畫面、看得到大半張臉），不要完全側面。背景透明最好；做不到的話用單一純色背景（白色或淺灰），不要有地面、影子、文字。
2. **圖片大小不限，直接交繪圖工具輸出的原始大圖，不用自己縮小或裁切。** 縮小、裁切、去背、對齊腳底線都由 Claude 做。
3. 角色要畫完整（不能被切到），四周留一點空白。
4. 同一個角色的站立圖和攻擊圖：用同一個比例畫，**頭的大小要完全一樣**（例如白虎攻擊圖的頭目前比站立圖小約兩成，要避免），臉、衣服、顏色、比例完全相同，只有姿勢不同。
5. **拿武器的手要一致**：站立時用哪一隻手拿武器，攻擊時就用同一隻手（站立單手拿、攻擊改雙手可以，但原本那隻手一定要握著）。不要站立用右手、攻擊換左手。
6. **攻擊圖不畫特效**：刀光、爪痕、氣功、火焰、孢子都不要畫，程式會畫。
7. 檔案放在 `nantianmen-art/images/代號__動作.png`，中間兩條底線，動作只有 `idle`（站立）和 `attack`（攻擊）。
   例：`images/baihu__idle.png`、`images/baihu__attack.png`、`images/hero-chores__idle.png`。
   代號一定要用 BRIEF.md 表格裡的英文代號。檔名不確定也沒關係，在訊息裡寫清楚哪張是誰就好。

## 進度與待辦（Claude 收到圖後會更新這裡）

### 已完成（試做過關，畫風以這些為準）
主角雜役服 `hero-chores`（站立、攻擊）、白虎 `baihu`（站立、攻擊）、蘑菇妖 `mogu`、雜役峰後山背景 `bg-bamboo` 4 層、飛劍普通版 `feijian__field`。
之後畫的每一張都要和這些圖同一個畫風：四分之三側面、Q 版比例、墨線加淡彩、水墨質感。

### 現在：五個分支同時畫（泓 10/24 決定）
每一批開自己的分支，分支名稱照下表。每批照表格順序畫，畫完一張就可以先上傳。檔名、尺寸、規則見上面「交圖格式」和 BRIEF.md。

| 分支 | 內容 | 張數 |
|---|---|---|
| `art/nantianmen-people` | 人物 | 16 |
| `art/nantianmen-partners` | 夥伴（神獸） | 16 |
| `art/nantianmen-enemies` | 敵人（魔王、小怪） | 32 |
| `art/nantianmen-feijian-20261024`（沿用） | 法器 | 13 |
| `art/nantianmen-bg` | 背景 | 20 |

#### 1. 人物（`art/nantianmen-people`）
每個都畫 `__idle` 和 `__attack` 兩張。
- 主角另外 5 套服裝：`hero-sword`、`hero-alchemy`、`hero-tamer`、`hero-shop`、`hero-talisman`。臉、身高、比例和 `hero-chores` 完全一樣，只換服裝、髮型和武器。**這 5 套都不拿掃帚**，各自的武器、站立和攻擊動作見 BRIEF.md「主角」表格。
- 人物大將：`tietou`（鐵頭師兄）、`shen`（沈傲天）、`ye`（夜無塵）。

#### 2. 夥伴（`art/nantianmen-partners`）
每個都畫 `__idle` 和 `__attack` 兩張，照這個順序：`feng`、`xuanwu`、`baize`、`qinglong`、`qilin`、`jiuwei`、`taotie`、`fenghuang`。
神獸的站立圖和白虎一樣有氣勢（身體壓低或昂首、有神獸特徵的墨色飄毛、火焰或雲氣般的毛髮），不要畫成普通動物。

#### 3. 敵人（`art/nantianmen-enemies`）
- 魔王，畫 `__idle` 和 `__attack` 兩張：`heixiong`、`shuyao`、`kuilei`、`niutou`。
- 小怪，只畫 `__idle`：`limao`、`shijing`、`jiangshi`、`denglong`、`shuzhuang`、`houyao`、`sheyao`、`bianfu`、`kulou`、`langyao`、`zhiren`。
- 新小怪（泓 10/24 確認，各區新敵人），一樣只畫 `__idle`：`ginseng`、`yaoguan`、`xiabing`、`rongyangui`、`huoshu`、`yunduo`、`xianhe`、`leigong`、`shuangjing`、`tianbing`、`shenquan`、`jiahou`、`shishi`。外型見 BRIEF.md 角色清單。
小怪要像蘑菇妖一樣有表情、可愛又有點兇，臉轉向畫面。

#### 4. 法器（沿用 `art/nantianmen-feijian-20261024`）
飛劍普通版已完成 ✅，仙器版要再修一次（見「待辦」）。接著畫其他 6 個，每個畫 `__field` 和 `__xian` 兩張：`hulu`、`leizhu`、`bagua`、`fuzhen`、`tieguo`、`ruyi`。仙器版每一個都要非常華麗（BRIEF.md「法器」）。

#### 5. 背景（`art/nantianmen-bg`）
其他 5 區，每區 4 層 `sky`、`far`、`mid`、`ground`，照這個順序：`bg-herb`、`bg-town`、`bg-volcano`、`bg-cloud`、`bg-palace`。
寬高比照 `bg-bamboo`（約 3:1），左右要能無縫接起來。**除了 `sky` 以外都要透明背景**（`bg-bamboo__mid` 是白底，之後請記得透明）。

### 待辦（要修改的圖）
| 圖 | 問題 | 怎麼改 |
|---|---|---|
| `feijian__xian.png`（法器分支） | 加長版的設計很好，但劍看起來不直：劍柄和劍身不在同一條直線上（差幾度），劍身兩邊不平行、越往劍尖越寬，劍尖也偏向上緣。 | 保留設計和長度，重畫成一把筆直的劍：1. 劍首寶玉、劍柄、護手中心、劍身、劍尖全部在同一條直線上。2. 劍身兩邊刃完全平行，到劍尖才收尖，劍尖在劍身正中線上、左右對稱。3. 一樣斜放（劍尖朝右上、約 30 度）。 |
| `hero-sword__attack.png`（人物分支） | 左右手搞混了：站立圖是**右手**拿劍（身體轉向畫面，所以右手在畫面左側）。攻擊圖往前刺的那隻手接成了左手，往後伸的那隻手手掌、手指的方向又畫得像右手，看起來不合理。 | 站立圖不用改。攻擊圖重畫：**右手**握劍往前刺出（弓步、右肩往前），**左手**往後伸平衡，左手手掌和手指方向要是正確的左手（拇指朝上、掌心朝下或朝外）。臉、服裝、比例和頭的大小照站立圖。 |
