import React, { ReactNode } from 'react';
import { useCommentsState, useCommentsDispatch, IComment } from 'providers/Comments';
import { useTranslation } from 'react-i18next';
import { CheckCircleFilled, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import {
  Item,
  Username,
  Body,
  Date,
  Header,
  HeaderActions,
  Avatar,
  Reply,
  Delete,
  Actions,
  Content
} from './style';

type Props = {
  comment: IComment;
  children?: ReactNode;
  gravatar?: string | null;
};

export default function Comment({ comment, children, gravatar }: Props) {
  const actions = useCommentsDispatch();
  const state = useCommentsState();
  const { t } = useTranslation();

  const author = comment.author || comment.owner?.name;
  const gravatarHash = comment.gravatar || comment.owner?.gravatar;
  const gravatarPlaceholder = gravatar || 'monsterid';

  return (
    <Item>
      <Avatar
        src={`https://www.gravatar.com/avatar/${gravatarHash}?d=${gravatarPlaceholder}`}
      />
      <Content>
        <Header>
          <Username>
            {author} {comment.isVerified && <CheckCircleFilled />} •
            <Date>{dayjs(comment.createdAt).format('DD MMM YYYY - HH:mm')}</Date>
          </Username>
          <HeaderActions>
            {comment.isOwn && (
              <Delete onClick={() => actions.removeComment(comment)}>
                <DeleteOutlined /> Delete
              </Delete>
            )}
          </HeaderActions>
        </Header>
        <Body>{comment.body}</Body>
        <Actions>
          <Reply
            onClick={() => {
              if (state.replayTo?._id === comment._id) {
                actions.replay(undefined);
              } else {
                actions.replay(comment);
              }
            }}
          >
            <CommentOutlined /> {t('REPLY')}
          </Reply>
        </Actions>
        {children}
      </Content>
    </Item>
  );
}
