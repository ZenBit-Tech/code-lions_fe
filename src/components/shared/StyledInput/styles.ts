import theme from 'src/theme';
import { InputStyleVariants, InputPaddingVariants } from './types';

export const InputStyles = {
  [InputStyleVariants.OUTLINED]: {
    '& fieldset': {
      borderColor: theme.palette.border.primary,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.border.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
};

export const InputPaddings = {
  [InputPaddingVariants.XS]: '4px',
  [InputPaddingVariants.SM]: '8px',
  [InputPaddingVariants.MD]: '12px 16px',
  [InputPaddingVariants.LG]: '16px',
  [InputPaddingVariants.XL]: '20px',
};
