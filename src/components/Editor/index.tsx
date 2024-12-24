import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import lscache from 'lscache';
import { useCommentsDispatch, IComment } from 'providers/Comments';
import { Container, Textarea, Button, Footer, Input, Form } from './style';
import UserProfile from 'components/UserProfile';
import { useTranslation } from 'react-i18next';
import { getToken } from 'utils/getToken';

type Props = {
  replyTo?: IComment;
};

export default function Editor(props: Props) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(lscache.get('name') || '');
  const [email, setEmail] = useState(lscache.get('email') || '');
  const token = getToken();

  const form: React.RefObject<HTMLFormElement> = useRef(null);
  const submit: React.RefObject<HTMLButtonElement> = useRef(null);
  const { t } = useTranslation();
  const actions = useCommentsDispatch();

  useEffect(() => {
    if (props.replyTo) {
      setBody(`@${props.replyTo.author} `);
    }
  }, [props.replyTo]);

  const onValidSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setLoading(true);

    const parentId = props.replyTo?.parentId || props.replyTo?._id;

    actions
      .addComment({
        body,
        email,
        author: name,
        // owner field deprecated
        owner: { name, email },
        pageUrl: window.location.href,
        parentId: parentId
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

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
      submit.current?.click();
    }
  };

  useLayoutEffect(() => {
    form.current?.addEventListener('keydown', onEnter as any);
    return () => {
      form.current?.removeEventListener('keydown', onEnter as any);
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
          {token ? (
            <UserProfile />
          ) : (
            <>
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
            </>
          )}

          <Button ref={submit} type="submit" disabled={loading}>
            {t('POST')}
          </Button>
        </Footer>
      </Form>
    </Container>
  );
}
