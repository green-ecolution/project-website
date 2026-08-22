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
  { label: 'Fahrzeuge mit begrenzter Ladekapazität', icon: Container },
  { label: 'Haltepunkte mit Zeitfenstern', icon: Clock },
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
      'Fahrzeuge mit Tank und Schicht, Depots, Halte mit Bedarf und Zeitfenster, Nachfüllstationen gehen als JSON an POST /v1/solve.',
  },
  {
    step: '02',
    label: 'Kosten holen und lösen',
    description:
      'Streamlet fragt die Reisezeit- und Distanzmatrix bei der Routing-Engine ab und löst das Problem im eigenen Solver.',
  },
  {
    step: '03',
    label: 'Routen erhalten',
    description:
      'Die Antwort enthält die Routen mit Reihenfolge der Stopps, Distanz, Fahrt- und Wartezeit, Geometrie sowie die Halte, die unbedient bleiben.',
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
      'Cheapest Insertion baut die erste Lösung. Reicht der Tank für den nächsten Halt nicht, wird die günstigste Nachfüllstation davor eingefügt.',
    icon: Boxes,
  },
  {
    label: 'Lokale Suche',
    description:
      'Eine VND-artige Suche verbessert die Lösung mit Relocate, Swap, 2-opt, Cross-Exchange, 2-opt* und Relocate-with-Refill.',
    icon: GitBranch,
  },
  {
    label: 'Zulässigkeit in O(1)',
    description:
      'Load- und Duration-Segmente nach Vidal et al. (2014) bewerten jeden Zug in konstanter Zeit, statt die Route neu durchzurechnen.',
    icon: Layers,
  },
]

interface Benchmark {
  instance: string
  gap: string
}

export const solverBenchmarks: Benchmark[] = [
  { instance: 'c101', gap: '3,1 %' },
  { instance: 'r101', gap: '1,9 %' },
  { instance: 'rc101', gap: '1,5 %' },
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
      'Öffnet Wege rund um Zielpunkte, die von keiner befahrbaren Straße aus erreichbar sind, für Kraftfahrzeuge. Die Zielpunkte kommen als GeoJSON-FeatureCollection herein, damit der Patcher ohne Bezug zu einem fremden System läuft.',
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
      'Keine Datenbank, keine Job-Queue. Anfrage rein, Lösung raus. Beim Herunterfahren laufen offene Anfragen aus, statt abzubrechen.',
    icon: ServerCog,
  },
  {
    label: 'Engine austauschbar',
    description:
      'Die Routing-Engine hängt hinter dem Port-Trait Router. Valhalla ist die Implementierung, die es gibt; eine weitere käme ohne Eingriff in den Solver dazu.',
    icon: Repeat,
  },
  {
    label: 'Kern ohne Ballast',
    description:
      'Der Solver liegt in der eigenen Crate streamlet-core, frei von tokio, axum und HTTP-Zubehör. Nur Serialisierung und Fehlertypen kommen dazu.',
    icon: Layers,
  },
  {
    label: 'AGPL-3.0',
    description: 'Der Quellcode steht unter der GNU Affero General Public License, Version 3.',
    icon: Scale,
  },
]

export const streamletLimitations: string[] = [
  'Die Geometrie kommt als encoded Polyline zurück. Die Option geojson verhält sich derzeit wie polyline.',
  'Mehrere Depots werden im Problem angenommen, jede Route kehrt aber zum ersten Depot zurück.',
  'Kein GPX-Endpoint, keine Persistenz, keine eingebettete Routing-Engine.',
]
