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

## Generarlas con el script

```sh
npm i -D playwright
npx playwright install chromium
node scripts/capturar-previews.mjs
```

Captura las cuatro de una vez, con el tamaño y la calidad correctos, y
cierra los banners de cookies que tapen el hero. Si un sitio falla, avisa
y sigue con los demás — esa tarjeta simplemente sigue usando thum.io.

Para capturar un sitio distinto sin editar el script:

```sh
node scripts/capturar-previews.mjs sorteosccm.jpg=https://otro-dominio.com
```

> El repo **no tiene `package.json` a propósito**: Vercel lo despliega como
> sitio estático, y añadir uno haría que intentara detectar un build. Instala
> Playwright en local sin comprometerlo al repo, o corre el script desde otra
> carpeta con `node /ruta/a/capturar-previews.mjs`.

## Generarlas a mano

Las tarjetas recortan a 16/9 con `object-position: top`, así que lo que
importa es la parte de arriba de la página.

- **Tamaño:** 1360 × 765 px (2× de los 680 × 382 que se muestran).
- **Formato:** JPG de calidad ~80. Apunta a menos de 200 KB por archivo;
  se cargan con `loading="lazy"` pero son cuatro.
- **Encuadre:** viewport de escritorio, sin barras del navegador, con el
  hero visible y los banners de cookies cerrados.

Desde el navegador: DevTools → Ctrl+Shift+P → "Capture screenshot", con el
dispositivo fijado en 1360 × 765.

Con Chrome headless (ojo: escribe **PNG** aunque el archivo diga `.jpg`,
hay que convertirlo después):

```sh
chrome --headless --screenshot=gestek.png --window-size=1360,765 \
  --hide-scrollbars https://gestor-eventos-frontend.vercel.app/
```
