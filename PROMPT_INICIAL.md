Vamos a construir la landing page del cohete del equipo Próxima Centauri para el reto "Rocket Tec Sinaloa 2026" (Tec de Monterrey, Campus Sinaloa). Es un sitio 100 % estático; después lo subiremos a un dominio que nos dará el profesor.

## Objetivo
Presentar al equipo, el cohete y la misión, y registrar el resultado del reto. El reto se gana prediciendo el vuelo lo más cerca posible del real, con el altímetro intacto (no gana el que vuela más alto). La página compara PREDICCIÓN vs. RESULTADO REAL y calcula el error.

## Configuración del repo (hazlo tú)
- `git init` en esta carpeta, rama `main`.
- Stack: Astro con salida estática (`output: 'static'`), sin backend. Si propones algo más simple, justifícalo antes.
- Todos los datos (predicciones, resultados, equipo, bitácora) en `src/data/mision.json`. Actualizar la página después del lanzamiento = editar solo ese JSON.
- `README.md` (cómo correr, hacer build y desplegar en cualquier hosting estático), `.gitignore` y un `CLAUDE.md` con las reglas de identidad visual de abajo para que se respeten en sesiones futuras.
- Commit al terminar cada fase, con mensajes claros en español.

## Identidad visual (respetar exacto)
- Estilo "HUD de misión": fondo oscuro, retícula sutil, esquinas de mira en cian, etiquetas tipo telemetría en monoespaciada, líneas finas de 1–2 px. Sin degradados chillones, sin emojis, sin sombras realistas.
- Paleta oficial (variables CSS): Negro Espacial #0A0E1C (fondo) · Azul Noche #141D40 · Azul Órbita #23346A · Cian Centauri #3FF0E0 (acento principal) · Violeta Nebulosa #7B3CFF (acento secundario) · Blanco #FFFFFF.
- Tipografía: Montserrat 800–900 para títulos, JetBrains Mono para datos y etiquetas HUD (Google Fonts).
- Logo: `assets/logo-proxima-centauri.svg`. Úsalo TAL CUAL: no lo redibujes ni cambies proporciones, colores o tipografía. En header, hero y favicon.
- Nombre del equipo como en el logo: "PRÓXIMA" en blanco, "CENTAURI" en cian.
- Contraste AA mínimo (texto 4.5:1).

## Secciones
1. Hero: logo grande, "PRÓXIMA CENTAURI · Rocket Tec Sinaloa 2026", frase corta de misión y estado del lanzamiento ("Pendiente" / "Completado") con fecha, ambos desde el JSON.
2. La misión: qué es el reto y cómo se califica (precisión de la predicción + altímetro intacto).
3. El cohete: ficha técnica en tarjetas HUD.
   - Largo ~35.7 cm con motor; Ø 26 mm; masa al despegue ~65 g.
   - Motor Estes A10-3T: 2.5 N·s, pico 13 N, quemado 0.8 s, retardo 3 s.
   - Altímetro Estes (registra altura máxima).
   - Recuperación: solo la ojiva con el altímetro baja en paracaídas hexagonal de Mylar de 26.5 cm con spill hole; el cuerpo cae libre.
4. Modelo y predicción: explicación breve del modelo en MATLAB (empuje, gravedad, arrastre; descenso con arrastre lineal F = −b·v, v_t = mg/b), aclarando qué simplifica. Predicciones con rango (los motores Estes varían ~±10 %).
5. Resultados (sección principal):
   - Tabla predicción vs. real: apogeo (m), tiempo al apogeo (s), tiempo de eyección (s), velocidad de descenso (m/s), tiempo total de vuelo (s), estado del altímetro (intacto / dañado).
   - Error absoluto y error % = |predicho − real| / real × 100, calculados automáticamente desde el JSON.
   - Gráfica SVG altura vs. tiempo: curva predicha + puntos reales.
   - Indicador de precisión global (promedio de error %).
   - Sin datos reales (null) → "Pendiente de lanzamiento" sin romper el diseño.
6. Bitácora: línea de tiempo de fases (1 Requisitos, 2 Materiales y pruebas, 3 Diseño de paracaídas, 4 Calibración con caídas desde 12 m, 5 Integración, 6 Modelo final, Lanzamiento) con estado de cada una desde el JSON.
7. Equipo: 5 tarjetas SIN fotos por ahora. En lugar de foto, iniciales dentro de un hexágono con trazo cian; deja un campo `foto` opcional en el JSON para agregarlas después. Nombre, rol y carrera:
   - Javier Sandoval Dávila — Líder de equipo — Ing. en Tecnologías Computacionales
   - Brian Cázares Molina — Integrante — Ing. en Tecnologías Computacionales
   - Oscar Ureta Acedo — Integrante — Ing. en IA y Ciencia de Datos
   - Jesús Ciau Gómez — Integrante — Ing. en Mecatrónica
   - Gabriel Heredia Ibarra — Integrante — Ing. en Física Industrial
   "Líder de equipo" en etiqueta violeta; "Integrante" en etiqueta con contorno cian.
8. Footer: Tec de Monterrey · Campus Sinaloa · 2026, créditos del equipo.

## Datos iniciales del JSON (preliminares)
- Apogeo predicho: 56–58 m (central 57)
- Tiempo al apogeo: 3.5–3.6 s
- Eyección: 3.8 s
- Velocidad de descenso objetivo: 4 m/s
- Todos los resultados reales: null

## Calidad
- Todo en español de México, sin errores ortográficos y con acentos correctos.
- Responsive, mobile first (la verán en celular durante el lanzamiento).
- HTML semántico, foco visible, respetar `prefers-reduced-motion`.
- Lighthouse ≥ 90 en todo; metadatos SEO y Open Graph con el logo.

## Nivel de diseño (muy importante)
Queremos una página sumamente atractiva, de nivel portafolio o premio de diseño, sin salirnos de la identidad. Ideas a ejecutar con buen gusto y sin saturar:
- Hero cinematográfico: campo de estrellas sutil en canvas con parallax lento, el logo como protagonista y una trayectoria parabólica del cohete que se dibuja al cargar.
- Telemetría viva: contadores que animan los números al entrar en pantalla (apogeo, tiempos, masa), con unidades en JetBrains Mono.
- Marcos HUD: esquinas de mira, reglas con ticks, coordenadas y etiquetas tipo "SYS · OK" como detalles finos, nunca como ruido.
- Gráfica de resultados animada: la curva predicha se traza con stroke-dashoffset y los puntos reales aparecen con un pulso cian.
- Microinteracciones: hover con brillo cian suave en tarjetas, transiciones de 150–300 ms y scroll reveal discreto.
- Tipografía con jerarquía fuerte: títulos enormes en Montserrat 900, mucho espacio negativo y alineación en cuadrícula.
- Todo con CSS/JS ligero (sin librerías pesadas de animación) y desactivado con prefers-reduced-motion.
- Antes de programar la Fase B, propón 2 direcciones visuales cortas (descripción + paleta de uso) y espera que elija.

## Forma de trabajo
Trabaja por fases y espera mi confirmación entre cada una:
- Fase A: setup del repo, estructura, `mision.json` con su esquema, `CLAUDE.md`.
- Fase B: header, hero y sección de resultados.
- Fase C: resto de secciones.
- Fase D: pulido, accesibilidad, README y build de producción.

Antes de la Fase A, dime en 5 líneas qué suposiciones haces.
