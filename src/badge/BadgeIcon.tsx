import { FC, useState } from 'react'
import { Alignment, Badge, Sex } from 'coh-content-db'
import { Box, Stack, Tooltip } from '@mui/joy'
import { VscWorkspaceUnknown } from 'react-icons/vsc'
import DropShadowImage from '../util/DropShadowImage.tsx'
import ContentService from '../ContentService.ts'
import { FaSpinner } from 'react-icons/fa'
import { GrDocumentMissing } from 'react-icons/gr'

const BadgeIcon: FC<{ badge: string | Badge, alignment?: Alignment, sex?: Sex }> = ({ badge, alignment, sex }) => {
  let actualBadge: Badge | undefined
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  try {
    actualBadge = typeof badge === 'string'
      ? ContentService.db.getBadge(badge)
      : badge
  } catch {
    setLoaded(true)
    setError(true)
    const key = typeof badge === 'string' ? badge : badge.key
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip title={`Unknown badge: ${key}`}>
          <VscWorkspaceUnknown size={48}/>
        </Tooltip>
      </Box>
    )
  }

  if (sex || alignment) {
    const href = actualBadge.icon.getValue(alignment, sex)

    return (
      <Tooltip title={actualBadge.name.getValue(alignment, sex)}>
        <Box>
          {!error && <DropShadowImage sx={{ display: loaded ? 'inline-block' : 'none' }}
                                      src={href}
                                      alt={actualBadge.name.getValue(alignment, sex)}
                                      onLoad={() => {
                                        setLoaded(true)
                                      }}
                                      onError={() => {
                                        setError(true)
                                      }}/>}
          {!error && !loaded && <FaSpinner className="ld ld-spin" size={32}/>}
          {error && <GrDocumentMissing size={32}/>}
        </Box>
      </Tooltip>
    )
  }

  return (
    <Stack direction="row" gap={2} sx={{ justifyContent: 'center' }}>
      {actualBadge.icon.canonical.map((icon) => (
        <Box key={`${icon.alignment ?? ''}:${icon.sex ?? ''}`} sx={{ display: 'flex' }}>
          <Tooltip title={actualBadge.name.getValue(icon.alignment, icon.sex)}>
            <Box>
              {!error && <DropShadowImage sx={{ display: loaded ? 'inline-block' : 'none' }}
                                          src={icon.value}
                                          alt={actualBadge.name.getValue(icon.alignment, icon.sex)}
                                          onLoad={() => {
                                            setLoaded(true)
                                          }}
                                          onError={() => {
                                            setError(true)
                                          }}/>}
              {!error && !loaded && <FaSpinner className="ld ld-spin" size={32}/>}
              {error && <GrDocumentMissing size={32}/>}
            </Box>
          </Tooltip>
        </Box>
      ))}
    </Stack>
  )
}
export default BadgeIcon
