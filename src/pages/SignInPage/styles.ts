import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '335px',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

export const LinkStyled = styled(Link)({
  textDecoration: 'none',
});
