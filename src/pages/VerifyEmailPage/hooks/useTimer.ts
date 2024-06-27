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
    if (timer === 0) {
      localStorage.removeItem('timer');
    }
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

  return { timer, setTimer, formattedTimer };
};

export default useTimer;
