import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    width: '100px',
    borderRadius: '6px',
  },

  '& .MuiOutlinedInput-input': {
    padding: '8px 12px 8px 32px',
    fontSize: theme.typography.fontSize,
  },
  '& .MuiOutlinedInput-input::placeholder': {
    color: theme.palette.text.disabled,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '6px',
  },

  position: 'relative',
  '&:after': {
    position: 'absolute',
    content: '"$"',
    top: '50%',
    left: '18px',
    transform: 'translateY(-47%)',
    fontFamily: theme.typography.h4.fontFamily,
  },
}));

export default StyledInput;
