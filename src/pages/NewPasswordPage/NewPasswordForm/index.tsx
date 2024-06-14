import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { urls, validations } from 'src/common/constants';
import LabelText from 'src/components/shared/LabelText';
import PasswordInput from 'src/components/shared/PasswordInput';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import FormStyled from 'src/pages/SignInPage/SignInForm/styles';
import { useNewPasswordMutation } from 'src/redux/user/userService';
import theme from 'src/theme';

interface IFormInput {
  password: string;
  repeatPassword: string;
}

function NewPasswordForm() {
  const { t } = useTranslation();
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
  });

  const errorsLength: number = Object.keys(errors).length;
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async ({ password }) => {
    try {
      await newPassword({ password }).unwrap();
      showToast('success', t('newPassword.passwordChanged'));
      navigate(urls.HOME);
    } catch (err) {
      if (err instanceof Error) {
        showToast('error', err.message);
      } else {
        showToast('error', t('newPassword.unknownError'));
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText> {t('newPassword.passwordLabel')} </LabelText>
        <Controller
          name="password"
          control={control}
          rules={{
            required: t('newPasswordErrors.enterCredentials'),
            minLength: {
              value: validations.PASSWORD_MIN_LENGTH,
              message: t('newPasswordErrors.passwordLength'),
            },
          }}
          render={({ field }) => (
            <Box>
              <PasswordInput
                fullWidth
                autoComplete="off"
                placeholder={t('inputPlaceholder.userPassword')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.password}
                {...field}
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
        <LabelText> {t('newPassword.repeatPasswordLabel')} </LabelText>
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: t('newPasswordErrors.enterCredentials'),
            minLength: {
              value: validations.PASSWORD_MIN_LENGTH,
              message: t('newPasswordErrors.passwordLength'),
            },
            validate: (value) =>
              value === watch('password') ||
              t('newPasswordErrors.passwordsNotMatch'),
          }}
          render={({ field }) => (
            <Box>
              <PasswordInput
                fullWidth
                autoComplete="off"
                placeholder={t('inputPlaceholder.userPassword')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.repeatPassword}
                {...field}
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
        fullWidth
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        disabled={!isDirty || !isValid || errorsLength > 0 || isLoading}
      >
        <Typography variant="button">
          {t('newPassword.savePasswordButton')}
        </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default NewPasswordForm;
