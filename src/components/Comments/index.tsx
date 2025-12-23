import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getComments,
  getMoreComments,
  getReplies
} from '../../store/slices/commentsSlice';
import { useTranslation } from 'react-i18next';
import Editor from '../Editor';
import Comment from '../Comment';

import { List, Title, Container, NoResult, Nested, LoadMore, ShowReplies } from './style';

type Props = {
  gravatar?: string | null;
};

export default function Comments(props: Props) {
  const dispatch = useAppDispatch();
  const { loading, loadingMore, comments, replayTo, hasMore, skip, total } =
    useAppSelector(state => state.comments);
  const { t } = useTranslation();
  const parentId = replayTo?.parentId || replayTo?._id;

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(getMoreComments(skip));
  };

  const handleShowReplies = (commentId: string, repliesSkip: number = 0) => {
    dispatch(getReplies({ commentId, skip: repliesSkip }));
  };

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
        {total} {total > 1 ? t('COMMENTS') : t('COMMENT')}
      </Title>
      <List>
        {commentsArray.map(comment => (
          <Comment key={comment._id} comment={comment} gravatar={props.gravatar}>
            {/* Show replies button when replies exist but haven't been loaded */}
            {!comment.repliesLoaded &&
              !!comment.repliesCount &&
              comment.repliesCount > 0 && (
                <ShowReplies
                  onClick={() => handleShowReplies(comment._id)}
                  disabled={comment.loadingReplies}
                >
                  {comment.loadingReplies
                    ? t('LOADING')
                    : comment.repliesCount === 1
                    ? t('SHOW_REPLY')
                    : t('SHOW_REPLIES', { count: comment.repliesCount })}
                </ShowReplies>
              )}
            {/* Display loaded replies */}
            {comment.replies && comment.replies.length > 0 && (
              <Nested>
                {comment.replies.map(reply => (
                  <Comment key={reply._id} comment={reply} gravatar={props.gravatar} />
                ))}
                {/* Load more replies button */}
                {comment.repliesHasMore && (
                  <ShowReplies
                    onClick={() =>
                      handleShowReplies(comment._id, comment.repliesSkip || 0)
                    }
                    disabled={comment.loadingReplies}
                  >
                    {comment.loadingReplies ? t('LOADING') : t('LOAD_MORE_REPLIES')}
                  </ShowReplies>
                )}
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
      {hasMore && (
        <LoadMore onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? t('LOADING') : t('LOAD_MORE')}
        </LoadMore>
      )}
    </Container>
  );
}
