import React, { useState, useMemo, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ToastType, ToastContext } from 'src/components/shared/toasts/context/toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState<ToastType>('error');

  const showToast = useCallback((type: ToastType, message: string) => {
    setText(message);
    setSeverity(type);
    setShow(true);
  }, []);

  const handleClose = () => {
    setText('');
    setShow(false);
  };

  const contextValue = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
