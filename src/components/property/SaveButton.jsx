import { Heart } from 'lucide-react'
import { motion } from 'motion/react'
import { useSaved } from '@/hooks/useSaved'
import { cx } from '@/lib/format'

// Manual 5.3: el corazón lleva estado visible y texto de apoyo.
export function SaveButton({ id, name, withLabel = false, className }) {
  const [saved, toggle] = useSaved(id)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
      }}
      aria-pressed={saved}
      aria-label={withLabel ? undefined : `${saved ? 'Quitar de guardadas' : 'Guardar propiedad'}: ${name}`}
      className={cx(
        'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm text-label font-bold uppercase tracking-[0.06em] transition-colors duration-200',
        className,
      )}
    >
      <motion.span
        key={String(saved)}
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        <Heart size={22} strokeWidth={1.75} aria-hidden className={saved ? 'fill-accent text-accent' : ''} />
      </motion.span>
      {withLabel && <span>{saved ? 'Guardada' : 'Guardar propiedad'}</span>}
    </button>
  )
}
