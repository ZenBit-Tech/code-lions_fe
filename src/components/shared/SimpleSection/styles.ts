import { Box, styled } from '@mui/system';

const SimpleSectionStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
  [theme.breakpoints.up('sm')]: {
    padding: 0,
  },
}));

export default SimpleSectionStyled;
