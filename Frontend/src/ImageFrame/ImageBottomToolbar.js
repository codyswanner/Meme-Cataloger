import React, { useContext } from 'react';
import { Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';
import ExcessTagsChip from './ExcessTagsChip';
import ImageDataContext from '../SupportingModules/ImageDataContext';


/**
  * Creates the tags to be displayed on the toolbar.
  *
  * @param {array} imageTags Array of tag IDs associated with this image.
  * @param {number} imageId Unique identifier of the image with these tags.
  * @returns A Tag component for each tag associated with this image.
  */
const generateTags = (imageTags, imageId) => {
  return(
    imageTags.map((imageTag) => (
      <Tag imageTag={imageTag} imageId={imageId} key={imageTag} />
    ))
  );
};

/**
  * Formats the tags to be displayed on the toolbar.
  *
  * @param {array} imageTags Array of tag IDs associated with this image.
  * @param {number} imageId Unique identifier of the image with these tags.
  * @returns Tags of the image, formatted for proper display.
  */
const formatTags = (imageTags, imageId) => {

  if (imageTags.length == 0) {
    return (<Tag imageTag={0} key={0} />); // display "add tag" placeholder

  } else if (imageTags.length < 3) {
    return generateTags(imageTags, imageId); // display normally

  } else {
    // display condensed, with "+excess" chip
    return (
      <>
        {generateTags(imageTags, imageId).slice(0, 2) /* show only two tags */}
        <ExcessTagsChip labelText={(imageTags.length - 2).toString()} />
      </>
    )
  };
};

/**
 * Offers tag management options for an image.
 * This component renders at the bottom third of an image when the image is hovered.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.toolbarStyles for visual consistency of the toolbar.
 * 
 * @returns The ImageBottomToolbar component to be rendered in the app.
 */
function ImageBottomToolbar(props) {
  const imageData = useContext(ImageDataContext)
  const imageId = imageData['id'];
  const imageTags = imageData['imageTags'];
  console.log(imageTags);

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {formatTags(imageTags, imageId)} {/* Returns Tag components for image */}
      <AddTagButton style={{ marginLeft: "auto" }}/>
    </Toolbar>
  );
};

export default ImageBottomToolbar;
