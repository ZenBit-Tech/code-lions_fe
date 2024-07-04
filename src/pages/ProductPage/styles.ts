import { Box, TextField, Typography } from '@mui/material';
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

export const StyledTypography = styled(Typography)({
  fontSize: '18px',
  lineHeight: '30px',
  marginRight: '50px',
});

export const StyledRadioWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.secondary}`,
  padding: '16px 25px 16px 16px',
  margin: '12px 0',
});
