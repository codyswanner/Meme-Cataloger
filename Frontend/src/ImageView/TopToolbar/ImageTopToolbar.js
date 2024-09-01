import React, { useContext } from 'react';
import { TextField, Toolbar } from "@mui/material";

import ShareImageButton from './ShareImageButton';
import ArchiveImageButton from './ArchiveImageButton';
import DeleteImageButton from './DeleteImageButton';
import filterSocket from '../../SupportingModules/FilterSocket';
import ImageDataContext from '../ImageDataContext';


/**
 * Offers options for image including description, delete, archive, etc.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.toolbarStyles for visual consistency of the toolbar.
 * 
 * @returns The ImageTopToolbar component to be rendered in the app.
 */
function ImageTopToolbar(props) {
  const imageData = useContext(ImageDataContext);
  const imageId = imageData['id'];
  const imageDescription = imageData['description'];

  const handleDescriptionChange = (e, imageId) => {
    // Inform the backend of the change
    filterSocket.sendMessage({
      'type': 'updateDescription', 
      'imageId': imageId,
      'description': e.target.value
    });
  };

  return(
    <Toolbar sx={props.toolbarStyles}>
      {/* TextField holds the image desc and allows editing by user */}
      <TextField 
        placeholder="Text Description"
        size="small"
        variant="outlined"
        sx={{background: 'rgba(0, 0, 0, 0)',
        input: { color: "white"}}}
        defaultValue={imageDescription ? imageDescription : ''}
        onChange={(e) => {handleDescriptionChange(e, imageId)}}
      />

      {/* Image options should be placed to the right side */}
      <div style={{ marginLeft: "auto" }}>
        <Toolbar disableGutters> {/* MUI Gutters cause spacing issues */}
          <ShareImageButton id={imageData}/>
          <ArchiveImageButton id={imageData}/>
          <DeleteImageButton id={imageId}/>
        </Toolbar>
      </div>
    </Toolbar>
  );
};

export default ImageTopToolbar;
