import { FC } from 'react'
import { Mission } from 'coh-content-db'
import { Tooltip, Typography } from '@mui/joy'
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
      <Tooltip title={<MissionTooltip mission={mission}/>} variant="plain">
        <NavLink to={`/missions/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity" endDecorator={<Icons.Mission/>}>
            {mission.name}
          </Typography>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown mission">{key ?? 'Unknown Mission'}</ErrorText> <Icons.Mission/>
      </span>
    )
  }
}

export default MissionLink
