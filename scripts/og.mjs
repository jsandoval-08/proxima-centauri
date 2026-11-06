// Genera public/og-logo.png (1200x630) a partir del logo oficial, sin modificarlo.
import sharp from 'sharp';

const W = 1200, H = 630;
const logo = await sharp('assets/logo-proxima-centauri.svg', { density: 300 })
  .resize({ height: 540 })
  .png()
  .toBuffer();

await sharp({ create: { width: W, height: H, channels: 4, background: '#0A0E1C' } })
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toFile('public/og-logo.png');
console.log('public/og-logo.png generado');
