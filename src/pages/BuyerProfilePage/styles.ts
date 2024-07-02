import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

import theme from 'src/theme.tsx';

export const MainContainerWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '54px',
  marginRight: '54px',
  alignItems: 'flex-start',
}));

export const ReviewLabel = styled(Typography)(() => ({
  marginBottom: '24px',
  marginTop: '6px',
  fontWeight: theme.typography.h2.fontWeight,
  fontSize: theme.typography.h5.fontSize,
  fontFamily: theme.typography.h1.fontFamily,
}));
