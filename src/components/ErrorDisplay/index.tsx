import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError } from '../../store/slices/requestsSlice';
import { ErrorMessage, Close } from '../../providers/Comments/style';

export default function ErrorDisplay() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.requests.error);

  const handleClearError = useCallback(() => {
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
