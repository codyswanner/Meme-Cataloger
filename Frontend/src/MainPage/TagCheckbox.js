import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import AppDataContext from '../SupportingModules/AppDataContext';


export default function TagCheckbox(props) {

  const { appData, appState } = useContext(AppDataContext);
  const [fieldChanged, setFieldChanged] = useState(false);
  const initialValueRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {

    const checkbox = document.querySelector(`#checkbox-${props.tagId}`);
    const selection = appState.selectedItems;
    const matchingTags = appData.imageTagData.filter(
      (imageTag) => {
        for (let i = 0; i < selection.length; i++){
          if (imageTag.image_id == selection[i]){
            return true
          }
        }
      }
    ).filter(
      (imageTag) => {return imageTag.tag_id == props.tagId}
    );

    // Set initial value, and save in a ref (for undo/reset)
    if (matchingTags.length == 0) {
      // If selected images do not have this tag, leave unchecked by default.
      checkbox.checked = false;
      initialValueRef.current = false;
    } else if (matchingTags.length == selection.length) {
      // If all selected images have this tag, show checked by default.
      checkbox.checked = true;
      initialValueRef.current = true;
    } else if (matchingTags.length > 0) {
      // If only some images have this tag, show indeterminate checkbox.
      checkbox.indeterminate = true;
      initialValueRef.current = 'indeterminate';
    };
    
    setFieldChanged(false);
  
  }, [appState.selectedItems]);
  
  const handleLabelClick = () => {
    if (inputRef.current.checked) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    };
    handleChange(); // Yo JS, kinda stupid that I gotta do this
  };

  const handleChange = () => {
    if (!fieldChanged) {
      setFieldChanged(true);
    };

    const checkbox = document.querySelector(`#checkbox-${props.tagId}`);
    if (checkbox.checked) {
      props.handleFormUpdate(props.tagId, 'add');
    } else {
      props.handleFormUpdate(props.tagId, 'remove');
    };
  };

  const handleResetClick = (e) => {
    // Do not submit the form
    e.preventDefault();

    //  Reset the state
    setFieldChanged(false);
    
    // Reset the checkbox to it's original value
    const checkbox = document.querySelector(`#checkbox-${props.tagId}`);
    if (initialValueRef.current == false) {
      checkbox.checked = false;
    } else if (initialValueRef.current == true) {
      checkbox.checked = true;
    } else if (initialValueRef.current == 'indeterminate') {
      checkbox.indeterminate = true;
    };

    props.handleFormUpdate(props.tagId, 'none');
  };

  const ResetButton = styled.button`
    padding: 0;
    background: rgba(0, 0, 0, 0);
    border: 0;
  `;

  return(
    <>
      {
        fieldChanged &&
        <ResetButton onClick={(e) => handleResetClick(e)}>
          <img src="../../static/frontend/undo.png" height='12em'/>
        </ResetButton>
      }
      <input
        type='checkbox'
        name={props.tagId}
        id={`checkbox-${props.tagId}`}
        value={props.tagName}
        ref={inputRef}
        onChange={() => handleChange()}
      />
      <label htmlFor={props.tagId} onClick={handleLabelClick}>
        {props.tagName}
      </label>

      <br/>
    </>
  );
};
