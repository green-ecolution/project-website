import { createFileRoute } from '@tanstack/react-router'
import ContactPage from '../tsx/pages/ContactPage'

export const Route = createFileRoute('/kontakt')({
  component: ContactPage,
})
