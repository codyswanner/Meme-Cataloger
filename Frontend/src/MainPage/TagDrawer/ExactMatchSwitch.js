import React, { useContext, useRef } from 'react';

import AppDataContext from '../../SupportingModules/AppDataContext';
import filterSocket from '../../SupportingModules/FilterSocket';


export default function ExactMatchSwitch() {
  const { appState } = useContext(AppDataContext);
  const inputRef = useRef(null);

  const handleChange = () => {
    appState.exactMatchFilters.current = !appState.exactMatchFilters.current
    filterSocket.sendMessage({
      'type': 'activeFilters',
      'exactMatch': appState.exactMatchFilters.current,
      'activeFilters': appState.activeFilters,
      'origin': 'ExactMatchSwitch.js'
    });
  };

  const handleLabelClick = () => {
    if (inputRef.current.checked) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    };
    handleChange(); // Yo JS, kinda stupid that I gotta do this
  };

  return(
    <>
      <label
        htmlFor='exactMatchCheckbox'
        onClick={handleLabelClick}
        style={{'fontSize': '20px'}}
      >
        Exact Match
      </label>
      <input
        name='exactMatchCheckbox'
        type='checkbox'
        onChange={handleChange}
        ref={inputRef}
      />
    </>
  );
};
