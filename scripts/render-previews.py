# Renders the top of the first pages of each writing sample in public/samples/, margins trimmed, for
# the previews on its project page and its thumbnail in Selected work
# (public/samples/previews/<sample>-<n>.png). Cropped close, so the text can be read at the size
# they're shown. Run it again after replacing a sample: python scripts/render-previews.py
import pathlib
import pymupdf as fitz  # pip install pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
SAMPLES = ROOT / "public" / "samples"
OUT = SAMPLES / "previews"
OUT.mkdir(exist_ok=True)
PAGES = 2      # how many pages to show
WIDTH = 1000   # pixels: about twice the size they're shown, for sharp screens
# The part of each page shown, as fractions of its width and height: inside the margins, top part
LEFT, RIGHT, TOP, BOTTOM = 0.09, 0.91, 0.07, 0.42

for pdf in sorted(SAMPLES.glob("*.pdf")):
    doc = fitz.open(pdf)
    for n in range(min(PAGES, doc.page_count)):
        page = doc[n]
        r = page.rect
        clip = fitz.Rect(r.width * LEFT, r.height * TOP, r.width * RIGHT, r.height * BOTTOM)
        zoom = WIDTH / clip.width
        page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip).save(OUT / f"{pdf.stem}-{n + 1}.png")
    print(pdf.name, min(PAGES, doc.page_count), "pages")
