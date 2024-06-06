import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '335px',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
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