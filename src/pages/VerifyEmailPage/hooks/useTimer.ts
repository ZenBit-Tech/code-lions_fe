import { useState, useEffect, useMemo } from 'react';

const padStart: number = 2;
const timerMin: number = 0;

const useTimer = (initialTime: number, intervalStep: number) => {
  const [timer, setTimer] = useState(() => {
    const storedTimer = localStorage.getItem('timer');

    return storedTimer !== null ? parseInt(storedTimer, 10) : initialTime;
  });

  useEffect(() => {
    localStorage.setItem('timer', timer.toString());
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > timerMin) {
          const newTime = prevTimer - 1;

          localStorage.setItem('timer', newTime.toString());

          return newTime;
        } else {
          return prevTimer;
        }
      });
    }, intervalStep);

    return () => clearInterval(interval);
  }, [intervalStep]);

  const formattedTimer = useMemo(
    () => timer.toString().padStart(padStart, '0'),
    [timer]
  );
  const isSendAgainButtonDisabled = useMemo(() => timer > timerMin, [timer]);

  return { timer, setTimer, formattedTimer, isSendAgainButtonDisabled };
};

export default useTimer;
