import { IconButton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: '10px',
  padding: '12px 17px',
}));

export const ButtonTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginRight: '27px',
}));

export const SortIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
