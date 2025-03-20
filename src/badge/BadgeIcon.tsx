import { FC } from 'react'
import { Alignment, Badge, Sex } from 'coh-content-db'
import { Box, Stack, Tooltip } from '@mui/joy'
import { VscWorkspaceUnknown } from 'react-icons/vsc'
import DropShadowImage from '../util/DropShadowImage.tsx'
import ContentService from '../ContentService.ts'

const BadgeIcon: FC<{ badge: string | Badge, alignment?: Alignment, sex?: Sex }> = ({ badge, alignment, sex }) => {

  let actualBadge: Badge | undefined

  try {
    actualBadge = typeof badge === 'string'
      ? ContentService.db.getBadge(badge)
      : badge
  } catch {
    const key = typeof badge === 'string' ? badge : badge.key
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip title={`Unknown badge: ${key}`}>
          <VscWorkspaceUnknown size="48"/>
        </Tooltip>
      </Box>
    )
  }

  if (sex || alignment) {
    const href = actualBadge.icon.getValue(alignment, sex)

    return (
      <Tooltip title={actualBadge.name.getValue(alignment, sex)}>
        <DropShadowImage src={href} alt="Badge icon"/>
      </Tooltip>
    )
  }

  return (
    <Stack direction="column" gap={1}>
      {actualBadge.icon.canonical.map((icon) => (
        <Tooltip key={`${icon.alignment ?? ''}:${icon.sex ?? ''}`} title={actualBadge.name.getValue(icon.alignment, icon.sex)}>
          <DropShadowImage src={icon.value} alt={actualBadge.name.getValue(icon.alignment, icon.sex)}/>
        </Tooltip>
      ))}
    </Stack>
  )
}
export default BadgeIcon
