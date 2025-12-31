import { createFileRoute } from '@tanstack/react-router'
import ReleaseDetailPage from '../tsx/pages/ReleaseDetailPage'

export const Route = createFileRoute('/releases_/$slug')({
  component: ReleaseDetailPage,
})
