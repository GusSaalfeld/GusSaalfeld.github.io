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
        # The first page again, small, for the thumbnail in Selected work (shown 96px wide): the top of
        # the page at 4:3, about twice that size, so the list doesn't load full-size previews
        if n == 0:
            thumb = fitz.Rect(clip.x0, clip.y0, clip.x1, clip.y0 + clip.width * 3 / 4)
            tz = 200 / thumb.width
            page.get_pixmap(matrix=fitz.Matrix(tz, tz), clip=thumb).save(OUT / f"{pdf.stem}-thumb.png")
    print(pdf.name, min(PAGES, doc.page_count), "pages")
