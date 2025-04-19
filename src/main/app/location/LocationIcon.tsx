import { FC } from 'react'
import { Box, Tooltip, Typography, useTheme } from '@mui/joy'
import { LocationIcon } from 'coh-content-db'

import badgeIcon from '../../resources/images/icon/location-badge.svg'
import plaqueIcon from '../../resources/images/icon/location-plaque.svg'
import pedestalIcon from '../../resources/images/icon/location-pedestal.svg'
import objectIcon from '../../resources/images/icon/location-object.svg'
import DropShadowImage from '../util/DropShadowImage.tsx'

const LocationInfo: FC<{ icon?: LocationIcon, text?: string, size?: number }>
  = ({ icon, text, size = 32 }) => {
  const theme = useTheme()
  const type = {
    'badge': ['Badge', badgeIcon],
    'plaque': ['Plaque', plaqueIcon],
    'pedestal': ['Pedestal', pedestalIcon],
    'object': ['Clicky', objectIcon],
  }[icon ?? 'object']

  return (
    <Tooltip title={type[0]}>
      <Box position="relative" minWidth={size} width={size}>
        <DropShadowImage src={type[1]} shadowSize="3px" alt={type[0]} width="100%" height="100%"/>

        <Typography
          level="body-sm"
          position="absolute"
          top="45%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            fontWeight: 'bold',
            color: theme.palette.common.black,
            textShadow: `0 0 4px ${theme.palette.common.white}`,
          }}>
          {text}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export default LocationInfo
