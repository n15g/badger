import { FC } from 'react'
import { Card, Divider, Stack, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { Character } from './character.ts'
import BadgeCount from './BadgeCount.tsx'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'
import MoralityIcon from '../morality/MoralityIcon.tsx'
import { Icons } from '../util/Icons.tsx'

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const { name, server, origin, morality, archetypeKey, sex } = character

  return (
    <NavLink to={`/characters/${character.key}`}>
      <Card
        color={origin === 'praetorian' ? 'warning' : 'primary'}
        sx={{ width: 280, flexDirection: 'row', alignItems: 'center', gap: 2, py: 1 }}>
        <Stack gap={1}>
          {morality && <MoralityIcon morality={morality} height={32}/>}
          {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey} height={32}/>}
        </Stack>

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

          <Stack direction="row" justifyContent="space-between">
            <Typography level="body-xs">
              <BadgeCount character={character}/>
            </Typography>
            <Typography
              level="body-xs"
              color={origin === 'praetorian' ? 'warning' : 'primary'}
              sx={{ filter: 'brightness(0.6)' }}>
              <em>{origin === 'praetorian' ? 'Praetorian' : 'Primal'}</em>

              <Typography sx={{ pl: 0.4 }}>{sex === 'F' ? <Icons.Female/> : <Icons.Male/>}</Typography>
            </Typography>
          </Stack>
        </Stack>

      </Card>
    </NavLink>
  )
}

export default CharacterCard
