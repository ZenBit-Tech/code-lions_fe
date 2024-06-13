import { styled } from '@mui/system';

import theme from 'src/theme';

const InnerContainer = styled('div')({
  backgroundColor: theme.palette.common.white,
  padding: '64px',
  borderRadius: '8px',
  [theme.breakpoints.up('md')]: {
    marginRight: 'calc(100% / 12)',
  },
});

export default InnerContainer;
