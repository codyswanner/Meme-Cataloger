import React, { useState } from 'react';
import { Box } from "@mui/material";

import ImageTopToolbar from './ImageTopToolbar';
import ImageBottomToolbar from './ImageBottomToolbar';
import ImageDataContext from '../SupportingModules/ImageDataContext';


/**
 * Holds the image and toolbars for image options.
 * Toolbars are visible on component hover.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {string} props.src file path for the image.
 * @param {string} props.description user-created text desc of the image.
 * @param {number} props.maxWidth the maximum display width of the image.
 * @param {number} props.toolbarMaxHeight for the toolbar displayed on image hover.
 * @param {array} props.imageTags tags associated with this image.
 * @param {number} props.id The unique ID for the image.
 * @returns The ReactivePictureFrame component to be rendered in the app.
 */
function ReactivePictureFrame(props) {
  const [imageHovered, setImageHovered] = useState(false);
  const imageData = {
    'id': props.id,
    'description': props.description,
    'imageTags': props.imageTags
  };

  const handleImageMouseEnter = () => {
    setImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setImageHovered(false);
  };

  const toolbarStyles = {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2,
    opacity: imageHovered ? 1 : 0,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between"
  };

  return (
    <ImageDataContext.Provider value={imageData}>
      <Box>
        {/* Outer div detects mouseEnter/mouseLeave */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        >
          {/* Picture top toolbar, includes description and share/archive/trash buttons */}
          <ImageTopToolbar toolbarStyles = {toolbarStyles}/>

          {/* Actual image to be displayed */}
          <div>
            <img src={props.src} style={{ maxWidth: props.maxWidth }}/>
          </div>

          {/* Picture lower toolbar, includes Tag(s) and AddTagButton */}
          <ImageBottomToolbar toolbarStyles={toolbarStyles}/>
        </div>
      </Box>
    </ImageDataContext.Provider>
  );
};

export default ReactivePictureFrame;
