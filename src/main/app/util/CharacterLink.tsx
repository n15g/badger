import { FC } from 'react'
import { Typography } from '@mui/joy'
import ErrorText from '../util/ErrorText.tsx'
import { NavLink } from 'react-router'
import { Character } from '../character/character.ts'
import CharacterTooltip from './CharacterTooltip.tsx'
import CharacterDbProvider from '../character/CharacterDbProvider.tsx'
import MoralityIcon from '../morality/MoralityIcon.tsx'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'
import { Icons } from './Icons.tsx'

const CharacterLink: FC<{ value: Character | string }> = ({ value }) => {
  const { characters } = CharacterDbProvider.useCharacterDb()

  const key = typeof value === 'string' ? value : value.key
  const character = typeof value === 'string' ? characters.find(x => x.key === value) : value

  if (character) {
    const { morality, archetypeKey } = character
    return (
      <CharacterTooltip character={character}>
        <NavLink to={`/characters/${key}`} className="entityLink">
          {morality && <MoralityIcon morality={morality} style={{ height: '1.1em', position: 'relative', top: 2, marginRight: '0.25em' }}/>}
          {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey} style={{ height: '1.1em', position: 'relative', top: 2 }}/>}

          <Typography component="span" display="inline" className="entity" sx={{ ml: 1 }}>
            {character.name}
          </Typography>
        </NavLink>
      </CharacterTooltip>
    )
  } else {
    return (
      <Typography component="span" display="inline" className="entityLink" startDecorator={<Icons.Character/>}>
        <ErrorText title="Unknown character">{key}</ErrorText>
      </Typography>
    )
  }
}

export default CharacterLink
