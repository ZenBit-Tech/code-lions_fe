import React, { useState, useMemo, useCallback } from 'react';

import { Snackbar, Alert, Typography } from '@mui/material';

import {
  ToastType,
  ToastContext,
} from 'src/components/shared/toasts/context/toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastMessageProps {
  message: string;
}

function ToastMessage({ message }: ToastMessageProps) {
  const linkStyle = {
    textDecoration: 'underline',
  };

  return (
    <Typography
      variant="body1"
      component="div"
      dangerouslySetInnerHTML={{ __html: message }}
      sx={{
        '& a': linkStyle,
      }}
    />
  );
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
    setShow(false);
    setText('');
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
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '5px',
            '& .MuiAlert-action': { padding: 0 },
            '& .MuiAlert-icon': { padding: 0, margin: '5px' },
          }}
        >
          <ToastMessage message={text} />
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
