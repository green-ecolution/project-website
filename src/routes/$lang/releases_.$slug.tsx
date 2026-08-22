import { createFileRoute } from '@tanstack/react-router'
import ReleaseDetailPage from '../../tsx/pages/ReleaseDetailPage'

export const Route = createFileRoute('/$lang/releases_/$slug')({
  component: ReleaseDetailPage,
})
