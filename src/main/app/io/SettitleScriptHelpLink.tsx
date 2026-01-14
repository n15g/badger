import { FC, useMemo, useState } from 'react'
import { Alert, Link, LinkProps, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { startDownload } from './download.ts'

const SettitleScriptHelpLink: FC<LinkProps>
  = ({ ...props }) => {

  const settitleString = useMemo(() => {
    let result = ''

    for (let i = 0; i < 3000; i++) {
      if (i % 50 === 0) {
        result += `${i !== 0 ? '\n' : ''}settitle 0`
      }
      result += `$$settitle ${i + 1}`
    }

    return result
  }, [])


  const [open, setOpen] = useState(false)

  return (<>
    <Link
      target="_blank"
      endDecorator={<Icons.Help/>}
      {...props}
      onClick={() => {
        setOpen(true)
      }}
    >
      Settitle Script
    </Link>
    {open && (<Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <ModalDialog sx={{ overflowY: 'scroll' }}>
          <ModalClose/>
          <Typography level="title-lg">Uploading <code>/settitle</code> chat logs</Typography>
          <Typography level="body-sm">
            You can import characters into badger by using a slash command in-game to write a list of your owned badges to the game's chat
            logs, and then upload those logs for Badger to parse.
          </Typography>

          <Typography level="h4">Step 1: Download script</Typography>
          <Typography level="body-sm">
            Save the <Link variant="outlined" onClick={() => {
            startDownload(new Blob([settitleString]), 'settitle.txt')
          }} download="settitle.txt" target="_blank" rel="noopener"
                           endDecorator={<Icons.Download/>}>
            settitle.txt </Link> script file to the following directory:
          </Typography>
          <Typography color="primary"><code>%CoHDirectory%/settings/live</code></Typography>

          <Typography level="h4">Step 2: Enable chat logging</Typography>
          <Typography level="body-sm">
            Chat logging is not enabled by default, and needs to be enabled individually on each character you wish to upload:
          </Typography>
          <Typography level="body-sm">
            <code>
              <Typography color="primary">Options</Typography>
              {' > '}
              <Typography color="primary">Windows</Typography>
              {' > '}
              <Typography color="primary">Chat</Typography>
              {' > '}
              <Typography color="primary">Log Chat</Typography>
            </code>
          </Typography>

          <Typography level="h4">Step 3: Run the settitle script</Typography>
          <Alert color="primary" variant="outlined" startDecorator={<Icons.Info/>}>
            <Typography level="body-xs">
              If you've only just enabled chat logging on this character, you will need to log out and in again to log the server welcome
              message or Badger will not be able to identify your character.
            </Typography>
          </Alert>
          <Typography level="body-sm">
            Run the `settitle.txt` script to write badge names to the chat log:
          </Typography>
          <Typography color="primary">
            <code>/bind_load_file settitle.txt</code>
          </Typography>
          <Typography level="body-sm">
            or if you placed the file outside the settings folder:
          </Typography>
          <Typography color="primary">
            <code>/bind_load_file "Path/to/settitle.txt"</code>
          </Typography>

          <Typography level="h4">Step 4: Upload the chat logs</Typography>
          <Typography level="body-sm">
            Upload your chat logs to the character import tool:
          </Typography>
          <Typography color="primary">
            <code>%CohDirectory%/%username%/logs</code>
          </Typography>

        </ModalDialog>
      </Modal>
    )}
  </>)
}

export default SettitleScriptHelpLink
