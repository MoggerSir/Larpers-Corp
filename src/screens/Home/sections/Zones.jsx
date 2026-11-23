import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PropertyArt } from '@/components/property/PropertyArt'
import { properties, zones } from '@/data/properties'
import { ease } from '@/lib/motion'

const countIn = (zone) => properties.filter((p) => p.zone === zone).length
const artFor = (zone) => properties.find((p) => p.zone === zone)?.art

// Lista editorial; en escritorio la vista previa responde a la fila activa.
export function Zones() {
  const [active, setActive] = useState(zones[0].id)
  return (
    <Container as="section" aria-labelledby="zones-title" className="py-24 lg:py-32">
      <Reveal>
        <h2 id="zones-title" className="text-h2">Cuatro zonas, un criterio</h2>
        <p className="mt-3 max-w-[56ch] text-body text-muted">
          Trabajamos solo donde conocemos cada desarrollo, su administración y su historial de plusvalía.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <ul className="border-t border-ink lg:col-span-7">
          {zones.map((z, i) => (
            <Reveal as="li" key={z.id} index={i} className="border-b border-divider">
              <Link
                to={`/comprar?zona=${z.id}`}
                onMouseEnter={() => setActive(z.id)}
                onFocus={() => setActive(z.id)}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 lg:py-8"
              >
                <span className="font-display text-h3 transition-transform duration-300 ease-out-soft group-hover:translate-x-2 lg:text-h2">
                  {z.name}
                </span>
                <span className="tabular flex items-center gap-3 text-label font-bold uppercase tracking-[0.08em] text-muted">
                  {countIn(z.id)} inmuebles
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden className="text-ink transition-transform duration-200 ease-out-soft group-hover:translate-x-1" />
                </span>
                <span className="col-span-2 text-body text-muted">{z.note}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[3/4] overflow-hidden rounded-md bg-stone">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.5, ease: ease.out }}
              >
                <PropertyArt art={artFor(active)} className="size-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  )
}
