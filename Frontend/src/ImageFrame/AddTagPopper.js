import React, { useContext, useRef, useEffect, useState } from 'react';
import { Popper, Box, Autocomplete, TextField } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';


/**
 * A selection menu for tags available to add to the image.
 * On tag click, adds tag to image.
 *
 * @param {object} props Contains props passed to the component.
 * @param {number} props.imageId Unique ID of the image to add a tag to.
 * @param {array} props.imageTags Describes tags on the image.
 *
 * @returns The TagPopperContent component to be rendered in the app.
 */
function TagPopperContent(props) {
    const appData = useContext(AppDataContext);
    const socket = filterSocket; // For communication with backend

    const tagOptions = appData[1].map((tag) => {
        const tagObject = {'id': tag.id, 'label': tag.name};
        return (tagObject)
    })

    /**
     * Determines details about the tag on the image.
     * Uses the imageTagId (record of an image-to-tag pairing) as a starting point.
     * 
     * @param {array} imageTagArray Matches images with assigned tags.
     * @param {number} imageTagId unique ID of the image-to-tag association.
     * @returns An object with the id and label for the tag on the image.
     */
    function getTagInfo(imageTagArray, imageTagId) {
      const imageTag = imageTagArray.find(element => element.id === imageTagId);
      const tagId = imageTag['tag_id'];
      const tagLabel = appData[1].find(tagData => tagData.id === tagId)['name'];
      const tagObject = {'id': tagId, 'label': tagLabel};
      return tagObject;
    };

    const createExistingTagsList = (imageTags) => {
        const existingTagsList = imageTags.map((imageTag) => {
            const tagInfo = getTagInfo(appData[2], imageTag);
            return tagInfo;
        });
        return existingTagsList;
    };

    const [val, setVal] = useState(createExistingTagsList(props.imageTags));

    const handleChange = (tagArray, imageId) => {
        setVal(tagArray);
        socket.send(JSON.stringify({
            'type': 'updateTags',
            'imageId': imageId,
            'tagArray': tagArray
        }));
    }

    return(
        <Autocomplete
            options={tagOptions}
            style={{ width: 300 }}
            openOnFocus
            value={val}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            // onChange returns an 'event' object that we don't need
            onChange={(event, value) => handleChange(value, props.imageId)}
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
 * @param {array} props.imageTags Used by child component; describes tags on the image.
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
            <TagPopperContent imageId={props.imageId} imageTags={props.imageTags}/>
        </Box>
        </Popper>
    )
};

export default AddTagPopper;
