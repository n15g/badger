import { FC, ReactElement } from 'react'
import { Card, CardOverflow, Divider, Stack, Tooltip, TooltipProps, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { Character } from '../character/character.ts'
import MoralityIcon from '../morality/MoralityIcon.tsx'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'
import BadgeCount from '../character/BadgeCount.tsx'
import { Icons } from './Icons.tsx'

const CharacterTooltip: FC<{ character: Character, children: ReactElement } & Omit<TooltipProps, 'title'>>
  = ({ character, children, ...props }) => {
  const { name, server, morality, archetypeKey } = character

  const content = (
    <Card variant="plain" sx={{ minWidth: 280, maxWidth: 320, alignItems: 'center' }}>
      <CardOverflow sx={{ alignItems: 'center' }}>
        <Typography level="title-sm" startDecorator={<Icons.Character/>} sx={{ p: 1 }}>
          Character
        </Typography>
        <Divider inset="context"/>
      </CardOverflow>

      <NavLink to={`/characters/${character.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography textAlign="center" level="title-lg">{name}</Typography>
      </NavLink>
      <Typography textAlign="center" level="title-sm">{server}</Typography>

      <Stack direction="row" gap={1}>
        {morality && <MoralityIcon morality={morality} height={32}/>}
        {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey} height={32}/>}
      </Stack>

      <BadgeCount character={character}/>

    </Card>
  )

  return (
    <Tooltip {...props} title={content} variant="outlined" enterDelay={500} enterNextDelay={500} sx={{ p: 0 }}>
      {children}
    </Tooltip>
  )
}

export default CharacterTooltip
