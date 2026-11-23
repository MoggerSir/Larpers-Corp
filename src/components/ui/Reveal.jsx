import { motion } from 'motion/react'
import { fadeUp } from '@/lib/motion'

// Entrada al hacer scroll: una vez, poco antes de que el bloque entre por completo.
export function Reveal({ as = 'div', index = 0, children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      {...props}
    >
      {children}
    </Tag>
  )
}
