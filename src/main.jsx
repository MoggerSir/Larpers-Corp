import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-serif-display/latin-400.css'
import '@fontsource/noto-serif-display/latin-700.css'
import '@fontsource/lato/latin-400.css'
import '@fontsource/lato/latin-700.css'
import './styles/index.css'
import App from './app/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
