import { ReactNode } from 'react';

import { Typography } from '@mui/material';

import theme from 'src/theme';

interface ITitleProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
  variant?: 'h1' | 'h5';
  component?: 'h1';
}

function Title({
  children,
  align = 'left',
  variant = 'h1',
  component = 'h1',
}: ITitleProps) {
  return (
    <Typography
      variant={variant}
      sx={{ color: theme.palette.primary.main }}
      align={align}
      component={component}
    >
      {children}
    </Typography>
  );
}

export default Title;
