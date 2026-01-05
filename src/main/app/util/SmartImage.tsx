import { FC, ImgHTMLAttributes, useState } from 'react'
import { styled } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import Spinner from './Spinner.tsx'

const Img = styled('img')({})

export const SmartImage: FC<{ sx?: SxProps } & ImgHTMLAttributes<HTMLImageElement>> = ({ src, sx, ...props }) => {
  const [loaded, setLoaded] = useState(!src)

  return <>
    <Img
      src={src}
      onLoad={() => {
        setLoaded(true)
      }}
      onError={() => {
        setLoaded(true)
      }}
      style={{ ...props.style, display: loaded ? undefined : 'none' }}
      className="hover-zoom"
      sx={sx}
      {...props}
    />
    {!loaded && <Spinner/>}
  </>
}
