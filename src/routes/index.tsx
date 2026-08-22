import { createFileRoute, redirect } from '@tanstack/react-router'
import { detectLanguage } from '../i18n/detectLanguage'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/$lang', params: { lang: detectLanguage() }, replace: true })
  },
})
