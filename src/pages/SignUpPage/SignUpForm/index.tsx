import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useUserSignUpMutation } from 'src/redux/user/userService';
import theme from 'src/theme';
import { urls } from 'src/common/constants';
import PasswordInput from 'src/components/shared/PasswordInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import StyledInput from 'src/components/shared/StyledInput';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import LabelText from 'src/components/shared/LabelText';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { SerializedError } from 'src/redux/user/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FormStyled, ErrorWrapper, ErrorMessage } from './styles';
import userSignUpSchema from './schema';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error != null && 'message' in error;
}

function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<ISignUpForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(userSignUpSchema),
    mode: 'onTouched',
  });

  watch('password');

  const errorsLength: number = Object.keys(errors).length;

  const [userSignUp, { isLoading }] = useUserSignUpMutation();

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if (
      'data' in error &&
      error.data &&
      (error.data as { message?: string }).message
    ) {
      return (error.data as { message: string }).message;
    }

    return t('authErrors.failed');
  };

  const onSubmit: SubmitHandler<ISignUpForm> = async ({
    name,
    email,
    password,
  }) => {
    if ([name, email, password].every(Boolean) && !isLoading) {
      try {
        await userSignUp({
          name,
          email,
          password,
        }).unwrap();

        navigate(urls.VERIFY);
      } catch (err) {
        if (isFetchBaseQueryError(err) || isSerializedError(err)) {
          showToast('error', getErrorMessage(err));
        } else {
          showToast('error', t('authErrors.failed'));
        }
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText> {t('signup.nameLabel')} </LabelText>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <StyledInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('signup.namePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.name}
              />
              {errors.name && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.name.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.emailLabel')} </LabelText>
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
                placeholder={t('signup.emailPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
              />
              {errors.email && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.email.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.passwordLabel')} </LabelText>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <PasswordInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('signup.passwordPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.password}
              />
              {errors.password && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.password.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.repeatPasswordLabel')} </LabelText>
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <ErrorWrapper>
              <PasswordInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('signup.passwordPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.repeatPassword}
              />
              {errors.repeatPassword && (
                <ErrorMessage
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.error.main}
                >
                  {errors.repeatPassword.message}
                </ErrorMessage>
              )}
            </ErrorWrapper>
          )}
        />
      </TitleInputWrapper>
      <StyledButton
        sx={{ marginTop: '20px' }}
        width="100%"
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        disabled={!isDirty || !isValid || errorsLength > 0}
      >
        <Typography variant="button"> {t('signup.singUpButton')} </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignUpForm;
