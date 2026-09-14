import { useColorScheme } from '@mui/joy'
import { FC, ReactNode, useEffect } from 'react'

const SetTheme: FC<{ children: ReactNode, mode: 'dark' | 'light' }> = ({ children, mode }) => {
  const { setMode } = useColorScheme()
  useEffect(() => {
    setMode(mode)
  }, [mode, setMode])
  return children

}

export default SetTheme
