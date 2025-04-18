import { FC, useState } from 'react'
import ZoneLink from '../zone/ZoneLink.tsx'
import { IconButton, Snackbar, Stack, styled } from '@mui/joy'
import { Location } from 'coh-content-db'
import { BiCopy } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'

const Code = styled('code')(() => ({ userSelect: 'all' }))
const Sup = styled('sup')(() => ({ cursor: 'pointer' }))

const LocationInfo: FC<{ location?: Location }> = ({ location }) => {
  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)

  async function copyThumbtack() {
    const coords = location?.coords ?? [0, 0, 0]
    await navigator.clipboard.writeText(`/thumbtack ${coords[0].toFixed(1)} ${coords[1].toFixed(1)} ${coords[2].toFixed(1)}`)
    setCopyNotificationOpen(true)
  }

  return (
    <Stack direction="row" gap={1}>
      {location?.zoneKey && <ZoneLink zone={location.zoneKey}/>}
      {location?.coords && (
        <Stack direction="row">
          <Code>[{location.coords[0].toFixed(1)}, {location.coords[1].toFixed(1)}, {location.coords[2].toFixed(1)}]
            <Sup onClick={() => {
              void copyThumbtack()
            }}>
              <BiCopy/>
            </Sup>
          </Code>
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
                        <CgClose/>
                      </IconButton>
                    }>
            Copied to clipboard!
          </Snackbar>
        </Stack>
      )}
    </Stack>
  )
}

export default LocationInfo
