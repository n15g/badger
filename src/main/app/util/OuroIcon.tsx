import { FC, ImgHTMLAttributes } from 'react'
import { styled } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import icon from '../../resources/images/icon/ouroboros.png'

const Img = styled('img')({})

export const OuroIcon: FC<{sx?: SxProps} & ImgHTMLAttributes<HTMLImageElement>> = ({ sx, ...props }) => {
  return <Img
    src={icon}
    alt="Ourobouros"
    className="hover-zoom"
    sx={sx}
    {...props}
  />
}
