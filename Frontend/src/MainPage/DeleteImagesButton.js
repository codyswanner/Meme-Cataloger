import React, { useContext } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


/**
 * Click to delete image from library.
 *
 * @returns The DeleteImageButton component to be rendered in the app.
 */
export default function DeleteImagesButton (props) {
  const { appState } = useContext(AppDataContext);

  const handleClick = () => {
    // Inform the backend of the deletion
    console.log(props.imageIds);
    filterSocket.sendMessage({
      'type': 'deleteImages',
      'imageIds': props.imageIds
    });
    appState.setSelectedItems([]);
    appState.setSelectionActive(false);
  };

  return(
    <IconButton onClick={() => handleClick()}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
