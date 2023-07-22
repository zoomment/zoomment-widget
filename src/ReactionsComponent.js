import React, { useEffect } from 'react';
import styled from 'styled-components';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

import { useReactionDispatch, useReactionState } from 'providers/Reactions';

const ContentBubbleContainer = styled.div`
  min-height: 50px;
`;
const ContentBubble = styled.span`
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  color: #555555;
  background: #f2f2f2;
  font-size: 20px;
  user-select: none;

  &:hover {
    background: #cbe9ff;
  }

  &.selected-reaction,
  .selectedReaction:hover {
    background: #56a7e1;
    color: white;
    border: none;
    font-size: 30px;
  }
`;

function ReactionsComponent({ reactions }) {
  const reactionsState = useReactionState();
  const actions = useReactionDispatch();

  const selectedReaction = reactionsState?.reactions?.userReaction?.reaction;
  console.log(reactionsState);

  const react = reaction => () => actions.react(reaction);

  React.useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();

      axios.defaults.headers.common['fingerprint'] = visitorId;
      actions.getReactions();
    })();
  }, []);

  return (
    <ContentBubbleContainer>
      {reactions.map((reaction, index) => (
        <ContentBubble
          key={reaction + index}
          className={selectedReaction === reaction ? 'selected-reaction' : ''}
          onClick={react(reaction)}
        >
          <span>{reaction}</span>
          <span>
            {
              reactionsState?.reactions?.aggregation?.find(data => data._id === reaction)
                ?.count
            }
          </span>
        </ContentBubble>
      ))}
      <ContentBubble>
        page viewed {reactionsState?.reactions?.pageViews} times
      </ContentBubble>
    </ContentBubbleContainer>
  );
}

export default ReactionsComponent;
