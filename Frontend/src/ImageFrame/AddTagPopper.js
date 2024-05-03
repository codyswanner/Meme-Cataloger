import React, { useContext, useRef, useEffect } from 'react';
import { Popper, Box, List, ListItemButton, Autocomplete, TextField } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


/**
 * A selection menu for tags available to add to the image.
 * On tag click, adds tag to image.
 *
 * @param {object} props Contains props passed to the component.
 * @param {number} props.imageId Unique ID of the image to add a tag to.
 *
 * @returns The TagPopperContent component to be rendered in the app.
 */
function TagPopperContent(props) {
    const appData = useContext(AppDataContext);
    const socket = filterSocket; // For communication with backend

    const handleTagClick = (imageId, tagId) => {
        // Inform backend of tag addition
        socket.send(JSON.stringify({
            'type': 'addTag', 
            'imageId': imageId,
            'tagId': tagId
        }));
    }

    const tagOptions = appData[1].map((tag) => {
        const tagId = tag.id;
        const tagName = tag.name;
        return (tagId, tagName)
    })

    return(
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

/**
 * Container for TagPopperContent component; determines visibility of child components.
 * Also handles open/close/click-away behavior of the popper.
 *
 * @param {object} props Contains props passed to the component.
 * @param {number} props.imageId Used by child component; image to add a tag to.
 * @param {ref} props.buttonRef Refs the parent element for click-away handling.
 * @param {boolean} props.open Detemines if AddTagPopper is open/visible or not.
 * @param {function} props.setOpen Takes a boolean; sets props.open.
 * @param {Element} props.anchorEl Anchor element of the popper.
 * @param {function} props.setAnchorEl Sets the anchor element for the Popper.
 *      See https://mui.com/material-ui/react-popper/ for details on the purpose of anchorEl.
 *
 * @returns The AddTagPopper component to be rendered in the app.
 */
function AddTagPopper(props) {
    const id = open ? 'simple-popper' : undefined;
    const popperRef = useRef(null); // For click-away detection
    
    // Thank you StackOverflow user Ben Bud! https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    function useOutsideAlerter(ref) {
        useEffect(() => {
           //Trigger if clicked outside both the popper and it's button
          function handleClickOutside(event) {
            if (// This component exists
                ref.current &&
                // Click was outside of this component
                !ref.current.contains(event.target) &&
                // Parent component exists (should always be true)
                props.buttonRef.current &&
                // Click is outside parent component
                !props.buttonRef.current.contains(event.target)) {
                    // If ALL the above are true, click was outside of targets,
                    // so we should close AddTagPopper (this component).
                    props.setOpen(false);
                    props.setAnchorEl(null);
                    // "Why do we need to check the parent component?"
                    // Because AddTagButton has it's own close handler,
                    // and if this event is triggered when AddTagButton is clicked,
                    // this component closes and immediately opens again.
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
        <Popper
            id={id}
            ref={popperRef}
            open={props.open}
            anchorEl={props.anchorEl}
            sx={{ zIndex: 1200 }}
        >
        <Box sx={{ border: 1, p: 1, bgcolor: '#aaaaaa' }}>
            <TagPopperContent imageId={props.imageId}/>
        </Box>
        </Popper>
    )
};

export default AddTagPopper;
