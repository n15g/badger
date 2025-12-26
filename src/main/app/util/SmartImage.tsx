import { FC, ImgHTMLAttributes, useState } from 'react'
import { styled } from '@mui/joy'
import { Icons } from './Icons.tsx'
import { SxProps } from '@mui/joy/styles/types'

const Img = styled('img')({})

export const SmartImage: FC<{ sx?: SxProps } & ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, sx, ...props }) => {
  const [loaded, setLoaded] = useState(!src)

  return <>
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
  </>
}
