import '@fontsource/inter/index.css'
import '@loadingio/loading.css/loading.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Box, CssBaseline, CssVarsProvider } from '@mui/joy'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import Header from './Header.tsx'
import Init from './Init.tsx'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root not found')
}

createRoot(root).render(
  <StrictMode>
    <InitColorSchemeScript/>
    <BrowserRouter>
      <CssVarsProvider defaultMode="system">
        <CssBaseline/>
        <Init>
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
            </Routes>
          </Box>
        </Init>
      </CssVarsProvider>
    </BrowserRouter>
  </StrictMode>
)
