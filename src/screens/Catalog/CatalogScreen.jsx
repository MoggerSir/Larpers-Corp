import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { EmptyResults } from './components/EmptyResults'
import { Filters } from './components/Filters'
import { useCatalog } from './useCatalog'

const COPY = {
  venta: {
    title: 'Comprar en Cancún',
    intro: 'Condominios en venta con ficha técnica completa. Precios en pesos mexicanos.',
  },
  renta: {
    title: 'Rentar en Cancún',
    intro: 'Departamentos en renta de seis meses en adelante. Renta mensual en pesos mexicanos.',
  },
}

export default function CatalogScreen({ operation }) {
  const { data, loading, error, reload, filters, setFilter, clear, active } = useCatalog(operation)
  const copy = COPY[operation]
  const count = data?.length ?? 0

  return (
    <Container className="pb-24 pt-12 lg:pb-32 lg:pt-20">
      <header className="mb-10 max-w-[60ch]">
        <h1 className="text-h1">{copy.title}</h1>
        <p className="mt-4 text-body-l text-muted">{copy.intro}</p>
      </header>

      <Filters operation={operation} filters={filters} setFilter={setFilter} clear={clear} active={active} />

      <p className="tabular my-6 text-label font-bold uppercase tracking-[0.08em] text-muted" role="status" aria-live="polite">
        {loading ? 'Buscando…' : `${count} ${count === 1 ? 'residencia' : 'residencias'}`}
      </p>

      {error ? (
        <Alert tone="error">
          No pudimos cargar el catálogo. Revise su conexión e inténtelo de nuevo.
          <Button variant="ghost" className="mt-2" onClick={reload}>Reintentar</Button>
        </Alert>
      ) : !loading && count === 0 ? (
        <EmptyResults onClear={clear} />
      ) : (
        <PropertyGrid items={data ?? []} loading={loading} skeletons={6} />
      )}
    </Container>
  )
}
