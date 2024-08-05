import React, { useContext, useState, useRef } from 'react';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

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
    const newTagCount = useRef(0); // To keep track of newly created tags
    const {appData} = useContext(AppDataContext);
    const imageData = useContext(ImageDataContext);
    const imageId = imageData['id'];
    const imageTags = imageData['imageTags'];
    const socket = filterSocket; // For communication with backend
    // To display "add new" option, see getFilterOptions function
    const optionsFilter = createFilterOptions();
    const tagOptions = appData.tagData.map((tag) => {
        const tagObject = {'id': tag.id, 'label': tag.name};
        return (tagObject)
    });

    /**
     * Determines details about the tag on the image.
     * Uses the imageTagId (record of an image-to-tag pairing) as a starting point.
     * 
     * @param {array} imageTagArray Matches images with assigned tags.
     * @param {number} imageTagId unique ID of the image-to-tag association.
     * @returns An object with the id and label for the tag on the image.
     */
    function getTagInfo(imageTagArray, imageTagId) {
      // First, find the ID for this tag
      const imageTag = imageTagArray.find(element => element.id === imageTagId);
      const tagId = imageTag['tag_id'];
      // Now, find the name of the tag
      const tagName = appData.tagData.find(tagData => tagData.id === tagId)['name'];
      // Package the info into an object and return
      const tagObject = {'id': tagId, 'label': tagName};
      return tagObject;
    };

    /**
     * Use the initial pageload data to set the initial tags.
     * 
     * @param {array} imageTags The IDs of image-to-tag relationships on first pageload.
     * @returns An array of objects describing tags on the image.
     */
    const createExistingTagsList = (imageTags) => {
        const existingTagsList = imageTags.map((imageTag) => {
            const tagInfo = getTagInfo(appData.imageTagData, imageTag);
            return tagInfo;
        });
        return existingTagsList;
    };

    /**
     * Injects an option to `Create ${new}` if typed value does not match existing options.
     * 
     * @param {array} options Options provided to the component; see tagOptions
     * @param {object} params Component-provided information about itself
     * @returns Options to be displayed to the user, including `Create ${new}` if applicable.
     */
    const getFilterOptions = (options, params) => {
        // filtered returns results that match user input
        const filtered = optionsFilter(options, params);
        // extract "inputValue" attribute from params
        const { inputValue } = params;
        // check if user input already exists
        const isExisting = options.some(
          (option) => inputValue.toLowerCase() === option.label.toLowerCase()
        );
        // if it does not exist, suggest to create it with a new option
        if (inputValue !== "" && !isExisting) {
            filtered.push({
              id: 0, // id of 0 signals to system that this tag doesn't exist yet
              label: `Create "${inputValue}"`, // this is what is shown on the option
              inputValue: inputValue, // this will be used to create the permanent label
            });
          }
        // return options, including `Create "${inputValue}"` if applicable
        return filtered;
    };

    /**
     * Checks if an option and a value correspond to each other.
     * 
     * @param {object} option Option visible to the user
     * @param {object} value Value assigned in Autocomplete component
     * 
     * @returns true if value corresponds to option
     */
    const checkOptions = (option, value) => {
        if (typeof value.id === 'string' || value.id instanceof String) {
            // This is a new tag that shouldn't have an option exposed
            // return true to supress a false warning
            return true;
        } else {
            // check normally
            return option.id === value.id;
        };
    };

    /**
     * Runs any updates on tag changes in the Autocomplete component.
     * 
     * Updates the value passed to Autocomplete indicating selected options,
     * and informs the backend of newly added/removed/created tags.
     * 
     * @param {array} tagArray The tags applied to this image (with any new changes).
     * @param {number} imageId The id of the image to which these tags are applied.
     */
    const handleChange = (tagArray, imageId) => {
        const newVal = []; // will populate with the new tag array
        
        // add tags to newVal, to update val state
        for (const element in tagArray) {
            const tag = tagArray[element]; // take the tag object itself
            
            // Only new tags have an inputValue attribute
            if (tag && tag.inputValue) {
                // Create a new value from the user input
                const newTag = {
                id: `newTag${newTagCount.current++}`,
                label: tag.inputValue,
                };
                newVal.push(newTag);
            } else {
                // Add object from available options (typical case)
                newVal.push(tag);
            }
        }
        setVal(newVal);

        // inform the backend of the changes
        socket.send(JSON.stringify({
            'type': 'updateTags',
            'imageId': imageId,
            'tagArray': newVal,
            'user': 1 // Hardcoded for now
        }));
    };

    // Declare state last to ensure functions are set up
    const [val, setVal] = useState(createExistingTagsList(imageTags));

    return(
        <Autocomplete
            options={tagOptions}
            style={{ width: 300 }}
            openOnFocus
            value={val}
            isOptionEqualToValue={(option, value) => checkOptions(option, value)}
            // onChange returns an 'event' object that we don't need
            onChange={(event, value) => handleChange(value, imageId)}
            filterOptions={(options, params) => getFilterOptions(options, params)}
            disablePortal
            multiple
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant='outlined'
                />
            )}
            renderOption={(props, option) =>
                <li {...props} key={option.id}>
                    {option.label}
                </li>
            }
        />
    )
};

export default TagPopperContent;
