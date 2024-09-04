import React, { useState } from 'react';
import { Box, createTheme, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import ApiCall from '../SupportingModules/ApiCall';
import TopAppBar from './TopAppBar';
import TagDrawer from './TagDrawer/TagDrawer';
import VirtuosoGridWrapper from './ImageList/VirtualizedImageList';
import useFilterSocket from '../SupportingModules/useFilterSocket';
import AppDataContext from '../SupportingModules/AppDataContext';
import DropHandler from './Uploads/DropHandler';



// initial data for page load, provided by Django API.
let apiData = await ApiCall();

/**
 * Root component that renders all other components.
 * Activates useFilterSocket hook,
 * which is the hub for WebSocket communications with backend.
 * 
 * @param {object} props Contains props passed into the component.
 * 
 * @returns The root App component to render all other components.
 */
export default function App() {

  // useFilterSocket receives messages for updates to appData.
  // appData contains Image, Tag and ImageTag data.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isClosingDrawer, setIsClosingDrawer] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const appData = useFilterSocket(apiData);
  const appState = {
    drawerOpen: drawerOpen,
    setDrawerOpen: setDrawerOpen,
    isClosingDrawer: isClosingDrawer,
    setIsClosingDrawer: setIsClosingDrawer,
    editTags: editTags,
    setEditTags: setEditTags,
    files: files,
    setFiles: setFiles,
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
        <DropHandler>
          <Box sx={{ display: 'flex' }}>
            {/* Provided by MUI Material for basic styling */}
            <CssBaseline />

            {/* Navigation banner/AppBar at top of the page */}
            <TopAppBar/>

            {/* Drawer on left side, holds tag filter options */}
            <TagDrawer/>

            {/* Main content area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />{/* Hides under AppBar, push below to open space */}
                <div className='flex-container'>
                    <VirtuosoGridWrapper/>
                </div>
            </Box>
          </Box>
        </DropHandler>
      </AppDataContext.Provider>
    </ThemeProvider>
    </>
  );
};
