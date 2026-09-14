import { Character, CharacterBadgeRecord, CharacterBadgeRequirementRecord } from './character.ts'
import shortid from 'shortid'

export interface LegacyCharacter {
  readonly key: string;
  readonly name: string;
  readonly server?: string;
  readonly archetypeKey?: string;

  readonly badges?: Record<string, LegacyBadgeRecord>
}

interface LegacyBadgeRecord {
  readonly owned?: boolean;
  readonly partials?: Record<string, LegacyPartialRecord>
}

interface LegacyPartialRecord {
  readonly owned?: boolean;
  readonly craftCount?: number;
}

export function migrate(legacy: Partial<LegacyCharacter>): Character {
  const badges: Record<string, CharacterBadgeRecord> = {}

  for (const [badgeKey, { owned: badgeOwned, partials }] of Object.entries(legacy.badges ?? {})) {
    const req: Record<string, CharacterBadgeRequirementRecord> = {}

    for (const [reqKey, { owned: partialOwned, craftCount }] of Object.entries(partials ?? {})) {
      req[reqKey] = {
        owned: partialOwned === true ? true : undefined,
        count: craftCount
      }
    }

    badges[badgeKey] = {
      owned: badgeOwned === true ? true : undefined,
      req: partials ? req : undefined
    }
  }

  return {
    key: legacy.key ?? shortid(),
    name: legacy.name ?? 'New Character',
    server: legacy.server ?? '- Unknown -',
    archetypeKey: legacy.archetypeKey ?? 'blaster',
    morality: 'hero',
    sex: 'M',
    badges: legacy.badges ? badges : undefined,
  }
}
