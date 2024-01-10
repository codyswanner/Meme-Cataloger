import React from 'react';
import { Popper, Box } from '@mui/material';

function AddTagPopper(props) {
    const id = open ? 'simple-popper' : undefined;

    return(
        <Popper id={id} open={props.open} anchorEl={props.anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
            <p>Jalepeño, maaaaaaan</p>
        </Box>
        </Popper>
    )
}

export default AddTagPopper;
