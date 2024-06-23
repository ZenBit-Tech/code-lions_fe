import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const SmallTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 2.31,
  letterSpacing: '-0.16px',
  [theme.breakpoints.up('sm')]: {},
}));

export const CardNumber = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('sm')]: {},
}));
