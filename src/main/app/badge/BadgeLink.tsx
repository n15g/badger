import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import ErrorText from '../util/ErrorText.tsx'

const BadgeLink: FC<{ value: Badge | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value.key
  const entity = typeof value === 'string' ? content.getBadge(key) : value

  if (entity) {
    return (
      <Tooltip placement="top" title={<BadgeTooltip badge={entity}/>}>
        <NavLink to={`/badge/${key}`} className="entityLink">
          <BadgeNameInline badge={entity}/> <Icons.Badge/>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown badge">{key}</ErrorText> <Icons.Badge/>
      </span>
    )
  }
}

export default BadgeLink
