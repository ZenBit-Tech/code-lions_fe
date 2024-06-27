import { Typography, FormControl, InputBase } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
  [theme.breakpoints.up('sm')]: {},
}));

export const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '335px',
  },
}));

export const ErrorWrapper = styled(Box)({
  position: 'relative',
});

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  margin: 0,
  position: 'absolute',
  color: theme.palette.error.main,
}));

export const StyledPhoneWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: `1px solid ${theme.palette.border.primary}`,
  borderRadius: '4px',
  padding: '9px 4px',
}));

export const StyledPhoneInput = styled(InputBase)(({ theme }) => ({
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
}));

export const StyledFormControl = styled(FormControl)({
  minWidth: '65px',
  height: '28px',
  position: 'absolute',
  top: '6px',
  left: '5px',
});
