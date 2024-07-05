import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

const InputLabel = styled(Typography)<TypographyProps>(() => ({
  marginBottom: '6px',
  fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.43,
  letterSpacing: '-0.14px',
}));

export default InputLabel;
