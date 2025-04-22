import { FC, useState } from 'react'
import { Alignment, Badge, Sex } from 'coh-content-db'
import { Box, Stack, Tooltip } from '@mui/joy'
import DropShadowImage from '../util/DropShadowImage.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { Icons } from '../util/Icons.tsx'

const BadgeIcon: FC<{
  badge: string | Badge,
  default?: boolean
  alignment?: Alignment,
  sex?: Sex
}> = ({ badge, default: isDefault = false, alignment, sex }) => {
  const content = ContentProvider.useContent()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const badgeKey = typeof badge === 'string' ? badge : badge.key
  const badgeEntity = typeof badge === 'string' ? content.getBadge(badgeKey) : badge

  if (badgeEntity) {
    if (isDefault || sex || alignment) {
      const href = isDefault
        ? badgeEntity.icon.default?.value
        : badgeEntity.icon.getValue(alignment, sex)

      return (
        <Tooltip title={badgeEntity.name.getValue(alignment, sex)}>
          <Box>
            {!error && <DropShadowImage sx={{ display: loaded ? 'inline-block' : 'none' }}
                                        src={href}
                                        alt={badgeEntity.name.getValue(alignment, sex)}
                                        onLoad={() => {
                                          setLoaded(true)
                                        }}
                                        onError={() => {
                                          setError(true)
                                        }}/>}
            {!error && !loaded && <Icons.Spinner className="ld ld-spin" size={32}/>}
            {error && <Icons.Missing size={32}/>}
          </Box>
        </Tooltip>
      )
    }

    return (
      <Stack direction="row" gap={2} sx={{ justifyContent: 'center' }}>
        {badgeEntity.icon.canonical.map((icon) => (
          <Box key={`${icon.alignment ?? ''}:${icon.sex ?? ''}`} sx={{ display: 'flex' }}>
            <Tooltip title={badgeEntity.name.getValue(icon.alignment, icon.sex)}>
              <Box>
                {!error && <DropShadowImage sx={{ display: loaded ? 'inline-block' : 'none' }}
                                            src={icon.value}
                                            alt={badgeEntity.name.getValue(icon.alignment, icon.sex)}
                                            onLoad={() => {
                                              setLoaded(true)
                                            }}
                                            onError={() => {
                                              setError(true)
                                            }}/>}
                {!error && !loaded && <Icons.Spinner className="ld ld-spin" size={32}/>}
                {error && <Icons.Missing size={32}/>}
              </Box>
            </Tooltip>
          </Box>
        ))}
      </Stack>
    )
  } else {
    setLoaded(true)
    setError(true)
    const key = typeof badge === 'string' ? badge : badge.key
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip title={`Unknown badge: ${key}`}>
          <Icons.Badge size={48}/>
        </Tooltip>
      </Box>
    )
  }
}
export default BadgeIcon
