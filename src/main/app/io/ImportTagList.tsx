import { FC } from 'react'
import { Stack, StackProps } from '@mui/joy'
import { ImportTag } from './import-tag.ts'
import ImportTagChip from './ImportTagChip.tsx'

const ImportTagList: FC<{ value?: ImportTag[] } & StackProps>
  = ({ value, ...props }) => {

  return value
    ? (
      <Stack direction="row" gap={1} flexWrap="wrap" display="inline-flex" {...props}>
        {value.map((tag) => (
          <ImportTagChip key={tag} value={tag}/>
        ))}
      </Stack>
    )
    : undefined
}

export default ImportTagList
