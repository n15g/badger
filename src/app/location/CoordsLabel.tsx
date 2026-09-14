import { FC, useState } from 'react'
import { styled } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import CopyNotification from '../util/CopyNotification.tsx'
import { Coords } from 'coh-content-db'

const Code = styled('code')(() => ({ userSelect: 'all' }))
const Sup = styled('sup')(() => ({ cursor: 'pointer' }))

const CoordsLabel: FC<{ coords: Coords }> = ({ coords }) => {
  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)

  async function copyThumbtack() {
    await navigator.clipboard.writeText(`/thumbtack ${coords[0].toFixed(1)} ${coords[1].toFixed(1)} ${coords[2].toFixed(1)}`)
    setCopyNotificationOpen(true)
  }

  return (
    <span>
        <Code sx={{fontSize: '0.7em'}}>
          [{coords[0].toFixed(1)}, {coords[1].toFixed(1)}, {coords[2].toFixed(1)}]
          <Sup onClick={() => {
            void copyThumbtack()
          }}>
            <Icons.Copy/>
          </Sup>
        </Code>
      <CopyNotification open={copyNotificationOpen} onClose={() => {
        setCopyNotificationOpen(false)
      }}/>
    </span>
  )
}

export default CoordsLabel
