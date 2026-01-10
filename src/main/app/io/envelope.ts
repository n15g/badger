import { Character } from '../character/character.ts'

export interface Envelope<TType extends string, TPayload> {
  readonly format: 'badger-export'
  readonly version: 1
  readonly createdAt: string
  readonly type: TType
  readonly payload: TPayload
}

export function createEnvelope<TType extends string, TPayload>(type: TType, payload: TPayload):
  Envelope<TType, TPayload> {

  return {
    format: 'badger-export',
    version: 1,
    createdAt: new Date().toISOString(),
    type: type,
    payload: payload,
  }
}

export type CharacterEnvelope = Envelope<'character', Character[]>

export function createCharacterEnvelope(characters: Character[]): CharacterEnvelope {
  return createEnvelope('character', characters)
}
