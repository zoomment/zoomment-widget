import React, { useState } from 'react';
import lscache from 'lscache';
import { useCommentsDispatch } from 'providers/Comments';
import { Container, Textarea, Button, Footer, Input, Form } from './style';
import { useTranslation } from 'react-i18next';

export default function Editor() {
  const [body, setBody] = useState('');
  const [name, setName] = useState(lscache.get('name') || '');
  const [email, setEmail] = useState(lscache.get('email') || '');

  const { t } = useTranslation();
  const actions = useCommentsDispatch();

  const onValideSubmit = e => {
    e.preventDefault();
    actions
      .addComment({
        body,
        owner: { name, email },
        pageUrl: encodeURI(window.location.href)
      })
      .then(() => setBody(''));
  };

  return (
    <Container>
      <Form onSubmit={onValideSubmit}>
        <Textarea
          onChange={e => setBody(e.target.value)}
          placeholder={t('COMMENT_PLACEHOLDER')}
          value={body}
          required
        />
        <Footer>
          <Input
            onChange={e => {
              setName(e.target.value);
              lscache.set('name', e.target.value);
            }}
            placeholder={t('USERNAME')}
            value={name}
            type="text"
            required
          />
          <Input
            onChange={e => {
              setEmail(e.target.value);
              lscache.set('email', e.target.value);
            }}
            placeholder={t('EMAIL')}
            value={email}
            type="email"
            required
          />
          <Button>{t('POST')}</Button>
        </Footer>
      </Form>
    </Container>
  );
}
