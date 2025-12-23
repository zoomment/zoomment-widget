import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, clearSuccess } from '../../store/slices/requestsSlice';
import { ErrorMessage, SuccessMessage, Close } from './style';

export default function NotificationDisplay() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.requests.error);
  const success = useAppSelector(state => state.requests.success);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearSuccess = useCallback(() => {
    dispatch(clearSuccess());
  }, [dispatch]);

  return (
    <>
      {success && (
        <SuccessMessage>
          {success.message} <Close onClick={handleClearSuccess} />
        </SuccessMessage>
      )}
      {error && (
        <ErrorMessage>
          {error.message} <Close onClick={handleClearError} />
        </ErrorMessage>
      )}
    </>
  );
}
