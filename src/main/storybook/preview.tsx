// noinspection JSUnusedGlobalSymbols

import type { Preview } from '@storybook/react'
import { Theme } from '../app/theme.ts'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

import '../../main/app/global.css'
import ContentProvider from '../app/content/ContentProvider.tsx'
import XLWidth from './XLWidth.tsx'
import { STORYBOOK_CONTENT } from './storybook-content.ts'
import SetTheme from './SetTheme.tsx'
import { useDarkMode } from '@vueless/storybook-dark-mode'
import { BrowserRouter } from 'react-router'
import ErrorProvider from '../app/util/ErrorProvider.tsx'
import BadgerDbProvider from '../app/db/BadgerDbProvider.tsx'
import CharacterDbProvider from '../app/character/CharacterDbProvider.tsx'
import CharacterContextProvider from '../app/character/CharacterContextProvider.tsx'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        method: 'alphabetical'
      }
    }
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <CssVarsProvider theme={Theme} defaultMode="system">
          <CssBaseline/>
          <SetTheme mode={useDarkMode() ? 'dark' : 'light'}>
            <Story/>
          </SetTheme>
        </CssVarsProvider>
      </BrowserRouter>
    ),
    Story => (
      <ContentProvider content={STORYBOOK_CONTENT}>
        <BadgerDbProvider>
          <CharacterDbProvider>
            <CharacterContextProvider>
              <Story/>
            </CharacterContextProvider>
          </CharacterDbProvider>
        </BadgerDbProvider>
      </ContentProvider>
    ),
    Story => (
      <ErrorProvider>
        <Story/>
      </ErrorProvider>
    ),
    (Story, { parameters }) => {
      const { xl = false } = parameters
      return xl ? <XLWidth><Story/></XLWidth> : <Story/>
    },
  ]
}

export default preview
