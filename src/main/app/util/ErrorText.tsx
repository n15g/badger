import { FC, ReactNode } from 'react'
import { Typography } from '@mui/joy'

const ErrorText: FC<{ title?: string, children: ReactNode }> = ({ title, children }) => {
  return (
    <Typography component="span" display="inline" color="danger" title={title}>
      {children}
    </Typography>
  )
}

export default ErrorText
