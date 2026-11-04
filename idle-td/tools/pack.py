"""放置塔防素材打包：去背、照戰鬥比例縮放（2 倍解析度）、算腳底錨點。
用法：python3 pack.py <原圖資料夾> <輸出資料夾>
比例（泓 2026-11-04 定案）：背景 1024 高、角色 130px（原圖 705px → ×130/705）、腳底 y=860、
樓閣 ×0.42、一級山門高 210。輸出全部 ×2（給 iPad/手機高解析）。"""
import sys, os, json, glob
import numpy as np
from PIL import Image, ImageOps

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
X2 = 2
S = 130 / 705  # 角色／怪物／塔／神獸共用的像素比例

def load(n):
    return np.array(Image.open(os.path.join(SRC, n)).convert('RGB')).astype(np.int16)

def dil(m, r=1):
    o = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            o |= np.roll(np.roll(m, dy, 0), dx, 1)
    return o

def keyed(n, loose=False):
    a = load(n)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mg = np.minimum(r, b) - g
    hard = (np.minimum(r, b) >= 200) & (g <= 90) & (np.abs(r - b) < 60)
    alpha = np.where(hard, 0.0, 1.0)
    # 邊緣洋紅溢色：只處理貼著背景的像素（衣服裡的紫色不碰）
    edge = dil(hard, 2) & ~hard & (mg > 50) & (np.abs(r - b) < 80)
    t = np.clip((mg - 50) / 160.0, 0, 1)
    alpha = np.where(edge, 1 - t, alpha)
    rgb = a.astype(np.float32)
    M = np.array([255, 0, 255], np.float32)
    al = np.maximum(alpha, 1e-3)[..., None]
    un = (rgb - (1 - alpha[..., None]) * M) / al
    rgb = np.where(edge[..., None], np.clip(un, 0, 255), rgb)
    out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

