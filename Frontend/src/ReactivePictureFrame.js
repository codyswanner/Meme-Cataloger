import React from 'react';
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Tag from './Tag';
import AddTagButton from './AddTagButton';
import ShareIcon from "@mui/icons-material/Share";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";


function ReactivePictureFrame(props) {
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

  const generateTags = (tags, tagNames) => {
    return tags.length === 0 ? (
      <Tag tag={0} key={0} tagNames={tagNames} />
    ) : (
      tags.map((tag) => (
        <Tag tag={tag} key={tag} tagNames={tagNames} />
      ))
    );
  }

  var toolbarVisible = imageHovered;

  const toolbarStyles = {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2,
    opacity: toolbarVisible ? 1 : 0,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between"
  };

  return (
    <Box>
      {/* Outer div detects mouseEnter/mouseLeave */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        {/* Picture top toolbar, includes description and share/archive/trash buttons */}
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
        {/* Actual image to be displayed */}
        <div>
          <img src={props.src} style={{ maxWidth: props.maxWidth }}/>
        </div>
        {/* Picture lower toolbar, includes Tag(s) and AddTagButton */}
        <Toolbar sx={[toolbarStyles, { bottom: 6.5 }]}>
          {generateTags(props.tags, props.tagNames)}
          <AddTagButton index={props.index} style={{ marginLeft: "auto" }}/>
        </Toolbar>
      </div>
    </Box>
  );
}

export default ReactivePictureFrame;
