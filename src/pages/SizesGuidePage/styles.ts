import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

const StyledHeader3 = styled(Typography)<TypographyProps>(() => ({
  margin: '40px 0 12px',
  padding: '0 5px',
  fontFamily: theme.typography.h4.fontFamily,
  fontWeight: theme.typography.body1.fontWeight,
  fontSize: theme.typography.h5.fontSize,
  lineHeight: 2.2,
  letterSpacing: '-0.02em',
  color: theme.palette.common.black,
  [theme.breakpoints.up('md')]: {
    margin: '70px 0 14px',
    fontSize: 24,
    lineHeight: '1.83',
  },
}));

export default StyledHeader3;
