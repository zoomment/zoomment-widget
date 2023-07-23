import React, { useEffect } from 'react';
import styled from 'styled-components';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { useReactionDispatch, useReactionState } from 'providers/Reactions';

const ContentBubbleContainer = styled.div`
  min-height: 50px;
`;

const ContentBubble = styled.button`
  border: none;
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

  &.selected-emotion,
  .selectedReaction:hover {
    background: #56a7e1;
    color: white;
    border: none;
    font-size: 30px;
  }

  &.page-view {
    background: none;
    cursor: default;
  }
`;

function ReactionsComponent({ emotions, showPageViews }) {
  const reactionsState = useReactionState();
  const actions = useReactionDispatch();
  const { t } = useTranslation();

  const { pageViews, aggregation, userReaction } = reactionsState?.reactions || {};

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
      {emotions.map((emotion, index) => (
        <ContentBubble
          key={emotion + index}
          className={userReaction?.reaction === emotion ? 'selected-emotion' : ''}
          onClick={react(emotion)}
        >
          <span>{emotion}</span>
          <span>{aggregation?.find(data => data._id === emotion)?.count}</span>
        </ContentBubble>
      ))}
      {showPageViews && pageViews && (
        <ContentBubble className="page-view">
          {t('page views')} 👁️ {pageViews}
        </ContentBubble>
      )}
    </ContentBubbleContainer>
  );
}

export default ReactionsComponent;
