import { ListItemButton, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/system';

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '8px 12px',
  borderRadius: '6px',
  justifyContent: 'center',
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
}));

interface StyledTypographyProps {
  isActive: boolean;
  theme: Theme;
}

export const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<StyledTypographyProps>(({ isActive, theme }) => ({
  fontWeight: isActive
    ? theme.typography.fontWeightBold
    : theme.typography.fontWeightRegular,
}));
