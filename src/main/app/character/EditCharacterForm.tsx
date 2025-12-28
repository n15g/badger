import { FC, useCallback, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy'
import BadgerSpinner from '../util/BadgerSpinner.tsx'
import ServerSelect from './ServerSelect.tsx'
import ArchetypeSelect from '../archetype/ArchetypeSelect.tsx'

interface CharacterData {
  name: string,
  server?: string,
  archetypeKey?: string
}

const EditCharacterForm: FC<{ character?: CharacterData, onSave: (character: CharacterData) => Promise<void> }>
  = ({ character, onSave }) => {

  const defaultState: CharacterData = {
    name: character?.name ?? '',
    server: character?.server ?? '',
    archetypeKey: character?.archetypeKey ?? 'blaster'
  }
  const [characterState, setCharacterState] = useState(defaultState)
  const [saving, setSaving] = useState(false)

  const valid = characterState.name && characterState.name !== ''
    && characterState.server && characterState.server !== ''
    && characterState.archetypeKey && characterState.archetypeKey != ''

  const saveFn = useCallback(async () => {
    setSaving(true)
    await onSave(characterState)
    setSaving(false)
  }, [characterState, onSave])

  return (
    <Box sx={{ width: 300 }}>
      <Stack gap={2}>

        <FormControl>
          <FormLabel><Typography level="body-xs">Name</Typography></FormLabel>
          <Input
            required
            value={characterState.name}
            onChange={(e) => {
              setCharacterState({ ...characterState, name: e.target.value })
            }}
            disabled={saving}
          />
        </FormControl>

        <FormControl>
          <FormLabel><Typography level="body-xs">Server</Typography></FormLabel>
          <ServerSelect
            required
            value={characterState.server}
            onNewValue={(value) => {
              setCharacterState({ ...characterState, server: value })
            }}
            disabled={saving}
          />
        </FormControl>


        <FormControl>
          <FormLabel><Typography level="body-xs">Archetype</Typography></FormLabel>
          <ArchetypeSelect
            required
            value={characterState.archetypeKey}
            onNewValue={(value) => {
              setCharacterState({ ...characterState, archetypeKey: value })
            }}
            disabled={saving}
          />
        </FormControl>

        <Button
          disabled={!valid || saving}
          onClick={() => void saveFn()}>
          {saving ? <BadgerSpinner style={{ height: '1.2em' }}/> : <>Save</>}
        </Button>
      </Stack>
    </Box>
  )
}

export default EditCharacterForm
