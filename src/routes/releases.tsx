import { createFileRoute } from '@tanstack/react-router'
import ReleasesPage from '../tsx/pages/ReleasesPage'

export const Route = createFileRoute('/releases')({
  component: ReleasesPage,
})
