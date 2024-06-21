import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

import theme from 'src/theme';

export const Popup = styled(Box)({
  backgroundColor: theme.palette.background.default,
  padding: '24px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.modal,
});

export const IconBigWrapper = styled(Box)({
  backgroundColor: theme.palette.error.light,
  width: '94px',
  height: '94px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const IconSmallWrapper = styled(Box)({
  backgroundColor: theme.palette.error.dark,
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ModalTitle = styled(Typography)({
  color: theme.palette.text.primary,
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: 1.22,
  letterSpacing: '-0.36px',
  textAlign: 'center',
});

export const ModalDescription = styled(Typography)({
  color: theme.palette.grey[500],
  textAlign: 'center',
});
