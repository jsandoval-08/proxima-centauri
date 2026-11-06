import { defineConfig } from 'astro/config';

// Sitio 100 % estático. `SITE` y `BASE_PATH` se leen del entorno para poder
// desplegar en GitHub Pages (subruta) o en un dominio propio (raíz).
//   Dominio propio:  SITE=https://midominio.mx  npm run build
//   GitHub Pages:    lo define .github/workflows/deploy.yml
export default defineConfig({
  output: 'static',
  site: process.env.SITE ?? 'https://dominio-por-confirmar.example',
  base: process.env.BASE_PATH ?? '/',
});
