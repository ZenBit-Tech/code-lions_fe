import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const SectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: '44px 0 34px 0',
  },
}));

export default SectionStyled;
