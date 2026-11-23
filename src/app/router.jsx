import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'

// Una carpeta por pantalla; cada una se carga bajo demanda.
const Home = lazy(() => import('@/screens/Home/HomeScreen'))
const Catalog = lazy(() => import('@/screens/Catalog/CatalogScreen'))
const PropertyDetail = lazy(() => import('@/screens/PropertyDetail/PropertyDetailScreen'))
const About = lazy(() => import('@/screens/About/AboutScreen'))
const Contact = lazy(() => import('@/screens/Contact/ContactScreen'))
const NotFound = lazy(() => import('@/screens/NotFound/NotFoundScreen'))

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'comprar', element: <Catalog key="venta" operation="venta" /> },
      { path: 'rentar', element: <Catalog key="renta" operation="renta" /> },
      { path: 'propiedad/:id', element: <PropertyDetail /> },
      { path: 'nosotros', element: <About /> },
      { path: 'contacto', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
