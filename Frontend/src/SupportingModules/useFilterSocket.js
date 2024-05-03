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
 * @param {Array} apiData initial data from the API.
 * @param {Array} apiData[0] holds Image data; id, src, description, imageTags.
 * @param {Array} apiData[1] holds Tag data; id, name, owner.
 * @param {Array} apiData[2] holds ImageTag data; id, image_id, tag_id.
 *  "ImageTag" refers to an association between an image and a tag.
 *  e.g., ImageTag: {id: 3, image_id: 12, tag_id: 7}
 *  represents that image 12 has tag 7 applied to it.
 * 
 * @returns updated appData array, which mirrors apiData in structure.
 */
function useFilterSocket(apiData) {
    // appData contains Image, Tag and ImageTag data
    const [appData, setAppData] = useState(apiData);
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
        
        // Send filters to Django to make query and return picture ids to display
        // Future: add user id to this
        socket.send(JSON.stringify({'type': 'activeFilters', 'activeFilters': activeFilters}));
    };

    /**
     * Applies image filters, rendering only matching images
     * (as determined by a backend query; see consumers.py for details)
     * 
     * @param {object} response contains data about which images to render.
     * @param {Array} response.results the list of IDs of images to render.
     * 
     */
    function handleApplyFilters (response) {
        if (response.results.length == 0) {
            console.log("No matching photos!");
            // apiData[0] contains image data;
            // empty set represents no images rendered.
            setAppData([[], apiData[1], apiData[2]]);
        } else {
            let imagesToRender = [];
            // apiData[0] contains image data;
            // sort according to response data.
            apiData[0].forEach(image => {
                if (response.results.includes(image.id)) {imagesToRender.push(image)};
            });
            const newData = [imagesToRender, apiData[1], apiData[2]];
            setAppData(newData);
        };
    }

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

        // Locate relevant object in appData[0] (image data)
        const findInAppData = (id) => modifiedAppData[0].find(element => element.id == id); 
        const imageObject = findInAppData(response.imageId);
        // Modify image object to match updates
        imageObject.imageTags.push(response.id);
        
        // Add imageTag object to appData[2] (imageTag data) to reflect updates
        const newImageTag = {'id': response.id, 'image_id': response.imageId, 'tag_id': response.tagId};
        modifiedAppData[2].push(newImageTag);

        setAppData(modifiedAppData); // push updates to state
    };

    /**
     * Updates appData when a tag is removed from an image.
     * 
     * @param {object} response contains data about the imageTag to be removed.
     * @param {number} response.id the id of the imageTag to be removed.
     * @param {number} response.imageId the id of the image from which a tag is removed.
     */
    function handleTagRemoved (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // remove imageTag from image data (modifiedAppData[0])
        const findImage = (id) => modifiedAppData[0].find(element => element.id == id);
        const imageObject = findImage(response.imageId);
        imageObject['imageTags'] = imageObject['imageTags'].filter(function(item) {return item !== response.id})
        
        // remove imageTag from imageTag data (modifiedAppData[2])
        let index = modifiedAppData[2].findIndex(element => element.id === response.id);
        modifiedAppData[2].splice(index, 1);

        setAppData(modifiedAppData);
    };

    /**
     * Updates appData when an image is deleted.
     * 
     * @param {object} response contains data about the image to be deleted.
     * @param {number} response.id the id of the image to be deleted.
     */
    function handleImageDeleted (response) {
        const modifiedAppData = {...appData}; // Create a mutable copy

        // Delete image from the image array
        var imageArray = modifiedAppData[0];
        imageArray = imageArray.filter(function(item) {
            return item.id !== response.id
        });
        modifiedAppData[0] = imageArray;

        // Delete any tag association records for image
        // (Can this be changed to match the structure of handleTagRemoved?)
        const imageTagData = modifiedAppData[2];
        for (const [key, value] of Object.entries(imageTagData)) {
            if (value.image_id === response.id) {
                delete imageTagData[key];
            };
        };

        setAppData(modifiedAppData);
    };

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
                case "imageDeleted":
                    handleImageDeleted(response);
                    break;
                default:
                    console.log("Unexpected websocket message type received!");
                };
        };

        socket.addEventListener('message', receiveMessage);
    
        return () => {socket.removeEventListener('message', receiveMessage);}
      }, []);

      return appData;
};

export default useFilterSocket;
