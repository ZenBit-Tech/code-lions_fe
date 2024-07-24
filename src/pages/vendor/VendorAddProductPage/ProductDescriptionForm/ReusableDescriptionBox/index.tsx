import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';

interface ReusableDescriptionBoxProps {
  descriptionTitle: string;
  descriptionSubtitle: string;
}

function ReusableDescriptionBox({
  descriptionTitle,
  descriptionSubtitle,
}: ReusableDescriptionBoxProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '236px',
      }}
    >
      <OnboardingHeader4 component="h4">
        {t(descriptionTitle)}
      </OnboardingHeader4>
      <OnboardingText variant="subtitle2">
        {t(descriptionSubtitle)}
      </OnboardingText>
    </Box>
  );
}

export default ReusableDescriptionBox;
