import { useCallback } from 'react';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ToastFunction = (type: 'error' | 'success', message: string) => void;

function useErrorHandling() {
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
  }

  function isSerializedError(error: unknown): error is SerializedError {
    return typeof error === 'object' && error != null && 'message' in error;
  }

  function getErrorMessage(
    error: FetchBaseQueryError | SerializedError,
    defaultErrorMessage: string
  ): string {
    if (
      'data' in error &&
      error.data &&
      (error.data as { message?: string }).message
    ) {
      return (error.data as { message: string }).message;
    }

    return defaultErrorMessage;
  }
  const handleOnSubmitError = useCallback(
    (err: unknown, showToast: ToastFunction, errorMessage: string) => {
      if (isFetchBaseQueryError(err) || isSerializedError(err)) {
        showToast('error', getErrorMessage(err, errorMessage));
      } else {
        showToast('error', errorMessage);
      }
    },
    []
  );

  return { handleOnSubmitError };
}

export default useErrorHandling;
