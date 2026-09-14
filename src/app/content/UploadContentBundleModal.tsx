import { FC, useCallback, useState } from 'react'
import { Alert, Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography, useTheme } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import Spinner from '../util/Spinner.tsx'
import ContentLoader from './ContentLoader.tsx'
import { BundleData } from 'coh-content-db'
import { FileRejection, useDropzone } from 'react-dropzone'
import { errorToMeatspace } from '../util/error-to-meatspace.ts'
import moment from 'moment'

const UploadContentBundleModal: FC<{ open: boolean, onClose: () => void }>
  = ({ open, onClose }) => {

  const theme = useTheme()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { loadBundle } = ContentLoader.useContentLoader()

  const [newBundle, setNewBundle] = useState<BundleData | undefined>()

  const close = useCallback(() => {
    setError(undefined)
    setNewBundle(undefined)
    onClose()
  }, [onClose])

  const loadFile = useCallback(async (file: File) => {
    setLoading(true)
    try {
      const prospectiveBundle = JSON.parse(await file.text()) as BundleData
      if (!prospectiveBundle.header.version) {
        setError('Unknown bundle format')
      }
      setNewBundle(prospectiveBundle)
    } catch (e) {
      setError(errorToMeatspace(e))
    } finally {
      setLoading(false)
    }
  }, [])

  const onDrop = useCallback((files: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setError('Unsupported file')
    }
    if (files[0]) {
      setError('')
      void loadFile(files[0])
    }
  }, [loadFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
  })

  return open && (<>
    <Modal
      open={open}
      onClose={() => {
        onClose()
      }}>
      <ModalDialog sx={{ overflow: 'scroll' }}>
        <ModalClose/>
        <Stack gap={1}>
          <Typography level="title-lg">Upload Content Bundle</Typography>

          {error && <Alert color="danger">{error}</Alert>}

          {!newBundle && <>
            <Box sx={{ minWidth: 300 }}>
              <div {...getRootProps()}
                   style={{
                     minHeight: 240,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: '2em',
                     cursor: 'pointer',
                     border: 'dashed 2px',
                     borderColor: isDragActive ? theme.vars.palette.success.outlinedBorder : theme.vars.palette.neutral.outlinedBorder,
                     borderRadius: 16,
                     transition: 'border .24s ease-in-out'
                   }}>
                {!loading && (<>
                  <input {...getInputProps()} />
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Icons.Upload style={{ height: 64, width: 64 }}/>
                    <Typography> Drop files or click to upload</Typography>
                  </Stack>
                </>)}
                {loading && (<>
                  <Spinner/>
                </>)}
              </div>
            </Box>
          </>}

          {newBundle && <>

            <Stack direction="row" flexWrap="wrap" justifyContent="center" columnGap={4} rowGap={1}>
              <Typography>Content Version: {newBundle.header.version}</Typography>
              <Typography>Last Updated: {moment(newBundle.header.lastUpdateTime).fromNow()}</Typography>
            </Stack>

            <Button
              onClick={() => {
                void loadBundle(newBundle)
                  .then(close)
                  .catch((e: unknown) => {
                    console.error(e)
                    setError(errorToMeatspace(e))
                  })
              }}>
              Load
            </Button>
          </>}

        </Stack>
      </ModalDialog>
    </Modal>
  </>)
}

export default UploadContentBundleModal
