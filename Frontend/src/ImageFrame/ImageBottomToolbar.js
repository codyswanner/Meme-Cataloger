import React from 'react';
import { Chip, Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';
import ExcessTagsChip from './ExcessTagsChip';


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
    return(
      imageTags.map((imageTag) => (
        <Tag imageTag={imageTag} imageId={props.id} key={imageTag} />
      ))
    );
  };

  /**
   * Formats the tags to be displayed on the toolbar.
   *
   * @param {array} imageTags Array of tag IDs associated with this image.
   * @returns Tags of the image, formatted for proper display.
   */
  const formatTags = (imageTags) => {

    if (imageTags.length == 0) {
      return (<Tag imageTag={0} key={0} />); // display "add tag" placeholder

    } else if (imageTags.length < 3) {
      return generateTags(imageTags); // display normally

    } else {
      // display condensed, with "+excess" chip
      return (
        <>
          {generateTags(imageTags).slice(0, 2) /* show only two tags */}
          <ExcessTagsChip labelText={(imageTags.length - 2).toString()} />
        </>
      )
    };
  };

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {formatTags(props.imageTags)} {/* Returns Tag components for image */}
      <AddTagButton imageId={props.id} imageTags={props.imageTags} style={{ marginLeft: "auto" }}/>
    </Toolbar>
  );
};

export default ImageBottomToolbar;
