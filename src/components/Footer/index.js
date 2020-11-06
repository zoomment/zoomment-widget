import React from 'react';
import { Container, Link, Heart } from './style';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Container>
      {t('POWERED_BY')}
      <Link
        href="https://github.com/FooComments/foo-comments-widget"
        target="_blanck"
      >
        FooComments
      </Link>
      <Heart />
    </Container>
  );
}
