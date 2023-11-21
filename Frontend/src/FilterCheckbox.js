import * as React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const handleChange = (e) => {

}

function FilterCheckbox(props) {
    return(
        <FormControlLabel control={<Checkbox/>}
        label={props.text}
        sx={{ width: 1}}
        onChange={handleChange}/>
    );
    
}


export default FilterCheckbox;
