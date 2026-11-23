import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PropertyArt } from '@/components/property/PropertyArt'
import { ease, fadeUp, maskReveal } from '@/lib/motion'

const HERO_ART = { towers: 3, floors: 10, tone: 1, sea: true }
const LINES = ['El orden', 'es un lujo.']

// Lectura en Z (Manual 8.2): titular arriba a la izquierda, imagen en diagonal, acción abajo.
export function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(0% 0% 0% 0%)', 'inset(0% 6% 10% 6%)'])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20" aria-labelledby="hero-title">
      <Container className="grid gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="text-display tracking-[-0.02em]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={maskReveal} custom={i} initial="hidden" animate="show">
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9 lg:pb-3"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="show"
        >
          <p className="max-w-[40ch] text-body-l text-muted">
            Condominios en Zona Hotelera, Puerto Cancún, Tajamar y Costa Mujeres. Pocos inmuebles, datos completos, visitas
            con cita.
          </p>
        </motion.div>

        <motion.div
          className="relative lg:col-span-11 lg:col-start-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: ease.out, delay: 0.1 }}
        >
          <motion.div style={reduce ? undefined : { clipPath: clip }} className="aspect-[4/3] overflow-hidden bg-stone sm:aspect-video">
            <motion.div style={reduce ? undefined : { y }} className="size-full">
              <PropertyArt
                art={HERO_ART}
                animate
                className="size-full"
                title="Ilustración de tres torres residenciales frente al mar Caribe"
              />
            </motion.div>
          </motion.div>

          {/* Cierre del recorrido en Z: acción principal anclada a la imagen */}
          <motion.div
            className="relative -mt-8 ml-4 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-x-8 gap-y-3 bg-ink p-4 sm:-mt-12 sm:ml-0 sm:w-fit sm:p-6 lg:-ml-[calc(100%/11)]"
            variants={fadeUp}
            custom={6}
            initial="hidden"
            animate="show"
          >
            <Button to="/comprar" variant="inverse">
              Explorar residencias
            </Button>
            <Button to="/contacto" variant="ghost" className="text-canvas">
              Solicitar visita <ArrowRight size={20} strokeWidth={1.5} aria-hidden />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
