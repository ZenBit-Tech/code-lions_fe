import { useState, useEffect } from 'react';

import { FetchBaseQueryError, SerializedError } from 'src/redux/user/types';

const otpLengthMin: number = 0;
const timerMin: number = 0;

const useOtp = (
  timer: number,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const [otp, setOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (timer === timerMin && otp.length === otpLengthMin) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [otp, timer, error]);

  return { otp, setOtp, isError, setIsError };
};

export default useOtp;
