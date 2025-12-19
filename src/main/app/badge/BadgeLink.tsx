import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Tooltip, Typography } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import ErrorText from '../util/ErrorText.tsx'
import BadgeIcon from './BadgeIcon.tsx'

const BadgeLink: FC<{ value?: Badge | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const badge = typeof value === 'string' ? content.getBadge(key) : value

  if (badge) {
    return (
      <Tooltip title={<BadgeTooltip badge={badge}/>}>
        <NavLink to={`/badges/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity"
                      startDecorator={<BadgeIcon badge={badge} height="0.9em"/>}
                      endDecorator={<Icons.Badge/>}>
            <BadgeNameInline badge={badge}/>
          </Typography>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown badge">{key ?? 'Unknown Badge'}</ErrorText> <Icons.Badge/>
      </span>
    )
  }
}

export default BadgeLink
