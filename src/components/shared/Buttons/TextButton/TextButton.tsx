import { styled } from '@mui/system';
import { Button } from '@mui/material';

const TextButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '16px 24px',
  width: '10%',
  lineHeight: 1,
  color: 'black',
  cursor: 'pointer',
});

export default TextButton;
