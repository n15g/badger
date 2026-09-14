import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'
import BadgeTooltip from './BadgeTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import ErrorText from '../util/ErrorText.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'

const BadgeLink: FC<{ value?: Badge | string }> = ({ value }) => {
  const content = ContentProvider.useContent()
  const { character } = CharacterContextProvider.useCharacterContext()

  const key = typeof value === 'string' ? value : value?.key
  const badge = typeof value === 'string' ? content.getBadge(key) : value

  const linkTarget = !character ? `/badges/${key}` : `/characters/${character.key}/badges/${key}`

  if (badge) {
    return (
      <BadgeTooltip badge={badge}>
        <NavLink to={linkTarget} className="entityLink">
          <Typography component="span" display="inline" className="entity"
                      startDecorator={<BadgeIcon badge={badge} style={{ height: '0.9em' }}/>}>
            <BadgeNameInline badge={badge}/>
          </Typography>
        </NavLink>
      </BadgeTooltip>
    )
  } else {
    return (
      <Typography component="span" display="inline" className="entityLink" startDecorator={<Icons.Badge/>}>
        <ErrorText title="Unknown badge">{key ?? 'Unknown Badge'}</ErrorText>
      </Typography>
    )
  }
}

export default BadgeLink
