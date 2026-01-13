import { Character } from '../character/character.ts'

export interface ExportEnvelope<TType extends string, TPayload> {
  readonly format: 'badger-export'
  readonly version: 1
  readonly createdAt: string
  readonly type: TType
  readonly payload: TPayload
}

export function createExportEnvelope<TType extends string, TPayload>(type: TType, payload: TPayload):
  ExportEnvelope<TType, TPayload> {

  return {
    format: 'badger-export',
    version: 1,
    createdAt: new Date().toISOString(),
    type: type,
    payload: payload,
  }
}

export function isBadgerExportEnvelope(v: unknown): v is ExportEnvelope<string, unknown> {
  return typeof v === 'object'
    && v !== null
    && (v as Record<string, unknown>).format === 'badger-export'
}

export type CharacterExportEnvelope = ExportEnvelope<'character', Character[]>

export function createCharacterEnvelope(characters: Character[]): CharacterExportEnvelope {
  return createExportEnvelope('character', characters)
}

export function isCharacterExportEnvelope(v: unknown): v is CharacterExportEnvelope {
  return isBadgerExportEnvelope(v)
    && v.type === 'character'
}
