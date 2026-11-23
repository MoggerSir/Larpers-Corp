import { useEffect, useState } from 'react'

// Manual 9.1: el skeleton aparece solo si la carga supera ~200 ms.
export function useDelayedFlag(active, delay = 200) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!active) return setVisible(false)
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [active, delay])
  return visible
}
