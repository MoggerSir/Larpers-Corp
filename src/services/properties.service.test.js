import { describe, expect, it } from 'vitest'
import { properties } from '@/data/properties'
import { filterProperties } from './properties.service'

describe('filterProperties', () => {
  it('separa venta y renta', () => {
    const renta = filterProperties(properties, { operation: 'renta' })
    expect(renta.length).toBeGreaterThan(0)
    expect(renta.every((p) => p.operation === 'renta')).toBe(true)
  })

  it('combina zona, recámaras mínimas y precio máximo', () => {
    const r = filterProperties(properties, { operation: 'venta', zone: 'zona-hotelera', bedrooms: 3, maxPrice: 9000000 })
    expect(r.map((p) => p.id)).toEqual(['residencia-alba'])
  })

  it('ordena por precio ascendente', () => {
    const r = filterProperties(properties, { operation: 'venta', sort: 'priceAsc' })
    expect(r.map((p) => p.price)).toEqual([...r.map((p) => p.price)].sort((a, b) => a - b))
  })

  it('devuelve lista vacía sin coincidencias', () => {
    expect(filterProperties(properties, { maxPrice: 1 })).toEqual([])
  })
})
