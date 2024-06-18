import { IconButton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TitleWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  padding: '0 6px',
  cursor: 'poiner',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const NameTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
  [theme.breakpoints.up('sm')]: {},
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  lineHeight: 2.31,
  letterSpacing: '-0.16px',
  [theme.breakpoints.up('sm')]: {},
}));
