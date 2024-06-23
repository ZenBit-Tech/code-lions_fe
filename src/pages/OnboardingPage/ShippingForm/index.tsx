import { useState } from 'react';
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
import { CustomSelect } from 'src/components/shared/StyledSelect';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import InputLabel from 'src/pages/OnboardingPage/CreditCardForm/styles';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import {
  ErrorWrapper,
  ErrorMessage,
} from 'src/pages/SignUpPage/SignUpForm/styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useUpdateAddressMutation } from 'src/redux/user/userService';
import { decreaseOnboardingStep } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import addressSchema from './schema';

interface IAddressForm {
  addressLine1: string;
  addressLine2?: string | null;
}

interface IAddressFullForm {
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
}

const countries = [{ label: 'Canada', value: 'Canada' }];
const states = [
  { label: 'Ontario', value: 'Ontario' },
  { label: 'Quebec', value: 'Quebec' },
  { label: 'Nova Scotia', value: 'Nova Scotia' },
  { label: 'New Brunswick', value: 'New Brunswick' },
  { label: 'Manitoba', value: 'Manitoba' },
  { label: 'British Columbia', value: 'British Columbia' },
  { label: 'Alberta', value: 'Alberta' },
  { label: 'Saskatchewan', value: 'Saskatchewan' },
  { label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador' },
  { label: 'Prince Edward Island', value: 'Prince Edward Island' },
];

const cities = [
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Montreal', value: 'Montreal' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Fredericton', value: 'Fredericton' },
  { label: 'Charlottetown', value: 'Charlottetown' },
  { label: "St. John's", value: "St. John's" },
  { label: 'Regina', value: 'Regina' },
  { label: 'Calgary', value: 'Calgary' },
  { label: 'Saskatoon', value: 'Saskatoon' },
  { label: 'Halifax', value: 'Halifax' },
];

function OnboardingShippingForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [country, setCountry] = useState(user.country || countries[0].value);
  const [state, setState] = useState(user.state || states[0].value);
  const [city, setCity] = useState(user.city || cities[0].value);
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IAddressForm>({
    defaultValues: {
      addressLine1: user.addressLine1 || '',
      addressLine2: user.addressLine2 || '',
    },
    resolver: yupResolver(addressSchema),
    mode: 'onTouched',
  });
  const errorsLength: number = Object.keys(errors).length;

  const returnBack = () => {
    dispatch(decreaseOnboardingStep());
  };

  const onSubmit = async (form: IAddressForm) => {
    const addressToSend: IAddressFullForm = {
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2 || '',
      country,
      state,
      city,
    };

    try {
      await updateAddress({ id: user.id, ...addressToSend }).unwrap();
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
            justifyContent: 'flex-start',
            width: '250px',
          }}
        >
          <OnboardingHeader4 component="h4">
            {t('onboarding.shippingAddress')}
          </OnboardingHeader4>
          <OnboardingText variant="subtitle2">
            {t('onboarding.addYourShippingAddress')}
          </OnboardingText>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.addressLine1')}
            </InputLabel>
            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <ErrorWrapper>
                  <StyledInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    placeholder={t('onboarding.street')}
                    padding={InputPaddingVariants.MD}
                    stylevariant={InputStyleVariants.OUTLINED}
                    width="100%"
                    error={!!errors.addressLine1}
                  />
                  {errors.addressLine1 && (
                    <ErrorMessage
                      variant="subtitle2"
                      mt={1}
                      color={theme.palette.error.main}
                    >
                      {errors.addressLine1.message}
                    </ErrorMessage>
                  )}
                </ErrorWrapper>
              )}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.addressLine2')}
            </InputLabel>
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => (
                <ErrorWrapper>
                  <StyledInput
                    {...field}
                    fullWidth
                    autoComplete="off"
                    placeholder={t('onboarding.street')}
                    padding={InputPaddingVariants.MD}
                    stylevariant={InputStyleVariants.OUTLINED}
                    width="100%"
                    error={!!errors.addressLine2}
                  />
                  {errors.addressLine2 && (
                    <ErrorMessage
                      variant="subtitle2"
                      mt={1}
                      color={theme.palette.error.main}
                    >
                      {errors.addressLine2.message}
                    </ErrorMessage>
                  )}
                </ErrorWrapper>
              )}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.country')}
            </InputLabel>
            <CustomSelect
              options={countries}
              displayEmpty
              value={country}
              onChange={(v) => setCountry(String(v.target.value))}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.state')}
            </InputLabel>
            <CustomSelect
              options={states}
              displayEmpty
              value={state}
              onChange={(v) => setState(String(v.target.value))}
            />
          </Box>

          <Box>
            <InputLabel variant="h2" component="h4">
              {t('onboarding.city')}
            </InputLabel>
            <CustomSelect
              options={cities}
              displayEmpty
              value={city}
              onChange={(v) => setCity(String(v.target.value))}
            />
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

export default OnboardingShippingForm;
