import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import AppDataContext from '../../SupportingModules/AppDataContext';

import filterSocket from '../../SupportingModules/FilterSocket';
import TagCheckbox from './TagCheckbox';


export default function ApplyTagsPopper(props) {
  
  const { appData, appState } = useContext(AppDataContext);
  const [resetForm, setResetForm] = useState(false);
  const dialogRef = useRef(null);
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

  // Thank you StackOverflow user Ben Bud! https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  function useOutsideAlerter(ref) {
    useEffect(() => {
      //Trigger if clicked outside both the popper and it's button
      function handleClickOutside(event) {
        if (// This component exists, and...
          ref.current &&
          // if click was outside of this component, and...
          !ref.current.contains(event.target) &&
          // if parent component exists (should always be true), and...
          props.buttonRef.current &&
          // if click is outside parent component
          !props.buttonRef.current.contains(event.target)) {
            // If ALL the above are true, click was outside of targets,
            // so we should close ApplyTagsPopper (this component).
            props.setOpen(false);
            props.setAnchorEl(null);
            // "Why do we need to check the parent component?"
            // Because ApplyTagButton has it's own close handler,
            // and if this event is triggered when ApplyTagButton is clicked,
            // this component closes and immediately opens again.
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(dialogRef);

  const formActions = appData.tagData.map((tag) => {
    return {'id': tag.id, 'action': 'none'}
  });

  const handleFormUpdate = (id, action) => {
    const index = formActions.findIndex((tag) => {return tag.id == id});
    formActions[index].action = action;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    filterSocket.sendMessage({
      'type': 'updateTagsFromGallery',
      'actions': formActions,
      'selectedImages': appState.selectedItems,
      'user': 1 // Hardcoded for now
    });

    setResetForm(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // changed state triggers fresh render, resetting all fields
    setResetForm(true);
  };

  return(
    <TagsDialog open={props.open} ref={dialogRef}>
      <form onSubmit={(e) => handleSubmit(e)}>
        {(appData.tagData.map((tag) => {
          return(
            <TagCheckbox
              tagName={tag.name}
              tagId={tag.id}
              key={tag.id}
              appContext={{ appData, appState }}
              handleFormUpdate={handleFormUpdate}
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
