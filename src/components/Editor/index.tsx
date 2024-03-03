import React, { useState, useLayoutEffect, useRef } from 'react';
import lscache from 'lscache';
import { useCommentsDispatch } from 'providers/Comments';
import { Container, Textarea, Button, Footer, Input, Form } from './style';
import { useTranslation } from 'react-i18next';

export default function Editor() {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(lscache.get('name') || '');
  const [email, setEmail] = useState(lscache.get('email') || '');

  const form: React.RefObject<HTMLFormElement> = useRef(null);
  const submit: React.RefObject<HTMLButtonElement> = useRef(null);
  const { t } = useTranslation();
  const actions = useCommentsDispatch();

  const onValidSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setLoading(true);
    actions
      .addComment({
        body,
        owner: { name, email },
        pageUrl: window.location.href
      })
      .then(() => {
        setBody('');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        return Promise.reject(error);
      });
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
      submit.current?.click();
    }
  };

  useLayoutEffect(() => {
    form.current?.addEventListener('keydown', onEnter);
    return () => {
      form.current?.removeEventListener('keydown', onEnter);
    };
  }, [form.current]);

  return (
    <Container>
      <Form ref={form} onSubmit={onValidSubmit}>
        <Textarea
          onChange={e => setBody(e.target.value)}
          placeholder={t('COMMENT_PLACEHOLDER')}
          disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            value={email}
            type="email"
            required
          />
          <Button ref={submit} type="submit" disabled={loading}>
            {t('POST')}
          </Button>
        </Footer>
      </Form>
    </Container>
  );
}
