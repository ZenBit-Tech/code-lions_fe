import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
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
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import {
  ErrorWrapper,
  ErrorMessage,
} from 'src/pages/SignUpPage/SignUpForm/styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useUpdateCreditCardMutation } from 'src/redux/user/userService';
import { decreaseOnboardingStep } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import creditCardSchema from './schema';
import InputLabel from './styles';

interface ICreditCardForm {
  cardNumber: string;
  expireDate: string;
  cvvCode: string;
}

function OnboardingCreditCardForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [updateCreditCard, { isLoading }] = useUpdateCreditCardMutation();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ICreditCardForm>({
    defaultValues: {
      cardNumber: '',
      expireDate: '',
      cvvCode: '',
    },
    resolver: yupResolver(creditCardSchema),
    mode: 'onTouched',
  });
  const errorsLength: number = Object.keys(errors).length;

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const onSubmit = async (form: ICreditCardForm) => {
    try {
      await updateCreditCard({ id: user.id, ...form }).unwrap();
    } catch (err) {
      if (err instanceof Error) {
        showToast('error', err.message);
      } else {
        showToast('error', t('onboarding.unknownError'));
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <ErrorWrapper>
                  <StyledInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    placeholder={t('onboarding.cardNumberValue')}
                    padding={InputPaddingVariants.MD}
                    stylevariant={InputStyleVariants.OUTLINED}
                    width="100%"
                    error={!!errors.cardNumber}
                  />
                  {errors.cardNumber && (
                    <ErrorMessage
                      variant="subtitle2"
                      mt={1}
                      color={theme.palette.error.main}
                    >
                      {errors.cardNumber.message}
                    </ErrorMessage>
                  )}
                </ErrorWrapper>
              )}
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

                <Controller
                  name="expireDate"
                  control={control}
                  render={({ field }) => (
                    <ErrorWrapper>
                      <StyledInput
                        {...field}
                        fullWidth
                        autoComplete="off"
                        placeholder={t('onboarding.mmYy')}
                        padding={InputPaddingVariants.MD}
                        stylevariant={InputStyleVariants.OUTLINED}
                        width="100%"
                        error={!!errors.expireDate}
                      />
                      {errors.expireDate && (
                        <ErrorMessage
                          variant="subtitle2"
                          mt={1}
                          color={theme.palette.error.main}
                        >
                          {errors.expireDate.message}
                        </ErrorMessage>
                      )}
                    </ErrorWrapper>
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box>
                <InputLabel variant="h2" component="h4">
                  {t('onboarding.cvvCode')}
                </InputLabel>
                <Controller
                  name="cvvCode"
                  control={control}
                  render={({ field }) => (
                    <ErrorWrapper>
                      <StyledInput
                        {...field}
                        fullWidth
                        autoComplete="off"
                        placeholder={t('onboarding.cvvCodeValue')}
                        padding={InputPaddingVariants.MD}
                        stylevariant={InputStyleVariants.OUTLINED}
                        width="100%"
                        error={!!errors.cvvCode}
                      />
                      {errors.cvvCode && (
                        <ErrorMessage
                          variant="subtitle2"
                          mt={1}
                          color={theme.palette.error.main}
                        >
                          {errors.cvvCode.message}
                        </ErrorMessage>
                      )}
                    </ErrorWrapper>
                  )}
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
          type="submit"
          disabled={!isValid || errorsLength > 0 || isLoading}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default OnboardingCreditCardForm;
