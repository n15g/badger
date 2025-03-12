import { Box, GlobalStyles, Sheet, Tab, TabList, Tabs, Typography } from '@mui/joy'
import PaletteButton from './util/PaletteButton.tsx'
import { NavLink } from 'react-router'
import logo from './assets/logo.svg'

function Header() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        paddingX: 2,
        gap: 1,
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={() => ({
          ':root': {
            '--Header-height': '48px'
          },
        })}
      />
      <Typography level="h2" component={NavLink} to="/"
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mr: 4 }}>
        <img src={logo} alt="Badger" style={{ height: 40, marginRight: 8 }}/>
        Badger
      </Typography>
      <Tabs sx={{ height: '100%' }}>
        <TabList sx={{ height: '100%' }}>
          <Tab component={NavLink} to="/">About</Tab>
          <Tab component={NavLink} to="/character">Characters</Tab>
          <Tab component={NavLink} to="/badges">Badges</Tab>
          <Tab component={NavLink} to="/changelog">Changelog</Tab>
        </TabList>
      </Tabs>
      <Box sx={{ ml: 'auto' }}>
        <PaletteButton/>
      </Box>
    </Sheet>
  )
}

export default Header
