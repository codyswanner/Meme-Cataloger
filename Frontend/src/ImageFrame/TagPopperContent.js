import React, { useContext, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import filterSocket from '../SupportingModules/FilterSocket';
import ImageDataContext from '../SupportingModules/ImageDataContext';


/**
 * A selection menu for tags available to add to the image.
 * On tag click, adds tag to image.
 *
 * @returns The TagPopperContent component to be rendered in the app.
 */
function TagPopperContent() {
    const appData = useContext(AppDataContext);
    const imageData = useContext(ImageDataContext);
    const imageId = imageData['id'];
    const imageTags = imageData['imageTags'];
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

    const [val, setVal] = useState(createExistingTagsList(imageTags));

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
            onChange={(event, value) => handleChange(value, imageId)}
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

export default TagPopperContent;
