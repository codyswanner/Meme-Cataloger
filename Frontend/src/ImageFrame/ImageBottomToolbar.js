import React from 'react';
import { Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';


/**
 * Offers tag management options for an image.
 * This component renders at the bottom third of an image when the image is hovered.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.id Unique ID of the image.
 * @param {array} props.imageTags Array of tag IDs associated with this image.
 * @returns The ImageBottomToolbar component to be rendered in the app.
 */
function ImageBottomToolbar(props) {

  /**
   * Creates the tags to be displayed on the toolbar.
   *
   * @param {array} imageTags Array of tag IDs associated with this image.
   * @returns A Tag component for each tag associated with this image.
   */
  const generateTags = (imageTags) => {
    return imageTags.length === 0 ? (
      <Tag imageTag={0} key={0} />
    ) : (
      imageTags.map((imageTag) => (
        <Tag imageTag={imageTag} imageId={props.id} key={imageTag} />
      ))
    );
  };

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {generateTags(props.imageTags)} {/* Returns Tag components for image */}
      <AddTagButton imageId={props.id} imageTags={props.imageTags} style={{ marginLeft: "auto" }}/>
    </Toolbar>
  );
};

export default ImageBottomToolbar;
