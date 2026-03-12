import { FC, ReactNode } from 'react'
import { Badge } from 'coh-content-db'
import { Box } from '@mui/joy'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'


const RequirementProgressOverlay: FC<{ badge: Badge, children: ReactNode }> = ({ badge, children }) => {
  const { character, hasBadge, getRequirementProgress } = CharacterContextProvider.useCharacterContext()

  const value = getRequirementProgress(badge)
  const owned = hasBadge(badge) || Math.abs(1 - value) <= Number.EPSILON

  let color = 'neutral.solidBg'
  if (owned) {
    color = 'success.solidBg'
  } else if (value > 0) {
    color = 'primary.solidBg'
  }

  return !character || (badge.requirements.length < 2) ? children : (
    <Box sx={{
      position: 'relative',
      pb: 0.5,

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        backgroundColor: 'background.level2',
        pointerEvents: 'none',
        borderRadius: '999px',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '2px',
        width: `${Math.max(value, 0.01) * 100}%`,
        backgroundColor: color,
        pointerEvents: 'none',
        borderRadius: '999px',
        transition: 'width 0.2s ease',
      },
    }}>
      {children}
    </Box>
  )
}

export default RequirementProgressOverlay
