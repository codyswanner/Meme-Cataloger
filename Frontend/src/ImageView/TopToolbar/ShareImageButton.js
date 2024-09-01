import React from 'react';
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";


/**
 * Click to share image (not implemented yet).
 * Renders within the ImageTopToolbar component.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.id Unique ID of the image to be shared.
 * 
 * @returns The ShareImageApp component to be rendered in the app.
 */
export default function ShareImageButton (props) {
  const handleShareClick = (id) => {
    // Feature not implemented yet
    console.log(`Share button clicked on image ${id}`);
  };

  return(
    <IconButton onClick={() => handleShareClick(props.id)}>
      <ShareIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
