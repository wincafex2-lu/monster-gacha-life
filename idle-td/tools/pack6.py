"""第六批美術打包（封神三傳說：楊戩、哪吒、敖丙的投射物、哮天犬、風火輪火尾、冰龍、大招）。
角色站立／攻擊格先用 pack5.py 打包；這支接在後面跑，合併進同一份 manifest。
用法：python3 pack6.py <原圖資料夾> <assets 資料夾>"""
import sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), 'pack.py'), encoding='utf-8').read()
exec(src[:src.index('files = set(')])
mp = os.path.join(OUT, 'manifest.json')
MAN.update(json.load(open(mp)))
sc = S * X2

def fit(im, w=None, h=None):
    bb = im.getbbox(); im = im.crop(bb)
    f = (w / im.width) if w else (h / im.height)
    return im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)

# 投射物（世界長度，輸出 2 倍）
for k, L in {'p_qiankun': 30, 'p_icepearl': 22, 'p_skyeye': 46}.items():
    im = fit(keyed(k + '.png'), w=L * 2); save(k, im, im.width * .6, im.height / 2)
# 哮天犬：跟角色同比例，腳底 1006（run_f3 後腳低 24px，上移對齊）
GD = {'dog_run_f3': 1030}
fx = None
for n in ('dog_run_f1', 'dog_run_f2', 'dog_run_f3', 'dog_run_f4', 'dog_bite_f1', 'dog_bite_f2'):
    r = sprite(n, n + '.png', sc, GD.get(n, 1006), foot_x=fx)
    fx = fx or r
# 風火輪火尾（往左拖）、冰龍（往右飛）：世界寬度
im = fit(keyed('wheel_firetrail.png'), w=110); save('wheel_firetrail', im, im.width, im.height / 2)
im = fit(keyed('ice_dragon.png'), w=260); save('ice_dragon', im, im.width / 2, im.height / 2)

def cells(n, cols, rows, size):
    im = keyed(n); W, H = im.size; cw, ch = W / cols, H / rows
    cs = [im.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch))) for r in range(rows) for c in range(cols)]
    ok = [b for b in (c.getbbox() for c in cs) if b]
    x0 = min(b[0] for b in ok); y0 = min(b[1] for b in ok); x1 = max(b[2] for b in ok); y1 = max(b[3] for b in ok)
    f = size * 2 / max(x1 - x0, y1 - y0)
    return [c.crop((x0, y0, x1, y1)).resize((max(1, round((x1 - x0) * f)), max(1, round((y1 - y0) * f))), Image.LANCZOS) for c in cs]

for n in ('ult_yangjian', 'ult_nezha', 'ult_aobing', 'ult_icefire'):
    for i, c in enumerate(cells(n + '.png', 3, 2, 340)):
        save(f'{n}_{i}', c, c.width / 2, c.height / 2, q=84)
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print(len(MAN))
