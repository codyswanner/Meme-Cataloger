import React from 'react';
import { IconButton } from "@mui/material";


/**
 * Activates a menu to select a tag to add to the image.
 * 
 * @param {function} props.handleClick activates peer TagPopper component.
 * @param {ref} props.buttonRef helps with outside-click handling.
 * @returns The AddTagButton component to be rendered in the app.
 */
function AddTagButton(props) {
  return (
    <IconButton
      style={{ color: "white" }}
      onClick={(e) => props.handleClick(e)}
      ref={props.buttonRef}>
      <p>+</p>
    </IconButton>
  );
};

export default AddTagButton;
