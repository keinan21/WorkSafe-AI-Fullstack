// src/lib/math-curves.js

// Durasi animasi "bernafas" (pulsing) untuk SVG-nya
export function getCurvePulseDuration(curve) {
  return 4000;
}

// Menghitung skala efek bernafas (sedikit membesar/mengecil)
export function getDetailScale(now, duration) {
  const phase = (now % duration) / duration;
  const pulse = Math.sin(phase * Math.PI * 2);
  return 1.0 + pulse * 0.08; 
}

// Rumus Parametrik Matematika untuk tiap jenis kurva
export function getPoint(curve, progress, scale = 1) {
  const t = progress * Math.PI * 2;
  let x = 0, y = 0;
  
  switch(curve) {
    case 'rose': {
      // k=3, radius dasar 40
      const k = 3;
      const r = 40 * Math.cos(k * t) * scale;
      x = 50 + r * Math.cos(t);
      y = 50 + r * Math.sin(t);
      break;
    }
    case 'lissajous': {
      x = 50 + 40 * Math.sin(3 * t) * scale;
      y = 50 + 40 * Math.sin(2 * t) * scale;
      break;
    }
    case 'butterfly': {
      const e = Math.E;
      const r = 12 * (Math.pow(e, Math.cos(t)) - 2 * Math.cos(4*t) + Math.pow(Math.sin(t/12), 5)) * scale;
      x = 50 + r * Math.sin(t); 
      y = 50 - r * Math.cos(t);
      break;
    }
    case 'cardioid': {
      const a = 15 * scale;
      x = 50 + a * (2 * Math.cos(t) - Math.cos(2*t));
      y = 50 + a * (2 * Math.sin(t) - Math.sin(2*t));
      break;
    }
    case 'lemniscate': {
      const a = 40 * scale;
      const denominator = 1 + Math.pow(Math.sin(t), 2);
      x = 50 + (a * Math.cos(t)) / denominator;
      y = 50 + (a * Math.sin(t) * Math.cos(t)) / denominator;
      break;
    }
    default: // Lingkaran standar sebagai fallback
      x = 50 + 40 * Math.cos(t) * scale;
      y = 50 + 40 * Math.sin(t) * scale;
  }
  return { x, y };
}

// Menghitung sudut rotasi untuk kepala (head/kotak) yang berjalan di atas kurva
export function getAngle(curve, progress, scale = 1) {
  const delta = 0.001; // Sample titik terdekat di depannya
  const p1 = getPoint(curve, progress, scale);
  const p2 = getPoint(curve, progress + delta, scale);
  
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

// Mengonversi rumus-rumus di atas menjadi garis path SVG yang utuh
export function buildPath(curve, scale = 1) {
  const steps = 200; // Resolusi kurva, makin besar makin halus (tapi lebih berat)
  let path = '';
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const { x, y } = getPoint(curve, progress, scale);
    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  }
  // Tutup path-nya agar menyambung rapi
  return path + ' Z';
}