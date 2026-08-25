export type RoadmapItemId = 'mobileApp' | 'firmware' | 'userRoles' | 'openData' | 'greenSpaceTypes'

interface RoadmapItem {
  id: RoadmapItemId
  status: 'planned' | 'in-progress' | 'completed'
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'mobileApp',
    status: 'completed',
  },
  {
    id: 'userRoles',
    status: 'completed',
  },
  {
    id: 'firmware',
    status: 'in-progress',
  },
  {
    id: 'openData',
    status: 'planned',
  },
  {
    id: 'greenSpaceTypes',
    status: 'planned',
  },
]
