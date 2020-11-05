import React from 'react';
import App from './App';
import CommentsProvider from './providers/Comments';
import ThemeProvider from './providers/Theme';
import ReactDOM from 'react-dom';

const Element = document.getElementById('foo-comments');

const api = Element.getAttribute('data-api-url');
const theme = Element.getAttribute('data-theme');

ReactDOM.render(
  <CommentsProvider api={api}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CommentsProvider>,
  Element
);
