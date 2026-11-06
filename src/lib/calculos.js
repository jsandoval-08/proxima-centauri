// Cálculos derivados de mision.json. Nada de resultados hardcodeados.
export function formato(n, dec = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export function rango(p, dec) {
  if (p.min === p.max) return formato(p.central, dec);
  return `${formato(p.min, dec)}–${formato(p.max, dec)}`;
}

/** Una fila por variable: predicción, real, error absoluto y error %. */
export function filas(mision) {
  return mision.variables.map((v) => {
    const p = mision.prediccion[v.id];
    const real = mision.real[v.id] ?? null;
    const errAbs = real === null ? null : Math.abs(p.central - real);
    const errPct = real !== null && real !== 0 ? (errAbs / Math.abs(real)) * 100 : null;
    return { ...v, pred: p, real, errAbs, errPct };
  });
}

/** Promedio de error % de las variables que ya tienen dato real. */
export function errorPromedio(lista) {
  const v = lista.filter((f) => f.errPct !== null).map((f) => f.errPct);
  if (!v.length) return { valor: null, n: 0 };
  return { valor: v.reduce((a, b) => a + b, 0) / v.length, n: v.length };
}

export function fechaLarga(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}
