import { Box, Button, Card, Divider, ListItem, Typography } from '@mui/joy'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'
import { FC, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import CharacterCard from './CharacterCard.tsx'
import DeleteCharacterModal from './DeleteCharacterModal.tsx'
import EditCharacterModal from './EditCharacterModal.tsx'
import AddCharacterModal from './AddCharacterModal.tsx'
import ImportCharactersButton from '../io/ImportCharactersButton.tsx'
import DownloadCharactersButton from '../io/DownloadCharactersButton.tsx'

const CharacterListPage: FC<{ characters: Character[] }> = ({ characters }) => {
  const [editing, setEditing] = useState(false)
  const [addCharacterOpen, setAddCharacterOpen] = useState(false)
  const [characterPendingDelete, setCharacterPendingDelete] = useState<Character | undefined>()
  const [characterPendingEdit, setCharacterPendingEdit] = useState<Character | undefined>()

  const groups = useMemo(() => {
    return characters
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce<Partial<Record<string, Character[]>>>((acc, character) => {
        (acc[character.server ?? '- Unknown -'] ??= []).push(character)
        return acc
      }, {})
  }, [characters])

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

      <Card sx={{ display: { xs: 'contents', md: 'flex' }, minWidth: { md: 800 }, minHeight: { md: 340 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            color="success"
            onClick={() => {
              setAddCharacterOpen(true)
            }}>
            <Icons.Plus/> Add Character
          </Button>
          <ImportCharactersButton/>
          {characters.length > 0 && (<>
            <DownloadCharactersButton
              characters={characters}
            />
            <Button
              color={editing ? 'success' : 'primary'}
              onClick={() => {
                setEditing(!editing)
              }}>
              {editing ? <Icons.Check/> : <Icons.Edit/>}
            </Button>
          </>)}
        </Box>
        {Object.entries(groups).map(([server, list = []]) => (
          <section key={server}>
            <Typography level="h3">{server}</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2} justifyContent="flex-start" p={4}>

              {list.map((character) => (
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
                        <Button color="danger" variant="solid" onClick={() => {
                          setCharacterPendingDelete(character)
                        }}><Icons.Delete/></Button>

                        <DownloadCharactersButton characters={[character]}/>

                        <Button color="primary" variant="solid" onClick={() => {
                          setCharacterPendingEdit(character)
                        }}><Icons.Edit/></Button>
                      </Box>
                    )}
                  </Box>
                </ListItem>
              ))}

            </Box>
            <Divider/>
          </section>
        ))}
      </Card>

      <AddCharacterModal open={addCharacterOpen} onClose={() => {
        setAddCharacterOpen(false)
      }}/>

      <DeleteCharacterModal character={characterPendingDelete} onClose={() => {
        setCharacterPendingDelete(undefined)
      }}/>

      <EditCharacterModal character={characterPendingEdit} onClose={() => {
        setCharacterPendingEdit(undefined)
      }}/>

    </MainSection>
  )
}

export default CharacterListPage
