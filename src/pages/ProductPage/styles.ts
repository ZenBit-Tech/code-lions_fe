import { TextField, Typography, FormControlLabel } from '@mui/material';
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
