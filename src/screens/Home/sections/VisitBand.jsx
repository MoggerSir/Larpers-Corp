import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function VisitBand() {
  return (
    <section className="border-t border-divider bg-stone" aria-labelledby="visit-title">
      <Container className="grid gap-8 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <Reveal className="lg:col-span-8">
          <h2 id="visit-title" className="text-h2">Conozca la residencia antes de decidir.</h2>
          <p className="mt-4 max-w-[56ch] text-body-l text-muted">
            Agende una visita privada. Un asesor le acompaña con planos, estado legal y costos de mantenimiento.
          </p>
        </Reveal>
        <Reveal index={1} className="lg:col-span-4 lg:justify-self-end">
          <Button to="/contacto">Solicitar visita</Button>
        </Reveal>
      </Container>
    </section>
  )
}
