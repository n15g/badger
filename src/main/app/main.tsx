import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Box, CssBaseline, CssVarsProvider } from '@mui/joy'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import Header from './Header.tsx'
import BadgeList from './badge/BadgeList.tsx'
import BadgeView from './badge/BadgeView.tsx'
import { Theme } from './theme.ts'
import ErrorProvider from './util/ErrorProvider.tsx'
import BadgerDbProvider from './db/BadgerDbProvider.tsx'
import ContentLoader from './content/ContentLoader.tsx'

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
          <BadgerDbProvider>
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
                <Routes>
                  <Route path="/" element={<About/>}></Route>
                  <Route path="/badges" element={<BadgeList/>}></Route>
                  <Route path="/badges/:badgeKey" element={<BadgeView/>}></Route>
                </Routes>
              </Box>
            </ContentLoader>
          </BadgerDbProvider>
        </ErrorProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </StrictMode>
)
