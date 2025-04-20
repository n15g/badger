import { TypedIndex } from '../../util/typed-index.ts'
import { BadgeQueryableField } from 'coh-content-db'

export const BADGE_QUERYABLE_FIELD_LABELS = new TypedIndex<BadgeQueryableField, string>({
  'name': 'Name',
  'badge-text': 'Badge text',
  'acquisition': 'Acquisition',
  'notes': 'Notes',
  'effect': 'Effect',
  'set-title-id': 'SetTitle id',
})
