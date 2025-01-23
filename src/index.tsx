import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const commentsElement = document.getElementById('zoomment');

if (commentsElement) {
  ReactDOM.render(<App commentsElement={commentsElement} />, commentsElement);
}

if (!commentsElement) {
  console.error(
    'No comment section found. Please refer to documentation to include them https://github.com/zoomment/zoomment-widget .'
  );
}
