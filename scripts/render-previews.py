# Renders the first pages of each writing sample in public/samples/ as small images, for the
# previews on its project page (public/samples/previews/<sample>-<n>.png). Run it again after
# replacing a sample: python scripts/render-previews.py
import pathlib
import pymupdf as fitz  # pip install pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
SAMPLES = ROOT / "public" / "samples"
OUT = SAMPLES / "previews"
OUT.mkdir(exist_ok=True)
PAGES = 3      # how many pages to show
WIDTH = 560    # pixels: twice the size they're shown, for sharp screens

for pdf in sorted(SAMPLES.glob("*.pdf")):
    doc = fitz.open(pdf)
    for n in range(min(PAGES, doc.page_count)):
        page = doc[n]
        zoom = WIDTH / page.rect.width
        page.get_pixmap(matrix=fitz.Matrix(zoom, zoom)).save(OUT / f"{pdf.stem}-{n + 1}.png")
    print(pdf.name, min(PAGES, doc.page_count), "pages")
