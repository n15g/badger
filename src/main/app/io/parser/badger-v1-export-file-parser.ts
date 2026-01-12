import { Parser, ParserResponse } from './parser.ts'

export const BadgerV1ExportFileParser: Parser = {
  onText: (text: string): ParserResponse => {
    if (text.startsWith('BADGER')) {
      return {
        tags: ['v1', 'badger'],
        characters: [] //TODO - implementation
      }
    }
  }
}
