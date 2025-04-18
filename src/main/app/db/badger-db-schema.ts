import { DBSchema } from 'idb'

export interface BadgerDbSchema extends DBSchema {
  'kv-store': {
    key: string
    value: {
      key: string,
      value: unknown
    }
  }
}
