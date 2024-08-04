import React, { useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import useFilterSocket from './SupportingModules/useFilterSocket';
import AppDataContext from './SupportingModules/AppDataContext';
import DropHandler from './DropHandler';
import ContentFrame from './ContentFrame';
import UploadFilesContextProvider from './SupportingModules/UploadFilesContext';

// createTheme sets background color
const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          // Toolbar is used to push content out from under the AppBar.
          // AppBar is larger than standard size, because of IconButton for the drawer.
          // So, increase the max Toolbar size to allow tall enough Toolbars for this.
          maxHeight: 1000
        }
      }
    }
  }
});

/**
 * Root component that renders all other components.
 * Activates useFilterSocket hook,
 * which is the hub for WebSocket communications with backend.
 * 
 * @param {object} props Contains props passed into the component.
 * @param {Array} props.apiData Data for initial page load.
 * 
 * @returns The root App component to render all other components.
 */
function App(props) {

  // useFilterSocket receives messages for updates to appData.
  // appData contains Image, Tag and ImageTag data.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isClosingDrawer, setIsClosingDrawer] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const rawAppData = {
    ...props.apiData,
    drawerOpen: drawerOpen,
    setDrawerOpen: setDrawerOpen,
    isClosingDrawer: isClosingDrawer,
    setIsClosingDrawer: setIsClosingDrawer,
    editTags: editTags,
    setEditTags: setEditTags
  };
  const appData = useFilterSocket(rawAppData);

  return (
    <>
    {/* https://mui.com/material-ui/customization/theming/#themeprovider */}
    <ThemeProvider theme={theme}>
      {/* https://react.dev/reference/react/useContext */}
      <AppDataContext.Provider value={appData}>
      <UploadFilesContextProvider>
        <DropHandler>
          <ContentFrame setDrawerOpen={setDrawerOpen} />
        </DropHandler>
      </UploadFilesContextProvider>
      </AppDataContext.Provider>
    </ThemeProvider>
    </>
  );
}

export default App;
