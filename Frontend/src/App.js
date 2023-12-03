import React, { useEffect, useState } from 'react';
import ContentFrame from './ContentFrame'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import filterSocket from './FilterSocket';


// createTheme sets background color
const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
});

function App(props) {

  const [appData, setAppData] = useState(props.apiData);
  const [activeFilters, setActiveFilters] = useState([]);

  // update pictures when data is received from WebSocket
  useEffect(() => {
    const socket = filterSocket;

    const receiveMessage = (e) => {
      const response = JSON.parse(e.data);

      if (response.type == "filterChange") {
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
      }

      
    }

    socket.addEventListener('message', receiveMessage);

    return () => {
      socket.removeEventListener('message', receiveMessage);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ContentFrame data={appData}/>
    </ThemeProvider>
  );
}

export default App;
