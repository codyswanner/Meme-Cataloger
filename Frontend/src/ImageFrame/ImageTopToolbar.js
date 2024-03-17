import React from 'react';
import { IconButton, Toolbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";



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
            <IconButton onClick={() => handleButtonClick("Delete", props.id)}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </div>
      </Toolbar>
    );
  
  };


export default ImageTopToolbar;