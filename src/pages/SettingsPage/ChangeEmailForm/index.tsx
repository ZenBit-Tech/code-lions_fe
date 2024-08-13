import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { yupResolver } from '@hookform/resolvers/yup';
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
import {
  ErrorMessage,
  ErrorWrapper,
  FormStyled,
} from 'src/pages/ProfilePage/PersonalInformationForm/styles';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import emailSchema from './schema';

interface IChangeEmailForm {
  email: string;
}

function ChangeEmailForm() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IChangeEmailForm>({
    defaultValues: {
      email: user.email,
    },
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const errorsLength: number = Object.keys(errors).length;

  const onSubmit = () => {};

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
              {t('settings.changeEmail')}
            </Typography>
          </StyledButton>
        </Box>
      </TitleInputWrapper>
    </FormStyled>
  );
}

export default ChangeEmailForm;
