export interface Character {
  readonly key: string;
  readonly name: string;
  readonly server?: string;
  readonly archetypeKey?: string;

  readonly badges?: Record<string, {
    readonly owned: boolean;
    readonly partials?: Record<string, {
      readonly owned: boolean;
      readonly craftCount?: number;
    }>
  }>
}
