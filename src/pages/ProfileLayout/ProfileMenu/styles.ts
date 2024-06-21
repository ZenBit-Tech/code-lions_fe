import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';

export const ListStyled = styled(List)(({ theme }) => ({
  width: '343px',
  borderRadius: '16px',
  backgroundColor: theme.palette.background.default,
  padding: '12px',
  boxShadow: '0px 6px 20px 0px rgba(25, 25, 25, 0.06)',
  [theme.breakpoints.up('sm')]: {
    width: '312px',
  },
}));

export const ListItemStyled = styled(ListItem)({
  width: '100%',
  padding: '12px 0',
});

export const ListItemTextStyled = styled(ListItemText)({
  lineHeight: '2.31',
  letterSpacing: '-0.16px',
});

export const ListItemAvatarStyled = styled(ListItemAvatar)({
  minWidth: '32px',
  marginRight: '8px',
});

export const AvatarStyled = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'even',
})<{ even?: boolean }>(({ theme, even }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: even
    ? theme.palette.secondary.main
    : theme.palette.primary.light,
}));

export const DividerStyled = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.border.secondary,
}));
