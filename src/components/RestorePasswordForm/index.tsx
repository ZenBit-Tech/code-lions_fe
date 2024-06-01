import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { Typography, Box } from '@mui/material';
import LabelText from 'src/components/shared/LabelText';
import { styled } from '@mui/system';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';

interface IFormInput {
  email: string;
}

const FormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '20px',
});

function RestorePasswordForm() {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <TitleInputWrapper>
          <LabelText>{t('restorePassword.emailLabel')}</LabelText>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledInput
                width="335px"
                autoComplete="off"
                placeholder={t('inputPlaceholder.userEmail')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                {...field}
              />
            )}
          />
        </TitleInputWrapper>
        <StyledButton
          width="335px"
          type="submit"
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.LG}
        >
          <Typography variant="button">
            {t('restorePassword.sendCode')}
          </Typography>
        </StyledButton>
      </FormWrapper>
    </form>
  );
}

export default RestorePasswordForm;
