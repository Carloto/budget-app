import { Avatar, Icon, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useAuthContext } from '../contexts';
import { logoutUser } from '../services';

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, onLogout } = useAuthContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    await logoutUser();
    onLogout();
  }

  return (
    <div>
      <IconButton
        id='user-menu-button'
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
        }}
      >
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '8px',
            borderBottom: '1px solid rgb(224,224,224)',
          }}
        >
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
