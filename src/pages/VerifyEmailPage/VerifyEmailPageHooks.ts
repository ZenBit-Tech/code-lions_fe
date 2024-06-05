import { useState, useEffect, useMemo } from 'react';

const timerMin: number = 0;
const timerMax: number = 55;
const intervalStep: number = 1000;
const symbolsForTimer: number = 2;

const useVerificationTimer = () => {
  const [timer, setTimer] = useState<number>(timerMax);

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

  const handleSendAgain = () => {
    setTimer(timerMax);
  };

  return {
    timer,
    timerMin,
    timerMax,
    formattedTimer,
    isSendAgainButtonDisabled,
    handleSendAgain,
  };
};

export default useVerificationTimer;
