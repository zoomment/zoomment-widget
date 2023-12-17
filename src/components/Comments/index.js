import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { useCommentsState, useCommentsDispatch } from 'providers/Comments';
import { useTranslation } from 'react-i18next';

import {
  List,
  Item,
  Username,
  Body,
  Date,
  Head,
  Title,
  Container,
  NoResult,
  Delete,
  Avatar
} from './style';

export default function Comments() {
  const state = useCommentsState();
  const actions = useCommentsDispatch();
  const { t } = useTranslation();

  useEffect(() => actions.getComments(), []);

  if (state.loading) {
    return <NoResult>{t('LOADING')}</NoResult>;
  }

  if (state.comments.length == 0) {
    return <NoResult>{t('NO_COMMENTS')}</NoResult>;
  }

  return (
    <Container>
      <Title>
        {state.comments.length} {state.comments.length > 1 ? t('COMMENTS') : t('COMMENT')}
      </Title>
      <List>
        {state.comments.map(comment => (
          <Item key={comment._id}>
            <Avatar
              src={`https://www.gravatar.com/avatar/${comment.owner?.gravatar}?d=monsterid`}/*TODO: make this configurable, I like robohash also wavatar */
            />
            <Head>
              <Username>{comment.owner?.name}</Username>•
              <Date href={`${state.api}/comments/${comment._id}`}>
                {dayjs(comment.createdAt).format('DD MMM YYYY - HH:mm')}
              </Date>
            </Head>
            <Body>
              {comment.body}
              {comment.secret && (
                <Delete
                  twoToneColor="red"
                  onClick={() => actions.removeComment(comment)}
                />
              )}
            </Body>
          </Item>
        ))}
      </List>
    </Container>
  );
}
