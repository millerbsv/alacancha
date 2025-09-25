import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router-dom'

registerSW({
  onNeedRefresh() {
    if (confirm('Hay una nueva versión disponible. ¿Actualizar ahora?')) {
      window.location.reload()
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
