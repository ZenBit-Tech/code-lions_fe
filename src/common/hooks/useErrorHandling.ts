import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error != null && 'message' in error;
}

export const getErrorMessage = (
  queryError: FetchBaseQueryError | SerializedError,
  errorMessage: string
): string => {
  if (
    'data' in queryError &&
    queryError.data &&
    (queryError.data as { message?: string }).message
  ) {
    return (queryError.data as { message: string }).message;
  }

  return errorMessage;
};
