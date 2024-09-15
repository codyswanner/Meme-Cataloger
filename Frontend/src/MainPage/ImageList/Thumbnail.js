import React, { useContext } from 'react';

import ImageThumbnail from './ImageThumbnail';
import VideoThumbnail from './VideoThumbnail';
import AppDataContext from '../../SupportingModules/AppDataContext';


export default function Thumbnail(props) {
  const { appState } = useContext(AppDataContext);

  const selected = appState.selectedItems.includes(props.id) ? true : false;

  const containerStyles = {
    aspectRatio: 1/1,  // ensure square thumbnails
    width: "98%",
    overflow: "hidden",
  };

  const selectedContainerStyles = {
    ...containerStyles,
    padding: "0.9rem 0.9rem",
    backgroundColor: "rgba(75, 95, 255, 0.6)"
  };

  const thumbnailStyles = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };

  const selectedThumbnailStyles = {
    ...thumbnailStyles,
    opacity: "0.5"
  };

  const videoFileTypesRegex = /.+\.(mp4|mov|avi|mkv|wmv|flv|webm)/i;
  const imageFileTypesRegex = /.+\.(jpg|jpeg|png|webp|gif|bmp|svg)/i;

  if (videoFileTypesRegex.test(props.src)) {
    return(
      <VideoThumbnail
        {...props}
        containerStyles = {selected ? selectedContainerStyles:containerStyles}
        thumbnailStyles = {selected ? selectedThumbnailStyles:thumbnailStyles}
      />
    );
  } else if (imageFileTypesRegex.test(props.src)) {
    return(
      <ImageThumbnail
        {...props}
        containerStyles = {selected ? selectedContainerStyles:containerStyles}
        thumbnailStyles = {selected ? selectedThumbnailStyles:thumbnailStyles}
      />
    );
  } else {
    console.error(`Source ${props.src} does not match expected file types`);
  };
};
