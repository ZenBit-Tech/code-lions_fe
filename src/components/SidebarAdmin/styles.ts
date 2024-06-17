import { ListItemButton } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

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
