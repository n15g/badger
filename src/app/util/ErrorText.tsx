import { FC, ReactNode } from 'react'
import { Typography, TypographyProps } from '@mui/joy'

const ErrorText: FC<{ title?: string, children?: ReactNode } & TypographyProps> = ({ title, children, ...props }) => {
  return (
    <Typography component="span" display="inline" color="danger" title={title} {...props}>
      {children}
    </Typography>
  )
}

export default ErrorText
