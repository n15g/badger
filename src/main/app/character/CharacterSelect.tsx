import { FC } from 'react'
import { Option, Select, SelectProps, Stack, Typography } from '@mui/joy'
import { Character } from './character.ts'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'

const ServerSelect: FC<{
  value?: Character,
  characters?: Character[],
  onNewValue?: (value?: Character) => void,
} & Omit<SelectProps<Character, false>, 'options'>>
  = ({
       value,
       characters,
       onNewValue,
       ...props
     }) => {

  const { characters: dbCharacters } = CharacterDbProvider.useCharacterDb()
  characters ??= dbCharacters
  characters = characters.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Select placeholder="Character..."
            {...props}
            value={value ?? null}
            onChange={(_, value) => {
              onNewValue?.(value ?? undefined)
            }}>
      <Option value={null}>None</Option>
      {characters.map((character) => (
        <Option key={character.key}
                value={character}
                label={
                  <CharacterOption character={character}/>
                }>
          <CharacterOption character={character}/>
        </Option>
      ))}
    </Select>
  )
}

const CharacterOption: FC<{ character: Character }> = ({ character }) => {
  return <Stack direction="row" alignItems="center">
    <ArchetypeIcon archetypeKey={character.archetypeKey} style={{ height: '1.4em' }}/>
    <Stack sx={{ ml: 1, width: '10em', display: 'inline-flex' }}>
      <Typography component="span" level="title-sm"
                  sx={{ textOverflow: 'ellipsis', overflowX: 'hidden', textWrap: 'nowrap' }}>{character.name}</Typography>
      <Typography component="span" level="body-xs" textAlign="center">{character.server}</Typography>
    </Stack>
  </Stack>
}

export default ServerSelect
