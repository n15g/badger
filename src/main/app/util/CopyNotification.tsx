import { FC } from 'react'
import { IconButton, Snackbar } from '@mui/joy'
import { Icons } from './Icons.tsx'

const CopyNotification: FC<{ open: boolean, onClose?: () => void }> = ({ open = false, onClose = () => void 0 }) => {
  return (
    <Snackbar open={open}
              color="success"
              variant="soft"
              autoHideDuration={2000}
              onClose={onClose}
              endDecorator={
                <IconButton onClick={onClose}>
                  <Icons.Cross/>
                </IconButton>
              }>
      Copied to clipboard!
    </Snackbar>
  )
}

export default CopyNotification
