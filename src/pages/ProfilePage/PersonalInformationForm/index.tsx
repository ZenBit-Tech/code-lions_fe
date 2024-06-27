import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography, Select, MenuItem } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import ChevronDown from 'src/assets/icons/chevron-down.svg';
import { countryCodes } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import dividePhoneNumber from 'src/common/utils/dividePhoneNumber';
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
import { selectUser, selectUserPhone } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import personalInformationSchema from './schema';
import {
  ErrorMessage,
  ErrorWrapper,
  FormStyled,
  TitleStyled,
  StyledFormControl,
  StyledPhoneInput,
  StyledPhoneWrapper,
} from './styles';

interface IPersonalInformationForm {
  name: string;
  email: string;
  countryCode: string;
  restPhoneNumber: string;
}

function PersonalInformationForm() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const userPhone = useAppSelector(selectUserPhone);
  const [updateInfo, { isLoading }] = useUpdatePersonalInfoMutation();
  const { showToast } = useToast();
  const { countryCode: userCountryCode, restPhoneNumber: userRestPhoneNumber } =
    dividePhoneNumber(userPhone);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IPersonalInformationForm>({
    defaultValues: {
      name: user.name,
      email: user.email,
      countryCode: userCountryCode,
      restPhoneNumber: userRestPhoneNumber,
    },
    resolver: yupResolver(personalInformationSchema),
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const { handleOnSubmitError } = useErrorHandling();
  const methods = useForm();

  const onSubmit = async ({
    name,
    email,
    countryCode,
    restPhoneNumber,
  }: IPersonalInformationForm) => {
    try {
      await updateInfo({
        id: user.id,
        name,
        email,
        phoneNumber: `${countryCode}${restPhoneNumber}`,
      }).unwrap();
      reset({
        name,
        email,
        countryCode,
        restPhoneNumber,
      });
    } catch (err) {
      handleOnSubmitError(err, showToast, t('profileDetails.unknownError'));
    }
  };

  return (
    <FormProvider {...methods}>
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
          <ErrorWrapper>
            <StyledPhoneWrapper>
              <Controller
                name="countryCode"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledFormControl>
                    <Select
                      onChange={onChange}
                      value={value}
                      variant="outlined"
                      size="small"
                      error={!!errors.countryCode}
                      IconComponent={(props) => <ChevronDown {...props} />}
                      sx={{
                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                        backgroundColor: theme.palette.secondary.main,
                        '.MuiSelect-select': {
                          padding: '3px 6px',
                          borderRadius: '6px',
                        },
                        '.MuiSelect-icon': {
                          width: '20px',
                          height: '20px',
                          top: 4,
                        },
                      }}
                    >
                      {countryCodes.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                )}
              />
              <Controller
                name="restPhoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledPhoneInput
                    onChange={onChange}
                    value={value}
                    fullWidth
                    error={!!errors.restPhoneNumber}
                  />
                )}
              />
            </StyledPhoneWrapper>
            {errors.restPhoneNumber && (
              <ErrorMessage variant="subtitle2" mt={1}>
                {errors.restPhoneNumber.message}
              </ErrorMessage>
            )}
          </ErrorWrapper>
        </TitleInputWrapper>

        {isDirty && (
          <StyledButton
            type="submit"
            disabled={!isValid || errorsLength > 0 || isLoading}
            width="101px"
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM}
          >
            <Typography variant="h4">
              {t('profileDetails.saveButton')}
            </Typography>
          </StyledButton>
        )}
      </FormStyled>
    </FormProvider>
  );
}

export default PersonalInformationForm;
