import React, { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError } from '../../store/slices/requestsSlice';
import { ErrorMessage, Close } from '../../providers/Comments/style';

const ERROR_AUTO_DISMISS_TIME = 5000; // 5 seconds

export default function ErrorDisplay() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.requests.error);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss errors after timeout
  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        dispatch(clearError());
      }, ERROR_AUTO_DISMISS_TIME);

      return () => {
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
      };
    }
  }, [error, dispatch]);

  const handleClearError = useCallback(() => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
    dispatch(clearError());
  }, [dispatch]);

  if (!error) {
    return null;
  }

  return (
    <ErrorMessage>
      {error.message} <Close onClick={handleClearError} />
    </ErrorMessage>
  );
}
