import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

const InputLabel = styled(Typography)<TypographyProps>(() => ({
  marginBottom: '6px',
  fontSize: '14px',
  lineHeight: 1.43,
  letterSpacing: '-0.14px',
}));

export default InputLabel;
