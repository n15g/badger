import { FC, ReactNode, useEffect, useState } from 'react'
import icon from './assets/images/logo/badger.svg'
import { Box, Typography } from '@mui/joy'
import ContentService from './ContentService.ts'

const Init: FC<{ children: ReactNode }> = (props) => {
  const [loaded, setLoaded] = useState(false)

  const [step, setStep] = useState('Reticulating Splines')

  useEffect(() => {
    setStep('Initializing DB')
    ContentService.init()
    setStep('Done')
    setLoaded(true)
  }, [])

  if (loaded) {
    return props.children
  } else {
    return (
      <Box
        className="running"
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100dvh',
          gap: 4,
          overflow: 'auto',
        }}>
        <img style={{ width: '64px', height: '64px' }}
             src={icon}
             className="ld ld-heartbeat"
             alt="Loading"/>
        <Typography level="h1">{step}...</Typography>
      </Box>
    )
  }
}

export default Init
