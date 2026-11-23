import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react'
import { motion } from 'motion/react'
import { cx } from '@/lib/format'
import { ease } from '@/lib/motion'

// Manual 7.5: el estado nunca depende solo del color (ícono + título + texto).
const tones = {
  success: { Icon: CircleCheck, title: 'Éxito', cls: 'border-success/30 bg-success-bg text-success' },
  error: { Icon: CircleX, title: 'Error', cls: 'border-error/30 bg-error-bg text-error' },
  warning: { Icon: TriangleAlert, title: 'Advertencia', cls: 'border-warning/30 bg-warning-bg text-warning' },
  info: { Icon: Info, title: 'Información', cls: 'border-info/20 bg-info-bg text-info' },
}

export function Alert({ tone = 'info', title, children, onClose, className }) {
  const { Icon, title: fallback, cls } = tones[tone]
  return (
    <motion.div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: ease.standard }}
      className={cx('flex items-start gap-4 rounded-md border p-5', cls, className)}
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="text-label font-bold uppercase tracking-[0.06em]">{title ?? fallback}</p>
        <div className="mt-1 text-body text-ink">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="-m-3 grid size-11 shrink-0 place-items-center rounded-sm text-ink/70 transition-colors hover:text-ink"
        >
          <X size={20} strokeWidth={1.75} aria-hidden />
        </button>
      )}
    </motion.div>
  )
}
