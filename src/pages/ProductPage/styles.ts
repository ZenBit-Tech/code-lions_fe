import { Box, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

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

export const StyledTypography = styled(Typography)({
  fontSize: '18px',
  lineHeight: '30px',
  marginRight: '50px',
});

export const StyledRadioWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '12px',
  borser: `1px solid ${theme.palette.border.secondary}`,
  padding: '16px 25px 16px 16px',
  margin: '12px 0',
});
