import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
import { urls } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import LabelText from 'src/components/shared/LabelText';
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
  ErrorMessage,
  ErrorWrapper,
  FormStyled,
} from 'src/pages/ProfilePage/PersonalInformationForm/styles';
import { useAppSelector } from 'src/redux/hooks';
import { useChangeEmailMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import emailSchema from './schema';

interface IChangeEmailForm {
  email: string;
}

function ChangeEmailForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { handleOnSubmitError } = useErrorHandling();
  const navigate = useNavigate();

  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const user = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IChangeEmailForm>({
    defaultValues: {
      email: user.email,
    },
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit: SubmitHandler<IChangeEmailForm> = async ({ email }) => {
    try {
      await changeEmail({ email }).unwrap();
      showToast('success', t('settings.emailSuccess'));
      reset();
      navigate(urls.VERIFY);
    } catch (error) {
      handleOnSubmitError(error, showToast, t('settings.emailError'));
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText> {t('settings.email')} </LabelText>
        <Box display="flex" gap="32px" justifyContent="space-between">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <ErrorWrapper sx={{ width: '100%' }}>
                <StyledInput
                  {...field}
                  fullWidth
                  autoComplete="off"
                  placeholder={t('profileDetails.namePlaceholder')}
                  padding={InputPaddingVariants.MD}
                  stylevariant={InputStyleVariants.OUTLINED}
                  error={!!errors.email}
                />
                {errors.email && (
                  <ErrorMessage variant="subtitle2" mt={1}>
                    {errors.email.message}
                  </ErrorMessage>
                )}
              </ErrorWrapper>
            )}
          />
          <StyledButton
            type="submit"
            width="195px"
            styles={StyleVariants.TRANSPARENT}
            padding={PaddingVariants.MD}
            disabled={!isDirty || !isValid || isLoading || errorsLength > 0}
          >
            <Typography
              variant="h4"
              sx={{
                color:
                  !isDirty || !isValid || isLoading || errorsLength > 0
                    ? theme.palette.text.disabled
                    : theme.palette.text.primary,
              }}
            >
              {t('settings.changeEmail')}
            </Typography>
          </StyledButton>
        </Box>
      </TitleInputWrapper>
    </FormStyled>
  );
}

export default ChangeEmailForm;
