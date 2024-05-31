import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
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

function SignUpForm() {
  const { t } = useTranslation();

  return (
    <FormStyled>
      <TitleInputWrapper>
        <LabelText> {t('signup.nameLabel')} </LabelText>
        <StyledInput
          name="name"
          autoComplete="off"
          placeholder={t('signup.namePlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.emailLabel')} </LabelText>
        <StyledInput
          name="email"
          autoComplete="off"
          placeholder={t('signup.emailPlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.passwordLabel')} </LabelText>
        <PasswordInput
          name="password"
          autoComplete="off"
          placeholder={t('signup.passwordPlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signup.repeatPasswordLabel')} </LabelText>
        <PasswordInput
          name="repeatPassword"
          autoComplete="off"
          placeholder={t('signup.passwordPlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
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
