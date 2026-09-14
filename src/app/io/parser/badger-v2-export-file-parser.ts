import { Parser, ParserResponse } from './parser.ts'
import { CharacterExportEnvelope, isCharacterExportEnvelope } from '../export-envelope.ts'
import { errorToMeatspace } from '../../util/error-to-meatspace.ts'

export const BadgerV2ExportFileParser: Parser = {
  onJson: async (json: unknown): Promise<ParserResponse> => {
    if (isCharacterExportEnvelope(json)) {
      if ((json as Partial<CharacterExportEnvelope>).type === 'character') {
        try {
          return {
            tags: ['badger'],
            characters: json.payload
          }
        } catch (e: unknown) {
          return {
            tags: ['badger', 'error'],
            error: errorToMeatspace(e)
          }
        }
      }
    }
    return undefined
  }
}
