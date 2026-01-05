import { Morality, Sex, VariantContext } from 'coh-content-db'


export interface Character extends VariantContext {
  readonly key: string;
  readonly name: string;
  readonly server?: string;
  readonly morality?: Morality
  readonly archetypeKey?: string;
  readonly sex?: Sex

  readonly badges?: Record<string, CharacterBadgeRecord>
}

export interface CharacterBadgeRecord {
  readonly owned?: boolean;
  readonly req?: Record<string, CharacterBadgeRequirementRecord>
}

export interface CharacterBadgeRequirementRecord {
  readonly owned?: boolean;
  readonly count?: number;
}
