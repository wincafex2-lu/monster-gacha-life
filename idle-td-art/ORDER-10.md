# 放置塔防角色點陣圖：工單 10　已收角色改臉＋攻擊圖比例重畫（15 支）

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

泓 2026-11-04 08:53（台灣時間）：「依這規則篩除不合格的角色，順便連臉一起重畫。」
原因有兩個：
1. 每個角色的臉幾乎一樣（只換眼睛顏色），看起來像複製人。
2. 攻擊圖的身體被畫長（頭差不多大，身體和腿變長），從狐仙開始越後面越多。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-10.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-10`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-10`。
3. 舊圖在各自的分支 `idle-td-art/images/` 裡（下面「舊圖在哪」）。新圖用**同樣的檔名**推到 `dot/idle-td-10` 的 `idle-td-art/images/`。
4. 每個角色照「步驟」順序交，**每一步等 Claude 在「意見與待辦」寫通過才做下一步**。等的時候可以先做下一個角色的第 1 步。每 5 分鐘 fetch 一次看意見。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停，接 `QUEUE.md` 下一張。

## 舊圖在哪

| 角色 | 代號 | 舊圖分支 |
|---|---|---|
| 狐仙少女 | `fox` | `dot/idle-td-2` |
| 龍騎小將 | `dragon` | `dot/idle-td-3` |
| 星弓少女 | `archer` | `dot/idle-td-4` |
| 機甲少年 | `mecha` | `dot/idle-td-5` |
| 煉丹童子 | `alchemist` | `dot/idle-td-6` |
| 法老王、吸血鬼、鐵甲將軍、流浪劍士、森林精靈 | `pharaoh` `vampire` `general` `swordsman` `elf` | `dot/idle-td-7` |
| 妖狐、熊貓拳師、海盜船長、殭屍道士、巫婆學徒 | `kitsune` `panda` `pirate` `jiangshi` `witch` | `dot/idle-td-8` |

掃地弟子（`disciple`）不用改，它的臉就是「標準臉」，其他角色都要跟它不一樣。

## 每個角色的步驟

1. **1 階站立圖只改臉**（附舊圖）：衣服、身形、大小、姿勢、顏色、位置全部不動，只照下面臉表重畫眼睛、眉毛、嘴巴。
2. **2 階以上站立圖只改臉**：附舊圖＋已通過的新 1 階站立圖（當臉的參考）。
3. **攻擊圖**：照下面「攻擊圖處理表」，每一階是「重畫」或「只改臉」。
   - 先做 1 階攻擊，通過後才做 2 階以上（2 階以上要用新的 1 階攻擊當動作參考）。

### 只改臉指令（站立圖、標「只改臉」的攻擊圖都用這段）

```
Keep this exact sprite: same size, same position, same outfit, same pose, same colors, same pixel style, same magenta #FF00FF background.
ONLY redraw the face: eyes = <眼睛>, eyebrows = <眉毛>, mouth = <嘴巴>.
Do not change anything else. Do not resize or move the character.
```

攻擊圖只改臉時，4 格每一格的臉都要改，而且 4 格是同一張臉（表情可以跟動作一起變，但眼型、眉毛、嘴巴的樣子不變）。

### 重畫攻擊圖指令（標「重畫」的用這段）

附圖 A＝該階已通過的新站立圖；圖 B＝舊的同階攻擊圖（只拿來看動作）。1 階以外，圖 B 改用已通過的新 1 階攻擊圖。

```
Image A is the character (tier N) standing sprite. Image B is an attack animation strip (4 frames) of the same character; use it ONLY for the poses.
Redraw image B as a 4-frame strip using the character from image A.
- Keep the same poses, the same number of frames (4), the same frame order, the same frame spacing and the same ground line as image B.
- Every frame must wear EXACTLY the same outfit and have EXACTLY the same face as image A.
- LOCKED PROPORTIONS: every frame must have EXACTLY the same head height (top of head to chin) AND the same body height (chin to soles) as image A. The head is usually fine; the problem in the old strip is the BODY and LEGS being too long. Do not stretch the torso or legs, do not make the character bigger.
- Frame 4 (back to idle) must match image A almost exactly, including the width between the two feet. Shoulder width, leg thickness and shoe size must be the same as image A in every frame.
- Accessories must follow the motion: wings flap, capes, tails and ribbons swing.
- Compare EVERY frame with image A side by side before finishing.
- Solid magenta #FF00FF background, clear empty space between frames, no effects.
```

