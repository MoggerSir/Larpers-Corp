import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Field } from '@/components/ui/Field'
import { zones } from '@/data/properties'
import { cx } from '@/lib/format'
import { ease } from '@/lib/motion'

const OPS = [
  { id: 'venta', label: 'Comprar', path: '/comprar' },
  { id: 'renta', label: 'Rentar', path: '/rentar' },
]

// Buscador prioritario (Manual 1.3): tres decisiones y una acción.
export function SearchPanel() {
  const navigate = useNavigate()
  const [op, setOp] = useState(OPS[0])

  const submit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const key of ['zona', 'rec']) if (form.get(key)) params.set(key, form.get(key))
    navigate(`${op.path}${params.size ? `?${params}` : ''}`)
  }

  return (
    <Container as="section" aria-labelledby="buscar-title" className="pb-24 lg:pb-32">
      <form onSubmit={submit} className="rounded-md border border-divider bg-surface p-6 shadow-1 lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="buscar-title" className="text-h3">Buscar residencia</h2>
          <div role="radiogroup" aria-label="Operación" className="relative flex rounded-sm bg-stone p-1">
            {OPS.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={op.id === o.id}
                onClick={() => setOp(o)}
                className={cx(
                  'relative min-h-10 min-w-28 rounded-sm px-4 text-label font-bold uppercase tracking-[0.08em] transition-colors duration-200',
                  op.id === o.id ? 'text-canvas' : 'text-muted hover:text-ink',
                )}
              >
                {op.id === o.id && (
                  <motion.span
                    layoutId="op-indicator"
                    className="absolute inset-0 rounded-sm bg-ink"
                    transition={{ duration: 0.22, ease: ease.standard }}
                  />
                )}
                <span className="relative">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <Field as="select" label="Zona" name="zona" defaultValue="">
            <option value="">Todas las zonas</option>
            {zones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
          </Field>
          <Field as="select" label="Recámaras" name="rec" defaultValue="">
            <option value="">Cualquier número</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ recámaras</option>)}
          </Field>
          <Button type="submit" className="md:min-w-44">
            <Search size={20} strokeWidth={1.75} aria-hidden /> Buscar
          </Button>
        </div>
      </form>
    </Container>
  )
}
