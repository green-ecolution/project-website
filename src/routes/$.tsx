import { createFileRoute } from '@tanstack/react-router'
import NotFoundPage from '../tsx/pages/NotFoundPage'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})
