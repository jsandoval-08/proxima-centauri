# Próxima Centauri · Rocket Tec Sinaloa 2026

Landing estática del equipo Próxima Centauri (Tec de Monterrey, Campus Sinaloa). Compara la predicción del vuelo contra el resultado real y calcula el error.

## Requisitos
Node.js 20 o superior y npm.

## Correr en local
```bash
npm install
npm run dev
```
Abre http://localhost:4321.

## Build de producción
```bash
npm run build
```
Genera la carpeta `dist/` con HTML, CSS y JS estáticos. Para revisarla: `npm run preview`.

## Desplegar en GitHub Pages (automático)
Cada `push` a `main` publica el sitio con `.github/workflows/deploy.yml` en
https://jsandoval-08.github.io/proxima-centauri/
Solo se activa una vez en el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Desplegar en otro hosting estático
Sube el contenido de `dist/` a cualquier hosting estático (servidor del profesor, Netlify, GitHub Pages, Cloudflare Pages, etc.). Pasos generales:
1. Compila con el dominio real: `SITE=https://midominio.mx npm run build` (en PowerShell: `$env:SITE='https://midominio.mx'; npm run build`).
2. Si se sirve desde una subruta, agrega también `BASE_PATH=/subruta/` (con diagonal al final).
3. Copia `dist/` al servidor. Actualiza `sitio.url` en `src/data/mision.json`.

## Actualizar después del lanzamiento
Edita solo `src/data/mision.json`:
- `lanzamiento.estado` a `"completado"` y `lanzamiento.fecha` (formato `AAAA-MM-DD`).
- Valores de `real` (apogeo, tiempos, velocidad de descenso, `altimetro`: `"intacto"` o `"dañado"`) y `puntos_vuelo` como pares `[t, h]`.
- Estado de cada fase en `bitacora` (`completada`, `en_curso`, `pendiente`).
- Fotos del equipo: ruta en el campo `foto` (archivo dentro de `public/`).

Luego `npm run build` y vuelve a subir `dist/`.

## Imagen para redes (Open Graph)
`public/og-logo.png` (1200×630) se genera desde el logo oficial. Si cambia el logo:
```bash
node scripts/og.mjs
```
Recuerda poner el dominio real en `sitio.url` para que la URL de la imagen sea correcta.

## Calidad verificada
Lighthouse sobre el build (`npm run preview`): rendimiento 91–100, accesibilidad 100, buenas prácticas 100 y SEO 100 (móvil y escritorio). Las animaciones respetan `prefers-reduced-motion`.

## Estructura
- `src/data/mision.json`: única fuente de datos.
- `src/styles/tokens.css`: paleta y tipografías.
- `src/layouts`, `src/components`, `src/pages`: la interfaz.
- `scripts/og.mjs`: genera la imagen Open Graph.
- `assets/` y `public/`: logo oficial (no modificar).
