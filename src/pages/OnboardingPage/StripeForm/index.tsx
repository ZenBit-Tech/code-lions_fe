import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import { useAppDispatch } from 'src/redux/hooks';
import { useCreateStripeAccountMutation } from 'src/redux/user/userService';
import {
  decreaseOnboardingStep,
  increaseOnboardingStep,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

const successSearch = '?success=true';

function OnboardingStripeForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isStripeLoaded, setIsStripeLoaded] = useState(false);

  const isStripeSuccess = location.search === successSearch;

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const finishOnboarting = () => {
    dispatch(increaseOnboardingStep());
  };

  const [createStripeAccount, { isLoading }] = useCreateStripeAccountMutation();

  const handleStripeOnboarding = async () => {
    try {
      const { data } = await createStripeAccount();

      if (!data || !data.url) {
        showToast('error', t('onboarding.stripeError'));
      } else {
        window.location.href = data.url;
        setIsStripeLoaded(true);
      }
    } catch (err) {
      showToast('error', t('onboarding.stripeError'));
    }
  };

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
            width: '236px',
            mr: '60px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.stripeAccount')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.stripeOnboarding')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1, paddingTop: '24px' }}>
          {isStripeSuccess ? (
            <Typography>{t('onboarding.stripeSuccess')}</Typography>
          ) : (
            <StyledButton
              onClick={handleStripeOnboarding}
              disabled={isLoading || isStripeLoaded}
            >
              <Typography>{t('onboarding.stripeConnect')}</Typography>
            </StyledButton>
          )}
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
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          onClick={returnBack}
          disabled={isStripeSuccess}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          radius="8px"
          onClick={finishOnboarting}
          disabled={!isStripeSuccess}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingStripeForm;
