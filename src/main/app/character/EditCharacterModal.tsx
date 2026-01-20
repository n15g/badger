import { FC } from 'react'
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Character } from './character.ts'
import EditCharacterForm from './EditCharacterForm.tsx'

const EditCharacterModal: FC<{ character?: Character, onClose: () => void }>
  = ({ character, onClose }) => {
  const { mutateCharacter } = CharacterDbProvider.useCharacterDb()

  return character && (
    <Modal
      open={!!character}
      onClose={onClose}>
      <ModalDialog>
        <ModalClose/>
        <Typography level="title-lg">Edit Character</Typography>
        <EditCharacterForm character={character} onSave={async (next) => {
          await mutateCharacter(character.key, (draft) => {
            draft.name = next.name ?? 'New Character'
            draft.server = next.server
            draft.origin = next.origin
            draft.archetypeKey = next.archetypeKey
            draft.morality = next.morality
            draft.sex = next.sex
          })
          onClose()
        }}/>
      </ModalDialog>
    </Modal>
  )
}

export default EditCharacterModal
