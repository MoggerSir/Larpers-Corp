import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { useAsync } from '@/hooks/useAsync'
import { getFeatured } from '@/services/properties.service'

export function Featured() {
  const { data, loading } = useAsync(getFeatured, [])
  return (
    <Container as="section" aria-labelledby="featured-title" className="pb-24 lg:pb-32">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-6">
        <div>
          <h2 id="featured-title" className="text-h2">Residencias destacadas</h2>
          <p className="mt-3 max-w-[52ch] text-body text-muted">
            Tres inmuebles en venta con entrega inmediata, elegidos por ubicación y orientación.
          </p>
        </div>
        <Button to="/comprar" variant="ghost">
          Ver catálogo completo <ArrowRight size={20} strokeWidth={1.5} aria-hidden />
        </Button>
      </Reveal>
      <PropertyGrid items={data ?? []} loading={loading} />
    </Container>
  )
}
