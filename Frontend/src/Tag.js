import React, { useState, useContext } from 'react';

import AppDataContext from './AppDataContext';
import filterSocket from './FilterSocket';
import './button-link.css';

function Tag(props) {
  const appData = useContext(AppDataContext);
  const tagNames = appData[1];
  const socket = filterSocket;
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    color: '#ffffff',
    cursor: 'pointer',
    textDecoration: isHovered ? 'underline' : 'none',
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleTagClick = (imageId, tagId) => {
    socket.send(JSON.stringify({
      'type': 'removeTag', 
      'imageId': imageId, 
      'tagId': tagId
  }));
  }

  if (props.tag === 0) {
      // The zero tag is assigned to pictures with no other tags.
      // Display a prompt to add a tag.
    return(
      <div style={{ fontSize: "0.7rem", color: "white" }}>
        <p>{'Add tag'}</p>
      </div>
    );
  } else {
      // Display the name of the tag that was passed in.
    const tagId = props.tag;
    const tagName = tagId ? tagNames.find(tagData => tagData.id === tagId)['name'] : '!!!'; // If there is no match, show "warning" triple bang
    return (
      <div 
        style={{ fontSize: "0.7rem", color: "white" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <button style={buttonStyle} onClick={() => handleTagClick(props.imageId, tagId)}>
          {tagName}
        </button>
      </div>
    );
  };
}

export default Tag;
