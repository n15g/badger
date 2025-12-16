import { FC } from 'react'
import { Mission } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import MissionTooltip from '../mission/MissionTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const MissionLink: FC<{ value: Mission | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value.key
  const mission = typeof value === 'string' ? content.getMission(key) : value

  if (mission) {
    return (
      <Tooltip placement="top" title={<MissionTooltip mission={mission}/>}>
        <NavLink to={`/missions/${key}`} className="entityLink">
          <span className="entity">{mission.name}</span> <Icons.Mission/>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown mission">{key}</ErrorText> <Icons.Mission/>
      </span>
    )
  }
}

export default MissionLink
