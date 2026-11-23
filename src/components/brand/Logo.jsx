import { cx } from '@/lib/format'

// Versiones oficiales del logotipo (Manual 2.2). Hereda color con currentColor.
export function Logo({ variant = 'horizontal', className, title = 'Larper Corp' }) {
  if (variant === 'monogram') {
    return (
      <svg viewBox="0 0 64 48" className={cx('h-8 w-auto', className)} role="img" aria-label={title}>
        <text x="0" y="42" fontFamily="var(--font-display)" fontSize="48" fill="currentColor">L</text>
        <text x="28" y="42" fontFamily="var(--font-display)" fontSize="30" fill="currentColor">C</text>
      </svg>
    )
  }

  if (variant === 'wordmark') {
    return (
      <svg viewBox="0 0 220 64" className={cx('h-12 w-auto', className)} role="img" aria-label={title}>
        <text x="0" y="40" fontFamily="var(--font-display)" fontWeight="700" fontSize="44" letterSpacing="3" fill="currentColor">LARPER</text>
        <text x="2" y="60" fontFamily="var(--font-sans)" fontSize="10" letterSpacing="4" fill="currentColor" opacity=".7">CORP</text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 220 56" className={cx('h-10 w-auto', className)} role="img" aria-label={title}>
      <text x="0" y="42" fontFamily="var(--font-display)" fontSize="44" fill="currentColor">L</text>
      <text x="24" y="42" fontFamily="var(--font-display)" fontSize="26" fill="currentColor">C</text>
      <text x="64" y="32" fontFamily="var(--font-display)" fontWeight="700" fontSize="30" letterSpacing="2.5" fill="currentColor">LARPER</text>
      <line x1="64" y1="38" x2="210" y2="38" stroke="currentColor" strokeWidth="0.8" />
      <text x="64" y="51" fontFamily="var(--font-sans)" fontSize="7.5" letterSpacing="3" fill="currentColor" opacity=".75">CORP</text>
    </svg>
  )
}
