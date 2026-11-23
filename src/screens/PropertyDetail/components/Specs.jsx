import { Bath, BedDouble, Building2, CalendarCheck, Ruler } from 'lucide-react'
import { formatArea } from '@/lib/format'

// Ficha técnica: íconos 16 px de 1.5 px asociados al texto (Manual 5.2).
export function Specs({ property: p }) {
  const rows = [
    [BedDouble, 'Recámaras', p.bedrooms],
    [Bath, 'Baños', p.bathrooms],
    [Ruler, 'Superficie', formatArea(p.area)],
    [Building2, 'Nivel', p.floor],
    [CalendarCheck, 'Entrega', p.delivery],
  ]
  return (
    <dl className="tabular grid grid-cols-2 border-t border-ink sm:grid-cols-3 lg:grid-cols-5">
      {rows.map(([Icon, label, value]) => (
        <div key={label} className="border-b border-divider py-5 pr-4">
          <dt className="flex items-center gap-1 text-label font-bold uppercase tracking-[0.06em] text-muted">
            <Icon size={16} strokeWidth={1.5} aria-hidden /> {label}
          </dt>
          <dd className="mt-2 text-body-l font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
