import { FC, ImgHTMLAttributes } from 'react'
import { Badge, VariantContext } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import ErrorText from '../util/ErrorText.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'

const BadgeIconLink: FC<{ value?: Badge | string, context?: VariantContext, muted?: boolean } & ImgHTMLAttributes<HTMLImageElement>>
  = ({ value, context, ...props }) => {
  const content = ContentProvider.useContent()
  const { character } = CharacterContextProvider.useCharacterContext()

  const key = typeof value === 'string' ? value : value?.key
  const badge = typeof value === 'string' ? content.getBadge(key) : value

  const linkTarget = !character ? `/badges/${key}` : `/characters/${character.key}/badges/${key}`

  if (badge) {
    return (
      <Tooltip title={<BadgeTooltip badge={badge}/>} variant="plain">
        <NavLink to={linkTarget}>
          <BadgeIcon badge={badge} context={context} {...props}/>
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
