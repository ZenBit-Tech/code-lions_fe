import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '24px',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
}));

export const SubTitle = styled(Typography)({
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: '-0.36px',
});
