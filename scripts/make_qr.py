#!/usr/bin/env python3
"""Generate an on-brand QR code (dreamy violet→pink gradient, rounded modules,
center brand mark) for Margarita's portfolio.

Usage: python3 scripts/make_qr.py [URL]
"""
import sys
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

URL = sys.argv[1] if len(sys.argv) > 1 else "https://ritaaa08.github.io/CV_Demakova-Margarita/"

# Brand palette
CREAM = (252, 246, 244)
V = (94, 59, 208)     # deep violet  (data start)
P = (199, 63, 126)    # deep rose    (data end)
LV = (139, 108, 240)  # light violet (logo)
LP = (229, 115, 158)  # light pink   (logo)

SS = 3          # supersample factor for smooth edges
MOD = 30        # logical px per module
m = MOD * SS

def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=1, border=4)
qr.add_data(URL)
qr.make(fit=True)
mat = qr.get_matrix()
n = len(mat)
size = n * m

img = Image.new("RGB", (size, size), CREAM)
d = ImageDraw.Draw(img)

r = int(m * 0.42)  # corner radius of each module (rounded but still readable)
denom = max(1, (2 * (n - 1)))
for y in range(n):
    for x in range(n):
        if not mat[y][x]:
            continue
        col = lerp(V, P, (x + y) / denom)
        x0, y0 = x * m, y * m
        pad = int(m * 0.06)
        d.rounded_rectangle([x0 + pad, y0 + pad, x0 + m - pad, y0 + m - pad],
                            radius=r, fill=col)

# ---- solid finder eyes (top-left, top-right, bottom-left) for reliable scanning ----
def eye(mc, mr):
    col = lerp(V, P, ((mc + 3) + (mr + 3)) / denom)
    x0, y0 = mc * m, mr * m
    s = 7 * m
    d.rounded_rectangle([x0 + m*0.1, y0 + m*0.1, x0 + s - m*0.1, y0 + s - m*0.1], radius=int(m*1.6), fill=col)
    d.rounded_rectangle([x0 + m, y0 + m, x0 + 6*m, y0 + 6*m], radius=int(m*1.1), fill=CREAM)
    d.rounded_rectangle([x0 + 2*m, y0 + 2*m, x0 + 5*m, y0 + 5*m], radius=int(m*0.7), fill=col)

eye(0, 0)
eye(n - 7, 0)
eye(0, n - 7)

# ---- center brand mark ----
logo_r = int(size * 0.115)
cx = cy = size // 2
# cream halo so the mark reads cleanly (error correction H tolerates this)
d.ellipse([cx - logo_r - int(m*0.6), cy - logo_r - int(m*0.6),
           cx + logo_r + int(m*0.6), cy + logo_r + int(m*0.6)], fill=CREAM)
# gradient disc
disc = Image.new("RGB", (logo_r * 2, logo_r * 2))
dd = disc.load()
for j in range(logo_r * 2):
    for i in range(logo_r * 2):
        dd[i, j] = lerp(LV, LP, (i + j) / (4 * logo_r))
mask = Image.new("L", (logo_r * 2, logo_r * 2), 0)
ImageDraw.Draw(mask).ellipse([0, 0, logo_r * 2 - 1, logo_r * 2 - 1], fill=255)
img.paste(disc, (cx - logo_r, cy - logo_r), mask)

# "M" in the disc
font = None
for path in [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNS.ttf",
]:
    try:
        font = ImageFont.truetype(path, int(logo_r * 1.25))
        break
    except Exception:
        continue
if font:
    tb = d.textbbox((0, 0), "M", font=font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text((cx - tw / 2 - tb[0], cy - th / 2 - tb[1]), "M", font=font, fill=(255, 255, 255))

# downscale for smooth anti-aliased edges
out = img.resize((size // SS, size // SS), Image.LANCZOS)
for dest in ["public/qr-portfolio.png", "qr-portfolio.png"]:
    out.save(dest)
print(f"QR -> {URL}  ({out.size[0]}px)  saved to public/qr-portfolio.png & qr-portfolio.png")
