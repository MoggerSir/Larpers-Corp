import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SaveButton } from '@/components/property/SaveButton'
import { formatPrice } from '@/lib/format'

// Una sola acción primaria por zona (Anexo A.2).
export function BookingAside({ property: p }) {
  return (
    <aside className="rounded-md border border-divider bg-surface p-6 shadow-1 lg:sticky lg:top-28">
      <p className="text-label font-bold uppercase tracking-[0.08em] text-muted">
        {p.operation === 'renta' ? 'Renta mensual' : 'Precio de venta'}
      </p>
      <p className="tabular mt-1 text-price font-bold">{formatPrice(p.price, p.operation)}</p>
      <p className="mt-3 flex items-center gap-1 text-label text-muted">
        <MapPin size={16} strokeWidth={1.5} aria-hidden /> {p.address}, Cancún
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Button to={`/contacto?propiedad=${p.id}`} className="w-full">Solicitar visita</Button>
        <SaveButton id={p.id} name={p.name} withLabel className="w-full border border-divider hover:border-ink" />
      </div>
      <p className="mt-5 text-small text-muted">
        Respuesta en un día hábil. Las visitas son privadas y con cita.
      </p>
    </aside>
  )
}
