import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
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
import useVerificationTimer from './VerifyEmailPageHooks';

const OtpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '335px',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '8px',
  width: '100%',
}));

const TimerContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  alignItems: 'center',
  width: '100%',
}));

const verifyUrl = '/verify';
const enterCodeUrl = '/enter-code';
const otpLengthMin = 0;
const otpLengthMax = 6;

function VerifyEmailPage() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const {
    timer,
    timerMin,
    formattedTimer,
    isSendAgainButtonDisabled,
    handleSendAgain,
  } = useVerificationTimer();

  let titleText;
  if (pathname === verifyUrl) {
    titleText = t('verifyEmail.verifyYourEmail');
  } else if (pathname === enterCodeUrl) {
    titleText = t('verifyEmail.enterCode');
  }

  useEffect(() => {
    if (
      (otp.length > otpLengthMin && otp.length < otpLengthMax) ||
      (timer === timerMin && otp.length === otpLengthMin)
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [otp, timer, timerMin]);

  const handleVerify = () => {
    return otp;
  };

  return (
    <Section>
      <OtpContainer>
        <TitleContainer>
          <IconButton sx={{ padding: 0, marginRight: '12px' }}>
            <ArrowLeftIcon />
          </IconButton>
          <Title>{titleText}</Title>
        </TitleContainer>
        <Box mb="16px">
          <RegularText align="left">
            {t('verifyEmail.sentEmailText')}
          </RegularText>
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
        >
          <ButtonText>{t('verifyEmail.verify')}</ButtonText>
        </StyledButton>
      </OtpContainer>
    </Section>
  );
}

export default VerifyEmailPage;
