import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../../tsx/pages/HomePage'

export const Route = createFileRoute('/$lang/')({
  component: HomePage,
})
