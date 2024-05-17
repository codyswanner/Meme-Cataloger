import React, { useState, useRef } from 'react';
import { IconButton } from "@mui/material";

import TagPopper from './TagPopper';


/**
 * Activates a menu to select a tag to add to the image.
 * 
 * @returns The AddTagButton component to be rendered in the app.
 */
function AddTagButton() {

  // See https://mui.com/material-ui/react-popper/ for details on the purpose of anchorEl.
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Sets AddTagPopper open or closed.
  const [open, setOpen] = useState(false);
  
  // Used by AddTagPopper for click-away handling.
  const buttonRef = useRef(null);
  
  const handleClick = (e) => {
    // On click, toggle AddTagPopper open or closed.
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        style={{ color: "white" }}
        onClick={(e) => handleClick(e)}
        ref={buttonRef}>
        <p>+</p>
      </IconButton>
      <TagPopper
        open={open}
        setOpen={setOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        buttonRef={buttonRef}/>
    </>
  );
};

export default AddTagButton;
