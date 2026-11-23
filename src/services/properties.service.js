import { properties } from '@/data/properties'

// shortcut: datos locales con latencia simulada; reemplazar `request` por fetch a la API real.
const LATENCY = 450
const request = (data) => new Promise((resolve) => setTimeout(() => resolve(data), LATENCY))

export const SORTS = {
  recent: { label: 'Destacadas primero', fn: (a, b) => Number(b.featured) - Number(a.featured) },
  priceAsc: { label: 'Precio: menor a mayor', fn: (a, b) => a.price - b.price },
  priceDesc: { label: 'Precio: mayor a menor', fn: (a, b) => b.price - a.price },
  area: { label: 'Superficie', fn: (a, b) => b.area - a.area },
}

// Lógica pura: fácil de probar y de mover al backend.
export function filterProperties(list, { operation, zone, bedrooms, maxPrice, sort = 'recent' } = {}) {
  return list
    .filter((p) => !operation || p.operation === operation)
    .filter((p) => !zone || p.zone === zone)
    .filter((p) => !bedrooms || p.bedrooms >= Number(bedrooms))
    .filter((p) => !maxPrice || p.price <= Number(maxPrice))
    .toSorted(SORTS[sort]?.fn ?? SORTS.recent.fn)
}

export const getProperties = (filters) => request(filterProperties(properties, filters))

export const getProperty = (id) => request(properties.find((p) => p.id === id) ?? null)

export const getFeatured = () => request(properties.filter((p) => p.featured && p.operation === 'venta'))

export const getRelated = (property) =>
  request(
    properties
      .filter((p) => p.id !== property.id && p.operation === property.operation)
      .toSorted((a, b) => Number(b.zone === property.zone) - Number(a.zone === property.zone))
      .slice(0, 3),
  )

export const PRICE_STEPS = {
  venta: [4000000, 6000000, 9000000, 13000000],
  renta: [30000, 45000, 60000],
}
