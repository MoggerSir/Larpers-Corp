// Motion tokens — Manual 9.2. Curvas y tiempos en un solo lugar.
export const ease = {
  out: [0.22, 1, 0.36, 1], // hover, tarjetas, listas
  standard: [0.4, 0, 0.2, 1], // modal, tabs, menú
}

export const duration = { hover: 0.2, tab: 0.22, card: 0.26, modal: 0.32, list: 0.3 }

// Tarjeta: fade + translateY 10px.
export const cardIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: duration.card, ease: ease.out } },
}

// Listas: stagger 30-45 ms, máx. 5 elementos escalonados.
export const stagger = (i) => Math.min(i, 5) * 0.04

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out, delay: stagger(i) },
  }),
}

// Revela por máscara (clip-path), sin mover layout.
export const maskReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', y: '30%' },
  show: (i = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    y: '0%',
    transition: { duration: 0.9, ease: ease.out, delay: 0.15 + i * 0.06 },
  }),
}
