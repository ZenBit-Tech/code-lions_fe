import { Typography } from '@mui/material';
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

export const TitleStyled = styled(Typography)({
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
});
