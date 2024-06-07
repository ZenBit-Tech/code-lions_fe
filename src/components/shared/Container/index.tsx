import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width:375px)': {
    margin: '44px 0 21px 0',
  },
}));

export default Container;
