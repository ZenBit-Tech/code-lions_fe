import { FormControl, InputBase } from '@mui/material';
import { Box, styled } from '@mui/system';

import theme from 'src/theme';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const StyledPhoneWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: `1px solid ${theme.palette.border.primary}`,
  borderRadius: '4px',
  padding: '9px 4px',
});

export const StyledPhoneInput = styled(InputBase)({
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontSize: 16,
  fontWeightRegular: 400,
  lineHeight: 1.43,
  letterSpacing: '-0.21px',
  marginLeft: '80px',
  flex: 1,
  borderLeft: `1px solid ${theme.palette.border.primary}`,
  '&.MuiInputBase-root .MuiInputBase-input': {
    padding: '0 10px',
  },
});

export const StyledFormControl = styled(FormControl)({
  minWidth: '65px',
  height: '28px',
  position: 'absolute',
  top: '6px',
  left: '5px',
});

export default VisuallyHiddenInput;
