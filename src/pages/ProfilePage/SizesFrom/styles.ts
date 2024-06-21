import { styled } from '@mui/system';

const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '335px',
  },
}));

export default FormStyled;
