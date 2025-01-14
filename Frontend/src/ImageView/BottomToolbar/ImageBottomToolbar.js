import React, { useContext, useRef, useState } from 'react';
import { alpha, createTheme, Toolbar } from "@mui/material";

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

    // Custom coloring to improve tag readability on top of the images
    const chipTheme = createTheme({
      palette: {
        primary: {
          main: alpha('#333333', 0.6),
        },
      }
    });

  if (imageTags.length == 0) {
    // display "add tag" placeholder
    return (<Tag imageTag={0} key={0} theme={chipTheme} />);

  } else if (imageTags.length < 3) {
    // display normally
    return (
      imageTags.map((imageTag) => (
        <Tag
          imageTag={imageTag}
          key={imageTag}
          theme={chipTheme}/>
      ))
    );

  } else {
    // display condensed, with "+excess" chip
    return (
      <>
        {imageTags.map((imageTag) => (
          <Tag
            imageTag={imageTag}
            imageId={imageId}
            key={imageTag}
            theme={chipTheme}/>
        )).slice(0, 2) /* show only two tags */}
        <ExcessTagsChip
          labelText={(imageTags.length - 2).toString()}
          theme={chipTheme}/>
      </>
    );
  };
};

/**
 * Offers tag management options for an image.
 * Renders at the bottom third of an image when the image is hovered.
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

  // https://mui.com/material-ui/react-popper/
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Sets AddTagPopper open or closed.
  const [open, setOpen] = useState(false);
  
  // Used by AddTagPopper for click-away handling.
  const buttonRef = useRef(null);

  const handleAddTagButtonClick = (e) => {
    // On click, toggle AddTagPopper open or closed.
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen((prev) => !prev);
  };

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {formatTags(imageTags, imageId)} {/* Returns Tag components for image */}
      <AddTagButton
        style={{ marginLeft: "auto" }}
        buttonRef={buttonRef}
        handleClick={handleAddTagButtonClick}/>
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