## 臉表

| 角色 | 眼睛 | 眉毛 | 嘴巴 | 英文（貼進指令） |
|---|---|---|---|---|
| 狐仙少女 | 眼角上挑的狐狸杏眼 | 細細的彎眉 | 一邊嘴角翹起的狡猾笑 | eyes = sly upturned fox-like almond eyes; eyebrows = thin arched brows; mouth = sly smirk, one corner up |
| 龍騎小將 | 大而銳利的眼 | 粗直、往上揚的眉 | 露齒自信笑 | eyes = big sharp determined eyes; eyebrows = thick straight brows angled up; mouth = confident toothy grin |
| 星弓少女 | 大圓眼，瞳孔裡有星星高光 | 細細的高眉 | 小貓嘴「ω」 | eyes = big round eyes with a star-shaped highlight in each pupil; eyebrows = thin high brows; mouth = small cat mouth (ω shape) |
| 機甲少年 | 自信的半瞇眼 | 一邊高一邊低的粗眉 | 歪嘴笑露一顆虎牙 | eyes = confident half-closed eyes; eyebrows = thick brows, one raised higher; mouth = lopsided grin showing one small fang |
| 煉丹童子 | 圓圓下垂的睏睏眼（半睜） | 短短圓點眉（麻呂眉） | 小小的「o」嘴 | eyes = round droopy sleepy half-open eyes; eyebrows = short round dot eyebrows (maro-mayu); mouth = small round "o" mouth |
| 法老王 | 黑色粗眼線的長杏眼 | 粗平直的眉 | 閉嘴的高傲微笑 | eyes = long almond eyes with thick black Egyptian eyeliner; eyebrows = thick flat brows; mouth = closed proud smile |
| 吸血鬼 | 紅色細長吊梢眼 | 尖尖往上挑的眉 | 露兩顆小尖牙的壞笑 | eyes = narrow red upturned eyes; eyebrows = sharp pointed brows angled up; mouth = mischievous grin showing two small fangs |
| 鐵甲將軍 | 小而銳利的眼 | 很粗、往中間皺的濃眉 | 嘴角往下的嚴肅一字嘴 | eyes = small sharp eyes; eyebrows = very thick bushy brows furrowed toward the center; mouth = stern straight line, corners down |
| 流浪劍士 | 冷靜的細長眼，一邊被瀏海遮一半 | 細直的斜眉 | 一條線的平嘴 | eyes = calm narrow eyes, one half covered by bangs; eyebrows = thin straight slanted brows; mouth = flat neutral line |
| 森林精靈 | 大大的溫柔杏眼、長睫毛 | 細長柔和的眉 | 閉嘴溫柔微笑 | eyes = large gentle almond eyes with long eyelashes; eyebrows = long soft thin brows; mouth = gentle closed smile |
| 妖狐 | 瞇成彎線的笑眼，眼角紅色眼影 | 細短的眉 | 狐狸嘴「:3」 | eyes = closed smiling curved-line eyes with red eyeshadow at the corners; eyebrows = short thin brows; mouth = fox-like ":3" mouth |
| 熊貓拳師 | 圓圓的黑豆眼（沒有高光大眼） | 短粗的眉 | 鼓起臉頰、嘴巴緊閉用力 | eyes = small round black bean eyes; eyebrows = short thick brows; mouth = puffed cheeks, mouth pressed shut with effort |
| 海盜船長 | 一眼戴黑眼罩，另一眼大而圓 | 一邊高一邊低 | 咧嘴大笑，缺一顆牙 | eyes = black eyepatch over one eye, the other eye big and round; eyebrows = one high, one low; mouth = wide laughing grin with one missing tooth |
| 殭屍道士 | 空洞的圓眼（小小的黑點瞳孔） | 往下垂的八字眉 | 嘴巴小小張開、露一顆尖牙 | eyes = blank round eyes with tiny dot pupils; eyebrows = sad drooping brows; mouth = small open mouth with one fang |
| 巫婆學徒 | 半瞇的狡猾眼 | 尖尖往上挑的眉 | 大大咧開的壞笑「嘻嘻」 | eyes = half-closed sneaky eyes; eyebrows = sharp brows angled up; mouth = wide mischievous grin |

