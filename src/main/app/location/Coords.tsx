import { FC, useState } from 'react'
import { IconButton, Snackbar, styled, Typography } from '@mui/joy'
import { Coords } from 'coh-content-db'
import { Icons } from '../util/Icons.tsx'

const Code = styled('code')(() => ({ userSelect: 'all' }))
const Sup = styled('sup')(() => ({ cursor: 'pointer' }))

const LocationInfo: FC<{ coords: Coords }> = ({ coords }) => {
  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)

  async function copyThumbtack() {
    await navigator.clipboard.writeText(`/thumbtack ${coords[0].toFixed(1)} ${coords[1].toFixed(1)} ${coords[2].toFixed(1)}`)
    setCopyNotificationOpen(true)
  }

  return (
    <>
      <Typography level="body-xs">
        <Code>
          [{coords[0].toFixed(1)}, {coords[1].toFixed(1)}, {coords[2].toFixed(1)}]
          <Sup onClick={() => {
            void copyThumbtack()
          }}>
            <Icons.Copy/>
          </Sup>
        </Code>
      </Typography>
      <Snackbar open={copyNotificationOpen}
                color="success"
                variant="soft"
                autoHideDuration={2000}
                onClose={() => {
                  setCopyNotificationOpen(false)
                }}
                endDecorator={
                  <IconButton
                    onClick={() => {
                      setCopyNotificationOpen(false)
                    }}
                  >
                    <Icons.Cross/>
                  </IconButton>
                }>
        Copied to clipboard!
      </Snackbar>
    </>
  )
}

export default LocationInfo
