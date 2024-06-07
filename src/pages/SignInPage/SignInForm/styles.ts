import { styled } from '@mui/system';

const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '335px',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

export default FormStyled;
