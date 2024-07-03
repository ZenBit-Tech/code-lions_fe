import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '12px 24px',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
}));

export const SubTitleSuccess = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 700,
  letterSpacing: '-0.42px',
  lineHeight: 1.5,
}));

export const SubTitleWarning = styled(Typography)(({ theme }) => ({
  color: theme.palette.warning.main,
  fontWeight: 700,
  letterSpacing: '-0.42px',
  lineHeight: 1.5,
}));
