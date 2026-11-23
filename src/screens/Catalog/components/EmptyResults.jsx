import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Estado vacío centrado (Manual 4.3) con salida clara.
export function EmptyResults({ onClear }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-divider bg-surface px-6 py-20 text-center">
      <SearchX size={24} strokeWidth={1.75} aria-hidden />
      <h2 className="text-h3">Ninguna residencia coincide</h2>
      <p className="max-w-[46ch] text-body text-muted">
        Amplíe el precio máximo o elija otra zona. También podemos buscar por usted fuera del catálogo publicado.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={onClear}>Limpiar filtros</Button>
        <Button to="/contacto">Hablar con un asesor</Button>
      </div>
    </div>
  )
}
