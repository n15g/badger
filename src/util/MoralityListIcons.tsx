import { FC } from 'react'
import { MoralityList } from 'coh-content-db'
import { Stack, Tooltip } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import heroIcon from '../assets/images/icon/morality-hero.png'
import vigilanteIcon from '../assets/images/icon/morality-vigilante.png'
import villainIcon from '../assets/images/icon/morality-villain.png'
import rogueIcon from '../assets/images/icon/morality-rogue.png'
import resistanceIcon from '../assets/images/icon/morality-resistance.png'
import loyalistIcon from '../assets/images/icon/morality-loyalist.png'
import DropShadowImage from './DropShadowImage.tsx'

const values: { key: keyof MoralityList, title: string, icon: string }[] = [
  { key: 'hero', title: 'Hero', icon: heroIcon },
  { key: 'vigilante', title: 'Vigilante', icon: vigilanteIcon },
  { key: 'villain', title: 'Villain', icon: villainIcon },
  { key: 'rogue', title: 'Rogue', icon: rogueIcon },
  { key: 'resistance', title: 'Resistance', icon: resistanceIcon },
  { key: 'loyalist', title: 'Loyalist', icon: loyalistIcon },
]

const disabled: SxProps = { userSelect: 'none', opacity: 0.1 }

const MoralityListIcons: FC<{ moralityList: MoralityList, iconSize?: number }> = ({ moralityList, iconSize = 16 }) => {
  return (
    <Stack direction="row" gap={0.5}>
      {values.map(value => (
        <Tooltip key={value.key} title={value.title}>
          <DropShadowImage src={value.icon}
                           shadowSize="0.1rem"
                           alt={value.title}
                           width={iconSize}
                           sx={moralityList[value.key] ? {} : disabled}/>
        </Tooltip>
      ))}
    </Stack>
  )
}
export default MoralityListIcons
