import React, { useContext } from 'react';
import { Popper, Box, List, ListItemButton } from '@mui/material';

import AppDataContext from './AppDataContext';
import filterSocket from './FilterSocket';


function TagPopperContent(props) {
    const appData = useContext(AppDataContext);
    const socket = filterSocket;

    const handleTagClick = (props, tagId) => {
        socket.send(JSON.stringify({
            'type': 'addTag', 
            'imageId': props.imageId, 
            'tagId': tagId
        }));
    }

    return(
        <List>
            {appData[1].map((tag) => {
                const tagId = tag.id;
                const tagName = tag.name;

                return(
                    <ListItemButton
                    key={tagId}
                    tagid={tagId}
                    onClick={() => handleTagClick(props, tagId)}>
                        {tagName}
                    </ListItemButton>
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
            <TagPopperContent {...props}/>
        </Box>
        </Popper>
    )
}

export default AddTagPopper;
