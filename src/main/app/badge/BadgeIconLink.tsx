import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import ErrorText from '../util/ErrorText.tsx'
import BadgeIcon from './BadgeIcon.tsx'

const BadgeIconLink: FC<{ value?: Badge | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const badge = typeof value === 'string' ? content.getBadge(key) : value

  if (badge) {
    return (
      <Tooltip title={<BadgeTooltip badge={badge}/>} variant="plain">
        <NavLink to={`/badges/${key}`}>
          <BadgeIcon badge={badge} height="1.2em"/>
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

export default BadgeIconLink
