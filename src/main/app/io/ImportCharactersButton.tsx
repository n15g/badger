import { FC, useState } from 'react'
import { Button, ButtonProps, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import SettitleScriptHelpLink from './/SettitleScriptHelpLink.tsx'

const ImportCharactersButton: FC<ButtonProps>
  = ({ ...props }) => {

  const [open, setOpen] = useState(false)

  return (<>
    <Button
      color="success"
      {...props}
      onClick={() => {
        setOpen(true)
      }}
      startDecorator={<Icons.Upload/>}
    >
      Import Characters
    </Button>
    {open && (<Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <ModalDialog>
          <ModalClose/>
          <Typography level="title-lg">Import Characters</Typography>
          <Typography>You can import characters into the app by uploading the following types of files:</Typography>
          <ul>
            <li>Previously exported characters as <code>.json</code> or <code>.json.gz</code> files.</li>
            <li>CoH game log files that contain output from the <SettitleScriptHelpLink/>.</li>
          </ul>
        </ModalDialog>
      </Modal>
    )}
  </>)
}

export default ImportCharactersButton
