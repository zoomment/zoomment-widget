import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getReactions, react } from '../../store/slices/reactionsSlice';

import { ContentBubbleContainer, ContentBubble, ContentBubbleCount } from './style';

type Props = {
  emotions: string[];
};

function ReactionsComponent({ emotions }: Props) {
  const dispatch = useAppDispatch();
  const { reactions } = useAppSelector((state) => state.reactions);

  const { aggregation, userReaction } = reactions || {};

  const onReact = useCallback(
    (reaction: string) => {
      dispatch(react(reaction));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getReactions());
  }, [dispatch]);

  return (
    <ContentBubbleContainer>
      {emotions.map((emotion) => {
        const count = aggregation?.find((data) => data._id === emotion)?.count;

        return (
          <ContentBubble
            key={emotion}
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
