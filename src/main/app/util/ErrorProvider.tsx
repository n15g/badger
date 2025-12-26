import { createContext, FC, ReactNode, use, useCallback, useState } from 'react'
import { IconButton, Snackbar } from '@mui/joy'
import { errorToMeatspace } from './error-to-meatspace.ts'
import { Icons } from './Icons.tsx'

type ErrorFunc = (err: unknown) => void

const ErrorContext = createContext<ErrorFunc | undefined>(undefined)

const ErrorProvider: FC<{ children: ReactNode }> & { useError: () => ErrorFunc } =
  ({ children }) => {
    const [errorStr, setErrorStr] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)

    const error = useCallback((err: unknown) => {
      console.error(err)
      setOpen(false)
      setErrorStr(errorToMeatspace(err))
      setOpen(true)
    }, [])

    return (
      <ErrorContext value={error}>
        {children}
        <Snackbar open={open}
                  color="danger"
                  variant="soft"
                  autoHideDuration={4000}
                  onClose={() => {
                    setOpen(false)
                  }}
                  endDecorator={
                    <IconButton
                      color="danger"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      <Icons.Cross/>
                    </IconButton>
                  }>
          {errorStr}
        </Snackbar>
      </ErrorContext>
    )
  }

ErrorProvider.useError = (): ErrorFunc => {
  const context = use(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

export default ErrorProvider
