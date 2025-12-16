import {
  Box,
  Divider,
  Drawer,
  GlobalStyles,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListSubheader,
  Sheet,
  Tooltip,
  Typography
} from '@mui/joy'
import PaletteButton from './util/PaletteButton.tsx'
import { NavLink } from 'react-router'
import logo from '../resources/images/logo/badger.svg'
import { FC, ReactNode, useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { BiChevronDown } from 'react-icons/bi'

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (<>
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
        <img src={logo} alt="Badger" style={{ height: 40, marginRight: 16 }}/>
        Badger
      </Typography>
      <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexGrow: 1, justifyContent: 'space-between' }}>
        <List role="menubar" orientation="horizontal">
          <MenuItem to="/" end>About</MenuItem>
          <ListDivider/>
          <MenuItem to="/characters">My Characters</MenuItem>
          <ListDivider/>
          <MenuItem to="/badges">Badges</MenuItem>
          <ListDivider/>
          <Tooltip color="neutral" variant="outlined" placement="bottom-start" title={<>
            <List>
              <MenuItem to="/contacts">Contacts</MenuItem>
              <MenuItem to="/missions">Missions</MenuItem>
              <MenuItem to="/zones">Zones</MenuItem>
            </List>
          </>
          }>
            <ListItem>Other Data <BiChevronDown/></ListItem>
          </Tooltip>
          <ListDivider/>
          <MenuItem to="https://github.com/n15g/badger/blob/master/CHANGELOG.md">Changelog</MenuItem>
        </List>
        <PaletteButton/>
      </Box>


      {/* MOBILE */
      }
      <IconButton sx={{ display: { xs: 'flex', lg: 'none' }, ml: 'auto' }} variant="outlined" color="neutral" onClick={() => {
        setDrawerOpen(true)
      }}>
        <MdOutlineMenu/>
      </IconButton>
      <Drawer open={drawerOpen} onClose={() => {
        setDrawerOpen(false)
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mx: 2 }}>
          <Typography level="h2" component={NavLink} to="/"
                      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Badger" style={{ height: 40, marginRight: 16 }}/>
            Badger
          </Typography>
          <PaletteButton/>
        </Box>

        <List size="lg" component="nav">
          <ListItemButton component={NavLink} to="/" onClick={() => {
            setDrawerOpen(false)
          }}>About</ListItemButton>
          <ListItemButton component={NavLink} to="/characters" onClick={() => {
            setDrawerOpen(false)
          }}>Characters</ListItemButton>
          <Divider/>
          <ListItem nested>
            <ListSubheader>Data</ListSubheader>
            <ListItemButton component={NavLink} to="/badges" onClick={() => {
              setDrawerOpen(false)
            }}>Badges</ListItemButton>
            <ListItemButton component={NavLink} to="/contacts" onClick={() => {
              setDrawerOpen(false)
            }}>Contacts</ListItemButton>
            <ListItemButton component={NavLink} to="/missions" onClick={() => {
              setDrawerOpen(false)
            }}>Missions</ListItemButton>
            <ListItemButton component={NavLink} to="/zones" onClick={() => {
              setDrawerOpen(false)
            }}>Zones</ListItemButton>
          </ListItem>
          <Divider/>
          <ListItemButton component={NavLink} to="https://github.com/n15g/badger/blob/master/CHANGELOG.md">Changelog</ListItemButton>
        </List>
      </Drawer>
    </Sheet>
  </>)
}

const MenuItem: FC<{ children: ReactNode, to: string, end?: boolean }> = ({ children, to, end }) => {
  return (
    <NavLink end={end} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {({ isActive }) => (
        <ListItem variant={isActive ? 'soft' : 'plain'}>{children}</ListItem>
      )}
    </NavLink>
  )
}
export default Header
