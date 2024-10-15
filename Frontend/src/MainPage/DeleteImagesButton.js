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
export default function DeleteImagesButton () {
  const { appState } = useContext(AppDataContext);

  const handleClick = () => {
    // Inform the backend of the deletion
    filterSocket.sendMessage({
      'type': 'deleteImages',
      'imageIds': [ ...appState.selectedItems ]
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
