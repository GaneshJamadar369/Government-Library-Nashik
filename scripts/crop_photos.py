from PIL import Image
import os

INPUT_DIR  = r"C:\Users\HP\AppData\Local\Temp\notebook_pages"
OUTPUT_DIR = r"C:\Users\HP\Documents\Dyansampada Library Web\public\events"

# Crop box: below heading text (y=210), above inter-photo notes (y=615)
# Left/right margins trim notebook border
CROP_BOX = (90, 210, 810, 615)

os.makedirs(OUTPUT_DIR, exist_ok=True)

for i in range(1, 23):
    fname = f"page_{i:02d}_LEFT_photo.jpg"
    src = os.path.join(INPUT_DIR, fname)
    dst = os.path.join(OUTPUT_DIR, f"event_{i:02d}.jpg")
    with Image.open(src) as img:
        cropped = img.crop(CROP_BOX).convert("RGB")
        cropped.save(dst, "JPEG", quality=88)
    print(f"[{i:02d}/22] Saved event_{i:02d}.jpg ({cropped.size[0]}x{cropped.size[1]}px)")

print("\nAll 22 event photos cropped successfully.")
