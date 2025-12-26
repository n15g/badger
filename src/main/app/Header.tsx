import {
  Box,
  Divider,
  Drawer,
  Dropdown,
  GlobalStyles,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListSubheader,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography
} from '@mui/joy'
import PaletteButton from './util/PaletteButton.tsx'
import { NavLink } from 'react-router'
import logo from '../resources/images/logo/badger.svg'
import { useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { Icons } from './util/Icons.tsx'

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
          <NavLink to="/" end>
            {({ isActive }) => (<ListItem variant={isActive ? 'soft' : 'plain'}>About</ListItem>)}
          </NavLink>
          <ListDivider/>
          <NavLink to="/characters">
            {({ isActive }) => (<ListItem variant={isActive ? 'soft' : 'plain'}><Icons.Character/> Characters</ListItem>)}
          </NavLink>
          <ListDivider/>
          <NavLink to="/badges">
            {({ isActive }) => (<ListItem variant={isActive ? 'soft' : 'plain'}><Icons.Badge/> Badges</ListItem>)}
          </NavLink>
          <ListDivider/>
          <Dropdown>
            <MenuButton slots={{ root: ListItem }} sx={{ cursor: 'pointer' }}>
              Other Data <Icons.ChevronDown/>
            </MenuButton>
            <Menu>
              <MenuItem><NavLink to="/contacts"><Icons.Contact/> Contacts</NavLink></MenuItem>
              <MenuItem><NavLink to="/missions"><Icons.Mission/> Missions</NavLink></MenuItem>
              <MenuItem><NavLink to="/zones"><Icons.Zone/> Zones</NavLink></MenuItem>
            </Menu>
          </Dropdown>
          <ListDivider/>
          <Dropdown>
            <MenuButton slots={{ root: ListItem }} sx={{ cursor: 'pointer' }}>
              Changelogs <Icons.ChevronDown/>
            </MenuButton>
            <Menu>
              <MenuItem>
                <NavLink to="https://github.com/n15g/badger/blob/master/CHANGELOG.md/">
                  Badger <Icons.ExternalLink/>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="https://github.com/n15g/coh-content-db-homecoming/blob/master/CHANGELOG.md/">
                  Homecoming <Icons.ExternalLink/>
                </NavLink>
              </MenuItem>
            </Menu>
          </Dropdown>
        </List>
        <PaletteButton/>
      </Box>

      {/* MOBILE */}
      <Box sx={{ display: { xs: 'flex', lg: 'none' }, ml: 'auto' }}>
        <IconButton variant="outlined" color="neutral" onClick={() => {
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
            <Divider/>
            <ListItemButton component={NavLink} to="/characters" onClick={() => {
              setDrawerOpen(false)
            }}><Icons.Character/> Characters</ListItemButton>
            <Divider/>
            <ListItem nested>
              <ListSubheader>Data</ListSubheader>
              <ListItemButton component={NavLink} to="/badges" onClick={() => {
                setDrawerOpen(false)
              }}><Icons.Badge/> Badges</ListItemButton>
              <ListItemButton component={NavLink} to="/contacts" onClick={() => {
                setDrawerOpen(false)
              }}><Icons.Contact/> Contacts</ListItemButton>
              <ListItemButton component={NavLink} to="/missions" onClick={() => {
                setDrawerOpen(false)
              }}><Icons.Mission/> Missions</ListItemButton>
              <ListItemButton component={NavLink} to="/zones" onClick={() => {
                setDrawerOpen(false)
              }}><Icons.Zone/> Zones</ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem nested>
              <ListSubheader>Changelogs</ListSubheader>
              <ListItemButton component={NavLink} to="https://github.com/n15g/badger/blob/master/CHANGELOG.md">
                Badger <Icons.ExternalLink/>
              </ListItemButton>
              <ListItemButton component={NavLink} to="https://github.com/n15g/coh-content-db-homecoming/blob/master/CHANGELOG.md">
                Homecoming <Icons.ExternalLink/>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>

    </Sheet>
  </>)
}

export default Header
