import { FC } from 'react'
import { MoralityList } from 'coh-content-db'
import { Stack, Tooltip } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import heroIcon from '../../resources/images/icon/morality-hero.png'
import vigilanteIcon from '../../resources/images/icon/morality-vigilante.png'
import villainIcon from '../../resources/images/icon/morality-villain.png'
import rogueIcon from '../../resources/images/icon/morality-rogue.png'
import resistanceIcon from '../../resources/images/icon/morality-resistance.png'
import loyalistIcon from '../../resources/images/icon/morality-loyalist.png'
import DropShadowImage from '../util/DropShadowImage.tsx'

const values: { key: keyof MoralityList, title: string, icon: string }[] = [
  { key: 'hero', title: 'Hero', icon: heroIcon },
  { key: 'vigilante', title: 'Vigilante', icon: vigilanteIcon },
  { key: 'villain', title: 'Villain', icon: villainIcon },
  { key: 'rogue', title: 'Rogue', icon: rogueIcon },
  { key: 'resistance', title: 'Resistance', icon: resistanceIcon },
  { key: 'loyalist', title: 'Loyalist', icon: loyalistIcon },
]

const disabled: SxProps = { userSelect: 'none', opacity: 0.2 }

const MoralityListIcons: FC<{ moralityList: MoralityList, iconSize?: number }> = ({ moralityList, iconSize = 16 }) => {
  return (
    <Stack direction="row" gap={0.5}>
      {values.map(value => (
        <Tooltip key={value.key} title={`${moralityList[value.key] ? '✅' : '❌'} ${value.title}`}>
          <DropShadowImage src={value.icon}
                           shadowSize={moralityList[value.key] ? '2px' : '0'}
                           alt={value.title}
                           width={iconSize}
                           sx={moralityList[value.key] ? {} : disabled}/>
        </Tooltip>
      ))}
    </Stack>
  )
}
export default MoralityListIcons
