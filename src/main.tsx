import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { initI18n } from './i18n'
import { detectLanguage, languageFromPathname } from './i18n/detectLanguage'
import './css/site.css'

const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

router.subscribe('onResolved', ({ pathChanged }) => {
  // Hash-only navigations keep their scroll position, otherwise in-page anchors
  // race against this handler and the browser lands back at the top.
  if (pathChanged) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
  window.a?.pageView()
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const initialLanguage = languageFromPathname(window.location.pathname) ?? detectLanguage()

void initI18n(initialLanguage).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
})
