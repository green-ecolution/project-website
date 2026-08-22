import {
  Boxes,
  Clock,
  Container,
  Fuel,
  GitBranch,
  Layers,
  Repeat,
  Scale,
  ServerCog,
  Warehouse,
} from 'lucide-react'
import type { ComponentType } from 'react'

export const streamletLinks = {
  repo: 'https://github.com/green-ecolution/streamlet',
  readme: 'https://github.com/green-ecolution/streamlet#readme',
  issues: 'https://github.com/green-ecolution/streamlet/issues',
} as const

interface FitCriterion {
  label: string
  icon: ComponentType<{ className?: string }>
}

export const fitCriteria: FitCriterion[] = [
  { label: 'Fahrzeuge mit begrenzter Tankkapazität', icon: Container },
  { label: 'Halte mit Zeitfenstern', icon: Clock },
  { label: 'Nachfüllen oder Umladen mitten in der Tour', icon: Fuel },
  { label: 'Mehrere mögliche Nachfüllstationen', icon: Repeat },
  { label: 'Rückkehr zum Depot am Schichtende', icon: Warehouse },
]

interface SolveFlowStep {
  step: string
  label: string
  description: string
}

export const solveFlowSteps: SolveFlowStep[] = [
  {
    step: '01',
    label: 'Problem senden',
    description:
      'Ein JSON-Body an POST /v1/solve beschreibt die Fahrzeuge mit Tankkapazität und Schichtzeitfenster, die Depots, die Halte mit Bedarf und Zeitfenster sowie die Nachfüllstationen.',
  },
  {
    step: '02',
    label: 'Kosten holen und lösen',
    description:
      'Streamlet fragt die Reisezeit- und Distanzmatrix bei der Routing-Engine ab und löst das Problem im Solver.',
  },
  {
    step: '03',
    label: 'Routen erhalten',
    description:
      'Die Antwort enthält für jede Route die Reihenfolge der Halte, Distanz, Fahrt- und Wartezeit sowie die Geometrie. Dazu kommt die Liste der Halte, die unbedient bleiben.',
  },
]

interface ApiEndpoint {
  method: string
  path: string
  description: string
}

export const apiEndpoints: ApiEndpoint[] = [
  { method: 'POST', path: '/v1/solve', description: 'Problem lösen und Routen zurückgeben' },
  { method: 'GET', path: '/health', description: 'Liveness-Prüfung' },
  { method: 'GET', path: '/api-docs/openapi.json', description: 'OpenAPI-Schema der API' },
]

interface SolverStage {
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export const solverStages: SolverStage[] = [
  {
    label: 'Konstruktion',
    description:
      'Cheapest Insertion baut die erste Lösung. Reicht der Tank für den nächsten Halt nicht, fügt der Solver davor die günstigste Nachfüllstation ein.',
    icon: Boxes,
  },
  {
    label: 'Lokale Suche',
    description:
      'Eine VND-artige Suche verbessert die Lösung. Zuerst laufen die günstigen Züge innerhalb einer Route, danach die teureren zwischen den Routen. Findet keiner davon mehr etwas, setzt sie alle Nachfüllbesuche neu und verwirft die, die sich nicht mehr lohnen.',
    icon: GitBranch,
  },
]

export const solverMoveEvaluation = {
  label: 'Load- und Duration-Segmente',
  description:
    'Kapazität und Zeitfenster prüft der Solver über Load- und Duration-Segmente nach Vidal et al. (2014). Sie lassen sich in konstanter Zeit zusammenführen, bewertet wird jeder Zug an der betroffenen Route.',
  icon: Layers,
} as const

interface Benchmark {
  instance: string
  gap: string
}

export const solverBenchmarks: Benchmark[] = [
  { instance: 'c101', gap: '3,1\u00A0%' },
  { instance: 'r101', gap: '1,9\u00A0%' },
  { instance: 'rc101', gap: '1,5\u00A0%' },
]

export interface TileChangeset {
  name: string
  status: 'available' | 'in-progress'
  description: string
}

export const tileChangesets: TileChangeset[] = [
  {
    name: 'construction',
    status: 'available',
    description:
      'Markiert Straßen, die wegen Baustellen gesperrt sind, als access=no. Routen führen dann nicht mehr durch die Sperrung.',
  },
  {
    name: 'allowed-paths',
    status: 'in-progress',
    description:
      'Öffnet Wege für Kraftfahrzeuge, wenn ein Zielpunkt von keiner befahrbaren Straße aus erreichbar ist. Die Zielpunkte soll der Patcher aus der API von Green Ecolution lesen.',
  },
]

interface OperationsFact {
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export const operationsFacts: OperationsFact[] = [
  {
    label: 'Zustandslos',
    description:
      'Keine Datenbank, keine Job-Queue. Beim Herunterfahren laufen offene Anfragen aus, statt abzubrechen.',
    icon: ServerCog,
  },
  {
    label: 'Engine austauschbar',
    description:
      'Die Routing-Engine hängt hinter dem Port-Trait Router. Implementiert ist Valhalla. Eine andere Engine lässt sich dahinter setzen, ohne den Solver zu ändern.',
    icon: Repeat,
  },
  {
    label: 'Solver als separate Crate',
    description:
      'Der Solver liegt in der Crate streamlet-core, ohne tokio, axum und HTTP-Code. Dazu kommen nur Serialisierung und Fehlertypen.',
    icon: Layers,
  },
  {
    label: 'AGPL-3.0',
    description:
      'Der Quellcode steht unter der GNU Affero General Public License, Version 3. Wer Streamlet verändert und als Netzwerkdienst betreibt, muss den geänderten Quellcode dessen Nutzern anbieten.',
    icon: Scale,
  },
]

export const streamletLimitations: string[] = [
  'Die Geometrie kommt als kodierte Polyline zurück. Die Option geojson verhält sich derzeit wie polyline.',
  'Die API nimmt mehrere Depots entgegen, jede Route kehrt aber zum ersten zurück.',
  'Es gibt keinen GPX-Endpoint und keine eingebettete Routing-Engine.',
]
