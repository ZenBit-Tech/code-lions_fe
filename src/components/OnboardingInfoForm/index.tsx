import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import PhotoIcon from 'src/assets/icons/photo.svg';
import UserImageIcon from 'src/assets/icons/user-image.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import theme from 'src/theme';

function OnboardingInfoForm() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '281px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.profilePhoto')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.choosePhoto')}
          </OnboardingText>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '46px' }}>
          <Box
            sx={{
              boxSizing: 'content-box',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `.75px solid ${theme.palette.secondary.main}`,
            }}
          >
            <UserImageIcon />
          </Box>
          <StyledButton
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM2}
            variant="contained"
            fontSize="14px"
          >
            <Box sx={{ mr: '8px' }}>
              <PhotoIcon />
            </Box>
            {t('onboarding.uploadPhoto')}
          </StyledButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '281px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.phoneNumber')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.enterNumber')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <StyledInput
            fullWidth
            autoComplete="off"
            placeholder=""
            padding={InputPaddingVariants.MD}
            stylevariant={InputStyleVariants.OUTLINED}
            width="100%"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          paddingTop: '24px',
        }}
      >
        <StyledButton
          styles={StyleVariants.TRANSPARENT2}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize="14px"
          fontFamily={theme.typography.fontFamily}
          radius="8px"
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingInfoForm;
