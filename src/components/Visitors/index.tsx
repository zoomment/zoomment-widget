import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getVisitors } from '../../store/slices/visitorsSlice';
import { useTranslation } from 'react-i18next';
import { Container, Count, Label } from './style';

export default function Visitors() {
  const dispatch = useAppDispatch();
  const { count, loading } = useAppSelector((state) => state.visitors);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVisitors());
  }, [dispatch]);

  if (loading || count === 0) {
    return null;
  }

  return (
    <Container>
      <Count>{count}</Count>
      <Label>{count > 1 ? t('VISITORS') : t('VISITOR')}</Label>
    </Container>
  );
}

