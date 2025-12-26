import { FC, useState } from 'react'
import { Button, ButtonProps, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import CharacterEdit from './CharacterEdit.tsx'
import shortid from 'shortid'

const AddCharacterButton: FC<ButtonProps>
  = ({ ...props }) => {
  const { saveCharacter } = CharacterDbProvider.useCharacterDb()

  const [open, setOpen] = useState(false)

  return (<>
      <Button {...props} onClick={() => {
        setOpen(true)
      }}>
        <Icons.Plus/> Add Character
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <ModalDialog>
          <ModalClose/>
          <Typography level="title-lg">Add Character</Typography>
          <CharacterEdit onSave={async (character) => {
            await saveCharacter({
              key: shortid(),
              ...character
            })
            setOpen(false)
          }}/>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default AddCharacterButton
