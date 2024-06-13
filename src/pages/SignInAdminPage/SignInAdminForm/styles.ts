import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '335px',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  margin: 0,
  position: 'absolute',
  color: theme.palette.error.main,
}));

export default FormStyled;
