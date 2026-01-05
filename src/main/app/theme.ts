import { extendTheme } from '@mui/joy'

export const Theme = extendTheme({
  fontFamily: {
    body: '"Montreal", system-ui, sans-serif',
    display: '"Red Circle Regular", serif',
  },
  typography: {
    'title-xl': { fontSize: '16pt' }
  }
})

declare module '@mui/joy/styles' {
  // noinspection JSUnusedGlobalSymbols
  interface TypographySystemOverrides {
    'title-xl': true;
  }
}
