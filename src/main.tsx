import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import DevProfileDashboard from './DevProfileDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevProfileDashboard />
  </StrictMode>,
)
