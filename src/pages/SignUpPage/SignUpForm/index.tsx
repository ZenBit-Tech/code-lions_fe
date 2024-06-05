import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserSignUpMutation } from 'src/redux/apiUserSlice';
import theme from 'src/theme';
import { validations } from 'src/common/constants';
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
import FormStyled from './styles';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUpForm() {
  const { t } = useTranslation();

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

  // const password = watch('password');

  const errorsLength: number = Object.keys(errors).length;

  const [userSignUp, { isLoading }] = useUserSignUpMutation();

  const onSubmit: SubmitHandler<ISignUpForm> = async ({
    name,
    email,
    password,
  }) => {
    if ([name, email, password].every(Boolean) && !isLoading) {
      try {
        await userSignUp({ name, email, password }).unwrap();
      } catch (err) {
        console.error('Failed to save the post: ', err);
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
            <Box>
              <StyledInput
                {...field}
                autoComplete="off"
                placeholder={t('signup.namePlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography mt={1} color={theme.palette.error.main}>
                  {errors.name.message}
                </Typography>
              )}
            </Box>
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
            <Box>
              <StyledInput
                {...field}
                name="email"
                autoComplete="off"
                placeholder={t('signup.emailPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography mt={1} color={theme.palette.error.main}>
                  {errors.email.message}
                </Typography>
              )}
            </Box>
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
            <Box>
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
                <Typography mt={1} color={theme.palette.error.main}>
                  {errors.password.message}
                </Typography>
              )}
            </Box>
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
            <Box>
              <PasswordInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('signup.passwordPlaceholder')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
              />
              {errors.repeatPassword && (
                <Typography mt={1} color={theme.palette.error.main}>
                  {errors.repeatPassword.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </TitleInputWrapper>
      <StyledButton
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
