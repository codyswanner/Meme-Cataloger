import React from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import ContentFrame from './ContentFrame';
import useFilterSocket from './useFilterSocket';


// createTheme sets background color
const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
});

function App(props) {

  // update pictures when data is received from WebSocket
  const appData = useFilterSocket(props);

  return (
    <ThemeProvider theme={theme}>
      <ContentFrame data={appData}/>
    </ThemeProvider>
  );
}

export default App;
