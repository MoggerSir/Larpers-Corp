import { RouterProvider } from 'react-router'
import { MotionConfig } from 'motion/react'
import { router } from './router'

export default function App() {
  return (
    // reducedMotion="user": respeta prefers-reduced-motion en todas las animaciones de Motion.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
