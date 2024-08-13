import React, { useContext, useRef, useState } from 'react';
import { Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';
import TagPopper from './TagPopper';
import ExcessTagsChip from './ExcessTagsChip';
import ImageDataContext from '../ImageDataContext';


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
    // display normally
    return (
      imageTags.map((imageTag) => (
        <Tag imageTag={imageTag} imageId={imageId} key={imageTag} />
      ))
    );

  } else {
    // display condensed, with "+excess" chip
    return (
      <>
        {imageTags.map((imageTag) => (
          <Tag imageTag={imageTag} imageId={imageId} key={imageTag} />
        )).slice(0, 2) /* show only two tags */}
        <ExcessTagsChip labelText={(imageTags.length - 2).toString()} />
      </>
    );
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
  const imageData = useContext(ImageDataContext);
  const imageId = imageData['id'];
  const imageTags = imageData['imageTags'];

  // See https://mui.com/material-ui/react-popper/ for details on the purpose of anchorEl.
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Sets AddTagPopper open or closed.
  const [open, setOpen] = useState(false);
  
  // Used by AddTagPopper for click-away handling.
  const buttonRef = useRef(null);

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {formatTags(imageTags, imageId)} {/* Returns Tag components for image */}
      <AddTagButton
        style={{ marginLeft: "auto" }}
        buttonRef={buttonRef}
        open={open}
        setOpen={setOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}/>
      <TagPopper
        open={open}
        setOpen={setOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        buttonRef={buttonRef}/>
    </Toolbar>
  );
};

export default ImageBottomToolbar;
