import React from 'react';
import ReactDOM from 'react-dom/client';

import ApiCall from './SupportingModules/ApiCall';
import App from './App';

let apiData = await ApiCall();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App apiData={apiData}/>
  </React.StrictMode>
);
