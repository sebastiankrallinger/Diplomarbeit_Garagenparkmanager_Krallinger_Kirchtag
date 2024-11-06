import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mainpage_user.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)