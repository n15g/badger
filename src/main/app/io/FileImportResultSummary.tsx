import { FC } from 'react'
import { List, ListItem, ListItemDecorator, Stack, Typography } from '@mui/joy'
import ImportTagList from './ImportTagList.tsx'
import ErrorText from '../util/ErrorText.tsx'
import { FileImportResult } from './importer.ts'
import CheckChip from '../util/CheckChip.tsx'
import CrossChip from '../util/CrossChip.tsx'

const ParseFilesResultList: FC<{ fileImportResults?: FileImportResult[] }>
  = ({ fileImportResults }) => {

  return fileImportResults && (
    <List>
      {fileImportResults.map(({ file, accepted, tags, error, characters }) => (
        <ListItem key={file.name} variant="outlined" sx={{ borderRadius: 8, m: 1 }}>
          <ListItemDecorator>
            {accepted ? <CheckChip/> : <CrossChip/>}
          </ListItemDecorator>
          <Stack>
            <Typography component="span" level="title-sm">
              {file.name}
              <ImportTagList value={tags} sx={{ pl: 1 }}/>
            </Typography>
            {characters &&
              <Typography level="body-xs">
                {characters.length} Character{characters.length === 1 ? '' : 's'}
              </Typography>}
            {error && <Typography level="body-xs">
              <ErrorText>{error}</ErrorText>
            </Typography>}
          </Stack>
        </ListItem>
      ))}
    </List>
  )
}

export default ParseFilesResultList
