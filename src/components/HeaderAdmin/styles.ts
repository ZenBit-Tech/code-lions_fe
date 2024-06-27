import { Avatar, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

export const StyledAvatar = styled(Avatar)({
  borderRadius: '50%',
  marginRight: '10px',
  marginLeft: '20px',
});

export const StyledMenuItem = styled(MenuItem)({
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  '&:focus': {
    backgroundColor: theme.palette.common.white,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.common.white,
  },
});
