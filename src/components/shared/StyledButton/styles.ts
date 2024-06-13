import theme from 'src/theme';

import { PaddingVariants, StyleVariants } from './types';

export const ButtonStyles = {
  [StyleVariants.BLACK]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    border: 'none',
  },
  [StyleVariants.WHITE]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.common.black}`,
  },
  [StyleVariants.GREYISH]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.disabled,
    border: 'none',
  },
  [StyleVariants.TRANSPARENT]: {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.common.black}`,
  },
};

export const ButtonPaddings = {
  [PaddingVariants.XS]: '4px 24px',
  [PaddingVariants.SM]: '8px 24px',
  [PaddingVariants.MD]: '12px 24px',
  [PaddingVariants.LG]: '16px 24px',
  [PaddingVariants.XL]: '18px 24px',
};
