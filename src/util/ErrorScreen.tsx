import { FC } from 'react'
import { Alert, Box } from '@mui/joy'
import { errorToMeatspace } from './error-to-meatspace.ts'
import { CiWarning } from 'react-icons/ci'

const Init: FC<{ error: unknown }> = ({ error }) => {
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
      <Alert color="danger" variant="soft" startDecorator={<CiWarning size="2rem"/>}>
        {errorToMeatspace(error)}
      </Alert>
    </Box>
  )
}

export default Init
