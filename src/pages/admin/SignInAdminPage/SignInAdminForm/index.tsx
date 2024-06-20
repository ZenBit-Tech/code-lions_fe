import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { appErrors, urls, validations } from 'src/common/constants';
import LabelText from 'src/components/shared/LabelText';
import PasswordInput from 'src/components/shared/PasswordInput';
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
import {
  CustomFetchBaseQueryError,
  IErrorResponse,
  SerializedError,
} from 'src/redux/user/types';
import { useLoginUserMutation } from 'src/redux/user/userService';
import theme from 'src/theme';

import FormStyled, { ErrorMessage } from './styles';

interface IFormInput {
  email: string;
  password: string;
}

function SignInAdminForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const errorsLength: number = Object.keys(errors).length;

  const getErrorMessage = (
    error: CustomFetchBaseQueryError | SerializedError
  ): string => {
    if (
      'data' in error &&
      error.data &&
      (error.data as IErrorResponse).message
    ) {
      return (error.data as IErrorResponse).message as string;
    }

    return t('authErrors.failed');
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await login({ email, password }).unwrap();

      navigate(urls.ADMIN_USERS_FULL);
    } catch (err) {
      const error = err as CustomFetchBaseQueryError | SerializedError;
      const errorMessage = appErrors.FAILED_SIGN_IN;
      const updatedError = error;

      if (updatedError) {
        showToast('error', getErrorMessage(updatedError));
      } else {
        showToast('error', errorMessage);
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText>{t('signin.emailLabel')}</LabelText>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('authErrors.enterCredentials'),
            pattern: {
              value: validations.EMAIL_REGEX,
              message: t('authErrors.invalidEmail'),
            },
          }}
          render={({ field }) => (
            <Box>
              <StyledInput
                fullWidth
                autoComplete="off"
                placeholder={t('signin.emailPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
                {...field}
              />
              {errors.email && (
                <ErrorMessage mt={1} color={theme.palette.error.main}>
                  {errors.email.message}
                </ErrorMessage>
              )}
            </Box>
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText>{t('signin.passwordLabel')}</LabelText>
        <Controller
          name="password"
          control={control}
          rules={{
            required: t('authErrors.enterCredentials'),
            minLength: {
              value: validations.PASSWORD_MIN_LENGTH,
              message: t('authErrors.passwordLength'),
            },
          }}
          render={({ field }) => (
            <Box>
              <PasswordInput
                fullWidth
                autoComplete="off"
                placeholder={t('signin.passwordPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.password}
                {...field}
              />
              {errors.password && (
                <ErrorMessage mt={1} color={theme.palette.error.main}>
                  {errors.password.message}
                </ErrorMessage>
              )}
            </Box>
          )}
        />
      </TitleInputWrapper>
      <StyledButton
        fullWidth
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        disabled={!isDirty || !isValid || errorsLength > 0 || isLoading}
      >
        <Typography variant="button">{t('signin.singInButton')}</Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignInAdminForm;
