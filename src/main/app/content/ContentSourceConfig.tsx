import { Box, Button, Chip, Stack, Typography } from '@mui/joy'
import ContentLoader from './ContentLoader.tsx'
import { DEFAULT_BUNDLE_SOURCE } from '../global.ts'
import moment from 'moment/moment'
import ContentProvider from './ContentProvider.tsx'
import { useCallback, useState } from 'react'
import SetContentBundleUrlModal from './SetContentBundleUrlModal.tsx'
import BadgerSpinner from '../util/BadgerSpinner.tsx'
import UploadContentBundleModal from './UploadContentBundleModal.tsx'

function ContentSourceConfig() {
  const content = ContentProvider.useContent()
  const { bundleSource, loadBundle } = ContentLoader.useContentLoader()

  const [urlOpen, setUrlOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  const isDefault = bundleSource === DEFAULT_BUNDLE_SOURCE
  const isUpload = bundleSource === 'idb'
  const isRemote = !isDefault && !isUpload

  const [defaulting, setDefaulting] = useState(false)
  const setDefaultBundle = useCallback(async () => {
    setDefaulting(true)

    await loadBundle(DEFAULT_BUNDLE_SOURCE)
      .finally(() => {
        setDefaulting(false)
      })
  }, [loadBundle])

  return (
    <>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" columnGap={4} rowGap={1}>
        {isDefault && (
          <Chip color="success">Badger Default</Chip>
        )}

        {isUpload && (
          <Chip color="warning">Upload</Chip>
        )}

        {isRemote && (
          <Chip color="warning">{bundleSource}</Chip>
        )}
        <Typography>Content Version: {content.header.version}</Typography>
        <Typography>Last Updated: {moment(content.header.lastUpdateTime).fromNow()}</Typography>
      </Stack>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Button
          color="success"
          size="sm"
          disabled={isDefault}
          onClick={() => {
            void setDefaultBundle()
          }}>
          {defaulting ? <BadgerSpinner style={{ height: '1.2em' }}/> : <>Default</>}
        </Button>

        <Button
          color="neutral"
          size="sm"
          onClick={() => {
            setUploadOpen(true)
          }}>Upload</Button>

        <Button
          color="neutral"
          size="sm"
          onClick={() => {
            setUrlOpen(true)
          }}>Load from URL</Button>
      </Box>

      <UploadContentBundleModal open={uploadOpen} onClose={() => {
        setUploadOpen(false)
      }}/>

      <SetContentBundleUrlModal open={urlOpen} onClose={() => {
        setUrlOpen(false)
      }}/>
    </>
  )
}

export default ContentSourceConfig
