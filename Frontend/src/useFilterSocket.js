import { useEffect, useState } from 'react';

import filterSocket from './FilterSocket';


// update pictures when data is received from WebSocket
function useFilterSocket(props) {
    const [appData, setAppData] = useState(props.apiData);
    const [activeFilters, setActiveFilters] = useState([]);

    
    function handleFilterChange (response, socket) {
        if (response.filterState == "on") {
            setActiveFilters(
            filters => {
                filters.push(response.filterId)
                return filters
            });
        } else if (response.filterState == "off") {
            setActiveFilters(
            filters => {
                const i = filters.indexOf(response.filterId);
                filters.splice(i, 1);
                return filters;
            });
        }
        
        
        // Send filters to Django to make query and return picture ids to display
        // Add user id to this
        socket.send(JSON.stringify({'type': 'activeFilters', 'activeFilters': activeFilters}));
        
    }

    function handleApplyFilters (response) {
        const results = response.results;
                let imagesToRender = [];
                if (results.length == 0) {
                    console.log("No matching photos!")
                    setAppData([[], props.apiData[1], props.apiData[2]]);
                } else {
                    props.apiData[0].forEach(image => {
                        if (results.includes(image.id)) {
                            imagesToRender.push(image)
                        };
                    });
                    const newData = [imagesToRender, props.apiData[1], props.apiData[2]];
                    setAppData(newData);
                }
    }

    function handleTagAdded (response) {
        const objectId = response.id;
        const imageId = response.imageId;
        const tagId = response.tagId;

        const modifiedAppData = {...appData};
        // Use response to locate relevant object in appData[0]
        const findInAppData = (id) => modifiedAppData[0].find(element => element.id == id); 
        const imageObject = findInAppData(imageId);
        // Modify object in appData[0] to match updates
        imageObject.tags.push(tagId);
        
        
        // Add object to appData[2] to reflect updates
        const newImageTag = {'id': objectId, 'image_id': imageId, 'tag_id': tagId};
        modifiedAppData[2].push(newImageTag);

        setAppData(modifiedAppData);
    }

    function handleTagRemoved (response) {
        const objectId = response.id;
        const imageId = response.imageId;
        const tagId = response.tagId;

        const modifiedAppData = {...appData};
        // Use response to locate relevant objects in appData
        const findImage = (id) => modifiedAppData[0].find(element => element.id == id); 
        const imageObject = findImage(imageId);

        const findImageTag = (id) => modifiedAppData[2].find(element => element.id == id);

        // Modiify objects in appData to match updates
        // var tagArray = imageObject['tags']
        var tagArray = imageObject['tags'];

        console.log(tagArray);
        
        tagArray = tagArray.filter(function(item) {
            return item !== tagId
        })

        console.log(tagArray);

        imageObject['tags'] = tagArray;

        console.log(modifiedAppData);
        

        setAppData(modifiedAppData);



        
        
    }

    useEffect(() => {
        const socket = filterSocket;
    
        const receiveMessage = (e) => {
            const response = JSON.parse(e.data);
            if (response.type == "filterChange") {
                handleFilterChange(response, socket);
            } else if (response.type == "applyFilters") {
                handleApplyFilters(response);
            } else if (response.type == "tagAdded") {
                handleTagAdded(response);
            } else if (response.type == "tagRemoved") {
                handleTagRemoved(response);
            } else {
                console.log("WebSocket message of undetermined type received")
            }
        }
    
        socket.addEventListener('message', receiveMessage);
    
        return () => {
          socket.removeEventListener('message', receiveMessage);
        }
      }, []);

      return appData;

};

export default useFilterSocket;
