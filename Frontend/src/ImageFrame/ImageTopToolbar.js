import React, { useState } from 'react';
import { IconButton, TextField, Input, Toolbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";

import DeleteImageButton from './DeleteImageButton';
import filterSocket from '../SupportingModules/FilterSocket';


function ImageTopToolbar(props) {
  const [description, setDescription] = useState(props.description ? props.description : '');

  const handleButtonClick = (buttonType, id) => {
    console.log(`Clicked ${buttonType} on image ${id}`);
  };

  const handleDescriptionChange = (e, props) => {
    const socket = filterSocket;
    setDescription(e.target.value);
    socket.send(JSON.stringify({
      'type': 'updateDescription', 
      'imageId': props.id,
      'description': e.target.value
    }));
  }

  
  return(
    <Toolbar sx={props.toolbarStyles}>
      <TextField 
        placeholder="Text Description"
        size="small"
        variant="outlined"
        sx={{background: 'rgba(0, 0, 0, 0)',
        input: { color: "white"}}}
        defaultValue={props.description ? props.description : ''}
        onChange={(e) => {handleDescriptionChange(e, props)}}
      />
      <div style={{ marginLeft: "auto" }}>
        <Toolbar disableGutters>
          <IconButton onClick={() => handleButtonClick("Share", props.id)}>
            <ShareIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={() => handleButtonClick("Archive", props.id)}>
            <ArchiveIcon sx={{ color: "white" }} />
          </IconButton>
          <DeleteImageButton id={props.id}/>
        </Toolbar>
      </div>
    </Toolbar>
  );

};

export default ImageTopToolbar;
