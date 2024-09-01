import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip'

import AppDataContext from '../../SupportingModules/AppDataContext';


/**
 * Displays the name of a tag assigned to this image.
 * On click, removes this tag from image.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {number} props.imageTag Unique ID of the image-to-tag relationship.
 * @param {object} props.theme Style applied to tags, including ExcessTagsChip.
 * @returns The Tag component to be rendered in the app.
 */
function Tag(props) {
  const {appData} = useContext(AppDataContext);

  if (props.imageTag === 0) {
      // The zero tag is assigned to pictures with no other tags.
      // Display a prompt to add a tag.
    return(
      <div style={{ fontSize: "0.7rem", color: "white" }}>
        <p>{'Add Tag'}</p>
      </div>
    );
  } else { // Display the name of the tag that was passed in.
  
    // appData.imageTagData records relationships between tags and images
    // We know the ID of this relationship, so we can find it
    const imageTag = appData.imageTagData.find(
      element => element.id === props.imageTag
    );
    // Then we can narrow that image-to-tag relationship down to just the tag
    const tagId = imageTag['tag_id']
      
    // appData.tagData matches tag IDs to tag names
    const tagName = appData.tagData.find(
      tagData => tagData.id === tagId
    )['name'];

    return (
      <ThemeProvider theme={props.theme}>
        <Chip color='primary' label={<p>{tagName}</p>}/>
      </ThemeProvider>
    );
  };
};

export default Tag;
