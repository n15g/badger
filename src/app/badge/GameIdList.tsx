import { FC, useState } from 'react'
import { Stack, styled, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { OriginBased } from 'coh-content-db'
import CopyNotification from '../util/CopyNotification.tsx'

const Sup = styled('sup')(() => ({ cursor: 'pointer' }))

const GameIdList: FC<{ value: OriginBased<string> }> = ({ value }) => {
  const [copyNotificationOpen, setCopyNotificationOpen] = useState(false)

  const { primal, praetorian } = value

  async function copyThumbtack(id: string) {
    await navigator.clipboard.writeText(id)
    setCopyNotificationOpen(true)
  }

  return (
    <>
      <Typography component="span"
                  level="body-sm"
                  title="SetTitle Id"
                  sx={{ fontStyle: 'italic' }}>
        <code>
          <Stack>
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
          </Stack>
        </code>
      </Typography>
      <CopyNotification open={copyNotificationOpen} onClose={() => {
        setCopyNotificationOpen(false)
      }}/>
    </>
  )
}

export default GameIdList
