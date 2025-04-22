import { FC, ReactNode } from 'react'
import { Chip, ChipDelete, Stack } from '@mui/joy'
import { OverridableStringUnion } from '@mui/types'
import { ColorPaletteProp } from '@mui/joy/styles/types'
import { ChipPropsColorOverrides } from '@mui/joy/Chip/ChipProps'
import { Icons } from '../../util/Icons.tsx'


const BadgeName: FC<{
  children?: ReactNode,
  decorator?: ReactNode,
  showDelete?: boolean,
  onDelete?: () => void,
  color?: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
}> =
  ({ children, decorator, showDelete, onDelete, color }) => {
    const Delete = (<ChipDelete onClick={() => {
      onDelete?.()
    }}><Icons.Cross/></ChipDelete>)

    return (
      <Chip color={color} endDecorator={showDelete ? Delete : null}>
        <Stack direction="row" gap={0.5} alignItems="center">
          {decorator}
          {children}
        </Stack>
      </Chip>
    )
  }
export default BadgeName
