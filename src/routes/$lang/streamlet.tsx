import { createFileRoute } from '@tanstack/react-router'
import StreamletPage from '../../tsx/pages/StreamletPage'

export const Route = createFileRoute('/$lang/streamlet')({
  component: StreamletPage,
})
