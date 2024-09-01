import React from 'react';
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";


/**
 * Click to archive image (not implemented yet).
 * Renders within the ImageTopToolbar component.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.id Unique ID of the image to be archived.
 * 
 * @returns The ArchiveImageApp component to be rendered in the app.
 */
export default function ArchiveImageButton (props) {
  const handleArchiveClick = (id) => {
    // Feature not implemented yet
    console.log(`Archive button clicked on image ${id}`);
  };

  return(
    <IconButton onClick={() => handleArchiveClick(props.id)}>
      <ArchiveIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
