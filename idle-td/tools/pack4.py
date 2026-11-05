"""第四批美術打包（魔頭 3 隻：站立／蓄力／出招）。接在 pack.py、pack3.py 之後跑，合併進同一份 manifest。
法寶圖示 fb_<代號>.png 放同一個資料夾。
用法：python3 pack4.py <第四批原圖資料夾> <輸出資料夾>
魔頭顯示成 Boss 的 1.5 倍：Boss 站立約 383px（2 倍解析），魔頭站立約 575px，三隻共用同一縮放保持相對大小。
三張動作以站立圖的腳底 x 與原圖腳底 y 對齊，朝右原圖鏡像成朝左。"""
import sys, os, json
import numpy as np
from PIL import Image, ImageOps
SRC, OUT = sys.argv[1], sys.argv[2]
code = open(os.path.join(os.path.dirname(__file__), 'pack.py')).read().split('files = set(os.listdir(SRC))')[0]
code = code.split('SRC, OUT = sys.argv[1], sys.argv[2]')[1]
exec(code)
mp = os.path.join(OUT, 'manifest.json')
MAN = json.load(open(mp))
SCD = 575 / 1180
GY = {'hunshi': 1183, 'jiuyou': 1198, 'moshu': 1222}
for d, gy in GY.items():
    fx = sprite(f'd_{d}', f'{d}__stand.png', SCD, gy, mirror=True)
    for p in ('windup', 'strike'):
        sprite(f'd_{d}_{p}', f'{d}__{p}.png', SCD, gy, foot_x=fx, mirror=True)
# 法寶圖示：去背、裁到物品外框、補成正方形，存 128px（顯示 48～64px）
for f in sorted(os.listdir(SRC)):
    if f.startswith('fb_') and f.endswith('.png'):
        im = despeck(keyed(f), 200); im = im.crop(im.getbbox()); side = max(im.size)
        sq = Image.new('RGBA', (side, side), (0, 0, 0, 0)); sq.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
        sq = sq.resize((128, 128), Image.LANCZOS); k = 'i_' + f[:-4]
        sq.save(os.path.join(OUT, k + '.webp'), 'WEBP', quality=82, method=6); MAN[k] = [128, 128, 64, 64]
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print({k: v for k, v in MAN.items() if k.startswith('d_')})
