import { Character } from '../character/character.ts'
import { ImportAction } from './import-action.ts'
import shortid from 'shortid'

export type CharacterImportPlan = Record<string, CharacterImportPlanEntry>

export interface CharacterImportPlanEntry {
  incoming: Partial<Character>
  existing: Character | undefined
  action: ImportAction
}

export function buildCharacterImportPlan(imported: Partial<Character>[], characters: Character[]) {
  const results: CharacterImportPlan = {}

  for (const incoming of imported) {
    const importedKey = incoming.key

    if (importedKey) {
      const existing = characters.find((character) => character.key === importedKey)
      if (existing) {
        results[importedKey] = {
          incoming,
          action: 'replace',
          existing
        }
        continue
      }
    }

    const newKey = shortid()
    const existing = characters.find((character) => character.name === incoming.name)
    results[newKey] = {
      incoming,
      action: existing ? 'merge' : 'new',
      existing
    }
  }

  return results
}
