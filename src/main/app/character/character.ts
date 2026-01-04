import { Morality, Sex, VariantContext } from 'coh-content-db'

export interface Character extends VariantContext {
  readonly key: string;
  readonly name: string;
  readonly server?: string;
  readonly morality?: Morality
  readonly archetypeKey?: string;
  readonly sex?: Sex

  readonly badges?: Record<string, {
    readonly owned?: boolean;
    readonly partials?: Record<string, {
      readonly owned?: boolean;
      readonly craftCount?: number;
    }>
  }>
}
