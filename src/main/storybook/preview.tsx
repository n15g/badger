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
    )
  ]
}

export default preview
