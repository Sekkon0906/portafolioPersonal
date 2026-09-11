/**
 * Captura las previews de los proyectos que salen en projects.html.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/capturar-previews.mjs
 *
 * Escribe JPEG en assets/previews/. Las tarjetas recortan a 16/9 con
 * object-position:top, así que lo que importa es la parte de arriba.
 *
 * Para capturar otro sitio sin tocar este archivo:
 *   node scripts/capturar-previews.mjs sorteosccm.jpg=https://ejemplo.com
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ    = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DESTINO = resolve(RAIZ, 'assets/previews');

/* 2x de los 680x382 que se muestran en la tarjeta */
const ANCHO  = 1360;
const ALTO   = 765;
const CALIDAD = 80;

const OBJETIVOS = {
  'gestek.jpg':      'https://gestor-eventos-frontend.vercel.app/',
  'hytrex.jpg':      'https://hytrex-landing.vercel.app/',
  'consultorio.jpg': 'https://consultorio-estetico-vm.vercel.app/',
  'sorteosccm.jpg':  'https://caballoscolombianosymas.com/',
};

/* Argumentos archivo=url sobrescriben o añaden objetivos */
for (const arg of process.argv.slice(2)) {
  const i = arg.indexOf('=');
  if (i > 0) OBJETIVOS[arg.slice(0, i)] = arg.slice(i + 1);
}

await mkdir(DESTINO, { recursive: true });

const navegador = await chromium.launch();
const contexto  = await navegador.newContext({
  viewport: { width: ANCHO, height: ALTO },
  /* Sin deviceScaleFactor: el viewport ya va al doble */
});

let fallos = 0;

for (const [archivo, url] of Object.entries(OBJETIVOS)) {
  const pagina = await contexto.newPage();
  try {
    await pagina.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

    /* Deja que terminen las animaciones de entrada y las fuentes */
    await pagina.evaluate(() => document.fonts?.ready).catch(() => {});
    await pagina.waitForTimeout(2500);

    /* Cierra banners de cookies que tapen el hero */
    await pagina.evaluate(() => {
      const patron = /acept|accept|entendido|got it|de acuerdo|permitir/i;
      for (const b of document.querySelectorAll('button, a[role="button"]')) {
        if (patron.test(b.textContent || '')) { b.click(); break; }
      }
    }).catch(() => {});
    await pagina.waitForTimeout(600);

    const salida = resolve(DESTINO, archivo);
    await pagina.screenshot({ path: salida, type: 'jpeg', quality: CALIDAD });
    console.log(`  ok   ${archivo.padEnd(18)} ${url}`);
  } catch (e) {
    fallos++;
    console.error(`  FALLO ${archivo.padEnd(18)} ${url}\n        ${e.message.split('\n')[0]}`);
  } finally {
    await pagina.close();
  }
}

await navegador.close();

console.log(
  fallos
    ? `\n${fallos} captura(s) fallaron. Las tarjetas correspondientes caen a thum.io.`
    : `\nListo. ${Object.keys(OBJETIVOS).length} capturas en assets/previews/.`
);
process.exit(fallos ? 1 : 0);
