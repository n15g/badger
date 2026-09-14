import { FC } from 'react'
import { Alert, Box } from '@mui/joy'
import { errorToMeatspace } from './error-to-meatspace.ts'
import { Icons } from './Icons.tsx'

const ErrorPage: FC<{ error: unknown }> = ({ error }) => {
  console.error("An error occurred", error)
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        gap: 4,
        overflow: 'auto',
      }}>
      <Alert color="danger" variant="soft" startDecorator={<Icons.Alert size="2rem"/>}>
        {errorToMeatspace(error)}
      </Alert>
    </Box>
  )
}

export default ErrorPage
