import { IconButton, useColorScheme } from '@mui/joy'

function PaletteButton() {
  const { mode, systemMode, setMode } = useColorScheme()
  const current = systemMode ?? mode

  return <IconButton
    variant="outlined"
    onClick={() => {
      setMode(current === 'light' ? 'dark' : 'light')
    }}
  >
    {current === 'light' && '☀️'}
    {current === 'dark' && '☾'}
  </IconButton>
}

export default PaletteButton
