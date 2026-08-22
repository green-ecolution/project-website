import { createFileRoute } from '@tanstack/react-router'
import ProjectPage from '../../tsx/pages/ProjectPage'

export const Route = createFileRoute('/$lang/project')({
  component: ProjectPage,
})
