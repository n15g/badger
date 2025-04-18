import { Box, GlobalStyles, List, ListDivider, ListItem, Sheet, Typography } from '@mui/joy'
import PaletteButton from './util/PaletteButton.tsx'
import { NavLink } from 'react-router'
import logo from '../resources/images/logo/badger.svg'
import { FC, ReactNode } from 'react'

const MenuItem: FC<{ children: ReactNode, to: string, end?: boolean }> = ({ children, to, end }) => {
  return (
    <NavLink end={end} to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <ListItem variant={isActive ? 'soft' : 'plain'}>
          <Typography className="game-title" sx={{ color: 'inherit' }}>{children}</Typography>
        </ListItem>
      )}
    </NavLink>
  )
}

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
                  className="game-title"
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mr: 4 }}>
        <img src={logo} alt="Badger" style={{ height: 40, marginRight: 8 }}/>
        Badger
      </Typography>
      <List role="menubar" orientation="horizontal">
        <MenuItem to="/" end>About</MenuItem>
        <ListDivider/>
        <MenuItem to="/badges">Badges</MenuItem>
        <ListDivider/>
        <MenuItem to="/characters">Characters</MenuItem>
        <ListDivider/>
        <MenuItem to="/changelog">Changelog</MenuItem>
      </List>
      <Box sx={{ ml: 'auto' }}>
        <PaletteButton/>
      </Box>
    </Sheet>
  )
}

export default Header
