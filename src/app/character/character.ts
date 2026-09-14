import { CharacterOrigin, Morality, Sex, VariantContext } from 'coh-content-db'
import { Draft } from 'immer'
import shortid from 'shortid'


export interface Character extends VariantContext {
  readonly key: string
  readonly name: string
  readonly server?: string
  readonly origin?: CharacterOrigin
  readonly morality?: Morality
  readonly archetypeKey?: string
  readonly sex?: Sex

  readonly badges?: Partial<Record<string, CharacterBadgeRecord>>
}

export interface CharacterBadgeRecord {
  readonly owned?: boolean
  readonly req?: Partial<Record<string, CharacterBadgeRequirementRecord>>
}

export interface CharacterBadgeRequirementRecord {
  readonly owned?: boolean
  readonly count?: number
}

export function fromPartial(partial: Partial<Character>): Character {
  const candidate = {
    ...partial,
    ...{ key: partial.key ?? shortid() },
    ...{ name: partial.name ?? 'New Character' },
  }
  candidate.origin ??= 'primal'
  candidate.server ??= '- Unknown -'
  candidate.archetypeKey ??= 'blaster'
  candidate.morality ??= 'hero'
  candidate.sex ??= 'M'

  return candidate
}

export function applyPartial(partial: Partial<Character>): (draft: Draft<Character>) => void {
  return (draft: Draft<Character>) => {
    draft.name = partial.name ?? draft.name
    draft.server = partial.server ?? draft.server
    draft.origin = partial.origin ?? draft.origin
    draft.morality = partial.morality ?? draft.morality
    draft.archetypeKey = partial.archetypeKey ?? draft.archetypeKey
    draft.sex = partial.sex ?? draft.sex

    draft.badges ??= {}
    for (const [badgeKey, partialBadge] of Object.entries(partial.badges ?? {})) {
      draft.badges[badgeKey] ??= {}
      const draftBadge = draft.badges[badgeKey]
      draftBadge.owned = (partialBadge?.owned ?? false) || (draftBadge.owned ?? false)

      for (const [reqKey, partialReq] of Object.entries(partialBadge?.req ?? {})) {
        draftBadge.req ??= {}
        draftBadge.req[reqKey] = {
          owned: partialReq?.owned ?? draftBadge.req[reqKey]?.owned,
          count: partialReq?.count ?? draftBadge.req[reqKey]?.count,
        }
      }
    }
  }
}
