import { FC } from 'react'
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Character } from './character.ts'
import ErrorProvider from '../util/ErrorProvider.tsx'
import CharacterEdit from './CharacterEdit.tsx'

const AddCharacterButton: FC<{ character?: Character, onClose: () => void }>
  = ({ character, onClose }) => {
  const { saveCharacter } = CharacterDbProvider.useCharacterDb()
  const error = ErrorProvider.useError()

  const saveFn = async (next: Character) => {
    try {
      if (character?.key) {
        await saveCharacter(next)
      }
    } catch (err: unknown) {
      error(err)
    } finally {
      onClose()
    }
  }

  return character && (
    <Modal
      open={!!character}
      onClose={onClose}>
      <ModalDialog>
        <ModalClose/>
        <Typography level="title-lg">Edit Character</Typography>
        <CharacterEdit character={character} onSave={async (next) => {
          await saveFn({ ...character, ...next })
        }}/>
      </ModalDialog>
    </Modal>
  )
}

export default AddCharacterButton
