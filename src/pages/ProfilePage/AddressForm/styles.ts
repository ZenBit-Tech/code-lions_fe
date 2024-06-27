import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const AddressBox = styled(Box)(({ theme }) => ({
  marginTop: '8px',
  maxWidth: '295px',
  [theme.breakpoints.up('sm')]: {
    marginTop: '20px',
    padding: '16px',
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: '12px',
    maxWidth: '310px',
  },
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('sm')]: {
    color: theme.palette.text.primary,
  },
}));
