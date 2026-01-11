import { createFileRoute } from '@tanstack/react-router'
import ImpressumPage from '../tsx/pages/ImpressumPage'

export const Route = createFileRoute('/impressum')({
  component: ImpressumPage,
})
