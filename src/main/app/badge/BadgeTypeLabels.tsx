import { BadgeType } from 'coh-content-db'
import { TypedIndex } from '../util/typed-index.ts'

export const BadgeTypeLabels = new TypedIndex<BadgeType, string>({
  'exploration': 'Exploration',
  'history': 'History',
  'accomplishment': 'Accomplishment',
  'achievement': 'Achievement',
  'accolade': 'Accolade',
  'gladiator': 'Gladiator',
  'veteran': 'Veteran',
  'pvp': 'PvP',
  'invention': 'Invention',
  'defeat': 'Defeat',
  'event': 'Event',
  'ouroboros': 'Ouroboros',
  'consignment': 'Consignment',
  'day-job': 'Day Job',
  'architect-entertainment': 'Architect Entertainment',
})
