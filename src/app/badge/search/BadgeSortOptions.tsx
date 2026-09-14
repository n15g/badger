import { TypedIndex } from '../../util/typed-index.ts'
import { BadgeSort } from 'coh-content-db'

export const BadgeSortOptions = new TypedIndex<BadgeSort, { label: string, asc: boolean }>({
  'canonical.asc': { label: 'Canonical', asc: true },
  'canonical.desc': { label: 'Canonical', asc: false },
  'name.asc': { label: 'Name', asc: true },
  'name.desc': { label: 'Name', asc: false },
  'zone-key.asc': { label: 'Zone', asc: true },
  'zone-key.desc': { label: 'Zone', asc: false },
  'release-date.asc': { label: 'Release Date', asc: true },
  'release-date.desc': { label: 'Release Date', asc: false },
})
