import { ScrollRestoration, useLocation, useOutlet } from 'react-router'
import { Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ease } from '@/lib/motion'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function RootLayout() {
  const { pathname } = useLocation()
  // useOutlet congela la pantalla saliente durante la transición.
  const outlet = useOutlet()
  return (
    <>
      <a href="#contenido" className="sr-only z-[60] rounded-sm bg-ink px-4 py-3 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="contenido"
          className="pt-16 lg:pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.32, ease: ease.standard } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: ease.standard } }}
        >
          <Suspense fallback={<div className="min-h-[70vh]" />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
