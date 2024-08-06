import React from 'react';
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

export function AppContents() {
  return(
    <UploadFilesContextProvider>
      <DropHandler>
        <ContentFrame />
      </DropHandler>
    </UploadFilesContextProvider>
  );
};

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
export default function App(props) {

  // useFilterSocket receives messages for updates to appData.
  // appData contains Image, Tag and ImageTag data.
  const appData = useFilterSocket(props.apiData);
  const appState = {
    drawerOpen: drawerOpen,
    setDrawerOpen: setDrawerOpen,
    isClosingDrawer: isClosingDrawer,
    setIsClosingDrawer: setIsClosingDrawer,
    editTags: editTags,
    setEditTags: setEditTags,
    uploadDialogOpen: uploadDialogOpen,
    setUploadDialogOpen: setUploadDialogOpen
  };
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

  return (
    <>
    {/* https://mui.com/material-ui/customization/theming/#themeprovider */}
    <ThemeProvider theme={theme}>
      {/* https://react.dev/reference/react/useContext */}
      <AppDataContext.Provider value={{appData, appState}}>
      <UploadFilesContextProvider>
        <DropHandler>
          {props.children}
        </DropHandler>
      </UploadFilesContextProvider>
      </AppDataContext.Provider>
    </ThemeProvider>
    </>
  );
};
