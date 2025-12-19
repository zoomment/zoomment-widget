import React, { useState, useLayoutEffect, useEffect, useRef, useCallback, useMemo } from 'react';
import lscache from 'lscache';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComment } from '../../store/slices/commentsSlice';
import { IComment } from '../../store/slices/commentsSlice';
import { Container, Textarea, Button, Footer, Input, Form } from './style';
import UserProfile from 'components/UserProfile';
import { useTranslation } from 'react-i18next';
import { getToken } from 'utils/getToken';

type Props = {
  replyTo?: IComment;
};

const CACHE_KEYS = {
  NAME: 'name',
  EMAIL: 'email',
} as const;

export default function Editor({ replyTo }: Props) {
  const [body, setBody] = useState('');
  const [name, setName] = useState(() => lscache.get(CACHE_KEYS.NAME) || '');
  const [email, setEmail] = useState(() => lscache.get(CACHE_KEYS.EMAIL) || '');
  
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.comments.addingComment);
  const error = useAppSelector((state) => state.requests.error);
  const prevLoadingRef = useRef(loading);
  
  // Get token - could change if user logs in/out, but typically stable during session
  const token = getToken();

  // Update body when replyTo changes
  useEffect(() => {
    if (replyTo?.author) {
      setBody(`@${replyTo.author} `);
    } else {
      setBody('');
    }
  }, [replyTo]);

  // Clear body when comment is successfully added
  useEffect(() => {
    // If loading changed from true to false and no error, comment was added successfully
    if (prevLoadingRef.current && !loading && !error) {
      setBody('');
    }
    prevLoadingRef.current = loading;
  }, [loading, error]);

  // Calculate parentId once
  const parentId = useMemo(() => {
    return replyTo?.parentId || replyTo?._id;
  }, [replyTo]);

  // Handle name change and cache it
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    lscache.set(CACHE_KEYS.NAME, value);
  }, []);

  // Handle email change and cache it
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    lscache.set(CACHE_KEYS.EMAIL, value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedBody = body.trim();
    if (!trimmedBody) {
      return;
    }

    // Dispatch the action - success/error handling is done via useEffect watching state
    dispatch(
      addComment({
        body: trimmedBody,
        email,
        author: name,
        // owner field deprecated
        owner: { name, email },
        pageUrl: window.location.href,
        parentId,
      })
    );
    // Error is handled globally by apiClient and displayed by ErrorDisplay component
  }, [body, email, name, parentId, dispatch]);

  // Handle keyboard shortcut (Cmd/Ctrl + Enter)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isModifier = e.metaKey || e.ctrlKey;
    
    if (isEnter && isModifier) {
      e.preventDefault();
      submitRef.current?.click();
    }
  }, []);

  // Set up keyboard event listener
  useLayoutEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;

    formElement.addEventListener('keydown', handleKeyDown);
    return () => {
      formElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Textarea
          onChange={(e) => setBody(e.target.value)}
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
                onChange={handleNameChange}
                placeholder={t('USERNAME')}
                disabled={loading}
                value={name}
                type="text"
                required
              />
              <Input
                onChange={handleEmailChange}
                placeholder={t('EMAIL')}
                disabled={loading}
                value={email}
                type="email"
                required
              />
            </>
          )}

          <Button ref={submitRef} type="submit" disabled={loading}>
            {t('POST')}
          </Button>
        </Footer>
      </Form>
    </Container>
  );
}
