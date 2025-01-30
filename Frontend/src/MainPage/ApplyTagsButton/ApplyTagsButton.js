import React, { useRef, useState } from 'react';
import { IconButton } from "@mui/material";
import ApplyTagsPopper from './ApplyTagsPopper';


/**
 * Activates a menu to select a tag to add to the image.
 * 
 * @param {function} props.handleClick activates peer TagPopper component.
 * @param {ref} props.buttonRef helps with outside-click handling.
 * @returns The AddTagButton component to be rendered in the app.
 */
export default function ApplyTagsButton() {

  // https://mui.com/material-ui/react-popper/
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Sets AddTagPopper open or closed.
  const [open, setOpen] = useState(false);
  
  // Used for click-away handling.
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        style={{ color: "white", fontSize: "2em", maxHeight: "30px" }}
        onClick={(e) => handleClick(e)}
        ref={buttonRef}
      >
        <p>+</p>
      </IconButton>
      <ApplyTagsPopper
        open={open}
        setOpen={setOpen} 
        setAnchorEl={setAnchorEl}
        buttonRef={buttonRef}
      />
    </>
  );
};
