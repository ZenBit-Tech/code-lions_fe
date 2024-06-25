import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';

interface TabButtonProps {
  active?: boolean;
}

export const TabsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  width: '342px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.light,
}));

export const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<TabButtonProps>(({ theme, active }) => ({
  flex: 1,
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: active
    ? theme.palette.grey[900]
    : theme.palette.primary.light,
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: active ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

export const MainContainerWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  marginLeft: '54px',
  marginRight: '54px',
  alignItems: 'flex-start',
});
