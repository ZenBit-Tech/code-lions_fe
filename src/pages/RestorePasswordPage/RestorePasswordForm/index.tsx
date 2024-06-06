import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import theme from 'src/theme.tsx';
import { appErrors, urls, validations } from "src/common/constants.ts";
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types.ts';
import StyledInput from 'src/components/shared/StyledInput';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types.ts';
import LabelText from 'src/components/shared/LabelText';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';
import { useForgotPasswordMutation } from 'src/redux/auth/authApi.ts';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/redux/hooks/hooks.ts';
import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } from 'src/redux/auth/authSlice.ts';
import FormStyled from "src/pages/SignInPage/SignInForm/styles.ts";
import { IForgotPasswordDto } from "src/redux/types/email.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IFormInput {
  email: string;
}

function RestorePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

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
      dispatch(forgotPasswordFailure(errorMessage));
    }
  };

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
    if ('data' in error && error.data && (error.data as { message?: string }).message) {
      return (error.data as { message: string }).message;
    }
    return t('restorePassword.emailFailed');
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
      {error && (
        <Typography color="error">
          {getErrorMessage(error)}
        </Typography>
      )}
    </FormStyled>
  );
}

export default RestorePasswordForm;
