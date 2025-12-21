import { FC, ImgHTMLAttributes } from 'react'
import { styled } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import icon from '../../resources/images/icon/ouroboros.png'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  sx?: SxProps
}

const Img = styled('img')({})

export const OuroIcon: FC<Props> = ({ sx, ...props }) => {
  return <Img
    src={icon}
    alt="Ourobouros"
    className="hover-zoom"
    sx={sx}
    {...props}
  />
}
