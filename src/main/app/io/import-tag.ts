export const IMPORT_TAG = [
  'gzip',
  'text',
  'json',
  'v1',
  'badger',
  'log',
  'unknown',
  'error',
] as const
export type ImportTag = typeof IMPORT_TAG[number]
