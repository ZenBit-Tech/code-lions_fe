import { ButtonProps } from '@mui/material';

export enum StyleVariants {
  BLACK = 'black',
  WHITE = 'white',
  GREYISH = 'greyish',
  TRANSPARENT = 'transparent',
}

export enum PaddingVariants {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export interface StyledButtonProps extends ButtonProps {
  width?: string;
  radius?: string;
  styles: StyleVariants;
  padding: PaddingVariants;
}
