import { Box, styled } from '@mui/material';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  boxShadow: theme.shadows[24],
  left: '40%',
  maxWidth: '472px',
  padding: '24px',
  position: 'absolute',
  top: '15%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
}));

export const StyledBigIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: '94px',
  height: '94px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledSmallIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
