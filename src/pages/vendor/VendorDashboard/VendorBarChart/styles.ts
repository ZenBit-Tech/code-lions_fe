import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '24px 24px 0 24px ',
  borderRadius: '12px',
  '& .MuiBarElement-root': {
    width: '26px',
    fill: '#333',
  },
}));

export const SubTitle = styled(Typography)({
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: '-0.36px',
});
