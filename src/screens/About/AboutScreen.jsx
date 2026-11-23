import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PropertyArt } from '@/components/property/PropertyArt'
import { ease, maskReveal } from '@/lib/motion'

const PRINCIPLES = [
  ['Intuitiva', 'Sin tutoriales: etiquetas claras, navegación visible, pocas decisiones a la vez.'],
  ['Aireada', 'El espacio separa lo importante de lo accesorio.'],
  ['Cromática contenida', 'Negro, marfil y grises. El color aparece solo cuando informa.'],
  ['Movimiento útil', 'Nada rebota ni se desplaza sin motivo.'],
]

// La secuencia sí informa (orden real del proceso), por eso va numerada.
const PROCESS = [
  ['Selección', 'Revisamos escrituras, régimen de condominio y estado de cuotas antes de publicar.'],
  ['Visita', 'Recorrido privado con planos, costos de mantenimiento y vecindario.'],
  ['Cierre', 'Acompañamiento con notaría, crédito y, si aplica, administración de rentas.'],
]

export default function AboutScreen() {
  return (
    <>
      <Container className="grid gap-12 pb-24 pt-12 lg:grid-cols-12 lg:pb-32 lg:pt-20">
        <div className="lg:col-span-7">
          <h1 className="text-h1">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" variants={maskReveal} initial="hidden" animate="show">Una inmobiliaria que</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" variants={maskReveal} custom={1} initial="hidden" animate="show">prefiere publicar menos.</motion.span>
            </span>
          </h1>
          <Reveal index={2}>
            <p className="mt-8 max-w-[62ch] text-body-l">
              Larper Corp nació en Cancún para presentar condominios de alta gama sin ruido. No competimos por volumen:
              seleccionamos pocas residencias, verificamos cada dato y las mostramos con la información que un comprador,
              una familia o un inversionista necesita para decidir con certeza.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="aspect-[3/4] overflow-hidden rounded-md bg-stone lg:col-span-4 lg:col-start-9"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, ease: ease.out, delay: 0.2 }}
        >
          <PropertyArt art={{ towers: 1, floors: 11, tone: 0, sea: true }} view="facade" animate className="size-full" />
        </motion.div>
      </Container>

      <Container as="section" aria-labelledby="process-title" className="pb-24 lg:pb-32">
        <h2 id="process-title" className="border-b border-ink pb-6 text-h2">Cómo trabajamos</h2>
        <ol className="grid lg:grid-cols-3">
          {PROCESS.map(([title, text], i) => (
            <Reveal as="li" key={title} index={i} className="border-b border-divider py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="tabular font-display text-h2 text-accent">{i + 1}</p>
              <h3 className="mt-4 text-h3">{title}</h3>
              <p className="mt-3 text-body text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>

      <section className="on-dark bg-ink py-24 text-canvas lg:py-32" aria-labelledby="principles-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="principles-title" className="text-h2">La belleza no debe costar claridad.</h2>
          </Reveal>
          <dl className="lg:col-span-6 lg:col-start-7">
            {PRINCIPLES.map(([term, desc], i) => (
              <Reveal key={term} index={i} className="grid gap-2 border-t border-canvas/20 py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="text-label font-bold uppercase tracking-[0.1em]">{term}</dt>
                <dd className="text-body text-canvas/75">{desc}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="flex flex-col items-start gap-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:py-32">
        <h2 className="max-w-[22ch] text-h2">¿Busca algo que no está publicado?</h2>
        <Button to="/contacto">Hablar con un asesor</Button>
      </Container>
    </>
  )
}
