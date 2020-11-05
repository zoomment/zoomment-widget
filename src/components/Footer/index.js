import React from 'react';
import { Container, Link, Heart } from './style';

export default function Footer() {
  return (
    <Container>
      Powered by
      <Link href="https://github.com/tigransimonyan/foo-comments-widget" target="_blanck">
        fooComments
      </Link>
      <Heart />
    </Container>
  );
}
