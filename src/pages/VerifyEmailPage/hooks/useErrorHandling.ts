import { useState, useEffect } from 'react';

import { appErrors } from 'src/common/constants';
import {
  IErrorResponse,
  FetchBaseQueryError,
  SerializedError,
} from 'src/redux/user/types';

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

const useErrorHandling = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<ErrorType>(undefined);

  useEffect(() => {
    if (!currentError) {
      setErrorMessages([]);

      return;
    }

    if ('data' in currentError) {
      const errorData = currentError.data as IErrorResponse;

      setErrorMessages(
        Array.isArray(errorData.message)
          ? errorData.message
          : [errorData.message]
      );
    } else {
      const serializedError = currentError as SerializedError;

      setErrorMessages([serializedError.message || appErrors.FAILED_TO_VERIFY]);
    }
  }, [currentError]);

  return { errorMessages, setErrorMessages, currentError, setCurrentError };
};

export default useErrorHandling;
