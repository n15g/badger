import { ZoneType } from 'coh-content-db'
import { TypedIndex } from '../util/typed-index.ts'

export const ZoneTypeLabels = new TypedIndex<ZoneType, string>({
  'city': 'City Zone',
  'echo': 'Echo Zone',
  'tutorial': 'Tutorial Zone',
  'trial': 'Trial Zone',
  'hazard': 'Hazard Zone',
  'mayhem': 'Mayhem Area',
  'safeguard': 'Safeguard Area',
  'mission': 'Mission Area',
  'incarnate': 'Incarnate Zone',
  'co-op': 'Cooperative Zone',
  'pvp': 'PvP Zone',
  'arena': 'Arena Map',
  'building': 'Building',
  'other': 'Other',
})
