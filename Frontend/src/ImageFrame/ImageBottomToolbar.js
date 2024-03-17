import React from 'react';
import { Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';


function ImageBottomToolbar(props) {
    const generateTags = (tags, tagNames) => {
      return tags.length === 0 ? (
        <Tag tag={0} key={0} tagNames={tagNames} />
      ) : (
        tags.map((tag) => (
          <Tag tag={tag} imageId={props.id} key={tag} tagNames={tagNames} />
        ))
      );
    }
  
    return(
      <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
        {generateTags(props.tags, props.tagNames)}
        <AddTagButton imageId={props.id} style={{ marginLeft: "auto" }}/>
      </Toolbar>
    );
  }
  

export default ImageBottomToolbar;
