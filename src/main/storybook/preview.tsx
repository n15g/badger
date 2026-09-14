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
import StorybookCharacter from './StorybookCharacter.tsx'
import { mocked, sb } from 'storybook/test'
import { getBadgerDb } from '../app/db/badger-db.ts'
import { createStorybookDb } from './storybook-db.ts'

sb.mock(import('../app/db/badger-db.ts'), { spy: true })

const preview: Preview = {
  async beforeEach() {
    const { db, cleanup } = await createStorybookDb()
    mocked(getBadgerDb).mockResolvedValue(db)
    return cleanup
  },
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
    (Story, { parameters }) => (
      <ContentProvider content={STORYBOOK_CONTENT}>
        <BadgerDbProvider>
          <CharacterDbProvider>
            <StorybookCharacter characterKey={typeof parameters.characterKey === 'string' ? parameters.characterKey : undefined}>
              <Story/>
            </StorybookCharacter>
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
