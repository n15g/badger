// noinspection JSUnusedGlobalSymbols

import type { Preview } from '@storybook/react'
import { theme } from '../app/theme.ts'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

import '../../main/app/global.css'
import SetTheme from './SetTheme.tsx'
import { useDarkMode } from 'storybook-dark-mode'
import { CohContentDatabase } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'
import ContentProvider from '../app/content/ContentProvider.tsx'
import XLWidth from './XLWidth.tsx'

const content = new CohContentDatabase(HOMECOMING)

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline/>
        <SetTheme mode={useDarkMode() ? 'dark' : 'light'}>
          <Story/>
        </SetTheme>
      </CssVarsProvider>
    ),
    Story => (
      <ContentProvider content={content}>
        <Story/>
      </ContentProvider>
    ),
    (Story, { parameters }) => {
      const { xl = false } = parameters
      return xl ? <XLWidth><Story/></XLWidth> : <Story/>
    }
  ]
}

export default preview
