import React from 'react';
import ReactDOM from 'react-dom/client';

import ApiCall from '../SupportingModules/ApiCall';
import App, { AppChildren } from './App';


// initial data for page load, provided by Django API.
let apiData = await ApiCall();

// HTML root for the app, as required by React.
const root = ReactDOM.createRoot(document.getElementById('root'));

// https://react.dev/reference/react-dom/client/hydrateRoot#root-render
root.render(
  // StrictMode renders everything twice to help catch bugs.
  <React.StrictMode>
    <App apiData={apiData}>
      <AppChildren/>
    </App>
  </React.StrictMode>
);
