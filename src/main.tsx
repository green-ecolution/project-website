import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './tsx/App.tsx'
import Footer from './tsx/layout/Footer.tsx'
import Header from './tsx/layout/Header.tsx'
import './css/site.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Header />
        <App />
        <Footer />
    </React.StrictMode>,
)
