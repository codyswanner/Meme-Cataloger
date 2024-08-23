import React from 'react';
import { FormControlLabel, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import filterSocket from '../../SupportingModules/FilterSocket';


export default function TagEditor(props) {
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const largeScreenStyle = { fontSize: "1.5em" };
    const smallScreenStyle = { fontSize: "2.25em" };
    const textFieldStyle = largeScreen ? largeScreenStyle : smallScreenStyle

    const handleTagNameChange = (e, tagId) => {
        // Inform the backend of the change
        filterSocket.sendMessage({
            'type': 'updateTagName',
            'tagId': tagId,
            'name': e.target.value
        });
    };

    return(
        <FormControlLabel 
        sx = {{ width: 0.98 }} // ensures that one item takes up one row
        onChange={(e) => handleTagNameChange(e, props.tagId)}
        control={
            <TextField
                variant="standard"
                defaultValue={props.text}
                sx={{ marginLeft: "15%" }}
                inputProps={{
                    style: textFieldStyle
                }}
            />
        }/>
    );
};

