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

// Hardcoded, not routed through i18n: this fires when the i18n catalog chunk
// itself failed to load, so t() would have nothing to render.
function renderBootstrapError() {
  const root = document.getElementById('root')
  if (!root) {
    return
  }

  root.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.style.cssText =
    'font-family: sans-serif; max-width: 28rem; margin: 4rem auto; padding: 1.5rem; text-align: center; color: #1a1a1a;'

  const messageDe = document.createElement('p')
  messageDe.style.cssText = 'margin: 0 0 0.5rem; font-size: 1rem;'
  messageDe.textContent = 'Die Seite konnte nicht geladen werden. Bitte lade die Seite neu.'

  const messageEn = document.createElement('p')
  messageEn.style.cssText = 'margin: 0 0 1.5rem; font-size: 1rem; color: #555;'
  messageEn.textContent = 'The page failed to load. Please reload the page.'

  const reloadButton = document.createElement('button')
  reloadButton.type = 'button'
  reloadButton.textContent = 'Neu laden / Reload'
  reloadButton.style.cssText =
    'font: inherit; font-size: 1rem; padding: 0.5rem 1.25rem; cursor: pointer; border: 1px solid #1a1a1a; border-radius: 0.25rem; background: #ffffff; color: #1a1a1a;'
  reloadButton.addEventListener('click', () => {
    window.location.reload()
  })

  wrapper.append(messageDe, messageEn, reloadButton)
  root.append(wrapper)
}

const initialLanguage = languageFromPathname(window.location.pathname) ?? detectLanguage()

void initI18n(initialLanguage)
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    )
  })
  .catch((error: unknown) => {
    console.error('Failed to bootstrap the application', error)
    renderBootstrapError()
  })
