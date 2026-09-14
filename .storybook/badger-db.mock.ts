import { fn } from 'storybook/test'
import type { getBadgerDb as getActualBadgerDb } from '../src/app/db/badger-db.ts'

// Preserve the real class: automocking the module also wraps its constructor.
export * from '../src/app/db/badger-db.ts'
export const getBadgerDb = fn<typeof getActualBadgerDb>(() => {
  throw new Error('The Storybook database has not been initialized')
}).mockName('getBadgerDb')
