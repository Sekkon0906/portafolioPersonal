"""Genera assets/cv/CV_Juan_Felipe_Medina_Orjuela.pdf: CV en español, CV en inglés y las cartas de certificación.

Uso (desde la raíz del repo):
    python scripts/generar-cv.py [--cartas ruta.pdf]

- Imprime cv-juan-felipe-medina-es.html y cv-juan-felipe-medina.html con Chrome sin ventana.
- Las cartas de certificación se toman de --cartas (un PDF con solo las cartas) o, si no se da,
  de las dos últimas páginas del PDF que ya está en assets/cv (la carta en español y en inglés).
"""
import argparse
import io
import subprocess
import sys
import tempfile
from pathlib import Path

from pypdf import PdfReader, PdfWriter

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "assets" / "cv" / "CV_Juan_Felipe_Medina_Orjuela.pdf"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
PAGINAS = ["cv-juan-felipe-medina-es.html", "cv-juan-felipe-medina.html"]


def imprimir(html: Path, destino: Path) -> None:
    subprocess.run([
        str(CHROME), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
        "--virtual-time-budget=8000", f"--print-to-pdf={destino}", html.as_uri(),
    ], check=True, capture_output=True, timeout=120)


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--cartas", type=Path, help="PDF con las cartas de certificación")
    args = p.parse_args()

    if args.cartas:
        cartas = list(PdfReader(args.cartas).pages)
    else:
        # Se leen antes de sobrescribir el PDF actual.
        anterior = PdfReader(io.BytesIO(SALIDA.read_bytes()))
        cartas = list(anterior.pages[-2:])

    salida = PdfWriter()
    with tempfile.TemporaryDirectory() as tmp:
        for nombre in PAGINAS:
            destino = Path(tmp) / (nombre + ".pdf")
            imprimir(RAIZ / nombre, destino)
            paginas = PdfReader(destino).pages
            print(f"{nombre}: {len(paginas)} páginas")
            for pg in paginas:
                salida.add_page(pg)
    for pg in cartas:
        salida.add_page(pg)
    salida.add_metadata({"/Title": "Juan Felipe Medina Orjuela — CV", "/Author": "Juan Felipe Medina Orjuela"})
    with open(SALIDA, "wb") as f:
        salida.write(f)
    print(f"Listo: {SALIDA} ({len(salida.pages)} páginas)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
