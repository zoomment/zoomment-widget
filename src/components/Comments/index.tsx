import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getComments } from '../../store/slices/commentsSlice';
import { useTranslation } from 'react-i18next';
import Editor from '../Editor';
import Comment from '../Comment';

import { List, Title, Container, NoResult, Nested } from './style';

type Props = {
  gravatar?: string | null;
};

export default function Comments(props: Props) {
  const dispatch = useAppDispatch();
  const { loading, comments, replayTo } = useAppSelector((state) => state.comments);
  const { t } = useTranslation();
  const parentId = replayTo?.parentId || replayTo?._id;

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (loading) {
    return <NoResult>{t('LOADING')}</NoResult>;
  }

  // Safety check: ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  if (commentsArray.length === 0) {
    return <NoResult>{t('NO_COMMENTS')}</NoResult>;
  }

  return (
    <Container>
      <Title>
        {commentsArray.length} {commentsArray.length > 1 ? t('COMMENTS') : t('COMMENT')}
      </Title>
      <List>
        {commentsArray.map(comment => (
          <Comment key={comment._id} comment={comment} gravatar={props.gravatar}>
            {comment.replies && comment.replies.length > 0 && (
              <Nested>
                {comment.replies.map(reply => (
                  <Comment key={reply._id} comment={reply} gravatar={props.gravatar} />
                ))}
              </Nested>
            )}
            {parentId === comment._id && (
              <Nested>
                <Editor replyTo={replayTo} />
              </Nested>
            )}
          </Comment>
        ))}
      </List>
    </Container>
  );
}
