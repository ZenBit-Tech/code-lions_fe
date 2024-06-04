import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    console.log(data);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TitleInputWrapper>
        <LabelText> {t('signup.nameLabel')} </LabelText>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <StyledInput
              {...field}
              autoComplete="off"
              placeholder={t('signup.namePlaceholder')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
            />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.emailLabel')} </LabelText>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <StyledInput
              {...field}
              name="email"
              autoComplete="off"
              placeholder={t('signup.emailPlaceholder')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
            />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.passwordLabel')} </LabelText>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              autoComplete="off"
              placeholder={t('signup.passwordPlaceholder')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
            />
          )}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.repeatPasswordLabel')} </LabelText>
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              autoComplete="off"
              placeholder={t('signup.passwordPlaceholder')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
            />
          )}
        />
      </TitleInputWrapper>
      <StyledButton
        width="100%"
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
      >
        <Typography variant="button"> {t('signup.singUpButton')} </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignUpForm;
