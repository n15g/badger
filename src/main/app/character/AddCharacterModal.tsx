import { FC } from 'react'
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import EditCharacterForm from './EditCharacterForm.tsx'
import shortid from 'shortid'

const AddCharacterModal: FC<{ open?: boolean, onClose: () => void }>
  = ({ open, onClose }) => {
  const { createCharacter } = CharacterDbProvider.useCharacterDb()

  return open && (
    <Modal
      open={open}
      onClose={() => {
        onClose()
      }}>
      <ModalDialog>
        <ModalClose/>
        <Typography level="title-lg">Add Character</Typography>
        <EditCharacterForm onSave={async (character) => {
          await createCharacter({
            key: shortid(),
            ...character
          })
          onClose()
        }}/>
      </ModalDialog>
    </Modal>
  )
}

export default AddCharacterModal
