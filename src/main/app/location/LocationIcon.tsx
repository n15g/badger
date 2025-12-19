import { FC } from 'react'
import { Stack, Tooltip, Typography, useTheme } from '@mui/joy'
import { LocationIcon as DbLocationIcon } from 'coh-content-db'

import badgeIcon from '../../resources/images/icon/location-badge.svg'
import plaqueIcon from '../../resources/images/icon/location-plaque.svg'
import pedestalIcon from '../../resources/images/icon/location-pedestal.svg'
import objectIcon from '../../resources/images/icon/location-object.svg'
import DropShadowImage from '../util/DropShadowImage.tsx'

const LocationIcon: FC<{ icon?: DbLocationIcon, text?: string, height?: number | string }>
  = ({ icon, text }) => {
  const theme = useTheme()
  const type = {
    'badge': ['Badge', badgeIcon],
    'plaque': ['Plaque', plaqueIcon],
    'pedestal': ['Pedestal', pedestalIcon],
    'object': ['Clicky', objectIcon],
  }[icon ?? 'object']

  return (
    <Tooltip title={type[0]}>
      <Stack position="relative" sx={{ height: '1.2em', top: '0.2em' }}>
        <DropShadowImage src={type[1]} shadowSize="3px" alt={type[0]} width="100%" height="100%"/>

        <Typography
          level="body-sm"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            fontWeight: 'bold',
            fontSize: '0.6em',
            color: theme.palette.common.black,
            textShadow: `0 0 4px ${theme.palette.common.white}`,
          }}>
          {text}
        </Typography>
      </Stack>
    </Tooltip>
  )
}

export default LocationIcon
