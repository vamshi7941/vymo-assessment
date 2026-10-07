import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './features/lead/LeadPage'
import './design-system/tokens.css'
import './design-system/design-system.css'
import './features/lead/lead.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
