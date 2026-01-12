import { Parser, ParserResponse } from './parser.ts'

export const CoHLogFileParser: Parser = {
  onText: (text: string): ParserResponse => {
    if (
      text.includes('Welcome to City of Heroes')
      || text.includes('has been selected as new title')
    ) {
      return {
        tags: ['log'],
        characters: [] //TODO - implementation
      }
    }
  }
}
