import { useState, useEffect } from 'react';
import { FetchBaseQueryError, SerializedError } from 'src/redux/user/types';

const useOtp = (
  otpLengthMin: number,
  otpLengthMax: number,
  timerMin: number,
  timer: number,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const [otp, setOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (
      (otp.length > otpLengthMin && otp.length < otpLengthMax) ||
      (timer === timerMin && otp.length === otpLengthMin) ||
      (otp.length === otpLengthMin && error)
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [otp, timer, error, otpLengthMax, otpLengthMin, timerMin]);

  return { otp, setOtp, isError, setIsError };
};

export default useOtp;
