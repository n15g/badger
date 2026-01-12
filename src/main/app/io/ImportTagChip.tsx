import { FC, ReactNode } from 'react'
import { Chip } from '@mui/joy'
import { ImportTag } from './import-tag.ts'
import { TypedIndex } from '../util/typed-index.ts'

export const Views = new TypedIndex<ImportTag, ReactNode>({
  gzip: <Chip color="primary">gzip</Chip>,
  json: <Chip color="primary">json</Chip>,
  text: <Chip color="primary">text</Chip>,

  v1: <Chip color="warning">v1</Chip>,
  badger: <Chip color="success">badger</Chip>,
  log: <Chip color="success">log</Chip>,

  unknown: <Chip color="neutral">unknown</Chip>,
  error: <Chip color="danger">error</Chip>,
})

const ImportTagChip: FC<{ value?: ImportTag }>
  = ({ value }) => {

  return value ? Views.get(value) : undefined
}

export default ImportTagChip
