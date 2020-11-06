import React from 'react';
import ReactDOM from 'react-dom';
import CommentsProvider from 'providers/Comments';
import LanguageProvider from 'providers/Language';
import ThemeProvider from 'providers/Theme';
import App from './App';

const Element = document.getElementById('foo-comments');

const api = Element.getAttribute('data-api-url');
const theme = Element.getAttribute('data-theme');
const language = Element.getAttribute('data-language');

ReactDOM.render(
  <CommentsProvider api={api}>
    <ThemeProvider theme={theme}>
      <LanguageProvider language={language}>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </CommentsProvider>,
  Element
);
