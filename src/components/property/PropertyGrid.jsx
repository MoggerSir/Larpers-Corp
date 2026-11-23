import { motion } from 'motion/react'
import { useDelayedFlag } from '@/hooks/useDelayedFlag'
import { PropertyCard } from './PropertyCard'
import { PropertyCardSkeleton } from './PropertyCardSkeleton'

const grid = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

export function PropertyGrid({ items, loading, skeletons = 3 }) {
  const showSkeleton = useDelayedFlag(loading)
  if (loading) {
    return showSkeleton ? (
      <div className={grid} aria-busy="true" aria-label="Cargando propiedades">
        {Array.from({ length: skeletons }, (_, i) => <PropertyCardSkeleton key={i} />)}
      </div>
    ) : (
      <div className={grid} aria-busy="true" />
    )
  }
  return (
    <motion.div
      className={grid}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.04 } } }}
    >
      {items.map((p) => <PropertyCard key={p.id} property={p} />)}
    </motion.div>
  )
}
