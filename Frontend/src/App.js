import React, { createContext } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import ContentFrame from './ContentFrame';
import useFilterSocket from './useFilterSocket';
import AppDataContext from './AppDataContext';

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
    <AppDataContext.Provider value={appData}>
      <ContentFrame />
    </AppDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
