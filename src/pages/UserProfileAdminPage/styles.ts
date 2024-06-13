import { ListItemButton } from '@mui/material';
import { Box, styled } from '@mui/system';
import theme from 'src/theme';

const hexToDecimal: number = 16;
const backgroundOpacity: number = 0.5;

const hexToRgba = (hex: string, opacity: number) => {
  /* eslint-disable no-magic-numbers */
  const r = parseInt(hex.slice(1, 3), hexToDecimal);
  const g = parseInt(hex.slice(3, 5), hexToDecimal);
  const b = parseInt(hex.slice(5, 7), hexToDecimal);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

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
