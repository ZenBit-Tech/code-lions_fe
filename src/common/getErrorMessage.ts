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

export function getErrorMessage(
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
