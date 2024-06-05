import { useNavigate } from 'react-router-dom';
import { userApi } from 'src/redux/user/userService';
import { urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';
import { FetchBaseQueryError, SerializedError } from 'src/redux/user/types';
import useTimer from './useTimer';
import useErrorHandling from './useErrorHandling';
import useOtp from './useOtp';

const timerMin: number = 0;
const timerMax: number = 55;
const intervalStep: number = 1000;
const otpLengthMin: number = 0;
const otpLengthMax: number = 6;

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

const useVerification = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user.id);

  const [verifyEmail, { error: verifyEmailError, isLoading }] =
    userApi.useVerifyEmailMutation();
  const [resendOtp, { error: resendOtpError }] = userApi.useResendOtpMutation();

  const { timer, setTimer, formattedTimer, isSendAgainButtonDisabled } =
    useTimer(timerMax, intervalStep);
  const { errorMessages, setCurrentError } = useErrorHandling();
  const { otp, setOtp, isError, setIsError } = useOtp(
    otpLengthMin,
    otpLengthMax,
    timerMin,
    timer,
    (verifyEmailError as ErrorType) || (resendOtpError as ErrorType)
  );

  const handleVerify = async () => {
    try {
      await verifyEmail({ id: userId, otp }).unwrap();
      navigate(urls.HOME);
    } catch (error) {
      setCurrentError(error as SerializedError);
      setIsError(true);
    }
  };

  const handleSendAgain = async () => {
    try {
      await resendOtp({ id: userId }).unwrap();
      setTimer(timerMax);
    } catch (error) {
      setCurrentError(error as SerializedError);
      setIsError(true);
    }
  };

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
