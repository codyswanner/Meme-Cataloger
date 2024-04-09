import React, { useState, useContext } from 'react';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


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
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTagClick = (imageId, imageTagId, tagId) => {
    socket.send(JSON.stringify({
      'type': 'removeTag',
      'imageId': imageId,
      'imageTagId': imageTagId,
      'tagId': tagId
  }));
  };

  if (props.imageTag === 0) {
      // The zero tag is assigned to pictures with no other tags.
      // Display a prompt to add a tag.
    return(
      <div style={{ fontSize: "0.7rem", color: "white" }}>
        <p>{'Add tag'}</p>
      </div>
    );
  } else {
      // Display the name of the tag that was passed in.
    const imageTagId = props.imageTag;
    const tagId = appData[2].find(imageTag => imageTag.id === imageTagId)['tag_id'];
    console.log(appData[1]);
    const tagName = tagId ? appData[1].find(tagData => tagData.id === tagId)['name'] : '!!!'; // If there is no match, show "warning" triple bang
    return (
      <div 
        style={{ fontSize: "0.7rem", color: "white" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <button style={buttonStyle} onClick={() => handleTagClick(props.imageId, imageTagId)}>
          {tagName}
        </button>
      </div>
    );
  };
};

export default Tag;
