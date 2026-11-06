import { defineConfig } from 'astro/config';

// Sitio 100 % estático. Si el hosting sirve desde una subruta, define `base`.
export default defineConfig({
  output: 'static',
  site: 'https://dominio-por-confirmar.example', // TODO: reemplazar con el dominio real
});
