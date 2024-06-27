import { Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const AvatarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '16px',
  marginBottom: '20px',
  [theme.breakpoints.up('sm')]: {
    marginTop: 0,
  },
}));

export const SideBarWrapper = styled(Grid)(({ theme }) => ({
  padding: '0 16px',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 22px 20px 22px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '40px 0 40px 54px',
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
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
    lineHeight: 1.85,
  },
}));

export const OutletWrapper = styled(Grid)(({ theme }) => ({
  padding: '0 16px',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 22px 20px 22px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '40px 54px 40px 32px',
  },
}));
