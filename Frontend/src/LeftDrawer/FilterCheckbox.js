import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

import filterSocket from '../SupportingModules/FilterSocket';


const handleChange = (props, event) => {
    const checkboxLabel = props.text;
    const socket = filterSocket;
    const selectionMessage = "FilterCheckbox: " + (event.target.checked ? "" : "un") + "checked " + props.tagId;
    console.log(selectionMessage);
    socket.send(JSON.stringify({
        'type':'filterChange',
        'filterName': checkboxLabel,
        'filterId': props.tagId,
        'filterState': (event.target.checked ? "on" : "off")
    }));
};

function FilterCheckbox(props) {
    return(
        <FormControlLabel control={<Checkbox/>}
        label={props.text}
        sx={{ width: 1 }} // TODO: Change with screen width
        onChange={(event) => handleChange(props, event)}/>
    );
};

export default FilterCheckbox;
 