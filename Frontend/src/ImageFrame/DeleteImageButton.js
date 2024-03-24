import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import filterSocket from '../SupportingModules/FilterSocket';


function DeleteImageButton (props) {

  const handleDeleteClick = (id) => {
    console.log("Delete button pressed, image " + id);
    const socket = filterSocket;
    socket.send(JSON.stringify({
      'type': 'deleteImage',
      'imageId': id
    }))
  };

  return(
    <IconButton onClick={() => handleDeleteClick(props.id)}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

export default DeleteImageButton;
