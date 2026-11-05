"""第三批美術打包（投射物、命中特效、大招、介面）。接在 pack.py 之後跑，合併進同一份 manifest。
用法：python3 pack3.py <第三批原圖資料夾> <輸出資料夾>"""
import sys, os, json
import numpy as np
from PIL import Image
sys.argv = [sys.argv[0], sys.argv[1], sys.argv[2]]
SRC, OUT = sys.argv[1], sys.argv[2]
exec(open(os.path.join(os.path.dirname(__file__), 'pack.py')).read().split('MAN = {}')[0].split('SRC, OUT = sys.argv[1], sys.argv[2]')[1].replace('os.makedirs(OUT, exist_ok=True)', ''))
mp = os.path.join(OUT, 'manifest.json')
MAN = json.load(open(mp))

def save(key, im, ax, ay, q=86):
    im.save(os.path.join(OUT, key + '.webp'), 'WEBP', quality=q, method=6)
    MAN[key] = [im.width, im.height, round(ax, 1), round(ay, 1)]

def fit(im, w=None, h=None):
    bb = im.getbbox(); im = im.crop(bb)
    f = (w / im.width) if w else (h / im.height)
    return im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)

# 投射物：世界長度（遊戲裡 1 倍），輸出 2 倍
PL = {'p_arrow': 40, 'p_bolt': 52, 'p_harpoon': 48, 'p_talisman': 24, 'p_ofuda': 24, 'p_pill': 13, 'p_scarab': 20,
      'p_foxfire': 28, 'p_bullet': 10, 'p_starbolt': 20, 'p_iceshard': 30, 'p_bun': 16, 'p_seed': 16, 'p_firebomb': 24}
for k, L in PL.items():
    im = fit(keyed(k + '.png'), w=L * 2)
    save(k, im, im.width * .6, im.height / 2)

def cells(n, cols, rows, size):
    """把一張分格圖切成 cols×rows 格，各格用同一個外框（保持中心對齊），縮到 size（世界大小）。"""
    im = keyed(n); W, H = im.size; cw, ch = W / cols, H / rows
    cs = [im.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch))) for r in range(rows) for c in range(cols)]
    bbs = [c.getbbox() for c in cs]
    ok = [b for b in bbs if b]
    x0 = min(b[0] for b in ok); y0 = min(b[1] for b in ok); x1 = max(b[2] for b in ok); y1 = max(b[3] for b in ok)
    side = max(x1 - x0, y1 - y0); f = size * 2 / side
    out = []
    for c in cs:
        c = c.crop((x0, y0, x1, y1)); c = c.resize((max(1, round(c.width * f)), max(1, round(c.height * f))), Image.LANCZOS)
        out.append(c)
    return out

for n in ('fx_slash', 'fx_blunt', 'fx_fire', 'fx_ice', 'fx_thunder', 'fx_poison', 'fx_wind', 'fx_heal', 'fx_stun'):
    for i, c in enumerate(cells(n + '.png', 4, 1, 90)):
        save(f'{n}_{i}', c, c.width / 2, c.height / 2, q=84)
for n in ('ult_dragon', 'ult_starrain', 'ult_ninetail', 'ult_mecha', 'ult_cauldron'):
    for i, c in enumerate(cells(n + '.png', 3, 2, 340)):
        save(f'{n}_{i}', c, c.width / 2, c.height / 2, q=84)

# 介面
for k in ('res_coin', 'res_spirit', 'res_gatestone', 'res_pill', 'res_beastsoul', 'res_soulcrystal', 'el_fire', 'el_ice', 'el_poison', 'el_thunder', 'el_wind'):
    im = fit(keyed(k + '.png'), h=96); save('u_' + k, im, im.width / 2, im.height / 2)
for k in ('card_common', 'card_rare', 'card_epic', 'card_legend', 'card_back'):
    im = keyed(k + '.png'); im = im.crop(im.getbbox()); im = im.resize((240, 320), Image.LANCZOS); save('u_' + k, im, 120, 160)
for k in ('ui_ult_frame', 'ui_panel'):
    im = keyed(k + '.png'); im = im.crop(im.getbbox()); im = im.resize((200, 200), Image.LANCZOS); save('u_' + k, im, 100, 100)
for k in ('bar_gate', 'bar_boss', 'ui_button'):
    im = keyed(k + '.png'); im = im.crop(im.getbbox()); im = im.resize((round(im.width * 600 / im.width), round(im.height * 600 / im.width)), Image.LANCZOS); save('u_' + k, im, 0, 0)
im = Image.open(os.path.join(SRC, 'gacha_altar.png')).convert('RGB').resize((960, 640), Image.LANCZOS)
im.save(os.path.join(OUT, 'u_gacha_altar.webp'), 'WEBP', quality=80, method=6); MAN['u_gacha_altar'] = [960, 640, 0, 0]

json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print(len(MAN))
