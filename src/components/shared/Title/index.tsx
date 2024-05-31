import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import theme from 'src/theme';

interface ITitleProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
}

function Title({ children, align = 'left' }: ITitleProps) {
  return (
    <Typography
      variant="h1"
      sx={{ color: theme.palette.primary.main }}
      align={align}
    >
      {children}
    </Typography>
  );
}

export default Title;
