import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

export const OnboardingHeader4 = styled(Typography)<TypographyProps>(() => ({
  marginBottom: 8,
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.bold.fontWeight,
  fontSize: theme.typography.h3.fontSize,
  lineHeight: 1.37,
  letterSpacing: 0,
}));

export const OnboardingText = styled(Typography)<TypographyProps>(() => ({
  letterSpacing: 0.14,
  color: theme.palette.text.disabled,
}));
