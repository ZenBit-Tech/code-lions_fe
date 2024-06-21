import { Link } from 'react-router-dom';

import { Box, styled } from '@mui/system';

export const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  [theme.breakpoints.up('sm')]: {
    gap: '24px',
  },
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  [theme.breakpoints.up('sm')]: {
    gap: '20px',
  },
}));

export const FormWrapperSmall = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    gap: '32px',
    flexDirection: 'row',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecorationLine: 'underline',
  textAlign: 'right',
  [theme.breakpoints.up('sm')]: {},
}));
