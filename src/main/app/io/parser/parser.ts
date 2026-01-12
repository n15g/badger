import { ImportTag } from '../import-tag.ts'
import { Character } from '../../character/character.ts'

export interface Parser {
  onText?: (text: string) => ParserResponse
  onJson?: (json: unknown) => ParserResponse
}

export interface Parse {
  tags?: ImportTag[]
  error?: string
  characters?: Partial<Character>[]
}

export type ParserResponse = Parse | undefined
