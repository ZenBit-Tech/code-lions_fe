import { InputProps } from '@mui/material';

export enum InputStyleVariants {
  OUTLINED = 'outlined',
}

export enum InputPaddingVariants {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export interface StyledInputProps extends InputProps {
  width?: string;
  borderRadius?: string;
  fontSize?: string;
  padding: InputPaddingVariants;
  stylevariant: InputStyleVariants;
}
