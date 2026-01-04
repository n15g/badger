import { Morality } from 'coh-content-db'
import { TypedIndex } from '../util/typed-index.ts'

export const MoralityLabels = new TypedIndex<Morality, string>({
  'hero': 'Hero',
  'vigilante': 'Vigilante',
  'villain': 'Villain',
  'rogue': 'Rogue',
  'resistance': 'Resistance',
  'loyalist': 'Loyalist',
})
