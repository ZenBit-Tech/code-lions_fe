import { styled } from '@mui/system';
import { Button } from '@mui/material';

const TextButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  padding: '16px 24px',
  cursor: 'pointer',
  '&:hover, &:active, &:focus': {
    backgroundColor: 'transparent',
  },
  '&:hover, &:disabled': {
    opacity: theme.palette.action.hoverOpacity,
  },
}));

export default TextButton;
