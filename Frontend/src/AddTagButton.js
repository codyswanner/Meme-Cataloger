import React from 'react';
import { IconButton } from "@mui/material";


function AddTagButton(props) {
    const handleButtonClick = (buttonType, props) => {
      console.log(`Clicked ${buttonType} on image ${props.index}`);
    }
  
    return (
      <IconButton style={{ color: "white" }} onClick={() => handleButtonClick("Add Tag", props)}>
        <p>+</p>
      </IconButton>
    );
  }

export default AddTagButton;
