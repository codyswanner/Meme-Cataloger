import React, { useContext } from 'react';

import ImageTopToolbar from './TopToolbar/ImageTopToolbar';
import ImageBottomToolbar from './BottomToolbar/ImageBottomToolbar';
import useFilterSocket from '../SupportingModules/useFilterSocket';
import ImageDataContext from './ImageDataContext';
import AppDataContext from '../SupportingModules/AppDataContext';


export default function MediaFrame(props) {
  const appData = useFilterSocket(props.apiData);
  const imageData = useContext(ImageDataContext);
  const toolbarStyles = {
    display: "flex",
    justifyContent: "space-between"
  };
  const appState = {
    // Currently no state used here, but this structure mirrors App.js.
  };

  const contentTypeChooser = () => {

    const src = imageData.source;
    const imageFileTypesRegex = /.+\.(jpg|jpeg|png|webp|gif|bmp|svg)/i;
    const videoFileTypesRegex = /.+\.(mp4|mov|avi|mkv|wmv|flv|webm)/i;
    const contentStyles = {
      display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"98%"
    };

    if (imageFileTypesRegex.test(imageData.source)) {
      return(<img src={src} style={contentStyles} />);
    } else if (videoFileTypesRegex.test(imageData.source)) {
      return(<video src={src} style={contentStyles} controls preload='auto'/>);
    } else {
      console.error(`Source ${src} does not match expected file types`);
      return(<p>Error: media does not match any accepted file type.</p>);
    }
  };

  return (
    <AppDataContext.Provider value={{appData, appState}}>
      <ImageTopToolbar toolbarStyles={toolbarStyles}/>
        {contentTypeChooser()}
      <ImageBottomToolbar toolbarStyles={toolbarStyles}/>
    </AppDataContext.Provider>
  );
};
