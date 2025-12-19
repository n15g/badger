import { FC, ImgHTMLAttributes, useState } from 'react'
import { Box, styled } from '@mui/joy'
import { Icons } from './Icons.tsx'
import { SxProps } from '@mui/joy/styles/types'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  sx?: SxProps
}

const Img = styled('img')({})

export const SmartImage: FC<Props> = ({ src, alt, sx, ...props }) => {
  const [loaded, setLoaded] = useState(false)

  return <Box>
    <Img
      src={src}
      alt={alt}
      onLoad={() => {
        setLoaded(true)
      }}
      onError={() => {
        setLoaded(true)
      }}
      style={{ display: loaded ? undefined : 'none' }}
      className="hover-zoom"
      sx={sx}
      {...props}
    />
    {!loaded && <Icons.Spinner className="ld ld-spin"/>}
  </Box>
}
