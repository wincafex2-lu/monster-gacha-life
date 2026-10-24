import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd

def keyout(im, crop=True, T1=18, T2=80, ring=4, holes=True, allholes=False, bgsample='border'):
    im = im.convert('RGBA'); A = np.asarray(im).astype(np.float32)
    rgb = A[..., :3]; alpha0 = A[..., 3]
    if (alpha0 < 20).mean() > 0.2:          # already transparent
        out = A
    else:
        H, W = rgb.shape[:2]
        border = np.concatenate([rgb[:3].reshape(-1, 3), rgb[-3:].reshape(-1, 3), rgb[:, :3].reshape(-1, 3), rgb[:, -3:].reshape(-1, 3)])
        if bgsample == 'top': border = rgb[:3].reshape(-1, 3)   # ground layers: only the top edge is background
        bg = np.median(border, 0)
        d = np.abs(rgb - bg).max(2)
        near = d < T1
        lab, n = nd.label(near)
        edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]) if bgsample != 'top' else lab[0])
        bgm = np.isin(lab, edge[edge > 0])
        # enclosed flat holes (gaps between legs/arms): large, very flat, very close to bg
        if n and holes:
            idx = np.arange(1, n + 1)
            area = nd.sum(np.ones_like(d), lab, idx)
            mean = nd.mean(d, lab, idx)
            var = nd.variance(rgb.mean(2), lab, idx)
            hole = idx[(area > 0.0008 * H * W) & (mean < 5) & (var < 4)] if not allholes else idx[area > allholes]
            bgm |= np.isin(lab, hole)
        chroma = bg.max() - bg.min() > 150
        if chroma:   # magenta key: alpha from how magenta a pixel is
            ring = 6
            mg = np.minimum(rgb[..., 0], rgb[..., 2]) - rgb[..., 1]
            mbg = min(bg[0], bg[2]) - bg[1]
            soft = 1 - np.clip((mg - 15) / (mbg - 15), 0, 1)
        else:
            soft = np.clip((d - T1 * 0.5) / (T2 - T1 * 0.5), 0, 1)
        rim = nd.binary_dilation(bgm, iterations=ring) & ~bgm
        a = np.ones_like(d); a[bgm] = 0; a[rim] = soft[rim]
        col = rgb.copy()
        aa = np.maximum(a, 0.05)[..., None]
        col[rim] = np.clip(bg + (rgb[rim] - bg) / aa[rim], 0, 255)
        if chroma:   # despill leftover magenta tint near edges
            zone = nd.binary_dilation(bgm, iterations=10) & ~bgm
            g = col[..., 1]; ex = np.minimum(col[..., 0], col[..., 2]) - g - 25
            fix = zone & (ex > 0)
            col[..., 0][fix] -= ex[fix]; col[..., 2][fix] -= ex[fix]
        out = np.dstack([col, a * 255])
    img = Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA')
    if crop:
        bb = img.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
        if bb:
            p = 12; W, H = img.size
            img = img.crop((max(0, bb[0] - p), max(0, bb[1] - p), min(W, bb[2] + p), min(H, bb[3] + p)))
    return img

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    crop = not src.split('/')[-1].startswith('bg-')
    keyout(Image.open(src), crop=crop).save(dst, optimize=True)
