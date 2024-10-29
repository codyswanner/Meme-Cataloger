import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import filterSocket from '../SupportingModules/FilterSocket';


/**
 * Click to delete image from library.
 *
 * @returns The DeleteImageButton component to be rendered in the app.
 */
export default function DeleteImagesButton (props) {

  const handleClick = () => {
    // Inform the backend of the deletion
    filterSocket.sendMessage({
      'type': 'deleteImages',
      'imageIds': props.imageIds
    });
    if (props.handleClickInContext) {
      props.handleClickInContext();
    };
  };

  return(
    <IconButton onClick={() => handleClick()}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
