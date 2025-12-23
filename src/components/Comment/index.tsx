import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeComment, replay } from '../../store/slices/commentsSlice';
import { vote } from '../../store/slices/votesSlice';
import { IComment } from '../../store/slices/commentsSlice';
import { useTranslation } from 'react-i18next';
import {
  CheckCircleFilled,
  DeleteOutlined,
  CommentOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled
} from '@ant-design/icons';
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
  Content,
  VoteContainer,
  VoteButton,
  VoteScore
} from './style';

type Props = {
  comment: IComment;
  children?: ReactNode;
  gravatar?: string | null;
};

export default function Comment({ comment, children, gravatar }: Props) {
  const dispatch = useAppDispatch();
  const replayTo = useAppSelector(state => state.comments.replayTo);
  const voteData = useAppSelector(state => state.votes.votes[comment._id]);
  const votingCommentId = useAppSelector(state => state.votes.votingCommentId);
  const { t } = useTranslation();

  const author = comment.author || comment.owner?.name;
  const gravatarHash = comment.gravatar || comment.owner?.gravatar;
  const gravatarPlaceholder = gravatar || 'monsterid';

  const isVoting = votingCommentId === comment._id;
  const userVote = voteData?.userVote || 0;
  const score = voteData?.score || 0;

  const handleVote = (value: 1 | -1) => {
    dispatch(vote({ commentId: comment._id, value }));
  };

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
              <Delete onClick={() => dispatch(removeComment(comment))}>
                <DeleteOutlined /> Delete
              </Delete>
            )}
          </HeaderActions>
        </Header>
        <Body>{comment.body}</Body>
        <Actions>
          <VoteContainer>
            <VoteButton
              $type="up"
              $active={userVote === 1}
              onClick={() => handleVote(1)}
              disabled={isVoting}
              title={t('UPVOTE')}
            >
              {userVote === 1 ? <LikeFilled /> : <LikeOutlined />}
            </VoteButton>
            <VoteScore $positive={score > 0} $negative={score < 0}>
              {score}
            </VoteScore>
            <VoteButton
              $type="down"
              $active={userVote === -1}
              onClick={() => handleVote(-1)}
              disabled={isVoting}
              title={t('DOWNVOTE')}
            >
              {userVote === -1 ? <DislikeFilled /> : <DislikeOutlined />}
            </VoteButton>
          </VoteContainer>
          <Reply
            onClick={() => {
              if (replayTo?._id === comment._id) {
                dispatch(replay(undefined));
              } else {
                dispatch(replay(comment));
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
