import { IconButton } from '@mui/joy'
import { Icons } from './Icons.tsx'
import { NavLink } from 'react-router'

function SettingsButton() {
  return <IconButton
    component={NavLink}
    to="/settings"
    variant="outlined"
  >
    <Icons.Settings/>
  </IconButton>
}

export default SettingsButton
