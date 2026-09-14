import { Alert, Box } from '@mui/joy'
import moment from 'moment'
import ContentProvider from './content/ContentProvider.tsx'
import { BUILD_INFO } from './build-info.ts'

const VersionInfo = () => {
  const content = ContentProvider.useContent()

  return (
    <Alert color="primary">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content max-content minmax(0, 1fr)',
          columnGap: 2,
          rowGap: 0.5,
          alignItems: 'baseline',
          width: '100%',
        }}
      >
        <Box />
        <Box sx={{ fontWeight: 'lg' }}>Version</Box>
        <Box sx={{ fontWeight: 'lg' }}>Updated</Box>
        <Box sx={{ fontWeight: 'lg' }}>Badger</Box>
        <Box>{BUILD_INFO.version}</Box>
        <Box>{moment(BUILD_INFO.builtAt).fromNow()}</Box>
        <Box sx={{ fontWeight: 'lg' }}>Content</Box>
        <Box>{content.header.version}</Box>
        <Box>{moment(content.header.lastUpdateTime).fromNow()}</Box>
      </Box>
    </Alert>
  )
}

export default VersionInfo
