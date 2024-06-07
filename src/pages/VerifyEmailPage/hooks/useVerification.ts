import { useLocation, useNavigate } from 'react-router-dom';
import { userApi } from 'src/redux/user/service';
import { urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/auth/hooks/hooks';
import { FetchBaseQueryError, SerializedError } from 'src/redux/user/types';
import useTimer from './useTimer';
import useErrorHandling from './useErrorHandling';
import useOtp from './useOtp';

const timerMin: number = 0;
const timerMax: number = 55;
const intervalStep: number = 1000;

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

const useVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useAppSelector((state) => state.user.user.id);

  const [verifyEmail, { error: verifyEmailError, isLoading }] =
    userApi.useVerifyEmailMutation();
  const [resendOtp, { error: resendOtpError }] = userApi.useResendOtpMutation();

  const { timer, setTimer, formattedTimer, isSendAgainButtonDisabled } =
    useTimer(timerMax, intervalStep);
  const { errorMessages, setCurrentError } = useErrorHandling();
  const { otp, setOtp, isError, setIsError } = useOtp(
    timer,
    (verifyEmailError as ErrorType) || (resendOtpError as ErrorType)
  );

  const currentLocation = location.pathname;

  const handleVerify = async () => {
    try {
      await verifyEmail({ id: userId, otp }).unwrap();
      if (currentLocation === urls.VERIFY) {
        navigate(urls.HOME);
      } else if (currentLocation === urls.ENTER_CODE) {
        navigate(urls.NEW_PASSWORD);
      }
    } catch (error) {
      setCurrentError(error as FetchBaseQueryError);
      setIsError(true);
    }
  };

  const handleSendAgain = async () => {
    try {
      setTimer(timerMax);
      await resendOtp({ id: userId }).unwrap();
    } catch (error) {
      setCurrentError(error as FetchBaseQueryError);
      setTimer(timerMin);
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
