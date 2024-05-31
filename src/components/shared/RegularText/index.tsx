import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import theme from 'src/theme';

interface IRegularTextProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
}

const defaultProps = {
  align: 'left',
};

function RegularText({ children, align }: IRegularTextProps) {
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

RegularText.defaultProps = defaultProps;

export default RegularText;
