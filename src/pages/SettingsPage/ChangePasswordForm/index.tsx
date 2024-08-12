import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
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
import {
  FormStyled,
  ErrorWrapper,
  ErrorMessage,
} from 'src/pages/ProfilePage/PersonalInformationForm/styles';
import theme from 'src/theme';

import passwordSchema from './shema';

interface IChangePasswordForm {
  password: string;
}

function ChangePasswordForm() {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IChangePasswordForm>({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit = () => {};

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText> {t('settings.password')} </LabelText>
        <Box display="flex" gap="32px" justifyContent="space-between">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <ErrorWrapper sx={{ width: '100%' }}>
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
                  <ErrorMessage variant="subtitle2" mt={1}>
                    {errors.password.message}
                  </ErrorMessage>
                )}
              </ErrorWrapper>
            )}
          />
          <StyledButton
            type="button"
            width="195px"
            styles={StyleVariants.TRANSPARENT}
            padding={PaddingVariants.MD}
            disabled={!isDirty || !isValid || errorsLength > 0}
          >
            <Typography
              variant="h4"
              sx={{
                color:
                  !isDirty || !isValid || errorsLength > 0
                    ? theme.palette.text.disabled
                    : theme.palette.text.primary,
              }}
            >
              {t('settings.changePassword')}
            </Typography>
          </StyledButton>
        </Box>
      </TitleInputWrapper>
    </FormStyled>
  );
}

export default ChangePasswordForm;
