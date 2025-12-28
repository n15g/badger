import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Box, CssBaseline, CssVarsProvider } from '@mui/joy'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import Header from './Header.tsx'
import { Theme } from './theme.ts'
import ErrorProvider from './util/ErrorProvider.tsx'
import BadgerDbProvider from './db/BadgerDbProvider.tsx'
import ContentLoader from './content/ContentLoader.tsx'
import BadgerRoutes from './BadgerRoutes.tsx'
import CharacterDbProvider from './character/CharacterDbProvider.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './util/ErrorPage.tsx'
import CharacterScopeProvider from './character/CharacterScopeProvider.tsx'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root not found')
}

createRoot(root).render(
  <StrictMode>
    <InitColorSchemeScript/>
    <BrowserRouter>
      <CssVarsProvider defaultMode="system" theme={Theme}>
        <CssBaseline/>
        <ErrorProvider>
          <ErrorBoundary FallbackComponent={({ error }) => (<ErrorPage error={error as unknown}/>)}>
            <BadgerDbProvider>
              <CharacterDbProvider>
                <CharacterScopeProvider>
                  <ContentLoader>
                    <Header/>
                    <Box
                      component="main"
                      sx={{
                        pt: 'calc(12px + var(--Header-height))',
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        overflow: 'auto',
                      }}>
                      <BadgerRoutes/>
                    </Box>
                  </ContentLoader>
                </CharacterScopeProvider>
              </CharacterDbProvider>
            </BadgerDbProvider>
          </ErrorBoundary>
        </ErrorProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </StrictMode>
)
