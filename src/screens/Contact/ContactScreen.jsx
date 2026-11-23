import { useSearchParams } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { fadeUp } from '@/lib/motion'
import { ContactForm } from './components/ContactForm'

const CHANNELS = [
  [Phone, 'Teléfono', '+52 998 123 4567', 'tel:+529981234567'],
  [Mail, 'Correo', 'visitas@larpercorp.mx', 'mailto:visitas@larpercorp.mx'],
  [MapPin, 'Oficina', 'Blvd. Kukulcán km 13.5, Zona Hotelera', null],
]

export default function ContactScreen() {
  const [params] = useSearchParams()
  return (
    <Container className="grid gap-12 pb-24 pt-12 lg:grid-cols-12 lg:pb-32 lg:pt-20">
      <motion.div className="lg:col-span-4" variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-h1">Solicitar visita</h1>
        <p className="mt-4 text-body-l text-muted">
          Cuéntenos qué busca. Un asesor le responde en un día hábil con disponibilidad y documentos.
        </p>
        <ul className="mt-10 border-t border-ink">
          {CHANNELS.map(([Icon, label, value, href]) => (
            <li key={label} className="flex items-start gap-4 border-b border-divider py-5">
              <Icon size={20} strokeWidth={1.75} aria-hidden className="mt-0.5" />
              <div>
                <p className="text-label font-bold uppercase tracking-[0.08em] text-muted">{label}</p>
                {href ? (
                  <a href={href} className="text-body underline-offset-4 hover:underline">{value}</a>
                ) : (
                  <p className="text-body">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-small text-muted">Lunes a sábado, 9:00 a 19:00 h (hora de Cancún).</p>
      </motion.div>

      <motion.div className="lg:col-span-7 lg:col-start-6" variants={fadeUp} custom={2} initial="hidden" animate="show">
        <ContactForm initialProperty={params.get('propiedad') ?? ''} />
      </motion.div>
    </Container>
  )
}
