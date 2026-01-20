import { FC, useCallback, useState } from 'react'
import { Box, Button, Divider, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Typography } from '@mui/joy'
import BadgerSpinner from '../util/BadgerSpinner.tsx'
import ServerSelect from './ServerSelect.tsx'
import ArchetypeSelect from '../archetype/ArchetypeSelect.tsx'
import { CharacterOrigin, Sex } from 'coh-content-db'
import MoralitySelect from '../morality/MoralitySelect.tsx'
import { Character } from './character.ts'
import { Icons } from '../util/Icons.tsx'

const EditCharacterForm: FC<{
  character?: Partial<Character>,
  onSave?: (character: Partial<Character>) => Promise<void>
}>
  = ({ character, onSave }) => {

  const defaultState: Partial<Character> = {
    name: character?.name ?? '',
    server: character?.server ?? '',
    origin: character?.origin ?? 'primal',
    archetypeKey: character?.archetypeKey ?? 'blaster',
    morality: character?.morality ?? 'hero',
    sex: character?.sex ?? 'M'
  }
  const [characterState, setCharacterState] = useState(defaultState)
  const [saving, setSaving] = useState(false)

  const valid = characterState.name && characterState.name !== ''
    && characterState.server && characterState.server !== ''
    && characterState.archetypeKey && characterState.archetypeKey !== ''
    && characterState.morality

  const saveFn = useCallback(async () => {
    setSaving(true)
    await onSave?.(characterState)
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

        <Divider/>
        <RadioGroup value={characterState.origin} onChange={(e) => {
          setCharacterState({ ...characterState, origin: e.target.value as CharacterOrigin })
        }}>
          <Stack direction="row" justifyContent="space-between">
            <Radio
              color="primary"
              variant="solid"
              label={<Typography color="primary">Primal</Typography>}
              value="primal"/>
            <Radio
              color="warning"
              variant="solid"
              label={<Typography color="warning">Praetorian</Typography>}
              value="praetorian"/>
          </Stack>
        </RadioGroup>

        <FormControl>
          <FormLabel><Typography level="body-xs">Morality</Typography></FormLabel>
          <MoralitySelect
            required
            value={characterState.morality}
            onNewValue={(value) => {
              setCharacterState({ ...characterState, morality: value })
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

        <Divider/>

        <RadioGroup value={characterState.sex} onChange={(e) => {
          setCharacterState({ ...characterState, sex: e.target.value as Sex })
        }}>
          <Stack direction="row" justifyContent="space-between">
            <Radio label={<Typography endDecorator={<Icons.Male/>}>Male</Typography>} value="M"/>
            <Radio label={<Typography endDecorator={<Icons.Male/>}>Female</Typography>} value="F"/>
          </Stack>
        </RadioGroup>

        <Divider/>

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
