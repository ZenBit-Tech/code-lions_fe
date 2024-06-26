import { FormControl, InputBase, TextField, MenuItem } from '@mui/material';
import { Box, styled } from '@mui/system';

import hexToRgba from 'src/common/utils/hexToRgba';
import theme from 'src/theme';

const topShadowOpacity: number = 0.2;
const bottomShadowOpacity: number = 0.5;

export const StyledAdminPanelInput = styled(TextField)({
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.43,
  letterSpacing: '-0.21px',
  border: `1px solid ${theme.palette.border.secondary}`,
  '&.MuiTextField-root': {
    borderRadius: '8px',
    border: 'none',
  },
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

export const StyledMenuItem = styled(MenuItem)({
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  '&:focus': {
    backgroundColor: theme.palette.common.white,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.common.white,
  },
});

export const BottomWrapper = styled(Box)({
  height: '70px',
  width: '100%',
  borderRadius: '10px',
  padding: '15px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  boxShadow: `0px -8px 20px 0px ${hexToRgba(theme.palette.border.secondary, topShadowOpacity)}, 0px 2px 2px 0px ${hexToRgba(theme.palette.border.secondary, bottomShadowOpacity)}`,
});
