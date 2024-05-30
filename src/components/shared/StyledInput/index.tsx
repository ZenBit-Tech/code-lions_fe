import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import { StyledInputProps } from './types';
import { InputPaddings, InputStyles } from './styles';

const StyledInput = styled(TextField)<StyledInputProps>(
  ({ theme, ...props }) => ({
    width: props.width,
    ...InputStyles[props.stylevariant],
    '& .MuiOutlinedInput-root': {
      borderRadius: props.borderRadius || '6px',
    },
    '& .MuiOutlinedInput-input': {
      padding: InputPaddings[props.padding],
      fontSize: props.fontSize || '16px',
    },
    '& .MuiOutlinedInput-input::placeholder': {
      color: theme.palette.text.disabled,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: props.borderRadius || '6px',
    },
  })
);

export default StyledInput;
