import type { ReactNode } from 'react'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { MemoryRouter } from 'react-router'
import { Theme } from '../src/app/theme.ts'
import ErrorProvider from '../src/app/util/ErrorProvider.tsx'
import ContentProvider from '../src/app/content/ContentProvider.tsx'
import BadgerDbProvider from '../src/app/db/BadgerDbProvider.tsx'
import CharacterDbProvider from '../src/app/character/CharacterDbProvider.tsx'
import type { BadgerDb } from '../src/app/db/badger-db.ts'
import type { StorybookScenario } from './storybook-scenario.ts'
import { STORYBOOK_CONTENT } from './storybook-content.ts'
import StorybookCharacter from './StorybookCharacter.tsx'
import SetTheme from './SetTheme.tsx'
import XLWidth from './XLWidth.tsx'

interface Props {
  children: ReactNode,
  scenario: StorybookScenario,
  db?: BadgerDb,
  mode: 'light' | 'dark',
}

export default function StorybookProviders({ children, scenario, db, mode }: Props) {
  const story = scenario.width === 'wide' ? <XLWidth>{children}</XLWidth> : children
  return (
    <CssVarsProvider theme={Theme} defaultMode="light">
      <CssBaseline/>
      <SetTheme mode={mode}>
        <ErrorProvider>
          <MemoryRouter key={scenario.initialRoute} initialEntries={[scenario.initialRoute ?? '/']}>
            <ContentProvider content={STORYBOOK_CONTENT}>
              {db ? (
                <BadgerDbProvider db={db}>
                  <CharacterDbProvider key={db.db.name}>
                    <StorybookCharacter characterKey={scenario.characterKey}>
                      {story}
                    </StorybookCharacter>
                  </CharacterDbProvider>
                </BadgerDbProvider>
              ) : story}
            </ContentProvider>
          </MemoryRouter>
        </ErrorProvider>
      </SetTheme>
    </CssVarsProvider>
  )
}
