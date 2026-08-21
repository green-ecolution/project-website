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
  release: '/releases/v0.4.0',
} as const

export const streamletBadges: string[] = ['Rust', 'AGPL-3.0', 'v0.1.0', 'Zustandslose HTTP-API']

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

export const solveRequestExample = `{
  "problem": {
    "vehicles": [{
      "id": 1,
      "start": {"lat": 54.78, "lon": 9.43},
      "tank": {"capacity": 100.0, "level": 100.0},
      "kind": {"Car": {"width": 2.0, "height": 2.0}},
      "shift": {"start": 0.0, "end": 28800.0},
      "max_trips": null
    }],
    "depots": [{"id": 1, "location": {"lat": 54.78, "lon": 9.43}}],
    "customers": [
      {"id": 1, "location": {"lat": 54.79, "lon": 9.44},
       "demand": 40.0, "service_time": 300.0, "time_window": null},
      {"id": 2, "location": {"lat": 54.80, "lon": 9.45},
       "demand": 40.0, "service_time": 300.0, "time_window": null}
    ],
    "refill_stations": [{"id": 1, "location": {"lat": 54.785, "lon": 9.435},
                         "refill_duration": 600.0}]
  },
  "options": {"geometry": "polyline"}
}`

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
      'Markiert Straßen, die wegen Baustellen gesperrt sind, als access=no. Routen führen dann nicht mehr durch die Sperrung. Die Baustellendaten kommen beim ersten Konsumenten aus dem Flensburger Verkehrsticker.',
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

interface EnvVar {
  name: string
  fallback: string
  description: string
}

export const envVars: EnvVar[] = [
  { name: 'STREAMLET_ADDR', fallback: '0.0.0.0:3000', description: 'Adresse und Port des Servers' },
  {
    name: 'STREAMLET_VALHALLA_URL',
    fallback: 'http://localhost:8002',
    description: 'Basis-URL der Routing-Engine',
  },
  {
    name: 'STREAMLET_ENGINE_TIMEOUT_MS',
    fallback: '10000',
    description: 'Timeout für Anfragen an die Engine',
  },
  {
    name: 'STREAMLET_SOLVER_TIME_LIMIT_MS',
    fallback: '2000',
    description: 'Zeitbudget des Solvers je Anfrage',
  },
]

export const streamletLimitations: string[] = [
  'Die Geometrie kommt als encoded Polyline zurück. Die Option geojson verhält sich derzeit wie polyline.',
  'Mehrere Depots werden im Problem angenommen, jede Route kehrt aber zum ersten Depot zurück.',
  'Kein GPX-Endpoint, keine Persistenz, keine eingebettete Routing-Engine.',
]
