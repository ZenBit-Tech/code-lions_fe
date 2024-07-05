import { Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

import theme from 'src/theme.tsx';

const ACTIVE = 'active';

interface TabButtonProps {
  active?: boolean;
}

export const TabsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  width: '342px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.light,
}));

export const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== ACTIVE,
})<TabButtonProps>(({ active }) => ({
  flex: 1,
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    backgroundColor: active ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

export const MainContainerWrapper = styled(Box)(() => ({
  display: 'flex',
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
