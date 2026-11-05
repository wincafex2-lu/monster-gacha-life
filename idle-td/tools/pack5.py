"""第五批美術打包（新弟子：彈弓頑童、擊鼓小樂師、狸貓忍者、月兔仙子，之後小猴王）。
接在 pack.py 之後跑，用 pack.py 同一套去背／縮放／腳底對齊，合併進同一份 manifest。
用法：python3 pack5.py <原圖資料夾> <assets 資料夾> [5 階原圖資料夾]
6 階（神話）跟 5 階同一張畫布、同一個位置：有給 5 階原圖資料夾時，用 5 階的腳底 x/y 對齊，配件再大也不會讓人物位移。"""
import sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]
REF = sys.argv[3] if len(sys.argv) > 3 else None
src = open(os.path.join(os.path.dirname(__file__), 'pack.py'), encoding='utf-8').read()
exec(src[:src.index('files = set(')])  # 只拿 pack.py 的函式（keyed / sprite / ground_y_of）
mp = os.path.join(OUT, 'manifest.json')
MAN.update(json.load(open(mp)))
files = set(os.listdir(SRC))
sc = S * X2
for c in sorted({f.split('__')[0] for f in files if f.endswith('__stand.png') and '__t' in f}):
    for t in range(1, 7):
        n = f'{c}__t{t}__stand.png'
        if n not in files: continue
        r5 = f'{c}__t5__stand.png'
        if t == 6 and REF and os.path.exists(os.path.join(REF, r5)):
            SRC0 = SRC; SRC = REF; gy = ground_y_of(r5); a5 = np.array(keyed(r5))[..., 3]; SRC = SRC0
            y1 = np.where(a5.max(1) > 128)[0].max(); xs = np.where((a5[max(0, y1 - 40):y1 + 1] > 128).any(0))[0]
            fx = sprite(f'c_{c}_{t}', n, sc, gy, foot_x=(xs.min() + xs.max()) / 2)
        else:
            gy = ground_y_of(n)
            fx = sprite(f'c_{c}_{t}', n, sc, gy)
        for f in (1, 2, 3):
            na = f'{c}__t{t}__attack_f{f}.png'
            if na in files: sprite(f'c_{c}_{t}_a{f}', na, sc, gy, foot_x=fx)
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print(len(MAN), 'sprites')
