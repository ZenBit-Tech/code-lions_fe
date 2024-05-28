import { styled } from '@mui/system';
import { Button } from '@mui/material';

const TextButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '16px 24px',
  width: '10%',
  lineHeight: 1,
  color: theme.palette.text.primary,
  cursor: 'pointer',
}));

export default TextButton;
