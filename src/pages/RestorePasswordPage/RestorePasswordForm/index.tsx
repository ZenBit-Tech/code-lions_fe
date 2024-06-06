import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForgotPasswordMutation } from 'src/redux/auth/authApi';
import { useAppDispatch } from 'src/redux/auth/hooks/hooks';
import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } from 'src/redux/auth/authSlice';
import { IForgotPasswordDto } from "src/redux/auth/types/email";
import theme from 'src/theme';
import { appErrors, urls, validations } from "src/common/constants";
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
import FormStyled from "src/pages/SignInPage/SignInForm/styles";

interface IFormInput {
  email: string;
}

function RestorePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const errorsLength: number = Object.keys(errors).length;
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(forgotPasswordStart());
    try {
      const emailData: IForgotPasswordDto = {
        email: data.email,
      };
      await forgotPassword(emailData).unwrap();
      dispatch(forgotPasswordSuccess());
      navigate(urls.ENTER_CODE);
    } catch (err: any) {
      let errorMessage = appErrors.FAILED_TO_SEND_EMAIL;
      if (err.data && err.data.message) {
        if (Array.isArray(err.data.message)) {
          errorMessage = err.data.message.join(', ');
        } else {
          errorMessage = err.data.message;
        }
      }
      showToast('error', errorMessage);
      dispatch(forgotPasswordFailure(errorMessage));
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText>{t('restorePassword.emailLabel')}</LabelText>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('restorePassword.enterCredentials'),
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
                placeholder={t('inputPlaceholder.userEmail')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                error={!!errors.email}
                {...field}
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
      <StyledButton
        fullWidth
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        disabled={!isDirty || !isValid || errorsLength > 0 || isLoading}
      >
        <Typography variant="button" color={theme.palette.common.white}>
          {t('restorePassword.sendCode')}
        </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default RestorePasswordForm;
