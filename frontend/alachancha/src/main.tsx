import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
