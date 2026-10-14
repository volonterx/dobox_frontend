import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Overlay } from 'photocopier-ui'

const tilt = (min: number, max: number) => (Math.random() < 0.5 ? -1 : 1) * (min + Math.random() * (max - min)) + 'deg'
document.documentElement.style.setProperty('--paper-tilt', tilt(0.6, 1.8))
document.documentElement.style.setProperty('--sheet-tilt', tilt(1.5, 3.5))

const pageTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const overlay = Overlay.mount(document.body, { fixed: true, level: 0.3, theme: pageTheme() })
new MutationObserver(() => overlay.update({ theme: pageTheme() }))
  .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

const router = createBrowserRouter([{ path: '*', element: <App /> }])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
