import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './css/site.css'

const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

router.subscribe('onResolved', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const ogImage = document.getElementById('og-image')
if (ogImage) {
  const currentDomain = window.location.origin
  ogImage.setAttribute('content', currentDomain + '/assets/images/open-graph-image.png')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
