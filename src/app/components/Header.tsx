import { Box } from '@mui/material';
import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <Box
      sx={{
        padding: '60px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export { Header };
