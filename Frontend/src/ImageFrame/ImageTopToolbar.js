import React from 'react';
import { IconButton, Toolbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";
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



function ImageTopToolbar(props) {
    const handleButtonClick = (buttonType, id) => {
      console.log(`Clicked ${buttonType} on image ${id}`);
    }
  
    return(
      <Toolbar sx={props.toolbarStyles}>
        <Typography sx={{ fontSize: "0.9rem", color: "white" }}>
          Text Description
        </Typography>
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