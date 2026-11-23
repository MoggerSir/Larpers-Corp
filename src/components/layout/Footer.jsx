import { Link } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { zones } from '@/data/properties'
import { CTA, NAV_LINKS } from './navigation'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-canvas">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-24">
        <div>
          <Logo variant="horizontal" className="h-12" />
          <p className="mt-6 max-w-[32ch] text-body text-canvas/70">
            Condominios de autor en Cancún. Seleccionamos pocos inmuebles y los presentamos con datos completos.
          </p>
        </div>
        <FooterList title="Explorar" links={[...NAV_LINKS, CTA]} />
        <FooterList title="Zonas" links={zones.map((z) => ({ to: `/comprar?zona=${z.id}`, label: z.name }))} />
        <div>
          <h2 className="font-sans text-label font-bold uppercase tracking-[0.12em] text-canvas/60">Oficina</h2>
          <address className="mt-4 text-body not-italic text-canvas/85">
            Blvd. Kukulcán km 13.5
            <br />
            Zona Hotelera, 77500
            <br />
            Cancún, Quintana Roo
          </address>
          <a href="tel:+529981234567" className="mt-4 block text-body underline-offset-4 hover:underline">+52 998 123 4567</a>
        </div>
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-canvas/15 py-6 text-small uppercase tracking-[0.1em] text-canvas/60 sm:flex-row">
        <p>© {YEAR} Larper Corp</p>
        <p>Precios en pesos mexicanos · sujetos a cambio</p>
      </Container>
    </footer>
  )
}

function FooterList({ title, links }) {
  return (
    <div>
      <h2 className="font-sans text-label font-bold uppercase tracking-[0.12em] text-canvas/60">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-body text-canvas/85 underline-offset-4 transition-colors hover:text-canvas hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
