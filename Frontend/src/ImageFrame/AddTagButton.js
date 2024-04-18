import React, { useEffect, useState, useRef } from 'react';
import { IconButton } from "@mui/material";

import AddTagPopper from './AddTagPopper';


function AddTagButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  
  const handleClick = (e) => {
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
      <AddTagPopper open={open} setOpen={setOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} buttonRef={buttonRef} imageId={props.imageId}/>
    </>
  );
};

export default AddTagButton;
