import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Stack, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'

const disabled: SxProps = { userSelect: 'none', opacity: 0.2 }

const BadgeAlignment: FC<{ badge: Badge }> = ({ badge }) => {
  return (
    <Stack direction="row" gap={1}>
      <Typography title="Hero" sx={badge.alignment.hero ? { color: 'var(--alignment-hero)' } : disabled}>H</Typography>
      <Typography sx={disabled}>/</Typography>
      <Typography title="Villain" sx={badge.alignment.villain ? { color: 'var(--alignment-villain)' } : disabled}>V</Typography>
      <Typography sx={disabled}>/</Typography>
      <Typography title="Praetorian" sx={badge.alignment.praetorian ? { color: 'var(--alignment-praetorian)' } : disabled}>P</Typography>
    </Stack>
  )
}
export default BadgeAlignment
