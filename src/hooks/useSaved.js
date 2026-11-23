import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'larper:saved'
const listeners = new Set()

const read = () => {
  try {
    return localStorage.getItem(KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

const parse = (raw) => {
  try {
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Propiedades guardadas (corazón). Persistencia local, compartida entre componentes.
export function useSaved(id) {
  const raw = useSyncExternalStore(subscribe, read, () => '[]')
  const saved = parse(raw).includes(id)

  const toggle = useCallback(() => {
    const list = parse(read())
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* almacenamiento bloqueado: el estado no persiste */
    }
    listeners.forEach((fn) => fn())
  }, [id])

  return [saved, toggle]
}
