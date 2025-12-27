import { Box, Button, Card, ListItem } from '@mui/joy'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'
import { FC, useEffect, useState } from 'react'
import { Character } from './character.ts'
import CharacterCard from './CharacterCard.tsx'
import AddCharacterButton from './AddCharacterButton.tsx'
import DeleteCharacterModal from './DeleteCharacterModal.tsx'
import EditCharacterModal from './EditCharacterModal.tsx'

const CharacterList: FC<{ characters: Character[] }> = ({ characters }) => {
  const [editing, setEditing] = useState(false)
  const [characterPendingDelete, setCharacterPendingDelete] = useState<Character | undefined>()
  const [characterPendingEdit, setCharacterPendingEdit] = useState<Character | undefined>()

  useEffect(() => {
    if (!editing) {
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditing(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [editing])

  return (
    <MainSection title="Characters">
      <SectionTitle><Icons.Character/> Characters</SectionTitle>

      <Card sx={{ display: { xs: 'contents', md: 'flex' }, minWidth: { md: 800 }, minHeight: { md: 300 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <AddCharacterButton/>
          {characters.length > 0 && (
            <Button
              color={editing ? 'success' : 'neutral'}
              onClick={() => {
                setEditing(!editing)
              }}>
              {editing ? <Icons.Check/> : <Icons.Edit/>}
            </Button>
          )}
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2} justifyContent="center" p={4}>
          {characters
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((character) => (
              <ListItem key={character.key} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                  <CharacterCard character={character}/>
                  {editing && (
                    <Box sx={{
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                      gap: 2,
                      alignItems: 'center',
                      top: 2,
                      left: 2,
                      right: 2,
                      bottom: 2,
                      borderRadius: 8,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(1.5px)',
                    }}>
                      <Button color="primary" variant="outlined" onClick={() => {
                        setCharacterPendingEdit(character)
                      }}><Icons.Edit/></Button>
                      <Button color="danger" variant="outlined" onClick={() => {
                        setCharacterPendingDelete(character)
                      }}><Icons.Delete/></Button>
                    </Box>
                  )}
                </Box>
              </ListItem>
            ))}
        </Box>
      </Card>

      <DeleteCharacterModal character={characterPendingDelete} onClose={() => {
        setCharacterPendingDelete(undefined)
      }}/>

      <EditCharacterModal character={characterPendingEdit} onClose={() => {
        setCharacterPendingEdit(undefined)
      }}/>

    </MainSection>
  )
}

export default CharacterList
