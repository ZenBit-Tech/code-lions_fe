import { Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '24px',
  borderRadius: '10px',
  margin: '24px 0 0 0',
}));

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
    padding: 0,
  },
}));

export const NameTitle = styled(Typography)({
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
});

export const SubTitle = styled(Typography)(() => ({
  lineHeight: 2.31,
  letterSpacing: '-0.16px',
}));

export const OutletWrapper = styled(Grid)(({ theme }) => ({
  padding: '0 16px',
  [theme.breakpoints.up('sm')]: {
    padding: '0 0 0 24px',
  },
}));
