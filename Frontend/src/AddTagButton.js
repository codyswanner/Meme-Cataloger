import React from 'react';
import { IconButton } from "@mui/material";

import filterSocket from './FilterSocket';


function AddTagButton(props) {

  // filterSocket may be replaced with a more permanent solution; this is for concept testing.
  const socket = filterSocket;

  const handleButtonClick = (buttonType, props) => {
    const tagId = 999 // Hardcoded!  Make dynamic later!  Hardcoded!  Make dynamic later!
    socket.send(JSON.stringify({'type': 'addTag', 'imageId': props.imageId, 'tagId': tagId}));
  }

  return (
    <IconButton style={{ color: "white" }} onClick={() => handleButtonClick("Add Tag", props)}>
      <p>+</p>
    </IconButton>
  );
};

export default AddTagButton;
