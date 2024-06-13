import { TextField } from '@mui/material';
import { styled } from '@mui/system';

import { InputPaddings, InputStyles } from './styles';
import { StyledInputProps } from './types';

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
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  })
);

export default StyledInput;
