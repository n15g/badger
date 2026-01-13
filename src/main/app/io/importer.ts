import { ImportTag } from './import-tag.ts'
import { errorToMeatspace } from '../util/error-to-meatspace.ts'
import { Parser } from './parser/parser.ts'
import { CoHLogFileParser } from './parser/coh-log-file-parser.ts'
import { BadgerV1ExportFileParser } from './parser/badger-v1-export-file-parser.ts'
import { BadgerV2ExportFileParser } from './parser/badger-v2-export-file-parser.ts'
import { Character } from '../character/character.ts'

const PARSERS: Parser[] = [
  CoHLogFileParser,
  BadgerV1ExportFileParser,
  BadgerV2ExportFileParser,
]

export interface FileImportResult {
  file: File
  accepted: boolean
  tags?: ImportTag[]
  error?: string
  characters?: Partial<Character>[]
}

export async function importFiles(files: File[]): Promise<FileImportResult[]> {
  const results = []

  for (const file of files) {
    const result = await importFile(file)
    results.push(result)
  }

  return results
}

async function importFile(file: File): Promise<FileImportResult> {
  const { text, gzipped } = await fileToText(file)
  const extraTags: ImportTag[] = []

  if (gzipped) {
    extraTags.push('gzip')
  }

  const trimmed = text.trimStart()

  for (const parser of PARSERS) {
    const result = await parser.onText?.(trimmed)
    if (result) {
      extraTags.push('text')
      return { file, accepted: true, ...result, tags: [...result.tags ?? [], ...extraTags] }
    }
  }

  // Try JSON parsers
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const json = JSON.parse(trimmed) as unknown

      for (const parser of PARSERS) {
        const result = await parser.onJson?.(json)
        if (result) {
          extraTags.push('json')
          return { file, accepted: true, ...result, tags: [...result.tags ?? [], ...extraTags] }
        }
      }
    } catch (e: unknown) {
      console.error(e)
      return { file, accepted: false, error: errorToMeatspace(e), tags: [...extraTags, 'json', 'error'] }
    }
  }

  return { file, accepted: false, tags: ['unknown'] }
}

function isGzip(bytes: Uint8Array): boolean {
  // Magic bytes for gzip are 0x1f and 0x8b
  return bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b
}

async function fileToText(file: File): Promise<{ text: string; gzipped: boolean }> {
  const bytes = new Uint8Array(await file.arrayBuffer())
  const gzipped = isGzip(bytes)

  if (!gzipped) {
    return { text: new TextDecoder('utf-8').decode(bytes), gzipped: false }
  }

  const decompressed = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  const text = await new Response(decompressed).text()
  return { text, gzipped: true }
}
