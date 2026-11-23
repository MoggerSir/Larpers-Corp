import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { useScrolled } from '@/hooks/useScrolled'
import { cx } from '@/lib/format'
import { CTA, NAV_LINKS } from './navigation'
import { MobileMenu } from './MobileMenu'

// Manual 7.4: 80 px escritorio / 64 px móvil, fija, sombra solo al desplazarse.
export function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-40 bg-canvas transition-shadow duration-300',
        scrolled ? 'shadow-1 border-b border-divider' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-12">
        <Link to="/" aria-label="Larper Corp, inicio" className="-ml-1 rounded-sm p-1">
          <Logo variant="horizontal" className="hidden h-11 lg:block" />
          <Logo variant="wordmark" className="h-10 lg:hidden" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cx(
                  'relative py-2 text-label font-bold uppercase tracking-[0.1em] transition-colors duration-200',
                  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-300 after:ease-out-soft',
                  isActive ? 'text-ink after:scale-x-100' : 'text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button to={CTA.to}>{CTA.label}</Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-sm lg:hidden"
        >
          <Menu size={24} strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}
