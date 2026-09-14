import { MissionType } from 'coh-content-db'
import { TypedIndex } from '../util/typed-index.ts'

export const MissionTypeLabels = new TypedIndex<MissionType, string>({
  'mission': 'Mission',
  'personal-story': 'Personal Story',
  'story-arc': 'Story Arc',
  'strike-force': 'Strike Force',
  'task-force': 'Task Force',
  'trial': 'Trial',
})
