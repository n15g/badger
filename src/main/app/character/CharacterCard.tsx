import { FC } from 'react'
import { Card, Divider, Stack, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { Character } from './character.ts'
import ContentProvider from '../content/ContentProvider.tsx'
import ArchetypeIcon from './ArchetypeIcon.tsx'
import BadgeCount from './BadgeCount.tsx'

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const content = ContentProvider.useContent()

  const { name, archetypeKey, server } = character
  const archetype = content.getArchetype(archetypeKey)

  return (
    <NavLink to={`/characters/${character.key}`}>
      <Card sx={{ width: 280, flexDirection: 'row', alignItems: 'center', gap: 2, py: 1 }}>
        {archetype && <ArchetypeIcon archetype={archetype} width={32}/>}

        <Stack sx={{ overflowX: 'hidden', flexGrow: 1 }}>
          <Typography level="title-lg"
                      sx={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}
                      title={name}>
            {name}
          </Typography>

          {server && (
            <Typography level="title-sm"
                        sx={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}
                        title={server}>
              <em>{server}</em>
            </Typography>
          )}

          <Divider sx={{ my: 1 }}/>

          <Typography level="body-xs">
            <BadgeCount character={character}/>
          </Typography>
        </Stack>

      </Card>
    </NavLink>
  )
}

export default CharacterCard
