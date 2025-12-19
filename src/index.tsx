import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App';

const commentsElement = document.getElementById('zoomment');

if (commentsElement) {
  const root = createRoot(commentsElement);
  root.render(
    <Provider store={store}>
      <App commentsElement={commentsElement} />
    </Provider>
  );
}

if (!commentsElement) {
  console.error(
    'No comment section found. Please refer to documentation to include them https://github.com/zoomment/zoomment-widget .'
  );
}
