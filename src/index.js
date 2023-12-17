import React from 'react';
import ReactDOM from 'react-dom';
import CommentsProvider from 'providers/Comments';
import ReactionsProvider from 'providers/Reactions';
import LanguageProvider from 'providers/Language';
import ThemeProvider from 'providers/Theme';

import CommentsComponent from './App';
import ReactionsComponent from './components/Reactions';

const commentsElement = document.getElementById('foo-comments');

if (commentsElement) {
  const api = commentsElement.getAttribute('data-api-url');
  const theme = commentsElement.getAttribute('data-theme');
  const language = commentsElement.getAttribute('data-language');
  const emotions = commentsElement.getAttribute('data-emotions')?.split(',');

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <LanguageProvider language={language}>
        {emotions && (
          <ReactionsProvider api={api}>
            <ReactionsComponent emotions={emotions} />
          </ReactionsProvider>
        )}
        <CommentsProvider api={api}>
          <CommentsComponent />
        </CommentsProvider>
      </LanguageProvider>
    </ThemeProvider>,
    commentsElement
  );
}

if (commentsElement) {
  console.error(
    'No comment section found. Please refer to documentation to include them https://github.com/foo-comments/foo-comments-widget .'
  );
}
