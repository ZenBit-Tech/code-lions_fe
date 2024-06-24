import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { phoneCodes } from 'src/common/constants';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/getErrorMessage';
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
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUpdatePersonalInfoMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';

import personalInformationSchema from './schema';
import { ErrorMessage, ErrorWrapper, FormStyled, TitleStyled } from './styles';

interface IPersonalInformationForm {
  name: string;
  email: string;
  phone: string;
}

function PersonalInformationForm() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const [updateInfo, { isLoading }] = useUpdatePersonalInfoMutation();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IPersonalInformationForm>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
    },
    resolver: yupResolver(personalInformationSchema),
    mode: 'onTouched',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit = async ({ name, email, phone }: IPersonalInformationForm) => {
    try {
      await updateInfo({
        id: user.id,
        name,
        email,
        phoneNumber: `${phoneCodes.CANADA}${phone}`,
      }).unwrap();
      reset({
        name,
        email,
        phone,
      });
    } catch (err) {
      if (isFetchBaseQueryError(err) || isSerializedError(err)) {
        showToast(
          'error',
          getErrorMessage(err, t('profileDetails.unknownError'))
        );
      } else {
        showToast('error', t('profileDetails.unknownError'));
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleStyled variant="subtitle1">
        {t('profileDetails.personalInformation')}
      </TitleStyled>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.name')} </LabelText>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('profileDetails.namePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.name}
              />
              {errors.name && (
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.name.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.email')} </LabelText>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                name="email"
                autoComplete="off"
                placeholder={t('profileDetails.emailPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
              />
              {errors.email && (
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.email.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.phone')} </LabelText>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                name="phone"
                autoComplete="off"
                placeholder={t('profileDetails.phonePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.phone}
              />
              {errors.phone && (
                <ErrorMessage variant="subtitle2" mt={1}>
                  {errors.phone.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      {isDirty && (
        <StyledButton
          type="submit"
          disabled={!isValid || errorsLength > 0 || isLoading}
          width="101px"
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
        >
          <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
        </StyledButton>
      )}
    </FormStyled>
  );
}

export default PersonalInformationForm;
