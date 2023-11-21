import React from 'react';
import ContentFrame from './ContentFrame'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ContentFrame/>
    </ThemeProvider>
  );
}

export default App;
