import React, { useContext } from 'react';
import { Popper, Box, List, ListItemButton, Autocomplete, TextField } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


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

    const tagOptions = appData[1].map((tag) => {
        const tagId = tag.id;
        const tagName = tag.name;
        return (tagId, tagName)
    })

    return(
        // <List>
        //     {appData[1].map((tag) => {
        //         const tagId = tag.id;
        //         const tagName = tag.name;

        //         return(
        //             <ListItemButton
        //             key={tagId}
        //             tagid={tagId}
        //             onClick={() => handleTagClick(props, tagId)}>
        //                 {tagName}
        //             </ListItemButton>
        //         )
        //     })}
        // </List>


        <Autocomplete
            options={tagOptions}
            style={{ width: 300 }}
            openOnFocus
            disablePortal
            multiple
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant='outlined'
                />
            )}
        />
    )
};

function AddTagPopper(props) {
    const id = open ? 'simple-popper' : undefined;

    return(
        <Popper id={id} open={props.open} anchorEl={props.anchorEl} sx={{ zIndex: 1200 }}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
            <TagPopperContent {...props}/>
        </Box>
        </Popper>
    )
};

export default AddTagPopper;
