import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
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
import TextButton from 'src/components/shared/TextButton';
import FormStyled from './styles';

function SignUpForm() {
  const { t } = useTranslation();

  return (
    <FormStyled>
      <TitleInputWrapper>
        <LabelText> {t('signin.emailLabel')} </LabelText>
        <StyledInput
          name="email"
          autoComplete="off"
          placeholder={t('signin.emailPlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('signin.passwordLabel')} </LabelText>
        <PasswordInput
          name="password"
          autoComplete="off"
          placeholder={t('signin.passwordPlaceholder')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
        />
      </TitleInputWrapper>
      <Box display="flex" alignItems="center">
        <TextButton sx={{ padding: '0' }}>
          <LabelText align="right">{t('signin.forgotPassword')}</LabelText>
        </TextButton>
      </Box>
      <StyledButton
        width="100%"
        type="submit"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
      >
        <Typography variant="button"> {t('signin.singInButton')} </Typography>
      </StyledButton>
    </FormStyled>
  );
}

export default SignUpForm;
