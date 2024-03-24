import React, { useState } from 'react';
import { IconButton } from "@mui/material";

import AddTagPopper from './AddTagPopper';


function AddTagButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const open = Boolean(anchorEl);
  
  return (
    <>
      <IconButton
        style={{ color: "white" }}
        onClick={(e) => handleClick(e)}>
        <p>+</p>
      </IconButton>
      <AddTagPopper open={open} anchorEl={anchorEl} imageId={props.imageId}/>
    </>
  );
};

export default AddTagButton;
