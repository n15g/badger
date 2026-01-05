import { Box } from '@mui/joy'
import Header from './Header.tsx'
import { Outlet } from 'react-router'
import ErrorPage from './util/ErrorPage.tsx'
import { ErrorBoundary } from 'react-error-boundary'

function Index() {
  return (<>
    <ErrorBoundary FallbackComponent={({ error }) => (<ErrorPage error={error as unknown}/>)}>
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
        <Outlet/>
      </Box>
    </ErrorBoundary>
  </>)
}

export default Index
