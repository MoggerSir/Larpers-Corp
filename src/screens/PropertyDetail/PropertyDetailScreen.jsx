import { Link, useParams } from 'react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { zoneName } from '@/data/properties'
import { useDelayedFlag } from '@/hooks/useDelayedFlag'
import { fadeUp } from '@/lib/motion'
import { BookingAside } from './components/BookingAside'
import { DetailSkeleton } from './components/DetailSkeleton'
import { Gallery } from './components/Gallery'
import { Specs } from './components/Specs'
import { usePropertyDetail } from './usePropertyDetail'

export default function PropertyDetailScreen() {
  const { id } = useParams()
  const { property, related } = usePropertyDetail(id)
  const showSkeleton = useDelayedFlag(property.loading)
  const p = property.data
  const back = p?.operation === 'renta' ? { to: '/rentar', label: 'Rentar' } : { to: '/comprar', label: 'Comprar' }

  return (
    <Container className="pb-24 pt-8 lg:pb-32 lg:pt-12">
      <nav aria-label="Ruta" className="mb-8">
        <Link to={back.to} className="inline-flex min-h-11 items-center gap-2 text-label font-bold uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> {back.label}
        </Link>
      </nav>

      {property.loading ? (
        showSkeleton && <DetailSkeleton />
      ) : !p ? (
        <div className="max-w-[56ch]">
          <h1 className="text-h1">Esta residencia ya no está publicada</h1>
          <p className="mt-4 text-body-l text-muted">Pudo venderse o retirarse del catálogo. Revise las disponibles.</p>
          <Button to="/comprar" className="mt-8">Ver catálogo</Button>
        </div>
      ) : (
        <>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.header variants={fadeUp} initial="hidden" animate="show" className="mb-8">
                <h1 className="text-h1">{p.name}</h1>
                <p className="mt-3 text-body-l text-muted">{p.summary} · {zoneName(p.zone)}, Cancún</p>
              </motion.header>

              <Gallery property={p} />

              <Reveal className="mt-12"><Specs property={p} /></Reveal>

              <Reveal as="section" className="mt-12" aria-labelledby="desc-title">
                <h2 id="desc-title" className="text-h3">La residencia</h2>
                <p className="mt-4 max-w-[68ch] text-body-l">{p.description}</p>
              </Reveal>

              <Reveal as="section" className="mt-12" aria-labelledby="amen-title">
                <h2 id="amen-title" className="text-h3">Amenidades</h2>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {p.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 border-b border-divider py-3 text-body">
                      <Check size={16} strokeWidth={1.5} aria-hidden /> {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Alert tone="info" className="mt-12">
                Los precios están expresados en pesos mexicanos y pueden cambiar sin previo aviso.
              </Alert>
            </div>

            <div className="lg:col-span-4">
              <BookingAside property={p} />
            </div>
          </div>

          <section aria-labelledby="related-title" className="mt-24 lg:mt-32">
            <h2 id="related-title" className="mb-8 border-b border-ink pb-6 text-h2">También le puede interesar</h2>
            <PropertyGrid items={related.data ?? []} loading={related.loading} />
          </section>
        </>
      )}
    </Container>
  )
}
