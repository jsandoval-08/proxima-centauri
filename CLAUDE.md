# Próxima Centauri · Landing Rocket Tec Sinaloa 2026

Sitio 100 % estático (Astro, `output: 'static'`, sin backend). Equipo de cohete del Tec de Monterrey, Campus Sinaloa.
El reto se gana prediciendo el vuelo lo más cerca posible del real con el altímetro intacto (no gana quien vuela más alto).

## Reglas de datos
- Todos los datos (predicciones, resultados, equipo, bitácora, fecha) viven en `src/data/mision.json`. No dupliques datos en componentes.
- Actualizar tras el lanzamiento = editar solo ese JSON. Valores `null` en `real` se muestran como "Pendiente de lanzamiento" sin romper el diseño.
- Error absoluto y error % = |predicho − real| / real × 100, calculados en build desde el JSON (usar el valor `central`). Nunca hardcodear resultados.
- Valores con `"estimado": true` se muestran marcados como "estimado".

## Identidad visual (respetar exacto)
- Estilo "HUD de misión": fondo oscuro, retícula sutil, esquinas de mira en cian, etiquetas tipo telemetría en monoespaciada, líneas de 1–2 px. Sin degradados chillones, sin emojis, sin sombras realistas.
- Paleta (variables en `src/styles/tokens.css`; no agregar otros colores):
  Negro Espacial #0A0E1C (fondo) · Azul Noche #141D40 · Azul Órbita #23346A · Cian Centauri #3FF0E0 (acento principal) · Violeta Nebulosa #7B3CFF (acento secundario) · Blanco #FFFFFF.
- Tipografía: Montserrat 800–900 para títulos; JetBrains Mono para datos y etiquetas HUD (Google Fonts).
- Logo: `assets/logo-proxima-centauri.svg` (copias en `public/` y `src/assets/`). El logo oficial es SIN margen blanco exterior (`assets/logo-proxima-centauri-calcomania.svg` conserva la versión con margen, solo para la calcomanía). Usar TAL CUAL: no redibujar ni cambiar proporciones, colores o tipografía. Va en header, hero y favicon.
- Nombre: "PRÓXIMA" en blanco, "CENTAURI" en cian.
- Contraste AA mínimo (texto 4.5:1).
- Etiquetas del equipo: "Líder de equipo" en violeta; "Integrante" con contorno cian. Sin fotos por ahora: iniciales en hexágono con trazo cian; campo `foto` opcional en el JSON.

## Calidad
- Español de México, con acentos correctos y sin errores ortográficos.
- Mobile first, HTML semántico, foco visible, respetar `prefers-reduced-motion` (desactivar animaciones).
- Lighthouse ≥ 90 en todo; metadatos SEO y Open Graph con el logo.
- Animaciones con CSS/JS ligero; sin librerías pesadas.

## Flujo
- Trabajo por fases (A setup, B header+hero+resultados, C resto de secciones, D pulido/README/build). Esperar confirmación entre fases; proponer 2 direcciones visuales antes de la Fase B.
- Commit al terminar cada fase, con mensajes claros en español.
- Comandos: `npm run dev`, `npm run build`, `npm run preview`.
