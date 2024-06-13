import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledHeader3 = styled(Typography)(({ theme }) => ({
  margin: '70px 0 14px',
  color: theme.palette.common.black,
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '1.83',
}));

export default StyledHeader3;
