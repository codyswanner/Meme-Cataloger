import React, { useContext } from 'react';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip'

import AppDataContext from '../SupportingModules/AppDataContext';


/**
 * Wraps the name of the tag in a styled <p> element for easier reading.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {string} props.tagName The tag name to be displayed.
 * @returns A styled HTML <p> element to display the name of the tag.
 */
function TagLabel(props) {
  const tagLabelStyle = {
    padding: 0,
    color: '#ffffff'
  };

  return (
    <p style={tagLabelStyle}>
      {props.tagName}
    </p>
  );
};

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
  const {imageTagData, tagData} = useContext(AppDataContext);

  if (props.imageTag === 0) {
      // The zero tag is assigned to pictures with no other tags.
      // Display a prompt to add a tag.
    return(
      <div style={{ fontSize: "0.7rem", color: "white" }}>
        <p>{'Add tag'}</p>
      </div>
    );
  } else { // Display the name of the tag that was passed in.
  
    // imageTagData records relationships between tags and images
    // We know the ID of this relationship, so we can find it
    const imageTag = imageTagData.find(element => element.id === props.imageTag);
    // Then we can narrow that image-to-tag relationship down to just the tag
    const tagId = imageTag['tag_id'];
    // tagData matches tag IDs to tag names
    const tagName = tagData.find(tagData => tagData.id === tagId)['name'];

    // Custom coloring to improve tag readability on top of the images
    const chipTheme = createTheme({
      palette: {
        primary: {
          main: alpha('#333333', 0.6),
        },
      }
    });

    return (
      <ThemeProvider theme={chipTheme}>
        <Chip color='primary' label={<TagLabel tagName={tagName}/>}/>
      </ThemeProvider>
    );
  };
};

export default Tag;
