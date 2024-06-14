import { ListItemButton } from '@mui/material';
import { Box, styled } from '@mui/system';

import hexToRgba from 'src/common/hexToRgba';
import theme from 'src/theme';

const backgroundOpacity: number = 0.5;

export const StyledListItemButton = styled(ListItemButton)({
  marginBottom: '12px',
  padding: '12px',
  borderRadius: '4px',
  height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.common.white,
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected:active': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:hover, &:focus, &:active': {
    backgroundColor: theme.palette.secondary.main,
  },
});

export const StyledSubListItemButton = styled(ListItemButton)({
  padding: '12px',
  borderRadius: '4px',
  height: '48px',
  marginLeft: '12px',
  marginBottom: '6px',
  backgroundColor: theme.palette.common.white,
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.paper,
  },
  '&.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected:active': {
    backgroundColor: theme.palette.background.paper,
  },
  '&:hover, &:focus, &:active': {
    backgroundColor: theme.palette.background.paper,
  },
});

export const StyledUserSection = styled(Box)({
  backgroundColor: hexToRgba(theme.palette.background.paper, backgroundOpacity),
  padding: '30px',
});

export const StyledAvatar = styled(Box)({
  backgroundColor: theme.palette.border.primary,
  padding: '10px',
  borderRadius: '50%',
  marginRight: '10px',
  marginLeft: '20px',
});
