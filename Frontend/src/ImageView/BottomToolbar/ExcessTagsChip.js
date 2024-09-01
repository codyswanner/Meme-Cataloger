import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip'


function ExcessTagsChip(props) {
    return (
    <ThemeProvider theme={props.theme}>
        <Chip color='primary' label={<p>+{props.labelText}</p>}/>
    </ThemeProvider>
    );
};

export default ExcessTagsChip;
