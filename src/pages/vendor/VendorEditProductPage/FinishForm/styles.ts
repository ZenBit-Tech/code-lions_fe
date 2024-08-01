import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

const OnboardingHeader3 = styled(Typography)<TypographyProps>(() => ({
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.bold.fontWeight,
  fontSize: theme.typography.h5.fontSize,
  lineHeight: 1.4,
}));

export default OnboardingHeader3;
