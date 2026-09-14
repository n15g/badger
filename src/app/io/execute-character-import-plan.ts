import { produce } from 'immer'
import { applyPartial, fromPartial } from '../character/character.ts'
import { BadgerDb } from '../db/badger-db.ts'
import { CharacterImportPlan } from './character-import-plan.ts'

export async function executeCharacterImportPlan(plan: CharacterImportPlan, db: BadgerDb): Promise<void> {
  for (const [key, { incoming, existing, action }] of Object.entries(plan)) {
    if (action === 'ignore') continue

    if (!existing || action === 'new') {
      await db.saveCharacter(fromPartial({ key, ...incoming }))
    } else if (action === 'replace') {
      await db.deleteCharacter(existing.key)
      await db.saveCharacter(fromPartial({ key, ...incoming }))
    } else {
      const current = await db.getCharacter(existing.key)
      if (!current) {
        throw new Error(`Attempted to import into character with unknown key [${existing.key}]. Has it been deleted recently?`)
      }
      await db.saveCharacter(produce(current, applyPartial(incoming)))
    }
  }
}
