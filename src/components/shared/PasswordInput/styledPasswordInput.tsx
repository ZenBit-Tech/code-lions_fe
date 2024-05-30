import { styled } from '@mui/system';
import { OutlinedInput } from '@mui/material';
import { StyledInputProps } from 'src/components/shared/StyledInput/types';
import {
  InputPaddings,
  InputStyles,
} from 'src/components/shared/StyledInput/styles';

const StyledPasswordInput = styled(OutlinedInput)<StyledInputProps>(
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

export default StyledPasswordInput;
