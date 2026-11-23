import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GALLERY_VIEWS, PropertyArt } from '@/components/property/PropertyArt'
import { cx } from '@/lib/format'
import { ease } from '@/lib/motion'

// Galería 3:2 (Manual 6.2) con miniaturas 1:1 como pestañas.
export function Gallery({ property }) {
  const [index, setIndex] = useState(0)
  const current = GALLERY_VIEWS[index]

  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-stone">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={current.view}
            id="gallery-panel"
            role="tabpanel"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: ease.out }}
          >
            <PropertyArt
              art={property.art}
              view={current.view}
              animate={index === 0}
              className="size-full"
              title={`${property.name}: ${current.label.toLowerCase()}`}
            />
          </motion.div>
        </AnimatePresence>
        <p className="tabular absolute bottom-3 left-3 rounded-sm bg-ink/85 px-3 py-1.5 text-small font-bold uppercase tracking-[0.08em] text-canvas">
          {current.label} · {index + 1}/{GALLERY_VIEWS.length}
        </p>
      </div>

      <div role="tablist" aria-label="Vistas de la residencia" className="mt-3 grid grid-cols-4 gap-3">
        {GALLERY_VIEWS.map((v, i) => (
          <button
            key={v.view}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="gallery-panel"
            onClick={() => setIndex(i)}
            className={cx(
              'relative aspect-square overflow-hidden rounded-sm bg-stone transition-opacity duration-200',
              i === index ? 'opacity-100' : 'opacity-60 hover:opacity-100',
            )}
          >
            <PropertyArt art={property.art} view={v.view} className="size-full" />
            <span className="sr-only">{v.label}</span>
            {i === index && (
              <motion.span layoutId="gallery-active" className="absolute inset-0 rounded-sm ring-2 ring-inset ring-ink" transition={{ duration: 0.22, ease: ease.standard }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
