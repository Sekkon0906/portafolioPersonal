# Portafolio dinámico — diseño

Estado: propuesta para aprobar antes de construir. Fecha: 2026-11-26.

## La idea

Al abrir `portafoliojmo.vercel.app` la persona elige entre dos puertas:

- **Ver portafolio** → la versión estática de hoy (rápida, para reclutadores con prisa, buena para buscadores).
- **Encender consola** → el portafolio dinámico: una consola propia que arranca, te presenta como personaje y abre una biblioteca de juegos donde cada juego es un proyecto.

La versión dinámica nunca es obligatoria: siempre hay un botón "Ir a la versión rápida" y la estática tiene todo el contenido.

## Reglas de diseño

- **Todo original.** La consola, su logo, el sonido de arranque y la biblioteca son de diseño propio. Nada que imite una consola o tienda real (ni nombres, ni logos, ni la forma de sus pantallas). La biblioteca se inspira en el *género* "launcher de juegos", no en uno concreto.
- **Estilo:** pixel art de 16 bits, paleta corta, tipografía pixel para títulos y una legible para texto largo. Efecto CRT suave y desactivable.
- **Rápido:** la primera pantalla carga en menos de 2 s en un celular de gama media. Los sprites van en una hoja (spritesheet) y los diagramas en SVG.
- **Accesible:** se maneja con teclado, mouse y toque. `prefers-reduced-motion` salta las animaciones largas. Sonido apagado por defecto, con botón para activarlo.
- **Honesto:** fechas y cifras iguales a las del CV y LinkedIn.

## Flujo de la versión dinámica

1. **Arranque (≈4 s, se puede saltar):** pantalla negra, la consola "JMO" se enciende, logo propio en pixel art, sonido corto (si el sonido está activo).
2. **Menú principal:** fondo animado con tres opciones: *Jugador*, *Biblioteca*, *Contacto*. Pista de controles abajo (flechas / Enter / Esc).
3. **Jugador (quién soy):** ficha de personaje.
   - Retrato en pixel art, clase "Desarrollador Full-Stack", nivel = años de experiencia.
   - **Atributos** (barras): Arquitectura, Backend, Frontend, IA aplicada, Nube y DevOps, Datos.
   - **Inventario:** las certificaciones como objetos (Claude Academy, AWS Academy, Google Cloud) con enlace de verificación.
   - **Misiones completadas:** la experiencia (Develovers/GESTEK, Consultorio, Hytrex).
   - **Idiomas:** español nativo, inglés B1.
4. **Biblioteca (proyectos):** rejilla de "carátulas" en pixel art con filtros por género (IA, Web, Móvil, POS, Producción). Al entrar a un juego:
   - **Portada y sinopsis** (qué problema resuelve y para quién).
   - **Mapa del nivel:** el diagrama de arquitectura en SVG animado (cliente → API → base de datos → servicios externos), con cada pieza explicada al pasar el cursor o tocarla.
   - **Requisitos del sistema:** el stack.
   - **Logros:** cifras reales (por ejemplo, FESTECH: 4.485 boletas y 3.334 ingresos).
   - **Capturas o tráiler:** imágenes o GIF.
   - **Botones:** *Jugar* (demo en vivo, si existe), *Código* (GitHub, si es público), *Volver*.
5. **Contacto:** "Guardar partida": correo, LinkedIn, GitHub y descarga del CV.

## Biblioteca: qué juegos entran

| Juego | Género | Estado | Notas |
|---|---|---|---|
| GESTEK (Develovers) | Web · Producción | En producción | La pieza principal: FESTECH |
| Consultorio Estético | Web · IA · Producción | En producción | |
| Atenea | IA · Agentes | En desarrollo | Orquestador local |
| Sekkon | IA · Backend | En producción | |
| MeDinero | Web · IA · PWA | En desarrollo | |
| DevUP | Web · Tiempo real | Terminado | |
| SorteosCCM | Web · Producción | Terminado | |
| New Blood Premium BARF | IA · Automatización | Terminado | |
| Wallnut | Móvil | Proyecto de grado | |
| Ardy-IA | IA · RAG | Terminado | |
| MesaRol | Web · Java · DevOps | 2026 | Spring Boot, Keycloak, CI/CD |
| Ablaze | PWA · Offline | Pausado | Pendiente decidir si entra |

K-Crunch POS y Andruss POS quedan privados: no entran al portafolio.

## Datos

Un solo archivo `data/proyectos.json` alimenta las dos versiones (estática y dinámica), para no tener el contenido duplicado:

```json
{
  "id": "gestek",
  "titulo": "GESTEK",
  "genero": ["Web", "Producción"],
  "estado": "En producción",
  "anio": "2026",
  "sinopsis": "…",
  "stack": ["React", "Express", "PostgreSQL", "GitHub Actions"],
  "logros": ["4.485 boletas", "3.334 ingresos"],
  "arquitectura": "diagramas/gestek.svg",
  "caratula": "caratulas/gestek.png",
  "demo": "https://…",
  "codigo": null
}
```

## Tecnología

- **Estática:** se queda en HTML/CSS como hoy, leyendo `data/proyectos.json` (o generada desde él en el build).
- **Dinámica:** mini app en `/jugar` con **Vite + TypeScript**, sin framework pesado. Escenas en Canvas 2D para el arranque y los fondos; el resto en HTML/CSS con animaciones CSS y algo de GSAP. Sonidos cortos con Web Audio.
- **Despliegue:** el mismo proyecto de Vercel, con build de Vite hacia `/jugar`.
- **Arte:** carátulas y retrato en pixel art hechos para el portafolio (propios o generados y retocados), con licencia clara.

## Fases

1. **Base (½ día):** `data/proyectos.json`, puerta de entrada con las dos opciones y la estática leyendo los datos.
2. **Consola y menú (1 día):** arranque, menú principal, controles de teclado y toque, botón de saltar y de sonido.
3. **Jugador (½ día):** ficha de personaje, inventario de certificaciones y misiones.
4. **Biblioteca (1–2 días):** rejilla con filtros, ficha de juego y diagramas de arquitectura en SVG.
5. **Pulido (½ día):** CRT, sonidos, rendimiento en celular, accesibilidad y metaetiquetas para compartir.

Buen candidato para probar el flujo de Atenea: Claude escribe el plan de cada fase con criterios de aceptación, Antigravity (Gemini) programa y Claude revisa antes de aceptar.

## Por decidir

- ¿Ablaze entra a la biblioteca?
- Nombre de la consola (propuesta: "JMO").
- Arte: ¿retrato y carátulas hechos a mano, generados con IA y retocados, o una mezcla?
