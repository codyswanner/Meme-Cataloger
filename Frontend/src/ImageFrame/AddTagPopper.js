import React, { useContext, useRef, useEffect } from 'react';
import { Popper, Box, List, ListItemButton } from '@mui/material';

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
};

function AddTagPopper(props) {
    const id = open ? 'simple-popper' : undefined;
    const popperRef = useRef(null);
    
    // Thank you StackOverflow user Ben Bud! https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Trigger if clicked outside both the popper and it's button
           */
          function handleClickOutside(event) {
            if (ref.current &&
                !ref.current.contains(event.target) &&
                props.buttonRef.current &&
                !props.buttonRef.current.contains(event.target)) {
              props.setOpen(false);
              props.setAnchorEl(null);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    useOutsideAlerter(popperRef);



    return(
        <Popper id={id} ref={popperRef} open={props.open} anchorEl={props.anchorEl} sx={{ zIndex: 1200 }}>
        <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
            <TagPopperContent {...props}/>
        </Box>
        </Popper>
    )
};

export default AddTagPopper;
