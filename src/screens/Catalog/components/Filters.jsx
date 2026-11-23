import { Field } from '@/components/ui/Field'
import { zones } from '@/data/properties'
import { formatPrice } from '@/lib/format'
import { PRICE_STEPS, SORTS } from '@/services/properties.service'

export function Filters({ operation, filters, setFilter, clear, active }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="Filtros"
      className="grid gap-4 border-y border-divider py-6 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end"
    >
      <Field as="select" label="Zona" value={filters.zone} onChange={(e) => setFilter('zona', e.target.value)}>
        <option value="">Todas las zonas</option>
        {zones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
      </Field>
      <Field as="select" label="Recámaras" value={filters.bedrooms} onChange={(e) => setFilter('rec', e.target.value)}>
        <option value="">Cualquier número</option>
        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ recámaras</option>)}
      </Field>
      <Field as="select" label="Precio máximo" value={filters.maxPrice} onChange={(e) => setFilter('precio', e.target.value)}>
        <option value="">Sin límite</option>
        {PRICE_STEPS[operation].map((n) => <option key={n} value={n}>{formatPrice(n, operation)}</option>)}
      </Field>
      <Field as="select" label="Ordenar por" value={filters.sort || 'recent'} onChange={(e) => setFilter('orden', e.target.value === 'recent' ? '' : e.target.value)}>
        {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
      </Field>
      <button
        type="button"
        onClick={clear}
        disabled={!active}
        className="min-h-12 rounded-sm px-2 text-label font-bold uppercase tracking-[0.08em] text-ink underline-offset-8 transition-opacity hover:underline disabled:text-muted disabled:no-underline sm:justify-self-start"
      >
        Limpiar filtros{active ? ` (${active})` : ''}
      </button>
    </form>
  )
}
