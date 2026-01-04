import { FC, ImgHTMLAttributes, useCallback, useState } from 'react'
import { Badge, VariantContext } from 'coh-content-db'
import { Box, Tooltip } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import Spinner from '../util/Spinner.tsx'

const BadgeIconButton: FC<{
  badge: Badge,
  context?: VariantContext,
  value?: boolean,
  onFrobnicate?: (value: boolean) => Promise<void>
} & ImgHTMLAttributes<HTMLImageElement>>
  = ({ badge, context, value, onFrobnicate, ...props }) => {

  const [innerValue, setInnerValue] = useState(value ?? false)
  const [loading, setLoading] = useState(false)

  const frobnicate = useCallback(async () => {
    if (loading) {
      return
    }

    setLoading(true)
    const next = !innerValue

    try {
      await onFrobnicate?.(next)
      setInnerValue(next)
    } finally {
      setLoading(false)
    }
  }, [innerValue, loading, onFrobnicate])

  return (
    <Tooltip title={<BadgeTooltip badge={badge}/>} variant="plain" enterDelay={500} enterNextDelay={500}>
      <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => void frobnicate()}>
        <BadgeIcon
          {...props}
          badge={badge}
          context={context}
          muted={!innerValue}
        />
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Spinner/>
          </Box>
        )}
      </Box>
    </Tooltip>
  )
}

export default BadgeIconButton
