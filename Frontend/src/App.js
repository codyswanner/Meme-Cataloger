import React, { createContext } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import useFilterSocket from './SupportingModules/useFilterSocket';
import AppDataContext from './SupportingModules/AppDataContext';
import ContentFrame from './ContentFrame';

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
