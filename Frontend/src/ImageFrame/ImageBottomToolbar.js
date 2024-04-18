import React from 'react';
import { Toolbar } from "@mui/material";

import Tag from './Tag';
import AddTagButton from './AddTagButton';


function ImageBottomToolbar(props) {
  const generateTags = (tagNames, imageTags) => {
    return imageTags.length === 0 ? (
      <Tag imageTag={0} key={0} tagNames={tagNames} />
    ) : (
      imageTags.map((imageTag) => (
        <Tag imageTag={imageTag} imageId={props.id} key={imageTag} tagNames={tagNames} />
      ))
    );
  };

  return(
    <Toolbar sx={[props.toolbarStyles, { bottom: 6.5 }]}>
      {generateTags(props.tagNames, props.imageTags)}
      <AddTagButton imageId={props.id} style={{ marginLeft: "auto" }}/>
    </Toolbar>
  );
};

export default ImageBottomToolbar;