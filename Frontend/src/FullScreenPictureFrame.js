import React, { useContext } from 'react';

import ImageTopToolbar from './ImageFrame/ImageTopToolbar';
import ImageBottomToolbar from './ImageFrame/ImageBottomToolbar';
import useFilterSocket from './SupportingModules/useFilterSocket';
import ImageDataContext from './SupportingModules/ImageDataContext';
import AppDataContext from './SupportingModules/AppDataContext';


export default function FullScreenPictureFrame(props) {
  const appData = useFilterSocket(props.apiData);
  const imageData = useContext(ImageDataContext);
  const toolbarStyles = {
    display: "flex",
    justifyContent: "space-between"
  };
  const appState = {
    // There is no state currently in this part of the app,
    // but this object is here to mirror the setup found in
    // App.js that is used for the main page view.
    // If shared state is introduced, it will go here.
  }

  return (
    <AppDataContext.Provider value={{appData, appState}}>
      <ImageTopToolbar toolbarStyles={toolbarStyles}/>
        <img
          src={imageData.source}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "98%"
          }}
        />
      <ImageBottomToolbar toolbarStyles={toolbarStyles}/>
    </AppDataContext.Provider>
  );
};
