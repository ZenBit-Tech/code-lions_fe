import { ButtonProps } from '@mui/material';

export enum StyleVariants {
  BLACK = 'black',
  WHITE = 'white',
  GREYISH = 'greyish',
  TRANSPARENT = 'transparent',
  TRANSPARENT2 = 'transparent2',
  RED = 'red',
}

export enum PaddingVariants {
  XS = 'xs',
  SM = 'sm',
  SM2 = 'sm2',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export interface IStyledButtonProps extends ButtonProps {
  fontSize?: string;
  fontFamily?: string;
  width?: string;
  radius?: string;
  styles: StyleVariants;
  padding: PaddingVariants;
}
