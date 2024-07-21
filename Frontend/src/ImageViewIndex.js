import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import ApiCall from './SupportingModules/ApiCall';
import FullScreenPictureFrame from './FullScreenPictureFrame';
import ImageDataContext from './SupportingModules/ImageDataContext';

const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
});

let apiData = await ApiCall();
const urlPath = window.location.pathname;
const imageID = urlPath.match(/\d+/)[0]
const findImage = (id) => apiData[0].find(element => element.id == id);
const imageObject = findImage(imageID)
console.log(imageObject);

const imageData = imageObject;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ImageDataContext.Provider value={imageData}>
      <div style={{ backgroundColor: "#666666" }}>
        <FullScreenPictureFrame apiData={apiData}/> 
      </div>
      </ImageDataContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
