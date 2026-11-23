import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFoundScreen() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="tabular font-display text-[clamp(5rem,14vw,9rem)] leading-none text-stone" aria-hidden>404</p>
      <h1 className="text-h2">Esta página no existe</h1>
      <p className="max-w-[44ch] text-body text-muted">La dirección pudo cambiar. Vuelva al inicio o explore el catálogo.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/" variant="secondary">Ir al inicio</Button>
        <Button to="/comprar">Ver catálogo</Button>
      </div>
    </Container>
  )
}