def despeck(im, minpx=40):
    a = np.array(im)
    m = a[..., 3] > 20
    H, W = m.shape
    seen = np.zeros_like(m)
    keep = np.zeros_like(m)
    for y in range(H):
        for x in range(W):
            if m[y, x] and not seen[y, x]:
                st = [(y, x)]; seen[y, x] = 1; comp = []
                while st:
                    cy, cx = st.pop(); comp.append((cy, cx))
                    for ny, nx in ((cy+1,cx),(cy-1,cx),(cy,cx+1),(cy,cx-1)):
                        if 0 <= ny < H and 0 <= nx < W and m[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = 1; st.append((ny, nx))
                if len(comp) >= minpx:
                    for p in comp: keep[p] = 1
    a[~keep.astype(bool), 3] = 0
    return Image.fromarray(a, 'RGBA')

MAN = {}

def save(key, im, ax, ay, q=86):
    im.save(os.path.join(OUT, key + '.webp'), 'WEBP', quality=q, method=6)
    MAN[key] = [im.width, im.height, round(ax, 1), round(ay, 1)]

def sprite(key, n, scale, ground_y, foot_x=None, mirror=False, speck=40):
    """ground_y / foot_x：原圖座標的腳底線與中心。回傳原圖腳底 x 讓同一套動作共用。"""
    im = keyed(n)
    bb = im.getbbox()
    a = np.array(im)[..., 3]
    if foot_x is None:
        ys = np.where(a.max(1) > 128)[0]
        y1 = ys.max(); band = a[max(0, y1 - 40):y1 + 1] > 128
        xs = np.where(band.any(0))[0]
        foot_x = (xs.min() + xs.max()) / 2
    im = im.crop(bb)
    w, h = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    im = im.resize((w, h), Image.LANCZOS)
    im = despeck(im, speck)
    ax = (foot_x - bb[0]) * scale
    ay = (ground_y - bb[1]) * scale
    if mirror:
        im = ImageOps.mirror(im); ax = w - ax
    save(key, im, ax, ay)
    return foot_x

def ground_y_of(n):
    a = np.array(keyed(n))[..., 3]
    return np.where(a.max(1) > 128)[0].max()

files = set(os.listdir(SRC))
sc = S * X2

# 角色（站立，朝右）
chars = sorted({f.split('__')[0] for f in files if '__t' in f and f.endswith('__stand.png') and f.split('__')[0] not in
                ('crossbow', 'furnace', 'bell', 'frost', 'talisman')})
for c in chars:
    for t in range(1, 6):
        n = f'{c}__t{t}__stand.png'
        if n in files:
            sprite(f'c_{c}_{t}', n, sc, ground_y_of(n))

# 塔（地面，朝右）
for c in ('crossbow', 'furnace', 'bell', 'frost', 'talisman'):
    for t in range(1, 4):
        n = f'{c}__t{t}__stand.png'
        if n in files:
            sprite(f't_{c}_{t}', n, sc, ground_y_of(n))

# 神獸
for c in ('baihu', 'qinglong', 'zhuque', 'xuanwu'):
    n = f'{c}__stand.png'
    if n in files:
        fly = c in ('qinglong', 'zhuque')
        sprite(f'b_{c}', n, sc, 978 if fly else ground_y_of(n))

# 怪物（原圖朝右，遊戲裡朝左走 → 鏡像）
for m in ('slime', 'mushroom', 'imp', 'skeleton', 'wolf', 'golem', 'bat', 'umbrella'):
    n = f'{m}__stand.png'
    if m == 'bat':
        # 站立圖有 2 格（翅膀上/下），左右切開
        im = Image.open(os.path.join(SRC, n)); W = im.width
        for i, (x0, x1) in enumerate(((0, W // 2), (W // 2, W))):
            tmp = f'_bat{i}.png'; im.crop((x0, 0, x1, im.height)).save(os.path.join(SRC, tmp))
            sprite(f'm_bat_{i}', tmp, sc, 978, mirror=True)
        continue
    gy = ground_y_of(n)
    fx = sprite(f'm_{m}', n, sc, gy, mirror=True)
    for k in (1, 2, 3):
        fn = f'{m}__attack_f{k}.png'
        if fn in files:
            sprite(f'm_{m}_a{k}', fn, sc, gy, foot_x=fx, mirror=True)

# Boss
for m in ('slimeking', 'bullking', 'bonegeneral', 'treeelder'):
    n = f'{m}__stand.png'; gy = ground_y_of(n)
    fx = sprite(f'k_{m}', n, sc, gy, mirror=True)
    for p in ('windup', 'strike'):
        sprite(f'k_{m}_{p}', f'{m}__{p}.png', sc, gy, foot_x=fx, mirror=True)

# 陣法地面（橢圓光陣，置中）
for f in sorted(files):
    if f.endswith('__ground.png') and f[:2] in ('a_', 'd_'):
        k = f.split('__')[0]
        im = keyed(f); bb = im.getbbox(); im = im.crop(bb)
        w = round(im.width * sc * 0.75); h = round(im.height * sc * 0.75)
        im = im.resize((w, h), Image.LANCZOS)
        save('g_' + k, im, w / 2, h / 2, q=80)
    if f.endswith('__icon.png') and f[:2] in ('a_', 'd_'):
        k = f.split('__')[0]
        im = keyed(f); im = im.crop(im.getbbox()); im = im.resize((128, round(128 * im.height / im.width)), Image.LANCZOS)
        save('i_' + k, im, 64, 64, q=82)

# 樓閣：站位偵測（同 gate-bg/spots.py 的方法）
def mag(n):
    a = load(n); return (a[..., 0] > 190) & (a[..., 1] < 90) & (a[..., 2] > 190)
EXP = {2: [2], 3: [3], 4: [2, 2], 5: [3, 2], 6: [3, 3], 7: [3, 2, 2], 8: [3, 3, 2]}
TS = 0.42 * X2
for tn in range(2, 9):
    n = f'tower{tn}.png'
    if n not in files: continue
    m = mag(n); H, W = m.shape
    xs = np.where((~m).any(0))[0]; x0, x1 = xs.min(), xs.max()
    def runs(y):
        r = []; row = m[y, x0:x1 + 1]; x = 0
        while x < len(row):
            if row[x]:
                s0 = x
                while x < len(row) and row[x]: x += 1
                if s0 > 0 and x < len(row) and x - s0 >= 140: r.append((x0 + s0, x0 + x))
            else: x += 1
        return r
    prev = []; det = []
    for y in range(H - 1, 0, -4):
        r = runs(y)
        if r and not prev: det.append((y, r))
        prev = r
    want = list(EXP[tn]); spots = []
    for y, r in det:
        if want and len(r) == want[0]:
            for a_, b_ in r: spots.append([(a_ + b_) / 2, y + 30])
            want.pop(0)
    assert not want, (tn, det)
    im = keyed(n); bb = im.getbbox(); im = im.crop(bb)
    im = im.resize((round(im.width * TS), round(im.height * TS)), Image.LANCZOS)
    save(f'tower{tn}', im, 0, im.height, q=84)
    MAN[f'tower{tn}'].append([[round((sx - bb[0]) * TS, 1), round((sy - bb[1]) * TS, 1)] for sx, sy in spots])

# 山門（牌坊門）：一級高 210，往上照比例
GH = {1: 210, 2: 220, 3: 230, 4: 240, 5: 250}
for gi in range(1, 6):
    for st in ('ok', 'broken'):
        n = f'gate{gi}__{st}.png'
        if n not in files: continue
        im = keyed(n); bb = im.getbbox(); im = im.crop(bb)
        h = GH[gi] * X2; w = round(im.width * h / im.height)
        im = im.resize((w, h), Image.LANCZOS)
        save(f'gate{gi}_{st}', im, w / 2, h, q=84)

# 背景：far + mid + ground 疊成一張（1536x1024，可左右接）
for bgn in ('meadow', 'bamboo', 'nightwood'):
    try:
        c = Image.open(os.path.join(SRC, f'bg-{bgn}__far.png')).convert('RGBA')
        for l in ('mid', 'ground'):
            c.alpha_composite(keyed(f'bg-{bgn}__{l}.png'))
        c.convert('RGB').save(os.path.join(OUT, f'bg_{bgn}.webp'), 'WEBP', quality=80, method=6)
        MAN[f'bg_{bgn}'] = [1536, 1024, 0, 0]
    except FileNotFoundError:
        pass

with open(os.path.join(OUT, 'manifest.json'), 'w') as f:
    json.dump(MAN, f, separators=(',', ':'))
print(len(MAN), 'sprites')
