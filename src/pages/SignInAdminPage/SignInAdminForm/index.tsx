import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLoginMutation } from 'src/redux/auth/authApi';
import { useAppDispatch } from 'src/redux/auth/hooks/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  setTokens,
  setUser,
} from 'src/redux/auth/authSlice';
import { ILoginDto, ILoginResponse } from 'src/redux/auth/types/user';
import {
  CustomFetchBaseQueryError,
  IErrorResponse,
  SerializedError,
} from 'src/redux/user/types';
import theme from 'src/theme';
import { appErrors, urls, validations } from 'src/common/constants';
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
import FormStyled, { ErrorMessage } from './styles';

interface IFormInput {
  email: string;
  password: string;
}

function SignInAdminForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(loginStart());
    try {
      const loginData: ILoginDto = {
        email: data.email,
        password: data.password,
      };
      const response: ILoginResponse = await login(loginData).unwrap();
      const { user, tokens } = response;

      dispatch(loginSuccess({ user, tokens }));
      dispatch(setUser(user));
      dispatch(setTokens(tokens));

      navigate(urls.HOME);
    } catch (err) {
      const error = err as CustomFetchBaseQueryError | SerializedError;
      const errorMessage = appErrors.FAILED_SIGN_IN;
      const updatedError = error;

      if (updatedError) {
        showToast('error', getErrorMessage(updatedError));
      } else {
        showToast('error', errorMessage);
      }
      dispatch(loginFailure(errorMessage));
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
        <Typography variant="button" color={theme.palette.common.white}>
          {t('signin.singInButton')}
        </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignInAdminForm;
