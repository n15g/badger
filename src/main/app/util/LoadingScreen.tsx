import { FC } from 'react'
import icon from '../../resources/images/logo/badger.svg'
import { Box, Stack, Typography } from '@mui/joy'

const Init: FC<{ text: string, percent?: number }> = ({ text }) => {
  return (
    <Box
      className="running"
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        overflow: 'auto',
      }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={4} padding={2}>
        <img style={{ width: '64px', height: '64px' }}
             src={icon}
             className="ld ld-heartbeat"
             alt="Loading"/>
        <Stack direction="column" gap={1}>
          <Typography level="h3" textAlign={{ xs: 'center', sm: 'start' }}>Loading</Typography>
          <Typography>{text}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Init
