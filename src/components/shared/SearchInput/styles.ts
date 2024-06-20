import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const TextFieldStyled = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '6px',
    paddingLeft: '16px',
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px 12px 0',
  },
  '& ::placeholder': {
    lineHeight: 1.25,
  },
});

export default TextFieldStyled;
