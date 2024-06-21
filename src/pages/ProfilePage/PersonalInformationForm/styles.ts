import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
  [theme.breakpoints.up('sm')]: {},
}));

export const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '335px',
  },
}));

export const ErrorWrapper = styled(Box)({
  position: 'relative',
});

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  margin: 0,
  position: 'absolute',
  color: theme.palette.error.main,
}));
