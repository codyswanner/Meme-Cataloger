import React, { useContext } from 'react';
import { IconButton, TextField, Toolbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";

import DeleteImageButton from './DeleteImageButton';
import filterSocket from '../SupportingModules/FilterSocket';
import ImageDataContext from '../SupportingModules/ImageDataContext';


/**
 * Offers options for image including description, delete, archive, etc.
 * This component renders at the top third of an image when the image is hovered.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.id Unique ID of the image.
 * 
 * @returns The ImageTopToolbar component to be rendered in the app.
 */
function ImageTopToolbar(props) {
  const imageData = useContext(ImageDataContext);
  const imageId = imageData['id'];
  console.log(imageId);
  
  // Placeholder function until Archive/Share functionalities are implemented
  const handleButtonClick = (buttonType, id) => {
    console.log(`Clicked ${buttonType} on image ${id}`);
  };

  const handleDescriptionChange = (e, imageId) => {
    // Inform the backend of the change
    const socket = filterSocket;
    socket.send(JSON.stringify({
      'type': 'updateDescription', 
      'imageId': imageId,
      'description': e.target.value
    }));
  }

  
  return(
    <Toolbar sx={props.toolbarStyles}>
      {/* TextField holds the image desc and allows editing by user (left side) */}
      <TextField 
        placeholder="Text Description"
        size="small"
        variant="outlined"
        sx={{background: 'rgba(0, 0, 0, 0)',
        input: { color: "white"}}}
        defaultValue={props.description ? props.description : ''}
        onChange={(e) => {handleDescriptionChange(e, props.id)}}
      />

      {/* Image options should be placed to the right side */}
      <div style={{ marginLeft: "auto" }}>
        <Toolbar disableGutters> {/* MUI Gutters cause spacing issues */}
          <IconButton onClick={() => handleButtonClick("Share", props.id)}>
            <ShareIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={() => handleButtonClick("Archive", props.id)}>
            <ArchiveIcon sx={{ color: "white" }} />
          </IconButton>
          <DeleteImageButton id={props.id}/> {/* Custom component, see imports */}
        </Toolbar>
      </div>
    </Toolbar>
  );

};

export default ImageTopToolbar;
