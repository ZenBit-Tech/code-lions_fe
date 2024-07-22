import { TextField, Typography, FormControlLabel, Box } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

export const StyledInput = styled(TextField)({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  lineHeight: 1.43,
  letterSpacing: '-0.21px',
  border: `1px solid ${theme.palette.border.secondary}`,
  '&.MuiTextField-root': {
    borderRadius: '8px',
    border: 'none',
  },
});

export const StyledFormControlLabel = styled(FormControlLabel)(
  ({ checked }) => ({
    backgroundColor: checked ? theme.palette.secondary.main : 'transparent',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.border.secondary}`,
    padding: '16px 25px 16px 8px',
    margin: '12px 0',
    transition: 'background-color 0.3s',
  })
);

export const StyledTypography = styled(Typography)({
  fontSize: '18px',
  lineHeight: '30px',
  marginRight: '50px',
});

export const Popup = styled(Box)({
  backgroundColor: theme.palette.background.default,
  padding: '24px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.modal,
  width: '60%',
  maxHeight: '90%',
  overflowY: 'scroll',
});

export const ModalTitle = styled(Typography)({
  color: theme.palette.text.primary,
  fontSize: '36px',
  fontWeight: theme.typography.bold.fontWeight,
  lineHeight: 1.22,
  letterSpacing: '-0.36px',
  textAlign: 'center',
});
