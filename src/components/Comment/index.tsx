import React, { ReactNode } from 'react';
import { useCommentsState, useCommentsDispatch, IComment } from 'providers/Comments';
import { useTranslation } from 'react-i18next';
import { CheckCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import {
  Item,
  Username,
  Body,
  Date,
  Head,
  Avatar,
  Action,
  Actions,
  Content
} from './style';

export default function Comment({
  comment,
  children
}: {
  comment: IComment;
  children?: ReactNode;
}) {
  const actions = useCommentsDispatch();
  const state = useCommentsState();
  const { t } = useTranslation();

  const author = comment.author || comment.owner?.name;
  const gravatar = comment.gravatar || comment.owner?.gravatar;

  return (
    <Item>
      <Avatar
        src={`https://www.gravatar.com/avatar/${gravatar}?d=monsterid`} /*TODO: make this configurable, I like robohash also wavatar */
      />
      <Content>
        <Head>
          <Username>
            {author} {comment.isVerified && <CheckCircleFilled />}
          </Username>
          •<Date>{dayjs(comment.createdAt).format('DD MMM YYYY - HH:mm')}</Date>
        </Head>
        <Body>{comment.body}</Body>
        <Actions>
          <Action
            onClick={() => {
              if (state.replayTo?._id === comment._id) {
                actions.replay(undefined);
              } else {
                actions.replay(comment);
              }
            }}
          >
            {t('REPLY')}
          </Action>
          {(comment.isOwn || comment.secret) && (
            <Action onClick={() => actions.removeComment(comment)}>{t('DELETE')}</Action>
          )}
        </Actions>
        {children}
      </Content>
    </Item>
  );
}
