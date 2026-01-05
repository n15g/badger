import { FC } from 'react'
import { MORALITY, MoralityList } from 'coh-content-db'
import { Stack, Tooltip } from '@mui/joy'
import MoralityIcon from './MoralityIcon.tsx'
import { MoralityLabels } from './MoralityLabels.tsx'

const MoralityListIcons: FC<{ moralityList: MoralityList, iconSize?: number }> = ({ moralityList }) => {
  return (
    <Stack direction="row" gap={0.5}>
      {MORALITY.map(morality => (
        <Tooltip key={morality} title={`${moralityList.has(morality) ? '✅' : '❌'} ${MoralityLabels.get(morality)}`}>
          <MoralityIcon morality={morality} muted={!moralityList.has(morality)} style={{ height: '1em' }}/>
        </Tooltip>
      ))}
    </Stack>
  )
}
export default MoralityListIcons
