import React from 'react';

function Tag(props) {
    if (props.tag === 0) {
      return(
        <div style={{ fontSize: "0.7rem", color: "white" }}>
          <p>{'Add tag'}</p>
        </div>
      );
    } else {
      const tagId = props.tag;
      const tagName = tagId ? props.tagNames.find(tagData => tagData.id === tagId)['name'] : 'Add Tag';
      return (
        <div style={{ fontSize: "0.7rem", color: "white" }}>
          <p>{tagName}</p>
        </div>
      );
    };
  }

export default Tag;