已經有遮住眼睛的配件（機甲 4、5 階護目鏡、殭屍符咒）照舊保留，看得到的部分照上表。

## 攻擊圖處理表

Claude 用「臉對齊後量身體長度」量出來的結果，差超過 3% 的重畫，其他只改臉。

| 角色 | 1 階 | 2 階 | 3 階 | 4 階 | 5 階 |
|---|---|---|---|---|---|
| 狐仙少女 | 重畫 | 重畫 | 重畫 | 重畫 | 重畫 |
| 龍騎小將 | 重畫 | 重畫 | 重畫 | 只改臉 | 只改臉 |
| 星弓少女 | 重畫 | 重畫 | 重畫 | 重畫 | 重畫 |
| 機甲少年 | 只改臉 | 重畫 | 重畫 | 重畫 | 重畫 |
| 煉丹童子 | 只改臉 | 只改臉 | 重畫 | 重畫 | 重畫 |
| 法老王 | 只改臉 | 只改臉 | 重畫 | | |
| 吸血鬼 | 重畫 | 重畫 | 重畫 | | |
| 鐵甲將軍 | 只改臉 | 只改臉 | 重畫 | | |
| 流浪劍士 | 只改臉 | 只改臉 | 重畫 | | |
| 森林精靈 | 只改臉 | 只改臉 | 重畫 | | |
| 妖狐 | 只改臉 | 重畫 | 重畫 | | |
| 熊貓拳師 | 只改臉 | 只改臉 | 只改臉 | | |
| 海盜船長 | 只改臉 | 重畫 | 重畫 | | |
| 殭屍道士 | 只改臉 | 重畫 | 只改臉 | | |
| 巫婆學徒 | 重畫 | 重畫 | 重畫 | | |

共 35 張重畫、20 張只改臉、55 張站立圖只改臉。

## 驗收規則（同工單 9）

- 臉：照臉表，跟掃地弟子和其他角色一眼看得出不同；同一角色每一階、每一格都是同一張臉。
- 只改臉的圖：除了臉以外不能有任何變化（大小、位置、衣服、顏色）。
- 比例：分開量**頭高**（頭頂到下巴）和**身體高**（下巴到腳底），任何一個跟同階站立圖差超過 3% 就退件。
- 4 格全部都量：第 4 格（待機）要跟站立圖幾乎一模一樣，包括兩腳站寬。動作不同的格子量肩寬、腿粗、鞋寬；蹲下或腳張開時，單獨拿前腳出來比寬度和大小。
- 服裝一致、會動的配件要動、動作不奇怪、腳底同一條地線（跟以前一樣）。

## 意見與待辦

（Claude 驗收後寫在這裡）

### 規則調整（2026-11-04 09:39 台灣時間，泓 核准）

- **頭高、身體高：維持 3%。**
- **站寬、肩寬、鞋寬、前腳：放寬到 6%**（鞋子只有幾十個像素，3% 只差一兩個像素，GPT 控制不到，量測誤差也有約 2%）。
- **第 4 格（回到待機）**：Claude 切圖時直接換成站立圖本身，不用畫到完全一樣；但第 4 格仍要畫，當作動作收尾的參考。
- **畫好就先上傳**，由 Claude 量完決定通過或退件，不要自己卡著不交。

