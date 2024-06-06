import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAppDispatch } from 'src/redux/hooks';
import { useUserSignUpMutation } from 'src/redux/user/service';
import { setUser } from 'src/redux/user/userSlice';
import theme from 'src/theme';
import { urls, validations } from 'src/common/constants';
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
import { FormStyled, ErrorWrapper, ErrorMessage } from './styles';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const [userSignUp, { isLoading }] = useUserSignUpMutation();

  const onSubmit: SubmitHandler<ISignUpForm> = async ({
    name,
    email,
    password,
  }) => {
    if ([name, email, password].every(Boolean) && !isLoading) {
      try {
        const userData = await userSignUp({ name, email, password }).unwrap();

        dispatch(setUser(userData));
        navigate(urls.VERIFY);
      } catch (err) {
        console.error('Failed to register user: ', err);
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
          rules={{
            required: t('authErrors.missingCredentials'),
          }}
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
          rules={{
            required: t('authErrors.missingCredentials'),
            pattern: {
              value: validations.EMAIL_REGEX,
              message: t('authErrors.invalidEmail'),
            },
          }}
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
          rules={{
            required: t('authErrors.missingCredentials'),
            minLength: {
              value: validations.PASSWORD_MIN_LENGTH,
              message: t('authErrors.passwordLength'),
            },
          }}
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
          rules={{
            required: t('authErrors.missingCredentials'),
            minLength: {
              value: validations.PASSWORD_MIN_LENGTH,
              message: t('authErrors.passwordLength'),
            },
            validate: (value) => {
              return (
                watch('password') === value || t('authErrors.passwordsNotMatch')
              );
            },
          }}
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
