import React from 'react';
import ReactDOM from 'react-dom';
import CommentsProvider from 'providers/Comments';
import ReactionsProvider from 'providers/Reactions';
import LanguageProvider from 'providers/Language';
import ThemeProvider from 'providers/Theme';

import CommentsComponent from './App';
import ReactionsComponent from './ReactionsComponent';

const CommentsElement = document.getElementById('foo-comments');
const commentsAPI = CommentsElement?.getAttribute('data-api-url');

if (CommentsElement) {
  const theme = CommentsElement.getAttribute('data-theme');
  const language = CommentsElement.getAttribute('data-language');

  ReactDOM.render(
    <CommentsProvider api={commentsAPI}>
      <ThemeProvider theme={theme}>
        <LanguageProvider language={language}>
          <CommentsComponent />
        </LanguageProvider>
      </ThemeProvider>
    </CommentsProvider>,
    CommentsElement
  );
}

const ReactionsElement = document.getElementById('foo-reactions');

if (ReactionsElement) {
  const emotions = ReactionsElement.getAttribute('data-emotions').split(',');
  const reactionsAPI = ReactionsElement.getAttribute('data-api-url');
  const showPageViews = ReactionsElement.getAttribute('data-show-page-views');

  ReactDOM.render(
    <ReactionsProvider api={commentsAPI || reactionsAPI}>
      <ReactionsComponent emotions={emotions} showPageViews={showPageViews} />
    </ReactionsProvider>,
    ReactionsElement
  );
}

if (!(ReactionsElement || CommentsElement)) {
  console.error(
    'No comment or reaction section found. Please refer to documentation to include them https://github.com/foo-comments/foo-comments-widget .'
  );
}
