import { styled } from '@mui/joy'


const DropShadowImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'shadowSize',
})<{ shadowSize?: string }>(({ theme, shadowSize = '0.3rem' }) => ({
  filter: `drop-shadow(0 0 ${shadowSize} ${theme.palette.text.icon})`,
}))

export default DropShadowImage
