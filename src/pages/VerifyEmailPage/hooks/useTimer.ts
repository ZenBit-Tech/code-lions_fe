import { useState, useEffect, useMemo } from 'react';

const padStart: number = 2;

const useTimer = (initialTime: number, intervalStep: number) => {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, intervalStep);

    return () => clearInterval(interval);
  }, [intervalStep]);

  const formattedTimer = useMemo(
    () => timer.toString().padStart(padStart, '0'),
    [timer]
  );
  const isSendAgainButtonDisabled = useMemo(() => timer > 0, [timer]);

  return { timer, setTimer, formattedTimer, isSendAgainButtonDisabled };
};

export default useTimer;