### 11:33 台灣時間 攻擊圖一律改用「站立圖逐格改」（泓 核准）

阿嬤試做比例誤差 0.4% 以內，泓 看過程式加的動作示範後同意。**從現在起所有攻擊圖都用這個方法，不再一次畫 4 格的長條。**

- 每階攻擊交 3 張單格：`<代號>__t<階>__attack_f1.png`、`_f2.png`、`_f3.png`。第 4 格不用畫（用站立圖）。身體前傾、壓扁、踏步、刀光、震動都由程式加，**圖裡身體、腿、腳都不要動**。
- **1 階**：附 1 階站立圖，用下面指令，`<動作>` 照該角色原本攻擊指令的 Frame 1～3 描述。
- **2 階以上**：附圖 A＝該階站立圖、圖 B＝已通過的 1 階同一格，用第二段指令。

```
Edit this exact sprite. Keep the head, face, body, legs, feet, outfit, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the weapon to this pose: <動作>. Moving accessories (cape, tail, ribbons, wings) may swing a little.
Do not make the body or legs longer, do not move the feet, do not resize anything. Same magenta #FF00FF background.
```

```
Edit image A (tier N sprite). Keep its head, face, body, legs, feet, outfit, size and position EXACTLY the same.
ONLY change the arms and the weapon so the pose matches image B (same character at tier 1). Use the tier N weapon from image A.
Moving accessories (cape, tail, ribbons, wings) may swing a little. Do not resize anything. Same magenta #FF00FF background.
```

- 工單 10 的影響：上面「攻擊圖處理表」作廢。**所有攻擊圖（55 階）都用新方法，從改好臉的新站立圖逐格改**，臉自然就是新臉，不用再分「重畫」或「只改臉」。每個角色的順序：1 階站立改臉 → 其他階站立改臉 → 1 階攻擊 f1～f3 → 其他階攻擊。

### 13:01 台灣時間 補充（工單 9 的教訓）
攻擊格的武器**一律留在站立圖那隻手**，舉起、揮出都用同一隻手。逐格改指令最後加：`The weapon must stay in the SAME hand as in the original sprite. Do not move it to the other hand.` 換手的格子會退件。
- 13:05 台灣時間 15 支 1 階站立改臉 **全部通過**：大小、位置、衣服完全沒變（外框差 0～1 px），臉都照臉表而且彼此不同。下一步：各角色其他階站立改臉（附新 1 階當臉參考），然後攻擊逐格改。
- 13:08 台灣時間 狐仙少女 2～5 階站立改臉 **通過**（外框跟舊圖差 0～1 px，臉跟新 1 階一樣）。
- 13:18 台灣時間 龍騎、星弓、機甲 2～5 階站立改臉 **通過**（外框差 0～1 px，臉一致）。狐仙 1 階攻擊 f1 **通過**（頭 +0.2%、身體 0.0%，符咒留在同一隻手，尾巴有擺）。
- 13:30 台灣時間 煉丹 2～5 階、法老／吸血鬼／將軍／劍士／精靈 2、3 階站立改臉 **通過**（外框差 0～1 px，臉跟各自新 1 階一致）。狐仙 1 階攻擊 f2、f3 **通過**（頭 −0.1%、身體 0～+0.4%；f3 符咒已丟出、手空著，可以，符咒由程式飛出）。
- 13:38 台灣時間 妖狐、熊貓、海盜、殭屍、巫婆 2、3 階站立改臉 **通過**。**55 張站立圖改臉全部完成。** 狐仙 2 階攻擊 f1、f2 **通過**（頭 +0.3～0.4%、身體 +0.7～0.9%）。接著照順序做各角色攻擊逐格改。
- 13:50 台灣時間 狐仙 2 階 f3、3～5 階 f1～f3 **通過**（頭 −0.2～+1.0%、身體 −0.2～+1.9%；符咒／鈴杖都在同一隻手，尾巴、浮空符咒有動）。**狐仙少女攻擊 15 階格全收。**
