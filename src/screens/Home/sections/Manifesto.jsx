import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const STATEMENT = 'Menos elementos. Más intención. Cada residencia que publicamos justifica su lugar.'

const ATTRIBUTES = [
  ['Precisión', 'Medidas, orientación y estado legal verificados antes de publicar.'],
  ['Sobriedad', 'Sin adornos ni promesas: plano, precio y ficha técnica completos.'],
  ['Control', 'Un asesor por cliente, visitas con cita y respuesta en un día hábil.'],
  ['Exclusividad', 'Inventario corto en cuatro zonas de Cancún. Menos opciones, mejor elegidas.'],
]

// Motion graphic ligado al scroll: la frase se "escribe" con luz mientras se lee.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const words = STATEMENT.split(' ')

  return (
    <section className="on-dark bg-ink py-24 text-canvas lg:py-36" aria-labelledby="manifesto-title">
      <Container>
        <h2 id="manifesto-title" ref={ref} className="max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1]">
          {reduce
            ? STATEMENT
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </h2>

        <dl className="mt-20 grid border-t border-canvas/20 lg:mt-28 lg:grid-cols-4">
          {ATTRIBUTES.map(([term, desc], i) => (
            <Reveal key={term} index={i} className="border-b border-canvas/20 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <dt className="font-display text-h3">{term}</dt>
              <dd className="mt-3 text-body text-canvas/70">{desc}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
