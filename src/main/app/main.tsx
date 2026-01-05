import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import { Theme } from './theme.ts'
import ErrorProvider from './util/ErrorProvider.tsx'
import BadgerDbProvider from './db/BadgerDbProvider.tsx'
import ContentLoader from './content/ContentLoader.tsx'
import CharacterDbProvider from './character/CharacterDbProvider.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './util/ErrorPage.tsx'
import CharacterContextProvider from './character/CharacterContextProvider.tsx'
import { Routes } from './Routes.tsx'
import { RouterProvider } from 'react-router'
import LegacyCharacterMigration from './character/LegacyCharacterMigration.tsx'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root not found')
}

createRoot(root).render(
  <StrictMode>
    <InitColorSchemeScript/>
    <CssVarsProvider defaultMode="system" theme={Theme}>
      <CssBaseline/>
      <ErrorProvider>
        <ErrorBoundary FallbackComponent={({ error }) => (<ErrorPage error={error as unknown}/>)}>
          <BadgerDbProvider>
            <CharacterDbProvider>
              <CharacterContextProvider>
                <ContentLoader>
                  <LegacyCharacterMigration>
                    <RouterProvider router={Routes}/>
                  </LegacyCharacterMigration>
                </ContentLoader>
              </CharacterContextProvider>
            </CharacterDbProvider>
          </BadgerDbProvider>
        </ErrorBoundary>
      </ErrorProvider>
    </CssVarsProvider>
  </StrictMode>
)
