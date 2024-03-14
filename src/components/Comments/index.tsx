import React, { useEffect } from 'react';
import { useCommentsState, useCommentsDispatch } from 'providers/Comments';
import { useTranslation } from 'react-i18next';
import Editor from '../Editor';
import Comment from '../Comment';

import { List, Title, Container, NoResult, Nested } from './style';

export default function Comments() {
  const state = useCommentsState();
  const actions = useCommentsDispatch();
  const { t } = useTranslation();
  const parentId = state.replayTo?.parentId || state.replayTo?._id;

  useEffect(() => {
    actions.getComments();
  }, []);

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
          <Comment key={comment._id} comment={comment}>
            {comment?.replies?.length > 0 && (
              <Nested>
                {comment.replies.map(reply => (
                  <Comment key={reply._id} comment={reply} />
                ))}
              </Nested>
            )}
            {parentId === comment._id && (
              <Nested>
                <Editor replyTo={state.replayTo} />
              </Nested>
            )}
          </Comment>
        ))}
      </List>
    </Container>
  );
}
