import { useSearchParams } from 'react-router'
import { useAsync } from '@/hooks/useAsync'
import { getProperties } from '@/services/properties.service'

// Filtros viven en la URL: compartibles y con botón "atrás" funcional.
const KEYS = { zona: 'zone', rec: 'bedrooms', precio: 'maxPrice', orden: 'sort' }

export function useCatalog(operation) {
  const [params, setParams] = useSearchParams()
  const filters = Object.fromEntries(Object.entries(KEYS).map(([param, key]) => [key, params.get(param) ?? '']))
  const query = { operation, ...filters, sort: filters.sort || 'recent' }
  const state = useAsync(() => getProperties(query), [operation, params.toString()])

  const setFilter = (param, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(param, value)
    else next.delete(param)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const clear = () => setParams({}, { replace: true, preventScrollReset: true })
  const active = Object.keys(KEYS).filter((k) => k !== 'orden' && params.get(k)).length

  return { ...state, filters, setFilter, clear, active }
}
