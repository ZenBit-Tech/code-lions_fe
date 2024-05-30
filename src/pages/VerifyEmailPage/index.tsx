import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

function VerifyEmailPage() {
  const timerMin: number = 0;
  const timerMax: number = 55;
  const intervalStep: number = 1000;
  const symbolsForTimer: number = 2;

  const { t } = useTranslation();
  const [timer, setTimer] = useState<number>(timerMax);

  const formattedTimer = timer.toString().padStart(symbolsForTimer, '0');
  const isSendAgainButtonDisabled = timer > timerMin;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > timerMin) {
        setTimer(timer - 1);
      }
    }, intervalStep);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSendAgain = () => {
    setTimer(timerMax);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="350px"
      justifyContent="flex-start"
    >
      <Box display="flex">
        <IconButton>
          <ArrowLeftIcon />
        </IconButton>
        <Title>{t('verifyEmail.verifyYourEmail')}</Title>
      </Box>
      <RegularText align="left">{t('verifyEmail.sentEmailText')}</RegularText>
      <LabelText align="left">{t('verifyEmail.code')}</LabelText>
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
      >
        <ButtonText>{t('verifyEmail.verify')}</ButtonText>
      </StyledButton>
    </Box>
  );
}

export default VerifyEmailPage;
