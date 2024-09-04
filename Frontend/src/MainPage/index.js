import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


// HTML root for the app, as required by React.
const root = ReactDOM.createRoot(document.getElementById('root'));

// https://react.dev/reference/react-dom/client/hydrateRoot#root-render
root.render(
  // StrictMode renders everything twice to help catch bugs.
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
