import { Link } from 'react-router'
import { cx } from '@/lib/format'

// Manual 7.1: H 48 · R 4 · padding 22 · min 120 · 180-220 ms.
const base =
  'inline-flex min-h-12 min-w-30 items-center justify-center gap-2 rounded-sm px-[22px] text-button font-bold uppercase tracking-[0.06em] select-none ' +
  'transition-[background-color,box-shadow,color,transform] duration-200 ease-out-soft active:scale-[0.985] ' +
  'disabled:pointer-events-none disabled:bg-stone disabled:text-muted disabled:shadow-none'

const variants = {
  primary: 'bg-ink text-canvas hover:bg-graphite hover:shadow-button',
  secondary: 'border border-ink bg-surface text-ink hover:shadow-button',
  tertiary: 'bg-stone text-ink hover:bg-divider',
  inverse: 'bg-canvas text-ink hover:bg-surface hover:shadow-button',
  ghost: 'min-w-0 justify-start px-0 underline-offset-8 hover:underline', // hereda color del contexto
}

export function Button({ variant = 'primary', to, className, children, ...props }) {
  const classes = cx(base, variants[variant], className)
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
