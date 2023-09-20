import React from 'react';

function Tag(props) {
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
      const tagName = tagId ? props.tagNames.find(tagData => tagData.id === tagId)['name'] : '!!!'; // If there is no match, show "warning" triple bang
      return (
        <div style={{ fontSize: "0.7rem", color: "white" }}>
          <p>{tagName}</p>
        </div>
      );
    };
  }

export default Tag;
