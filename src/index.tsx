import React from 'react';
import ReactDOM from 'react-dom';
import CommentsProvider from 'providers/Comments';
import ReactionsProvider from 'providers/Reactions';
import LanguageProvider from 'providers/Language';
import ThemeProvider from 'providers/Theme';
import RequestProvider from 'providers/Requests';

import Editor from 'components/Editor';
import Comments from 'components/Comments';
import Footer from 'components/Footer';
import ReactionsComponent from './components/Reactions';

import { parseEmotions } from './utils/emotions';

const commentsElement = document.getElementById('zoomment');

if (commentsElement) {
  const theme = commentsElement.getAttribute('data-theme');
  const language = commentsElement.getAttribute('data-language');
  const emotions = parseEmotions(commentsElement.getAttribute('data-emotions'));
  const gravatar = commentsElement.getAttribute('data-gravatar');

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <LanguageProvider language={language}>
        <RequestProvider>
          {emotions.length > 0 && (
            <ReactionsProvider>
              <ReactionsComponent emotions={emotions} />
            </ReactionsProvider>
          )}
          <CommentsProvider>
            <Editor />
            <Comments gravatar={gravatar} />
          </CommentsProvider>
          <Footer />
        </RequestProvider>
      </LanguageProvider>
    </ThemeProvider>,
    commentsElement
  );
}

if (!commentsElement) {
  console.error(
    'No comment section found. Please refer to documentation to include them https://github.com/zoomment/zoomment-widget .'
  );
}
