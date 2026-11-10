# Guía de estilo: presentación HTML del TP

Este archivo define cómo se ve y cómo se construye la presentación. Lo leen todos los integrantes del grupo y sus asistentes de IA. **Si una instrucción puntual contradice esta guía, avisar antes de desviarse.**

## 1. Contexto

- TP grupal de **Administración Estratégica del Capital Humano** (UTN FRBA, 2.º cuatrimestre 2026), Grupo N°7.
- Tema: **diversidad de género en tecnología** (barreras de entrada, permanencia y ascenso, y políticas con evidencia de efectividad).
- Formato: presentación oral en HTML + CSS + JS, sin frameworks ni build. Se abre con doble clic en `index.html`.
- **El contenido sale de `tp-diversidad-genero-tecnologia.md`.** No inventar datos, cifras ni fuentes: todo número que aparezca en una diapositiva tiene que estar en ese archivo, con su fuente.

## 2. Regla de oro: una sola fuente de estilo

- Todos los colores, tipografías, tamaños y espaciados viven en `theme.css` como variables CSS (`--bg`, `--ink`, `--accent`, etc.).
- **Prohibido** escribir colores hexadecimales, `px` de fuente o fuentes sueltas dentro de las diapositivas. Si falta algo, se agrega a `theme.css` y se avisa al grupo.
- **Prohibido** usar estilos inline (`style="..."`) salvo para posicionar algo de forma puntual (por ejemplo un ancho de columna).
- No tocar `theme.css` ni `deck.js` sin avisar: cambian todas las diapositivas a la vez.

## 3. Identidad visual

**Estilo:** académico, sobrio, editorial. Mucho aire, jerarquía clara, cero decoración gratuita.

| Rol | Variable | Valor |
|---|---|---|
| Fondo | `--bg` | crema claro `#FAF6EC` |
| Superficies (tarjetas, tablas) | `--surface` | crema más oscuro `#F1EADA` |
| Líneas y bordes | `--line` | `#D9CFB8` |
| Texto | `--ink` | marrón casi negro `#2A2520` |
| Texto secundario | `--ink-soft` | `#6A6054` |
| Acento principal | `--accent` | azul profundo `#1F3A5F` (guiño al azul UTN) |
| Acento secundario | `--accent-2` | terracota `#B0663A` |
| Acento de apoyo | `--accent-3` | verde salvia `#7C8B6A` |

- **Un solo acento por diapositiva** como protagonista (azul). El terracota y el salvia se usan para contrastar series en gráficos o resaltar un dato puntual.
- **Nunca** fondo oscuro, negro puro ni blanco puro. Sin degradés, sombras fuertes ni bordes redondeados exagerados.
- **Tipografías:** títulos en serif (`--font-title`, Source Serif 4 con Georgia de respaldo); texto en sans (`--font-body`, Source Sans 3 con Segoe UI/Arial de respaldo).
- **Tono del texto:** español formal y neutro, tercera persona o primera del plural. Sin emojis, sin signos de exclamación, sin humor forzado.
- **Iconos e ilustraciones:** solo si aportan información. Preferir líneas finas en `--accent`. Nada de clipart ni stock photos.

## 4. Formato de diapositiva

- Lienzo fijo de **1280 × 720 px** (16:9). `deck.js` lo escala a la pantalla.
- Cada diapositiva es un `<section class="slide ...">` dentro de `<main class="deck">`.
- **Una idea por diapositiva.** El título afirma algo ("La brecha se amplía en los niveles altos"), no rotula ("Brechas").
- Máximo **5 viñetas** de máximo **2 líneas** cada una. Si hace falta más, dividir en dos diapositivas.
- Tamaño mínimo de texto: el definido en `--fs-body`. No achicar texto para que entre; recortar contenido.
- **Toda diapositiva con datos lleva su fuente** abajo, en `<p class="source">Fuente: Autor (año).</p>`. Las fuentes salen del TP.

### Tipos de diapositiva (usar solo estos)

| Clase | Uso |
|---|---|
| `slide slide--cover` | Portada: título, subtítulo, materia, grupo e integrantes |
| `slide slide--section` | Separador de bloque (número grande + nombre del bloque) |
| `slide` | Título + contenido (viñetas o párrafo corto) |
| `slide` con `.cols` | Dos columnas (texto + texto, o texto + gráfico) |
| `slide` con `.stat` | Dato grande: una cifra protagonista + una línea de contexto |
| `slide` con `.chart-wrap` | Gráfico con título que afirma la conclusión |
| `slide` con `<table>` | Tabla comparativa (máx. 5 filas y 4 columnas) |
| `slide` con `<blockquote>` | Cita textual breve con atribución |
| `slide slide--closing` | Conclusiones y bibliografía |

Estructura base:

```html
<section class="slide">
  <p class="kicker">Bloque 2 · Brechas salariales</p>
  <h2>La brecha bruta ronda el 20% en Argentina</h2>
  <ul>
    <li>...</li>
  </ul>
  <p class="source">Fuente: Argoitia et al. (Fundar, 2024).</p>
</section>
```

## 5. Gráficos

- Librería: **Chart.js**, copiada en `vendor/chart.umd.js` (no usar CDN: la defensa puede ser sin internet).
- Los colores se leen de las variables CSS (`getComputedStyle(document.documentElement).getPropertyValue('--accent')`), nunca hardcodeados.
- Usar `responsive: false` con `width` y `height` fijos en el `<canvas>`: las diapositivas ocultas tienen tamaño 0 y Chart.js se rompe si es responsive.
- Un gráfico = una conclusión. Título que afirma, ejes con unidades, sin leyenda si hay una sola serie, sin grilla pesada, sin 3D.
- Preferir barras horizontales para comparar categorías y líneas para series temporales. Evitar tortas.
- Los datos del gráfico tienen que coincidir exactamente con los del TP. Si un dato no está, no se grafica.

## 6. Navegación y salida

- `deck.js` maneja flechas, espacio, `Home`/`End` y `F` (pantalla completa). No reimplementar navegación en las diapositivas.
- `Ctrl+P` genera un PDF con una diapositiva por página (ya está resuelto en `theme.css`). Verificarlo antes de entregar.
- Animaciones: solo fundidos suaves y sin superponer. Nada que distraiga ni que dependa del tiempo.

## 7. Trabajo en equipo

- Cada integrante edita **solo su bloque** de `index.html`, delimitado con comentarios:
  `<!-- BLOQUE 3: inicio (nombre) -->` ... `<!-- BLOQUE 3: fin -->`
- Repo en Git. Una rama por persona; pull antes de empezar y merge al terminar.
- Nombres de archivos de imágenes: `bloque3-sesgos-cv.svg` (minúsculas, guiones, sin espacios). Carpeta `assets/`.

## 8. Checklist antes de dar por terminada una diapositiva

- [ ] El título afirma una idea y entra en 2 líneas como máximo.
- [ ] No hay colores, fuentes ni tamaños escritos a mano.
- [ ] Las cifras coinciden con el TP y la fuente está citada.
- [ ] Hay aire: nada pegado a los bordes ni texto apretado.
- [ ] Se ve bien en pantalla completa y en la vista de impresión.
- [ ] Respeta el tono: formal, sin emojis.
