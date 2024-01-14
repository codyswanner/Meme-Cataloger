import React, { useContext } from 'react';
import { Popper, Box, List, Typography } from '@mui/material';

import AppDataContext from './AppDataContext';


function TagPopperContent(props) {
    const appData = useContext(AppDataContext);

    return(
        <List>
            {appData[1].map((tag) => {
                const tagId = tag.id;
                const tagName = tag.name;

                return(
                    <Typography key={tagId} tagid={tagId}>
                        {tagName}
                    </Typography>
                )
            })}
        </List>
    )
}

function AddTagPopper(props) {
    const id = open ? 'simple-popper' : undefined;

    return(
        <Popper id={id} open={props.open} anchorEl={props.anchorEl} sx={{ zIndex: 1200 }}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
            <TagPopperContent/>
        </Box>
        </Popper>
    )
}

export default AddTagPopper;
