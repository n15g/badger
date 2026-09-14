import { Parser, ParserResponse } from './parser.ts'
import { LegacyCharacter, migrate } from '../../character/legacy-character.tsx'

export const BadgerV1ExportFileParser: Parser = {
  onText: async (text: string): Promise<ParserResponse> => {
    if (text.startsWith('BADGER|')) {

      const base64 = text.substring(text.indexOf('|||') + 3)
      const utf8Bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
      const gzBinaryString = new TextDecoder('utf-8').decode(utf8Bytes)
      const gzBytes = Uint8Array.from(gzBinaryString, c => c.charCodeAt(0))
      const blob = new Blob([gzBytes]).stream().pipeThrough(new DecompressionStream('gzip'))
      const json = await new Response(blob).text()

      const character = JSON.parse(json) as LegacyCharacter
      console.debug('Decoded character', character)

      return {
        tags: ['v1', 'gzip', 'badger'],
        characters: [migrate(character)]
      }
    }
  }
}
