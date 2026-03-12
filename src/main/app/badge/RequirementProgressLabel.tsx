import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'


const RequirementProgressOverlay: FC<{ badge: Badge }> = ({ badge }) => {
  const { character, hasBadge, getRequirementProgress } = CharacterContextProvider.useCharacterContext()

  const { percent, current, total } = getRequirementProgress(badge)
  const owned = hasBadge(badge) || percent === 100

  return character && (
    <Typography style={{ fontVariantNumeric: 'tabular-nums' }}>
      Progress {owned ? 100 : percent}% ({current} / {total})
    </Typography>
  )
}

export default RequirementProgressOverlay
