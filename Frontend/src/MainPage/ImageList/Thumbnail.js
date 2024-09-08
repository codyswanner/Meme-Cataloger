import React from 'react';

import ImageThumbnail from './ImageThumbnail';
import VideoThumbnail from './VideoThumbnail';


export default function Thumbnail(props) {

  const containerStyles = {
    aspectRatio: 1/1,  // ensure square thumbnails
    width: "98%",
    overflow: "hidden"
  };

  const thumbnailStyles = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };

  const videoFileTypesRegex = /.+\.(mp4|mov|avi|mkv|wmv|flv|webm)/i;
  const imageFileTypesRegex = /.+\.(jpg|jpeg|png|webp|gif|bmp|svg)/i;

  if (videoFileTypesRegex.test(props.src)) {
    return(
      <VideoThumbnail {...props} styles={{containerStyles, thumbnailStyles}}/>
    );
  } else if (imageFileTypesRegex.test(props.src)) {
    return(
      <ImageThumbnail {...props} styles={{containerStyles, thumbnailStyles}}/>
    );
  } else {
    console.error(`Source ${props.src} does not match expected file types`);
  };
};
