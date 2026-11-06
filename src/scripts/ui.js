const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scroll reveal + contadores */
function revelar() {
  const els = document.querySelectorAll('.reveal');
  if (reducir || !('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach((e) => io.observe(e));
}

function contadores() {
  const els = document.querySelectorAll('[data-cuenta]');
  const fmt = (v, d) => v.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });
  if (reducir || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const fin = parseFloat(e.target.dataset.cuenta);
      const d = parseInt(e.target.dataset.dec || '0', 10);
      const t0 = performance.now(), dur = 1400;
      const paso = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        e.target.textContent = fmt(fin * (1 - Math.pow(1 - p, 3)), d);
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
      // Respaldo: si la pestaña está en segundo plano, asegura el valor final.
      setTimeout(() => { e.target.textContent = fmt(fin, d); }, dur + 150);
    });
  }, { threshold: 0.4 });
  els.forEach((e) => io.observe(e));
}

/* Campo de estrellas con parallax lento */
function estrellas() {
  const c = document.getElementById('estrellas');
  if (!c) return;
  const ctx = c.getContext('2d');
  const capas = [
    { n: 50, r: 0.7, v: 0.15, a: 0.5 },
    { n: 30, r: 1.1, v: 0.35, a: 0.7 },
    { n: 14, r: 1.6, v: 0.6, a: 0.9 },
  ];
  let w = 0, h = 0, dpr = 1, st = [], scroll = 0, vivo = true;

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const k = Math.min(1, (w * h) / (1280 * 800));
    st = capas.flatMap((l, i) => Array.from({ length: Math.max(8, Math.round(l.n * k)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, i,
    })));
    dibujar(0);
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#FFFFFF';
    for (const s of st) {
      const l = capas[s.i];
      const y = (((s.y - scroll * l.v * 0.25 - t * 0.004 * l.v) % h) + h) % h;
      ctx.globalAlpha = l.a;
      ctx.fillRect(s.x, y, l.r * 1.4, l.r * 1.4);
    }
    ctx.globalAlpha = 1;
  }

  addEventListener('resize', medir);
  medir();
  if (reducir) return;
  addEventListener('scroll', () => { scroll = window.scrollY; }, { passive: true });
  document.addEventListener('visibilitychange', () => { vivo = !document.hidden; if (vivo) bucle(performance.now()); });
  function bucle(t) { if (!vivo) return; dibujar(t); requestAnimationFrame(bucle); }
  requestAnimationFrame(bucle);
}

revelar();
contadores();
estrellas();
