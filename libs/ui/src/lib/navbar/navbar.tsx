import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import { GatewayIcon } from '@gateway/assets.icons';
import { NavBarNotifications } from './navbar-notifications';
import { NavBarAvatar } from './navbar-avatar';
import { NavBarMobile } from './navbar-mobile';

const pages = ['DAOs', 'Gates', 'People'];
export interface NavbarProps {
  text: string;
}


export function Navbar({text}: NavbarProps) {
    return (
      <AppBar color="transparent" position="static">
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Box display={['flex', null, 'none']} flexGrow={1} alignItems="center">
            <NavBarMobile />
          </Box>
          <Box display={['none', null, 'flex']} flexGrow={1} alignItems="center" gap={1}>
            {/* <GatewayIcon sx={{ mx: 2, color: 'primary.dark' }} /> */}
            {pages.map((page) => (
              <Button
                key={page}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box flexGrow={0}>
            <NavBarNotifications />
            <NavBarAvatar />
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
