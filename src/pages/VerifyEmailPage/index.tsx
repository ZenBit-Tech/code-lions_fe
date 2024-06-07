import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { urls } from 'src/common/constants';
import Section from 'src/components/shared/Section';
import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import Title from 'src/components/shared/Title';
import RegularText from 'src/components/shared/RegularText';
import LabelText from 'src/components/shared/LabelText';
import TextButton from 'src/components/shared/TextButton';
import ButtonText from 'src/components/shared/ButtonText';
import OTPInput from 'src/components/shared/OTPInput';
import theme from 'src/theme';
import { OtpContainer, TitleContainer, TimerContainer } from './styles';
import useVerification from './hooks/useVerification';

function VerifyEmailPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    otp,
    setOtp,
    isError,
    isLoading,
    formattedTimer,
    isSendAgainButtonDisabled,
    handleVerify,
    handleSendAgain,
    errorMessages,
  } = useVerification();

  const getTitleText = (path: string) => {
    if (path === urls.VERIFY) {
      return t('verifyEmail.verifyYourEmail');
    }

    return t('verifyEmail.enterCode');
  };

  const titleText = getTitleText(pathname);

  const handleNavigation = () => {
    if (pathname === urls.VERIFY) {
      navigate(urls.SIGN_UP);
    } else if (pathname === urls.ENTER_CODE) {
      navigate(urls.RESTORE_PASSWORD);
    }
  };

  return (
    <Section>
      <OtpContainer>
        <TitleContainer>
          <IconButton
            sx={{ padding: 0, marginRight: '12px' }}
            onClick={handleNavigation}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Title>{titleText}</Title>
        </TitleContainer>
        <Box mb="16px">
          <RegularText align="left">
            {t('verifyEmail.sentEmailText')}
          </RegularText>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
          marginBottom={2}
        >
          {errorMessages.length > 0 &&
            errorMessages.map((msg, index) => (
              <Typography
                align="left"
                key={index}
                color={theme.palette.error.main}
              >
                {msg}
              </Typography>
            ))}
        </Box>
        <Box sx={{ width: '100%' }}>
          <LabelText align="left">{t('verifyEmail.code')}</LabelText>
        </Box>
        <OTPInput otp={otp} setOtp={setOtp} isError={isError} />
        <TimerContainer>
          <RegularText align="left">
            {t('verifyEmail.expire')}
            {formattedTimer}
          </RegularText>
          <TextButton
            onClick={handleSendAgain}
            disabled={isSendAgainButtonDisabled}
            sx={{ padding: '12px 6px 24px 6px' }}
          >
            <LabelText align="right">{t('verifyEmail.sendAgain')}</LabelText>
          </TextButton>
        </TimerContainer>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.LG}
          variant="contained"
          disabled={isError}
          onClick={handleVerify}
          fullWidth
          loading={isLoading}
        >
          <ButtonText>{t('verifyEmail.verify')}</ButtonText>
        </StyledButton>
      </OtpContainer>
    </Section>
  );
}

export default VerifyEmailPage;
