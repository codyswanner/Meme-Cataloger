import React from 'react';
import { useState } from 'react';
import Picture from "./Picture";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

function AddTag(props) {
  const handleButtonClick = (buttonType, props) => {
    console.log(`Clicked ${buttonType} on image ${props.index}`);
  }

  return (
    <IconButton style={{ color: "white" }} onClick={() => handleButtonClick("Add Tag", props)}>
      <p>+</p>
    </IconButton>
  );
}

function Tag(props) {
  return (
    <div style={{ fontSize: "0.7rem", color: "white" }}>
      <p>{props.tag}</p>
    </div>
  );
}

function PictureFrame(props) {

  const [imageHovered, setImageHovered] = useState(false);

  const handleImageMouseEnter = () => {
    setImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setImageHovered(false);
  };

  const handleButtonClick = (buttonType, props) => {
    console.log(`Clicked ${buttonType} on image ${props.index}`);
  }

  var toolbarVisible = imageHovered;

  const toolbarStyles = {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    opacity: toolbarVisible ? 1 : 0,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    maxWidth: props.maxWidth,
    maxHeight: props.toolbarMaxHeight
  };

  return (

  <Box sx={{ maxWidth: props.maxWidth }}>
    <div
      onMouseEnter={handleImageMouseEnter}
      onMouseLeave={handleImageMouseLeave}
    >
        <Toolbar sx={toolbarStyles}>
          <Typography sx={{ fontSize: "0.9rem", color: "white" }}>
            Text Description
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Toolbar disableGutters>
              <IconButton onClick={() => handleButtonClick("Share", props)}>
                <ShareIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={() => handleButtonClick("Archive", props)}>
                <ArchiveIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={() => handleButtonClick("Delete", props)}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </div>
        </Toolbar>
        <div>
          <Picture
            src={props.src}
            maxWidth={props.maxWidth}
            className={imageHovered ? "image-hovered" : ""}
            sx={{ zIndex: 0 }}
          />
        </div>
      <div>
        <Toolbar sx={[toolbarStyles, { bottom: 0 }]}>
          <Tag tag={props.tag} />
          <AddTag index={props.index} style={{ marginLeft: "auto" }}/>
        </Toolbar>
      </div>
    </div>
  </Box>
  );
}

export default PictureFrame;
