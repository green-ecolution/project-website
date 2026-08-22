export type RoadmapItemId = 'mobileApp' | 'firmware' | 'userRoles' | 'openData' | 'greenSpaceTypes'

interface RoadmapItem {
  id: RoadmapItemId
  status: 'planned' | 'in-progress' | 'completed'
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'mobileApp',
    status: 'in-progress',
  },
  {
    id: 'firmware',
    status: 'planned',
  },
  {
    id: 'userRoles',
    status: 'planned',
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
