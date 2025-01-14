import { useEffect, useState } from 'react';

import filterSocket from './FilterSocket';


/**
 * Triggers responses to messages from the backend.
 * Keeps application up-to-date by:
 * setting and removing filters
 * determining images to render
 * adding and removing tags in sync with backend
 * deleting images as backend requests
 * and displaying simple messages sent over websocket to the console.
 * 
 * @param {object} rawAppData contains starting data and properties.
 * @param {Array} rawAppData.imageData contains id, src, desc for each image.
 * @param {Array} rawAppData.tagData contains id, name, owner of each tag.
 * @param {Array} rawAppData.imageTagData maps tags to images, and vice versa.
 *  "ImageTag" refers to an association between an image and a tag.
 *  e.g., ImageTag: {id: 3, image_id: 12, tag_id: 7}
 *  represents that image 12 has tag 7 applied to it.
 * 
 * @returns updated appData array according to messages from backend.
 */
export default function useFilterSocket(rawAppData, appState) {
    // create appData object to be returned (after modifications)
    const [appData, setAppData] = useState(rawAppData);
    // activeFilters refers to filters for image search
    const [activeFilters, setActiveFilters] = useState([]);

    /**
     * Responds to a request to change a filter state.
     * 
     * @param {object} response contains data about filter to change.
     * @param {number} response.filterId the ID of the (tag) filter to change
     * @param {string} response.filterState says if filter should be on or off.
     * @param {WebSocket} socket informs the backend of the change.
     */
    function handleFilterChange (response, socket) {
        if (response.filterState == "on") {
            setActiveFilters(
            filters => {
                filters.push(response.filterId)
                return filters;
            });
        } else if (response.filterState == "off") {
            setActiveFilters(
            filters => {
                const i = filters.indexOf(response.filterId);
                filters.splice(i, 1);
                return filters;
            });
        };
        
        // Send filters to make query and return picture ids to display
        // Future: add user id to this
        socket.send(JSON.stringify({
            'type': 'activeFilters',
            'activeFilters': activeFilters
        }));
    };

    /**
     * Applies image filters, rendering only matching images
     * (as determined by a backend query; see consumers.py for details)
     * 
     * @param {object} response contains data about which images to render.
     * @param {Array} response.imageResults list of IDs of images to render.
     * @param {Array} response.associatedTags list of tags on matching images.
     * 
     */
    function handleApplyFilters (response) {
        
        if (response.imageResults.length == 0) {
            console.log("No matching photos!");
            // empty array represents no images rendered.
            const allTagIds = rawAppData.tagData.map((tag) => {
                return tag.id;
            });
            appState.setNoMatchFilters(allTagIds);
            setAppData({...rawAppData, imageData: []});
            return;
        };

        if (response.filters.length == 0) {
            console.log("Filters cleared");
            appState.setNoMatchFilters([]);
            setAppData({...rawAppData});
            return;
        };

        const imagesToRender = rawAppData.imageData.filter((image) => {
            return response.imageResults.includes(image.id);
        });

        const noMatchFilters = rawAppData.tagData.map((tag) => {
            if (response.associatedTags.includes(tag.id)) {return null};
            return tag.id;
        });

        appState.setNoMatchFilters(noMatchFilters);
        const newData = {...rawAppData, imageData: imagesToRender};
        setAppData(newData);
    };

    /**
     * Updates appData when a new imageTag is created.
     *  "ImageTag" refers to an association between an image and a tag.
     *  e.g., ImageTag: {id: 3, image_id: 12, tag_id: 7}
     *  represents that image 12 has tag 7 applied to it.
     * 
     * @param {object} response contains data about the new imageTag
     * @param {number} response.id the id of the imageTag object just created
     * @param {number} response.imageId the id of the target image
     * @param {number} response.tagId the id of the target tag
     */
    function handleTagAdded (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // Locate relevant object in imageData
        const findInAppData = (id) => modifiedAppData.imageData
            .find(element => element.id == id); 
        const imageObject = findInAppData(response.imageId);
        // Modify image object to match updates
        imageObject.imageTags.push(response.id);
        
        // Add imageTag object to imageTagData to reflect updates
        const newImageTag = {
            'id': response.id,
            'image_id': response.imageId,
            'tag_id': response.tagId
        };
        modifiedAppData.imageTagData.push(newImageTag);

        setAppData(modifiedAppData); // push updates to state
    };

    /**
     * Updates appData when a tag is removed from an image.
     * 
     * @param {object} response contains data about the imageTag to be removed.
     * @param {number} response.id the id of the imageTag to be removed.
     * @param {number} response.imageId id of image from which tag is removed.
     */
    function handleTagRemoved (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // remove imageTag from image data
        const findImage = (id) => modifiedAppData.imageData
            .find(element => element.id == id);
        const imageObject = findImage(response.imageId);
        imageObject['imageTags'] = imageObject['imageTags']
            .filter(function(item) {return item !== response.id})
        
        // remove imageTag from imageTagData
        let index = modifiedAppData.imageTagData
            .findIndex(element => element.id === response.id);
        modifiedAppData.imageTagData.splice(index, 1);

        setAppData(modifiedAppData);
    };

    function handleTagCreated (response) {
        const modifiedAppData = [...appData];
        const newTag = {
            'id': response.id,
            'name': response.name,
            'owner': response.owner
        };
        modifiedAppData.tagData.push(newTag);

        setAppData(modifiedAppData);
    }

    /**
     * Updates appData when an image is deleted.
     * 
     * @param {object} response contains data about the image to be deleted.
     * @param {number} response.id the id of the image to be deleted.
     */
    function handleImageDeleted (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // Delete image from the image array
        var imageArray = modifiedAppData.imageData;
        imageArray = imageArray.filter(function(item) {
            return item.id !== response.id
        });
        modifiedAppData.imageData = imageArray;

        // Delete any tag association records for image
        // (Can this be changed to match the structure of handleTagRemoved?)
        const imageTagData = modifiedAppData.imageTagData;
        for (const [key, value] of Object.entries(imageTagData)) {
            if (value.image_id === response.id) {
                delete imageTagData[key];
            };
        };

        setAppData(modifiedAppData);
    };

    function handleImagesDeleted (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy
        console.log(response.ids);

        for (const id of response.ids) {
            console.log(id);
            // Delete image from the image array
            var imageArray = modifiedAppData.imageData;
            imageArray = imageArray.filter(function(item) {
                return item.id !== id
            });
            modifiedAppData.imageData = imageArray;
            console.log(`Removed ${id} from app data`);

            // Delete any tag association records for image
            // (Can this match the structure of handleTagRemoved?)
            const imageTagData = modifiedAppData.imageTagData;
            for (const [key, value] of Object.entries(imageTagData)) {
                if (value.image_id === id) {
                    delete imageTagData[key];
                };
            };
            console.log(`Removed imagetags for ${id} from app data`);
        };

        setAppData(modifiedAppData);
    }

    function handleTagUpdated (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // Find the tag
        const tagArray = modifiedAppData.tagData;
        const targetTag = tagArray.find(function(item) {
            return item.id == response.id
        });
        // Update the tag
        const targetIndex = tagArray.indexOf(targetTag);
        tagArray[targetIndex]['name'] = response.name;
        
        // push updates to state
        modifiedAppData.tagData = tagArray;
        setAppData(modifiedAppData);
    }

    /**
     * Displays a message from WebSockets to the console.
     * 
     * @param {object} response contains message to display.
     * @param {string} response.message the message to be displayed.
     */
    function handleSocketMessage (response) {
        console.log(response.message);
    }

    /**
     * Routes incoming message to the proper handler.
     */
    useEffect(() => {
        const socket = filterSocket;

        const receiveMessage = (e) => {
            const response = JSON.parse(e.data);
            switch (response.type) {
                case "message":
                    handleSocketMessage(response);
                    break;
                case "filterChange":
                    handleFilterChange(response, socket);
                    break;
                case "applyFilters":
                    handleApplyFilters(response);
                    break;
                case "tagAdded":
                    handleTagAdded(response);
                    break;
                case "tagRemoved":
                    handleTagRemoved(response);
                    break;
                case "tagCreated":
                    handleTagCreated(response);
                    break;
                case "imageDeleted":
                    handleImageDeleted(response);
                    break;
                case "imagesDeleted":
                    handleImagesDeleted(response);
                    break;
                case "tagUpdated":
                    handleTagUpdated(response);
                    break;
                default:
                    console.log("Unexpected websocket message type received!");
                    console.log(response);  // Helps to know what is unexpected
                };
        };

        socket.addEventListener('message', receiveMessage);

        return () => {socket.removeEventListener('message', receiveMessage);}
      }, []);

      return appData;
};
