import { FC, useState } from 'react'
import { styled, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { SetTitleIds } from 'coh-content-db'
import CopyNotification from '../util/CopyNotification.tsx'

const Sup = styled('sup')(() => ({ cursor: 'pointer' }))

const SetTitleLabel: FC<{ value: SetTitleIds }> = ({ value }) => {
  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)

  const { primal, praetorian } = value

  async function copyThumbtack(id: number) {
    await navigator.clipboard.writeText(`/settitle ${id}`)
    setCopyNotificationOpen(true)
  }

  return (
    <>
      <Typography component="span"
                  level="body-sm"
                  title="SetTitle Id"
                  sx={{ fontStyle: 'italic' }}
                  startDecorator={<Icons.SetTitle/>}>
        <code>
          /settitle
          <Typography sx={{ pl: 1 }}>
            {primal}
            <Sup onClick={() => {
              void copyThumbtack(primal)
            }}>
              <Icons.Copy/>
            </Sup>
          </Typography>

          {praetorian && (
            <Typography className="morality praetorian" sx={{ pl: 1 }} title="Praetorian SetTitle Id">
              {praetorian}
              <Sup onClick={() => {
                void copyThumbtack(praetorian)
              }}>
                <Icons.Copy/>
              </Sup>
            </Typography>
          )}
        </code>
      </Typography>
      <CopyNotification open={copyNotificationOpen} onClose={() => {
        setCopyNotificationOpen(false)
      }}/>
    </>
  )
}

export default SetTitleLabel
