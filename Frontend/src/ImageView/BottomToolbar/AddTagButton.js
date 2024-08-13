import React from 'react';
import { IconButton } from "@mui/material";


/**
 * Activates a menu to select a tag to add to the image.
 * 
 * @returns The AddTagButton component to be rendered in the app.
 */
function AddTagButton(props) {
  
  const handleClick = (e) => {
    // On click, toggle AddTagPopper open or closed.
    props.setAnchorEl(props.anchorEl ? null : e.currentTarget);
    props.setOpen((prev) => !prev);
  };

  return (
    <IconButton
      style={{ color: "white" }}
      onClick={(e) => handleClick(e)}
      ref={props.buttonRef}>
      <p>+</p>
    </IconButton>
  );
};

export default AddTagButton;
