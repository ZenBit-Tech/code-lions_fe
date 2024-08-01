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

export const StyledChat = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.4rem',
});

export const UnreadMessages = styled('div')(() => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  marginRight: '0.5rem',
  borderRadius: '50%',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9em',
}));
