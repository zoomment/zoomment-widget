import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const commentsElement = document.getElementById('zoomment');

if (commentsElement) {
  const root = createRoot(commentsElement);
  root.render(<App commentsElement={commentsElement} />);
}

if (!commentsElement) {
  console.error(
    'No comment section found. Please refer to documentation to include them https://github.com/zoomment/zoomment-widget .'
  );
}
