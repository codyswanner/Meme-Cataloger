import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import filterSocket from '../../SupportingModules/FilterSocket';


/**
 * Click to delete image from library.
 * Renders within the ImageTopToolbar component.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.id Unique ID of the image to be deleted.
 * 
 * @returns The DeleteImageButton component to be rendered in the app.
 */
function DeleteImageButton (props) {

  const handleDeleteClick = (id) => {
    // Inform the backend of the deletion
    console.log("Delete button pressed, image " + id);
    filterSocket.sendMessage({
      'type': 'deleteImage',
      'imageId': id
    });
    // Need to redirect back to main page
    window.location.href = window.location.origin;
  };

  return(
    <IconButton onClick={() => handleDeleteClick(props.id)}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

export default DeleteImageButton;
