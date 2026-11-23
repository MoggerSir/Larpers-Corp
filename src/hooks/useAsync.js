import { useEffect, useState } from 'react'

// Carga asíncrona con estado; ignora respuestas viejas si cambian las dependencias.
export function useAsync(load, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: null }))
    load()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const reload = () => setAttempt((n) => n + 1)
  return { ...state, reload }
}
