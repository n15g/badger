import { styled } from '@mui/joy'

const DropShadowImage = styled('img')(({ theme }) => ({
  filter: `drop-shadow(0 0 0.5rem ${theme.vars.palette.text.tertiary})`
}))

export default DropShadowImage
