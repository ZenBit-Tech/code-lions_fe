import { ReactNode } from 'react';

import { Typography } from '@mui/material';

import theme from 'src/theme';

interface ILabelTextProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
  variant?: 'subtitle1' | 'h4';
}

function LabelText({
  children,
  align = 'left',
  variant = 'subtitle1',
}: ILabelTextProps) {
  return (
    <Typography
      variant={variant}
      align={align}
      sx={{ color: theme.palette.primary.main }}
    >
      {children}
    </Typography>
  );
}

LabelText.defaultProps = {
  align: 'left',
  variant: 'subtitle1',
};

export default LabelText;
