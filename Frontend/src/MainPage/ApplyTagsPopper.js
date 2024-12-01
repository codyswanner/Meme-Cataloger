import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AppDataContext from '../SupportingModules/AppDataContext';

import filterSocket from '../SupportingModules/FilterSocket';
import TagCheckbox from './TagCheckbox';


export default function ApplyTagsPopper(props) {
  
  const { appData, appState } = useContext(AppDataContext);
  const [resetForm, setResetForm] = useState(false);
  const TagsDialog = styled.dialog`
    position: absolute;
    left: -250px;
    top: 52px;
    width: 300px;
  `;

  useEffect(() => {
    if (resetForm) {
      // set resetForm back to false after a reset
      setResetForm(false);
    };
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Take the selected tagIds from the formData, and convert to int
    const selectedTags = [...formData.keys()].map((key) => +key);

    filterSocket.sendMessage({
      'type': 'updateTagsFromGallery',
      'selectedTags': selectedTags,
      'selectedImages': appState.selectedItems
    });

    console.log("Socket message sent!");

    setResetForm(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // changed state triggers fresh render, resetting all fields
    setResetForm(true);
  };

  return(
    <TagsDialog open={props.open}>
      <form onSubmit={(e) => handleSubmit(e)}>
        {(appData.tagData.map((tag) => {
          return(
            <TagCheckbox
              tagName={tag.name}
              tagId={tag.id}
              key={tag.id}
              appContext={{ appData, appState }}
            />
          )
        }))}
        <input type="submit" value="Submit"/>
        <button onClick={(e) => handleReset(e)}>Reset</button>
      </form>
    </TagsDialog>
  );
};


/*

What else this needs...

\
\
\
4. Search functionality
5. "Create new tag" functionality
\
7. Better styling! (This looks like shit right now)
8. Tests

*/
