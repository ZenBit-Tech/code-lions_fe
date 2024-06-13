import { ReactNode } from 'react';

import { Typography } from '@mui/material';

import theme from 'src/theme';

interface IRegularTextProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
}

function RegularText({ children, align = 'left' }: IRegularTextProps) {
  return (
    <Typography
      variant="subtitle2"
      align={align}
      sx={{ color: theme.palette.text.disabled }}
    >
      {children}
    </Typography>
  );
}

RegularText.defaultProps = {
  align: 'left',
};

export default RegularText;
