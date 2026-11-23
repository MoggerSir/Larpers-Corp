import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { zoneName } from '@/data/properties'
import { formatArea, formatPrice } from '@/lib/format'
import { cardIn } from '@/lib/motion'
import { PropertyArt } from './PropertyArt'
import { SaveButton } from './SaveButton'

// Manual 7.3: imagen 4:3, radio 8, sombra baja, hover +2 px en 220 ms.
export function PropertyCard({ property: p }) {
  return (
    <motion.article
      variants={cardIn}
      className="group relative flex flex-col overflow-hidden rounded-md border border-divider bg-surface shadow-card transition-[transform,box-shadow] duration-[220ms] ease-out-soft hover:-translate-y-0.5 hover:shadow-card-hover focus-within:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        <PropertyArt
          art={p.art}
          className="size-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          title={`Ilustración de la fachada de ${p.name}`}
        />
        {p.featured && (
          <span className="absolute left-3 top-3 rounded-sm bg-ink px-3 py-1.5 text-small font-bold uppercase tracking-[0.08em] text-canvas">
            Destacada
          </span>
        )}
        <SaveButton id={p.id} name={p.name} className="absolute right-2 top-2 z-10 bg-surface/90 text-ink hover:bg-surface" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h3">
          {/* enlace estirado: toda la tarjeta navega, el corazón queda por encima */}
          <Link to={`/propiedad/${p.id}`} className="outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1 text-label text-muted">
          <MapPin size={16} strokeWidth={1.5} aria-hidden />
          {zoneName(p.zone)}, Cancún
        </p>
        <p className="tabular mt-4 text-price font-bold">{formatPrice(p.price, p.operation)}</p>
        <dl className="tabular mt-4 flex gap-5 border-t border-divider pt-4 text-label font-bold uppercase text-muted">
          <div className="flex gap-1"><dt className="sr-only">Recámaras</dt><dd>{p.bedrooms} rec.</dd></div>
          <div className="flex gap-1"><dt className="sr-only">Baños</dt><dd>{p.bathrooms} {p.bathrooms === 1 ? 'baño' : 'baños'}</dd></div>
          <div className="flex gap-1"><dt className="sr-only">Superficie</dt><dd className="normal-case">{formatArea(p.area)}</dd></div>
        </dl>
        <p className="mt-auto flex items-center justify-between pt-6 text-button font-bold uppercase tracking-[0.06em]" aria-hidden>
          {p.operation === 'renta' ? 'Ver renta' : 'Ver propiedad'}
          <ArrowRight size={22} strokeWidth={1.5} className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1" />
        </p>
      </div>
    </motion.article>
  )
}
