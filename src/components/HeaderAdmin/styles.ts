import { MenuItem } from '@mui/material';
import { Box, styled } from '@mui/system';

import theme from 'src/theme';

export const StyledAvatar = styled(Box)({
  backgroundColor: theme.palette.border.primary,
  padding: '10px',
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
