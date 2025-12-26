import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getComments,
  getMoreComments,
  getReplies,
  SortOrder
} from '../../store/slices/commentsSlice';
import { getVotes } from '../../store/slices/votesSlice';
import { useTranslation } from 'react-i18next';
import Editor from '../Editor';
import Comment from '../Comment';

import {
  List,
  Title,
  Container,
  NoResult,
  Nested,
  LoadMore,
  ShowReplies,
  Header,
  SortContainer,
  SortButton
} from './style';

type Props = {
  gravatar?: string | null;
};

export default function Comments(props: Props) {
  const dispatch = useAppDispatch();
  const { loading, loadingMore, comments, replayTo, hasMore, skip, total, sort } =
    useAppSelector(state => state.comments);
  const { t } = useTranslation();
  const parentId = replayTo?.parentId || replayTo?._id;

  // Track which comment IDs we've already fetched votes for
  const fetchedVoteIds = useRef<Set<string>>(new Set());

  // Only fetch on initial mount, not on sort changes (handleSortChange handles that)
  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      dispatch(getComments(sort));
    }
  }, [dispatch, sort]);

  const handleSortChange = (newSort: SortOrder) => {
    if (newSort !== sort) {
      // Clear fetched vote IDs when sort changes since we're getting fresh data
      fetchedVoteIds.current.clear();
      dispatch(getComments(newSort));
    }
  };

  // Fetch votes when comments are loaded
  useEffect(() => {
    if (comments.length > 0) {
      const allIds: string[] = [];

      // Collect all comment and reply IDs
      comments.forEach(c => {
        allIds.push(c._id);
        if (c.replies && c.replies.length > 0) {
          allIds.push(...c.replies.map(r => r._id));
        }
      });

      // Filter out IDs we've already fetched votes for
      const newIds = allIds.filter(id => !fetchedVoteIds.current.has(id));

      if (newIds.length > 0) {
        // Mark these IDs as fetched
        newIds.forEach(id => fetchedVoteIds.current.add(id));
        dispatch(getVotes(newIds));
      }
    }
  }, [comments, dispatch]);

  const handleLoadMore = () => {
    dispatch(getMoreComments({ skip, sort }));
  };

  const handleShowReplies = (commentId: string, repliesSkip: number = 0) => {
    dispatch(getReplies({ commentId, skip: repliesSkip }));
  };

  // Safety check: ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  // Show simple loading only on initial load (no comments yet)
  if (loading && commentsArray.length === 0) {
    return <NoResult>{t('LOADING')}</NoResult>;
  }

  if (!loading && commentsArray.length === 0) {
    return <NoResult>{t('NO_COMMENTS')}</NoResult>;
  }

  return (
    <Container>
      <Header>
        <Title>
          {total} {total > 1 ? t('COMMENTS') : t('COMMENT')}
        </Title>
        <SortContainer>
          <SortButton $active={sort === 'desc'} onClick={() => handleSortChange('desc')}>
            {t('NEWEST')}
          </SortButton>
          <SortButton $active={sort === 'asc'} onClick={() => handleSortChange('asc')}>
            {t('OLDEST')}
          </SortButton>
        </SortContainer>
      </Header>
      {loading ? (
        <NoResult>{t('LOADING')}</NoResult>
      ) : (
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
      )}
      {!loading && hasMore && (
        <LoadMore onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? t('LOADING') : t('LOAD_MORE')}
        </LoadMore>
      )}
    </Container>
  );
}
