import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
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

function VerifyEmailPage() {
  const otpLengthMin = 0;
  const otpLengthMax = 6;
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
    <Box display="flex" width="350px" flexDirection="column">
      <Box display="flex" alignItems="center" sx={{ margin: '12px' }}>
        <IconButton sx={{ padding: 0, marginRight: '12px' }}>
          <ArrowLeftIcon />
        </IconButton>
        <Title>{t('verifyEmail.verifyYourEmail')}</Title>
      </Box>
      <RegularText align="left">{t('verifyEmail.sentEmailText')}</RegularText>
      <LabelText align="left">{t('verifyEmail.code')}</LabelText>
      <OTPInput otp={otp} setOtp={setOtp} isError={isError} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <RegularText align="left">
          {t('verifyEmail.expire')}
          {formattedTimer}
        </RegularText>
        <TextButton
          onClick={handleSendAgain}
          disabled={isSendAgainButtonDisabled}
        >
          <LabelText align="right">{t('verifyEmail.sendAgain')}</LabelText>
        </TextButton>
      </Box>
      <StyledButton
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.LG}
        variant="contained"
        disabled={isError}
        onClick={handleVerify}
      >
        <ButtonText>{t('verifyEmail.verify')}</ButtonText>
      </StyledButton>
    </Box>
  );
}

export default VerifyEmailPage;
