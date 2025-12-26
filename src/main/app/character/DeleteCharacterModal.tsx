import { FC, useState } from 'react'
import { Button, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Character } from './character.ts'
import { Icons } from '../util/Icons.tsx'
import ErrorProvider from '../util/ErrorProvider.tsx'
import BadgerSpinner from '../util/BadgerSpinner.tsx'

const AddCharacterButton: FC<{ character?: Character, onClose: () => void }>
  = ({ character, onClose }) => {
  const { deleteCharacter } = CharacterDbProvider.useCharacterDb()
  const error = ErrorProvider.useError()

  const [deleting, setDeleting] = useState(false)

  const deleteFn = async () => {
    try {
      setDeleting(true)
      if (character?.key) {
        await deleteCharacter(character.key)
      }
    } catch (err: unknown) {
      error(err)
    } finally {
      setDeleting(false)
      onClose()
    }
  }

  return character && (
    <Modal
      open={!!character}
      onClose={onClose}>
      <ModalDialog>
        <ModalClose/>
        <Typography level="title-lg">Delete {character.name}</Typography>
        <Typography level="body-md">Are you sure you want to delete this character?</Typography>
        <Stack direction="row" gap={2}>
          <Button
            color="primary"
            endDecorator={<Icons.Check/>}
            disabled={deleting}
            onClick={() => void deleteFn()}>
            {deleting ? <BadgerSpinner style={{ height: '1.2em' }}/> : <>Yes</>}
          </Button>
          <Button
            color="danger"
            endDecorator={<Icons.Cross/>}
            disabled={deleting}
            onClick={onClose}>
            No!
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default AddCharacterButton
