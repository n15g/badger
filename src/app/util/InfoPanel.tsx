import { FC, ReactNode } from 'react'
import { Card } from '@mui/joy'

const InfoPanel: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Card sx={{
      minWidth: { xs: 240, md: 320 },
      maxWidth: { md: 320 },
      alignItems: 'center',
      gap: 2,
    }}>
      {children}
    </Card>
  )
}

export default InfoPanel
