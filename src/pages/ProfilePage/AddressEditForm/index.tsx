import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import { cities, countries, states } from 'src/common/selectAdressOptions';
import LabelText from 'src/components/shared/LabelText';
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
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUpdatePersonalInfoMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';

import { ErrorMessage, ErrorWrapper } from '../PersonalInformationForm/styles';
import useErrorHandling from '../useErrorHandlingHook';

import addressSchema from './schema';

interface IAddressEditForm {
  setShowEdit: (arg0: boolean) => void;
}

interface IAddressFullForm {
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state: string;
  city: string;
}

function AddressEditForm({ setShowEdit }: IAddressEditForm) {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const [updateAddress, { isLoading }] = useUpdatePersonalInfoMutation();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IAddressFullForm>({
    defaultValues: {
      addressLine1: user.addressLine1 || '',
      addressLine2: user.addressLine2 || '',
      country: user.country || '',
      state: user.state || '',
      city: user.city || '',
    },
    resolver: yupResolver(addressSchema),
    mode: 'onTouched',
  });

  const errorsLength: number = Object.keys(errors).length;

  const { handleOnSubmitError } = useErrorHandling();

  const onSubmit = async (data: IAddressFullForm) => {
    try {
      await updateAddress({
        id: user.id,
        ...data,
      }).unwrap();
      setShowEdit(false);
    } catch (err) {
      handleOnSubmitError(err, showToast, t('profileDetails.unknownError'));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        mt: '20px',
        mb: '20px',
      }}
    >
      <TitleInputWrapper>
        <LabelText>{t('onboarding.addressLine1')}</LabelText>
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
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.addressLine1.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText>{t('onboarding.addressLine2')}</LabelText>
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
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.addressLine2.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText>{t('onboarding.country')}</LabelText>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CustomSelect {...field} options={countries} />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText>{t('onboarding.state')}</LabelText>
        <Controller
          name="state"
          control={control}
          render={({ field }) => <CustomSelect {...field} options={states} />}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText>{t('onboarding.city')}</LabelText>
        <Controller
          name="city"
          control={control}
          render={({ field }) => <CustomSelect {...field} options={cities} />}
        />
      </TitleInputWrapper>
      <StyledButton
        type="submit"
        width="101px"
        disabled={!isValid || errorsLength > 0 || isLoading}
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.SM}
      >
        <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
      </StyledButton>
    </Box>
  );
}

export default AddressEditForm;
