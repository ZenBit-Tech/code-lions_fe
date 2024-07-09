import { Button, styled } from '@mui/material';
import { Box } from '@mui/system';

import theme from 'src/theme.tsx';

const ACTIVE = 'active';

interface TabButtonProps {
  active?: boolean;
}
export const TabsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px 0px 52px 52px',
  width: '379px',
  borderRadius: '8px',
  backgroundColor: theme.palette.common.white,
}));

export const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== ACTIVE,
})<TabButtonProps>(({ active }) => ({
  flex: 1,
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: active
    ? theme.palette.secondary.main
    : theme.palette.common.white,
  color: active ? theme.palette.common.black : theme.palette.text.primary,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRegular,
}));
