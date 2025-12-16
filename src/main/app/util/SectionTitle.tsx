import { FC, ReactNode } from 'react'
import { Typography } from '@mui/joy'

const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Typography level="h3" textAlign="center" sx={{ mb: 2 }}>
      {children}
    </Typography>
  )
}

export default SectionTitle
