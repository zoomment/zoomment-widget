import React from 'react';
import ReactDOM from 'react-dom';
import CommentsProvider from 'providers/Comments';
import ReactionsProvider from 'providers/Reactions';
import VisitorsProvider from 'providers/Visitors';
import LanguageProvider from 'providers/Language';
import ThemeProvider from 'providers/Theme';
import RequestProvider from 'providers/Requests';

import Editor from 'components/Editor';
import Comments from 'components/Comments';
import Footer from 'components/Footer';
import ReactionsComponent from './components/Reactions';
import Visitors from './components/Visitors';

import { parseEmotions } from './utils/emotions';
import { useMutableAttribute } from './hooks/useMutableAttribute';

const App = ({ commentsElement }: { commentsElement: HTMLElement }) => {
  const theme = useMutableAttribute(commentsElement, 'data-theme');
  const language = useMutableAttribute(commentsElement, 'data-language');

  const emotions = parseEmotions(commentsElement.getAttribute('data-emotions'));
  const gravatar = commentsElement.getAttribute('data-gravatar');
  const visitors = commentsElement.getAttribute('data-visitors');

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider language={language}>
        <RequestProvider>
          {emotions.length > 0 && (
            <ReactionsProvider>
              <ReactionsComponent emotions={emotions} />
            </ReactionsProvider>
          )}
          {visitors === 'true' && (
          <VisitorsProvider>
              <Visitors />
            </VisitorsProvider>
          )}
          <CommentsProvider>
            <Editor />
            <Comments gravatar={gravatar} />
          </CommentsProvider>
          <Footer />
        </RequestProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
