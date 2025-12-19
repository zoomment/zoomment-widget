import React, { useEffect } from 'react';
import { useVisitorsState, useVisitorsDispatch } from 'providers/Visitors';
import { useTranslation } from 'react-i18next';
import { Container, Count, Label } from './style';

export default function Visitors() {
  const visitorsState = useVisitorsState();
  const visitorsActions = useVisitorsDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    visitorsActions.getVisitors();
  }, []);

  if (visitorsState.count === 0) {
    return null;
  }

  return (
    <Container>
      <Count>{visitorsState.count}</Count>
      <Label>
        {visitorsState.count > 1 ? t('VISITORS') : t('VISITOR')}
      </Label>
    </Container>
  );
}

