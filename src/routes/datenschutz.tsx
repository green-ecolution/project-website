import { createFileRoute } from '@tanstack/react-router'
import DatenschutzPage from '../tsx/pages/DatenschutzPage'

export const Route = createFileRoute('/datenschutz')({
  component: DatenschutzPage,
})
