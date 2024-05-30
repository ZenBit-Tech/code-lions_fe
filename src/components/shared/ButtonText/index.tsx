import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import theme from 'src/theme';

interface IButtonTextProps {
  children: ReactNode;
}

function ButtonText({ children }: IButtonTextProps) {
  return (
    <Typography
      variant="button"
      align="center"
      sx={{ color: theme.palette.common.white }}
    >
      {children}
    </Typography>
  );
}

export default ButtonText;
