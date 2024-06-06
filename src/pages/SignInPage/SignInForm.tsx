import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
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
import TextButton from 'src/components/shared/TextButton';
import { FormStyled, LinkStyled } from './styles';

interface IFormInput {
  email: string;
  password: string;
}

function SignInForm() {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    return data;
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
            <Box height="45px" mb={1}>
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
                <Typography mt={0.25} color={theme.palette.error.main}>
                  {errors.email.message}
                </Typography>
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
            <Box height="45px" mb={1.5}>
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
                <Typography color={theme.palette.error.main} mt={0.25}>
                  {errors.password.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </TitleInputWrapper>
      <Box display="flex" alignItems="center">
        <TextButton sx={{ padding: '0' }}>
          <LinkStyled to={urls.RESTORE_PASSWORD}>
            <LabelText align="right">{t('signin.forgotPassword')}</LabelText>
          </LinkStyled>
        </TextButton>
      </Box>
      <StyledButton
        fullWidth
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        disabled={!isDirty || !isValid || errorsLength > 0}
      >
        <Typography variant="button" color={theme.palette.common.white}>
          {t('signin.singInButton')}
        </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignInForm;
