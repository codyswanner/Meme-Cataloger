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
        
        
        console.log(activeFilters);
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
        console.log("tagAdded message received!")
        console.log(response);

        const objectId = response.id;
        const imageId = response.imageId;
        const tagId = response.tagId;

        const modifiedAppData = {...appData};
        console.log("appData copy completed: ")
        console.log(modifiedAppData);
        // Use response to locate relevant object in appData[0]
        const findInAppData = (id) => modifiedAppData[0].find(element => element.id == id); 
        const imageObject = findInAppData(imageId);
        // Modify object in appData[0] to match updates
        imageObject.tags.push(tagId);
        console.log("modifiedAppData[0] updated");
        console.log(modifiedAppData);
        
        
        // Add object to appData[2] to reflect updates
        const newImageTag = {'id': objectId, 'image_id': imageId, 'tag_id': tagId};
        console.log("newImageTag created");
        console.log(newImageTag);
        console.log("modifiedAppData[2] before:")
        console.log(modifiedAppData[2]);
        modifiedAppData[2].push(newImageTag);
        console.log("modifiedAppData[2] updated")
        console.log(modifiedAppData[2]);
        console.log("setting appData!")

        setAppData(modifiedAppData);

        console.log("appData set!")

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
