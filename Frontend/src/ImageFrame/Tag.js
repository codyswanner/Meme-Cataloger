import React, { useState, useContext } from 'react';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


/**
 * Displays the name of a tag assigned to this image.
 * On click, removes this tag from image.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.imageId The unique ID of the image to which this tag is assigned.
 * @param {number} props.imageTag The unique ID of the image-to-tag relationship.
 * @returns The Tag component to be rendered in the app.
 */
function Tag(props) {
  const appData = useContext(AppDataContext);
  const socket = filterSocket; // Used for communication with the backend.
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

  // Click a tag to remove it.  Inform the backend of the change.
  const handleTagClick = (imageId, imageTagId, tagId) => {
    // TODO: rework the Tag component to use Chips and not as a button.
    // See issue #4 for details.
    console.log("This button is deprecated, use the Autocomplete component!")
    
  //  socket.send(JSON.stringify({
  //    'type': 'removeTag',
  //    'imageId': imageId,
  //    'imageTagId': imageTagId,
  //    'tagId': tagId
  //}));
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

    /**
     * Determines the numerical tag ID in an image-to-tag relationship.
     * Uses the imageTagId (record of an image-to-tag pairing) as a starting point.
     * 
     * @param {array} imageTagArray Matches images with assigned tags.
     * @param {number} imageTagId unique ID of the image-to-tag association.
     * @returns The unique ID of the tag assigned to the image.
     */
    function getTagId(imageTagArray, imageTagId) {
      const imageTag = imageTagArray.find(element => element.id === imageTagId);
      const tagId = imageTag['tag_id'];
      return tagId;
    };

    // appData[2] records which tags are assigned to which images
    const tagId = getTagId(appData[2], props.imageTag);
    
    // appdata[1] matches tag IDs to tag names
    const tagName = appData[1].find(tagData => tagData.id === tagId)['name'];

    return (
      <div 
        style={{ fontSize: "0.7rem", color: "white" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* Tag is a button so that it can register a click, which removes it from the image. */}
        <button style={buttonStyle} onClick={() => handleTagClick(props.imageId, props.imageTag, tagId)}>
          {tagName}
        </button>
      </div>
    );
  };
};

export default Tag;
