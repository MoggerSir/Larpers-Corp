import { useAsync } from '@/hooks/useAsync'
import { getProperty, getRelated } from '@/services/properties.service'

export function usePropertyDetail(id) {
  const property = useAsync(() => getProperty(id), [id])
  const related = useAsync(() => (property.data ? getRelated(property.data) : Promise.resolve([])), [property.data])
  return { property, related }
}
