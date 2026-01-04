import { FC } from 'react'
import { Mission } from 'coh-content-db'
import { Typography } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import MissionTooltip from '../mission/MissionTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const MissionLink: FC<{ value?: Mission | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const mission = typeof value === 'string' ? content.getMission(key) : value

  if (mission) {
    return (
      <MissionTooltip mission={mission}>
        <NavLink to={`/missions/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity" startDecorator={<Icons.Mission/>}>
            {mission.name}
          </Typography>
        </NavLink>
      </MissionTooltip>
    )
  } else {
    return (
      <Typography component="span" display="inline" className="entityLink" startDecorator={<Icons.Mission/>}>
        <ErrorText title="Unknown mission">{key ?? 'Unknown Mission'}</ErrorText>
      </Typography>
    )
  }
}

export default MissionLink
