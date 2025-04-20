import { Card } from '@mui/joy'
import { FC, ReactNode } from 'react'

const SetTheme: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Card sx={{ minWidth: 1024 }}>
      {children}
    </Card>
  )
}

export default SetTheme
