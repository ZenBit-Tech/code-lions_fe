import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Box, Typography } from '@mui/material';

import { validations } from 'src/common/constants';
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
import { useResetPasswordMutation } from 'src/redux/auth/authApi';
import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from 'src/redux/auth/authSlice';
import theme from 'src/theme';

interface IFormInput {
  password: string;
  repeatPassword: string;
}

function NewPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

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
  const password = watch('password');
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(resetPasswordStart());
    try {
      const response = await resetPassword({
        password: data.password,
        repeatPassword: data.repeatPassword,
      }).unwrap();

      dispatch(resetPasswordSuccess(response));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(resetPasswordFailure(err.message));
        showToast('error', err.message);
      } else {
        dispatch(resetPasswordFailure(t('newPassword.unknownError')));
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
              value === password || t('newPasswordErrors.passwordsNotMatch'),
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
        <Typography variant="button" color={theme.palette.common.white}>
          {t('newPassword.savePasswordButton')}
        </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default NewPasswordForm;
