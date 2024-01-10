import React, { useState } from 'react';
import { IconButton } from "@mui/material";

import filterSocket from './FilterSocket';
import AddTagPopper from './AddTagPopper';



// function AddTagPopper(props) {
//   const id = open ? 'simple-popper' : undefined;

//   return(
//     <Popper id={id} open={props.open} anchorEl={props.anchorEl}>
//       <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
//         <p>Testing the popper</p>
//       </Box>
//     </Popper>
//   )
// }






function AddTagButton(props) {

  const socket = filterSocket;
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  
  const handleButtonClick = (props) => {
    

    const tagId = 999 // Hardcoded!  Make dynamic later!  Hardcoded!  Make dynamic later!
    socket.send(JSON.stringify({'type': 'addTag', 'imageId': props.imageId, 'tagId': tagId}));
  }

  const handleMouseEnter = (e) => {
    setAnchorEl(e.currentTarget);
    setButtonHovered(true);
  }

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setButtonHovered(false);
  }

  const open = buttonHovered == true;
  

  return (
    <>
      <IconButton
        style={{ color: "white" }}
        onClick={() => handleButtonClick(props)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <p>+</p>
      </IconButton>
      <AddTagPopper open={open} anchorEl={anchorEl} />
    </>
  );
};

export default AddTagButton;
