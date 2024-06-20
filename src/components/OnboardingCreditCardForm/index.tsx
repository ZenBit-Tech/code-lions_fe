import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

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
import { useAppDispatch } from 'src/redux/hooks';
import {
  increaseOnboardingStep,
  decreaseOnboardingStep,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

import InputLabel from './styles';

function OnboardingCreditCardForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sendRequest = () => {
    dispatch(increaseOnboardingStep());
  };

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
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
            {t('onboarding.creditCard')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.addYourCard')}
          </OnboardingText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.cardNumber')}
            </InputLabel>
            <StyledInput
              fullWidth
              autoComplete="off"
              placeholder={t('onboarding.cardNumberValue')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
              width="100%"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              mt: '20px',
            }}
          >
            <Box sx={{ width: '57%' }}>
              <Box>
                <InputLabel variant="h2" component="h4">
                  {t('onboarding.expiryDate')}
                </InputLabel>
                <StyledInput
                  fullWidth
                  autoComplete="off"
                  placeholder={t('onboarding.mmYy')}
                  padding={InputPaddingVariants.MD}
                  stylevariant={InputStyleVariants.OUTLINED}
                  width="100%"
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box>
                <InputLabel variant="h2" component="h4">
                  {t('onboarding.cvvCode')}
                </InputLabel>
                <StyledInput
                  fullWidth
                  autoComplete="off"
                  placeholder={t('onboarding.cvvCodeValue')}
                  padding={InputPaddingVariants.MD}
                  stylevariant={InputStyleVariants.OUTLINED}
                  width="100%"
                />
              </Box>
            </Box>
          </Box>
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
          onClick={returnBack}
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
          onClick={sendRequest}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingCreditCardForm;
