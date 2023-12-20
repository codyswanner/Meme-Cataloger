import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        const socket = filterSocket;
    
        const receiveMessage = (e) => {
            const response = JSON.parse(e.data);
            if (response.type == "filterChange") {
                handleFilterChange(response, socket);
            } else if (response.type == "applyFilters") {
                handleApplyFilters(response);
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
