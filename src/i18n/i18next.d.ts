import type deCatalog from './locales/de'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof deCatalog
  }
}
