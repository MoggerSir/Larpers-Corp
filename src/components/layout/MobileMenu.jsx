import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { Logo } from '@/components/brand/Logo'
import { ease } from '@/lib/motion'
import { CTA, NAV_LINKS } from './navigation'

const items = [{ to: '/', label: 'Inicio' }, ...NAV_LINKS, CTA]

// Menú abierto en negativo (Manual 7.4). Esc cierra; foco atrapado de forma simple.
export function MobileMenu({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    ref.current?.querySelector('a, button')?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      const nodes = ref.current.querySelectorAll('a, button')
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const edge = e.shiftKey ? first : last
      if (document.activeElement === edge) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      className="on-dark fixed inset-0 z-50 flex flex-col bg-ink px-4 text-canvas sm:px-6 lg:hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.26, ease: ease.standard } }}
      transition={{ duration: 0.34, ease: ease.standard }}
    >
      <div className="flex h-16 items-center justify-between">
        <Logo variant="wordmark" className="h-10" />
        <button type="button" onClick={onClose} aria-label="Cerrar menú" className="grid size-11 place-items-center rounded-sm">
          <X size={24} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <nav aria-label="Móvil" className="mt-12">
        <ul className="flex flex-col">
          {items.map((l, i) => (
            <motion.li
              key={l.to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: ease.out, delay: 0.12 + i * 0.04 }}
              className="border-b border-canvas/15"
            >
              <Link to={l.to} onClick={onClose} className="block py-4 font-display text-h2">
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <p className="mt-auto pb-8 text-small uppercase tracking-[0.12em] text-canvas/70">Precisión / Silencio / Orden</p>
    </motion.div>
  )
}
