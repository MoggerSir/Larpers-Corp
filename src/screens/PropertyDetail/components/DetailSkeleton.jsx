import { Skeleton } from '@/components/ui/Skeleton'

export const DetailSkeleton = () => (
  <div aria-busy="true" aria-label="Cargando residencia" className="grid gap-10 lg:grid-cols-12">
    <div className="lg:col-span-8">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="mt-4 h-5 w-1/3" />
      <Skeleton className="mt-8 aspect-[3/2] rounded-md" />
    </div>
    <Skeleton className="h-72 rounded-md lg:col-span-4" />
  </div>
)
