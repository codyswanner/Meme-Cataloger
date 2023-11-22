import * as React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const handleChange = (checkboxLabel) => {
    console.log("Selected " + checkboxLabel)
}

function FilterCheckbox(props) {
    return(
        <FormControlLabel control={<Checkbox/>}
        label={props.text}
        sx={{ width: 1}}
        onChange={() => handleChange(props.text)}/>
    );
    
}


export default FilterCheckbox;
