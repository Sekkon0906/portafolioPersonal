# Previews de proyectos

Capturas propias de los proyectos que salen en `projects.html`.

Mientras un archivo de esta carpeta no exista, la tarjeta cae automáticamente
en la captura remota de `image.thum.io`, y si esa también falla muestra el
placeholder de franjas. No hay que tocar el HTML: basta con dejar el archivo
aquí con el nombre exacto.

| Archivo            | Proyecto             | Sitio                                   |
|--------------------|----------------------|-----------------------------------------|
| `gestek.jpg`       | GESTEK Event OS      | gestor-eventos-frontend.vercel.app      |
| `hytrex.jpg`       | Hytrex               | hytrex-landing.vercel.app               |
| `consultorio.jpg`  | Consultorio Estético | consultorio-estetico-vm.vercel.app      |
| `sorteosccm.jpg`   | SorteosCCM           | caballoscolombianosymas.com             |

## Cómo generarlas

Las tarjetas recortan a 16/9 con `object-position: top`, así que lo que
importa es la parte de arriba de la página.

- **Tamaño:** 1360 × 765 px (2× de los 680 × 382 que se muestran).
- **Formato:** JPG de calidad ~80. Apunta a menos de 200 KB por archivo;
  se cargan con `loading="lazy"` pero son cuatro.
- **Encuadre:** viewport de escritorio, sin barras del navegador, con el
  hero visible y los banners de cookies cerrados.

Con Chrome headless:

```sh
chrome --headless --screenshot=gestek.jpg --window-size=1360,765 \
  --hide-scrollbars https://gestor-eventos-frontend.vercel.app/
```

O desde el navegador: DevTools → Ctrl+Shift+P → "Capture screenshot",
con el dispositivo fijado en 1360 × 765.
