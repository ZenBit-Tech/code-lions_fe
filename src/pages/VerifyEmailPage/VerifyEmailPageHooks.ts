import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from 'src/redux/user/userService';
import { appErrors, urls } from 'src/common/constants';
import {
  IErrorResponse,
  FetchBaseQueryError,
  SerializedError,
} from 'src/redux/user/types';
import { useAppSelector } from 'src/redux/hooks';

const timerMin: number = 0;
const timerMax: number = 55;
const intervalStep: number = 1000;
const symbolsForTimer: number = 2;
const otpLengthMin: number = 0;
const otpLengthMax: number = 6;

const useVerification = () => {
  const [timer, setTimer] = useState<number>(timerMax);
  const [otp, setOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user.id);

  const [verifyEmail, { error: verifyEmailError, isLoading }] =
    userApi.useVerifyEmailMutation();
  const [resendOtp, { error: resendOtpError }] = userApi.useResendOtpMutation();

  const formattedTimer = useMemo(() => {
    return timer.toString().padStart(symbolsForTimer, '0');
  }, [timer]);

  const isSendAgainButtonDisabled = useMemo(() => {
    return timer > timerMin;
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > timerMin) {
          return prevTimer - 1;
        }
        return prevTimer;
      });
    }, intervalStep);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    try {
      const verify = await verifyEmail({ id: userId, otp }).unwrap();
      navigate(urls.HOME);
      return verify;
    } catch (error) {
      return error;
    }
  };

  const handleSendAgain = async () => {
    try {
      const resend = await resendOtp({ id: userId }).unwrap();
      setTimer(timerMax);
      return resend;
    } catch (error) {
      return error;
    }
  };

  const currentError = verifyEmailError || resendOtpError;

  useEffect(() => {
    if (
      (otp.length > otpLengthMin && otp.length < otpLengthMax) ||
      (timer === timerMin && otp.length === otpLengthMin) ||
      (otp.length === 0 && currentError)
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [otp, timer, currentError]);

  let errorMessages: string[] = [];

  if (currentError) {
    if ('data' in currentError) {
      const errorData = (currentError as FetchBaseQueryError)
        .data as IErrorResponse;
      if (Array.isArray(errorData.message)) {
        errorMessages = errorData.message;
      } else {
        errorMessages = [errorData.message];
      }
    } else {
      const serializedError = currentError as SerializedError;
      errorMessages = [serializedError.message || appErrors.FAILED_TO_VERIFY];
    }
  }

  return {
    timer,
    setTimer,
    otp,
    setOtp,
    isError,
    isLoading,
    formattedTimer,
    isSendAgainButtonDisabled,
    handleVerify,
    handleSendAgain,
    errorMessages,
  };
};

export default useVerification;
