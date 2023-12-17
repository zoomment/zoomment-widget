import React, { useEffect, useCallback } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

import { ContentBubbleContainer, ContentBubble, ContentBubbleCount } from './style';
import { useReactionDispatch, useReactionState } from 'providers/Reactions';

function ReactionsComponent({ emotions }) {
  const reactionsState = useReactionState();
  const actions = useReactionDispatch();

  const { aggregation, userReaction } = reactionsState?.reactions || {};

  const onReact = useCallback(reaction => actions.react(reaction), []);

  useEffect(() => {
    FingerprintJS.load().then(fp => {
      fp.get().then(({ visitorId }) => {
        axios.defaults.headers.common['fingerprint'] = visitorId;
        actions.getReactions();
      });
    });
  }, []);

  return (
    <ContentBubbleContainer>
      {emotions.map((emotion, index) => {
        const count = aggregation?.find(data => data._id === emotion)?.count;

        return (
          <ContentBubble
            key={index}
            $selected={userReaction?.reaction === emotion}
            onClick={() => onReact(emotion)}
          >
            <span>{emotion}</span>
            {count && <ContentBubbleCount>{count}</ContentBubbleCount>}
          </ContentBubble>
        );
      })}
    </ContentBubbleContainer>
  );
}

export default ReactionsComponent;
