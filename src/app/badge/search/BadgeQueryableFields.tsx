import { TypedIndex } from '../../util/typed-index.ts'
import { BadgeQueryableField } from 'coh-content-db'

export const BadgeQueryableFields = new TypedIndex<BadgeQueryableField, string>({
  'name': 'Name',
  'badge-text': 'Badge Text',
  'acquisition': 'Acquisition',
  'notes': 'Notes',
  'effect': 'Effect',
  'set-title-id': 'SetTitle ID',
})
