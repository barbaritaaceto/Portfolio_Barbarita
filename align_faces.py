"""
Genera barbi-baby-aligned.png y barbi-adult-aligned.png
Sin barras negras, caras del mismo tamaño, ojos alineados al mismo Y.
"""
from PIL import Image, ImageDraw

baby  = Image.open("public/barbi baby.png").convert("RGB")
adult = Image.open("public/Barbi AI grande.png").convert("RGB")

W, H = 600, 800

# Face landmarks (original pixel coordinates)
B_NOSE_X  = 400;  B_EYE_Y = 230;  B_IE_DIST = 170
A_NOSE_X  = 800;  A_EYE_Y = 278;  A_IE_DIST = 185

TARGET_EYE_Y  = 216   # 27% from top
TARGET_NOSE_X = W // 2

# BABY: minimum scale = (H - TARGET_EYE_Y) / (baby.height - B_EYE_Y)
#                     = 584 / 434 = 1.346
B_ZOOM  = 0.90          # < 1 = zoom out (smaller face)
b_scale = max((H - TARGET_EYE_Y) / (baby.height - B_EYE_Y), 1.36) * B_ZOOM

b_w = round(baby.width  * b_scale)
b_h = round(baby.height * b_scale)
baby_r = baby.resize((b_w, b_h), Image.LANCZOS)

b_nose_x_s = round(B_NOSE_X * b_scale)
b_eye_y_s  = round(B_EYE_Y  * b_scale)
bx0 = b_nose_x_s - TARGET_NOSE_X
by0 = b_eye_y_s  - TARGET_EYE_Y

baby_crop = baby_r.crop((bx0, by0, bx0+W, by0+H))
baby_crop.save("public/barbi-baby-aligned.png", optimize=True)

# ADULT: match baby inter-eye distance, then zoom out a bit
TARGET_IE = round(B_IE_DIST * b_scale)
A_ZOOM    = 0.74          # < 1 = zoom out (smaller face), > 1 = zoom in
a_scale   = (TARGET_IE / A_IE_DIST) * A_ZOOM

a_w = round(adult.width  * a_scale)
a_h = round(adult.height * a_scale)
adult_r = adult.resize((a_w, a_h), Image.LANCZOS)

a_nose_x_s = round(A_NOSE_X * a_scale)
a_eye_y_s  = round(A_EYE_Y  * a_scale)
ax0 = a_nose_x_s - TARGET_NOSE_X
ay0 = a_eye_y_s  - TARGET_EYE_Y

adult_crop = adult_r.crop((ax0, ay0, ax0+W, ay0+H))
adult_crop.save("public/barbi-adult-aligned.png", optimize=True)

# Composite preview
preview = Image.new("RGB", (W, H))
preview.paste(baby_crop.crop( (0, 0, W//2, H)), (0,    0))
preview.paste(adult_crop.crop((W//2, 0, W, H)), (W//2, 0))
draw = ImageDraw.Draw(preview)
draw.line([(W//2,0),(W//2,H)], fill=(255,255,255), width=2)
preview.save("public/barbi-composite-preview.png")

print(f"Baby  scale={b_scale:.3f}  ie={round(B_IE_DIST*b_scale)}px  eyes_y={b_eye_y_s-by0}")
print(f"Adult scale={a_scale:.3f}  ie={round(A_IE_DIST*a_scale)}px  eyes_y={a_eye_y_s-ay0}")
print("Done — public/barbi-composite-preview.png")
