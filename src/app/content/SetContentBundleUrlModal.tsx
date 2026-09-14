import { FC, useCallback, useState } from 'react'
import { Alert, Button, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import ContentLoader from './ContentLoader.tsx'
import { errorToMeatspace } from '../util/error-to-meatspace.ts'

const SetContentBundleUrlModal: FC<{ open: boolean, onClose: () => void }>
  = ({ open, onClose }) => {

  const { loadBundle } = ContentLoader.useContentLoader()

  const [error, setError] = useState<string | undefined>()
  const [newUrl, setNewUrl] = useState('')

  const close = useCallback(() => {
    setError(undefined)
    setNewUrl('')
    onClose()
  }, [onClose])

  return open && (<>
    <Modal
      open={open}
      onClose={close}>
      <ModalDialog>
        <ModalClose/>
        <Typography level="title-lg">Load Bundle From URL</Typography>

        {error && <Alert color="danger">{error}</Alert>}

        <Input
          type="url"
          value={newUrl}
          onChange={(event) => {
            setNewUrl(event.target.value)
          }}/>

        <Button
          disabled={newUrl.length < 1}
          onClick={() => {
            void loadBundle(newUrl)
              .then(close)
              .catch((e: unknown) => {
                console.error(e)
                setError(errorToMeatspace(e))
              })
          }}>
          Load
        </Button>
      </ModalDialog>
    </Modal>
  </>)
}

export default SetContentBundleUrlModal
