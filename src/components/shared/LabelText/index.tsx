import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import theme from 'src/theme';

interface ILabelTextProps {
  children: ReactNode;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined;
}

const defaultProps = {
  align: 'left',
};

function LabelText({ children, align }: ILabelTextProps) {
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

LabelText.defaultProps = defaultProps;

export default LabelText;
