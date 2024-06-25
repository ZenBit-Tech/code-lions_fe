import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import ArrowLeftIcon from 'src/assets/icons/arrow-left.svg';
import { urls } from 'src/common/constants';
import ButtonText from 'src/components/shared/ButtonText';
import LabelText from 'src/components/shared/LabelText';
import OTPInput from 'src/components/shared/OTPInput';
import RegularText from 'src/components/shared/RegularText';
import Section from 'src/components/shared/Section';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import TextButton from 'src/components/shared/TextButton';
import Title from 'src/components/shared/Title';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';

import useVerification from './hooks/useVerification';
import { OtpContainer, TitleContainer, TimerContainer } from './styles';

function VerifyEmailPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const {
    otp,
    setOtp,
    isError,
    isLoading,
    formattedTimer,
    isSendAgainButtonDisabled,
    isVerifyButtonDisabled,
    handleVerify,
    handleSendAgain,
    errorMessages,
  } = useVerification();

  useEffect(() => {
    if (errorMessages.length > 0) {
      showToast('error', errorMessages[0]);
    } else if (errorMessages.length > 1) {
      errorMessages.forEach((error) => {
        showToast('error', error);
      });
    }
  }, [errorMessages, showToast]);

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
        />
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
            sx={{ padding: '18px 6px 18px 6px' }}
          >
            <LabelText align="right">{t('verifyEmail.sendAgain')}</LabelText>
          </TextButton>
        </TimerContainer>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.LG}
          variant="contained"
          disabled={isVerifyButtonDisabled}
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
