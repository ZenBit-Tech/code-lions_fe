import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

const StyledHeader3 = styled(Typography)<TypographyProps>(({ theme }) => ({
  margin: '40px 0 12px',
  padding: '0 5px',
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontWeight: 400,
  fontSize: 20,
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
