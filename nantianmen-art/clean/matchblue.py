# Make the attack image's blue cloth match the idle image's (saturation and brightness of blue pixels).
import sys, numpy as np
from PIL import Image
ref, src, out = sys.argv[1:4]
def hsv(p):
    im = Image.open(p).convert('RGBA'); a = np.asarray(im)[..., 3]
    h = np.asarray(im.convert('RGB').convert('HSV')).astype(np.float32); return im, h, a
_, hr, ar = hsv(ref); im, hs, as_ = hsv(src)
def blue(h, a): return (a > 200) & (h[..., 0] > 130) & (h[..., 0] < 175) & (h[..., 1] > 40)
br, bs = blue(hr, ar), blue(hs, as_)
ks = np.median(hr[..., 1][br]) / np.median(hs[..., 1][bs]); kv = np.median(hr[..., 2][br]) / np.median(hs[..., 2][bs])
print('sat x%.2f val x%.2f  blue share ref %.3f src %.3f' % (ks, kv, br.mean() / (ar > 200).mean(), bs.mean() / (as_ > 200).mean()))
m = (as_ > 0) & (hs[..., 0] > 125) & (hs[..., 0] < 180)
hs[..., 1][m] = np.clip(hs[..., 1][m] * ks, 0, 255); hs[..., 2][m] = np.clip(hs[..., 2][m] * kv, 0, 255)
rgb = Image.fromarray(hs.astype(np.uint8), 'HSV').convert('RGB')
o = rgb.convert('RGBA'); o.putalpha(im.getchannel('A')); o.save(out)
