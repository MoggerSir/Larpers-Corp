import { Skeleton } from '@/components/ui/Skeleton'

// Misma geometría que PropertyCard para evitar saltos de layout.
export const PropertyCardSkeleton = () => (
  <div className="overflow-hidden rounded-md border border-divider bg-surface">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="flex flex-col gap-3 p-5">
      <Skeleton className="h-8 w-3/5" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-6 w-2/5" />
      <div className="border-t border-divider pt-4">
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  </div>
)
