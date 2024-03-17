import React, { useState } from 'react';
import { IconButton } from "@mui/material";

import filterSocket from '../SupportingModules/FilterSocket';
import AddTagPopper from './AddTagPopper';



function AddTagButton(props) {

  const socket = filterSocket;
  const [anchorEl, setAnchorEl] = useState(null);
    
  const handleClick = (e, props) => {
    

    // const tagId = 999 // Hardcoded!  Make dynamic later!  Hardcoded!  Make dynamic later!
    // socket.send(JSON.stringify({'type': 'addTag', 'imageId': props.imageId, 'tagId': tagId}));
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }

  const open = Boolean(anchorEl);
  
  return (
    <>
      <IconButton
        style={{ color: "white" }}
        onClick={(e) => handleClick(e, props)}>
        <p>+</p>
      </IconButton>

      <AddTagPopper open={open} anchorEl={anchorEl} imageId={props.imageId}/>
    </>
  );
};

export default AddTagButton;
