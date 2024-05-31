import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './tsx/App.tsx'
import Footer from './tsx/layout/Footer.tsx'
import './css/site.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <Footer />
    </React.StrictMode>,
)
