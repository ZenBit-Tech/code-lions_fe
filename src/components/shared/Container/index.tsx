import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width:375px)': {
    margin: '44px 0 21px 0',
  },
}));

export default Container;
