# 放置塔防：工單 N7　山海經神獸 4 隻

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

泓已定設計（2026-11-06）。**排在 N5、N6（三位新傳說）之後**：N6 出現「完成通知」再接。
分支 **`dot/idle-td-n7`**（從 `origin/claude/project-thread-7a7c7v` 開），狀態改「進行中：<誰> <時間>」馬上推。檔案放 `idle-td-art/batch5/images/`。**每張畫好直接推，不用再問。**
網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/ORDER-N7.md

## 風格與大小（鎖死）

- 風格照四神獸 v2「帥萌大頭」：**頭約占身高一半**、神氣又可愛、招牌特徵誇張。參考 `ref/BEAST__baihu__stand.png`（地上）和 `ref/BEAST__zhuque__stand.png`（飛的）。
- 大小：比四神獸**大 1.2 倍**。地上的畫布 1254×1254，本體高約 940px，腳底 y≈1150；飛的畫布 1254×1254，本體高約 860px，置中，不畫地面。
- 面向右、側 3/4。背景純洋紅 `#FF00FF`。光暈、閃光由程式加，身上不要畫發光。
- **原創造型**，不要照抄任何遊戲或動畫的神獸。

## 指令

站立（附參考圖）：

```
Draw a NEW mythical beast in EXACTLY the same pixel-art style as the attached image: super-deformed chibi, the head is about HALF of the total height, cocky and cute "cool mascot" look, exaggerated signature features. Make it about 1.2 times bigger than the attached beast. 3/4 view facing right. Solid magenta #FF00FF background, no glow, no effects, no text.
Beast: <英文>
```

攻擊 f1～f3（附已通過的站立圖；第 4 格＝站立圖，不用畫）：

```
Edit this exact sprite. Keep the head, face, body, size and position EXACTLY the same (same pixels where possible).
ONLY change the pose for this attack frame: <動作>. Do not resize anything. Same magenta #FF00FF background.
```

大招特效 1 張（畫布 1774×887，洋紅底，實色、不要漸層發光）：`<id>__ult.png`。

## 神獸

| id | 名字 | 外型（英文貼給 GPT） | 攻擊 f1 / f2 / f3 | 大招圖 |
|---|---|---|---|---|
| qilin | 麒麟（地上） | qilin: golden scales, a single swept-back antler horn, flowing cream mane and tail like clouds, small auspicious clouds under each hoof (hooves still on the ground line) | f1 rears back, head raised / f2 leaps forward, front hooves forward / f3 lands stomping, mane flying | 祥雲：a wide band of golden auspicious swirl clouds |
| baize | 白澤（地上） | baize: snow-white fluffy lion-goat beast, wise calm look, eye-shaped markings along its sides, small curled horns, long beard | f1 lowers head, eye markings open / f2 raises head and roars / f3 rears up, front paws raised | 萬妖圖鑑卷軸：an open ancient scroll with monster drawings floating |
| tengshe | 騰蛇（飛） | tengshe: a flying serpent with cloud-wisp fins, coiled in an S shape in the air, small wing-fins, jade-green and white | f1 coils tighter / f2 lunges head forward / f3 tail whips, body stretched | 大霧雲團：a big rolling mist cloud bank |
| bifang | 畢方（飛） | bifang: a one-legged crane-like fire bird with blue-green feathers with red spots, white beak, single leg tucked, fiery tail feathers (solid, no glow) | f1 wings raised high / f2 wings flap forward, beak open / f3 dives forward, tail flaring | 天火：falling solid flame shapes from the sky |

## 待辦（檔名）

每隻：`<id>__stand.png` → Claude 寫通過 → `<id>__attack_f1.png`、`_f2.png`、`_f3.png`（`_f4` 用站立圖，Claude 處理）→ `<id>__ult.png`。順序 qilin → baize → tengshe → bifang。共 20 張要畫（含 f4 共 24）。

## 意見與待辦

（Claude 驗收後寫在這裡）
