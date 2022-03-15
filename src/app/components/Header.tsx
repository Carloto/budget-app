import { Box } from '@mui/material';
import React from 'react';
import UserMenu from './UserMenu';

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& h2': {
            margin: 0
          }
        }}
      >
        <h2>Despesas</h2>
        <UserMenu />
      </Box>
      <Box
        sx={{
          padding: '20px 0 60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export { Header };
