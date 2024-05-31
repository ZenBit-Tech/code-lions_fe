import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import theme from 'src/theme';

interface ILabelTextProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
}

function LabelText({ children, align = 'left' }: ILabelTextProps) {
  return (
    <Typography
      variant="subtitle1"
      align={align}
      sx={{ color: theme.palette.primary.main }}
    >
      {children}
    </Typography>
  );
}

export default LabelText;
