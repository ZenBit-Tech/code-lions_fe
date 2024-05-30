import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: '16px 20px 2px 20px',
  },
}));

export default Container;
