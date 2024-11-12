import React, { useContext, useEffect, useRef } from 'react';
import AppDataContext from '../SupportingModules/AppDataContext';


export default function TagCheckbox(props) {

  const { appData, appState } = useContext(AppDataContext);
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

    if (matchingTags.length == 0) {
      checkbox.checked = false;
    } else if (matchingTags.length == selection.length) {
      checkbox.checked = true;
    } else if (matchingTags.length > 0) {
      checkbox.indeterminate = true;
    };
  
  }, [appState.selectedItems]);
  
  const handleLabelClick = () => {
    if (inputRef.current.checked) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    };
  };

  return(
    <>
      <input
        type='checkbox'
        name={props.tagId}
        id={`checkbox-${props.tagId}`}
        value={props.tagName}
        ref={inputRef}
      />
      <label htmlFor={props.tagId} onClick={handleLabelClick}>
        {props.tagName}
      </label>

      <br/>
    </>
  );
};
