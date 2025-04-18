import { useColorScheme } from '@mui/joy'
import { FC, ReactNode } from 'react'

const SetTheme: FC<{ children: ReactNode, mode: 'dark' | 'light' }> = ({ children, mode }) => {
  const { setMode } = useColorScheme()
  setMode(mode)
  return children

}

export default SetTheme
