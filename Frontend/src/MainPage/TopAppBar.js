import React, { useContext, useEffect, useState } from 'react';
import { Button, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UploadIcon from '@mui/icons-material/Upload'
import MenuIcon from '@mui/icons-material/Menu'

import UploadDialog from './Uploads/UploadDialog';
import AppDataContext from '../SupportingModules/AppDataContext';
import DeleteImagesButton from '../ImageFeatures/DeleteImagesButton';


/**
 * Title and upload button for app.
 * Appears as a banner at the top of the page.
 * 
 * @returns The TopAppBar component to be rendered in the app.
 */
function TopAppBar() {
  const { appState } = useContext(AppDataContext);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [uploadButtonSize, setUploadButtonSize] = useState('100%');
  const [titleSize, setTitleSize] = useState("120%");

  const handleResize = () => {
    if (smallScreen) {
      console.log("Detected small screen!");
      setUploadButtonSize('1.6em');  // Larger button for mobile/small screens
      setTitleSize('2em');
    } else {
      setUploadButtonSize('100%'); // Default size button otherwise
      setTitleSize("150%");
    };
  };

  useEffect(() => { handleResize(); }, [smallScreen])

  const handleOpenUpload = () => {
    appState.setUploadDialogOpen(true);
  };

  const handleCloseUpload = () => {
    appState.setUploadDialogOpen(false);
  };

  const handleDrawerToggle = () => {
    if (!appState.isClosingDrawer) {
      appState.setDrawerOpen(!appState.drawerOpen);
    };
  };

  const handleToggleSelect = () => {
    if (!appState.selectionActive) {
      appState.setSelectionActive(true);
    } else {
      appState.setSelectionActive(false);
      appState.setSelectedItems([]);
    };
  };

  const handleDeleteClick = () => {
    appState.setSelectedItems([]);
    appState.setSelectionActive(false);
  };

  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          size="large"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' }, fontSize: '5em' }}
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Typography variant='h5' noWrap component='div' sx={{ fontSize: titleSize }}>
          Meme-opolis
        </Typography>
        <Toolbar style={{ marginLeft: 'auto' }}>
          {
            appState.selectionActive &&
            <DeleteImagesButton
              handleClickInContext={handleDeleteClick}
              imageIds={appState.selectedItems}
            />
          }
          <Button
            variant="contained"
            sx={{ fontSize: uploadButtonSize }}
            onClick={handleToggleSelect}>
            Select
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: '5%', fontSize: uploadButtonSize }}
            startIcon={<UploadIcon fontSize="inherit" />}
            onClick={handleOpenUpload}>
            Upload
          </Button>
        </Toolbar>
        <UploadDialog open={appState.uploadDialogOpen} onClose={handleCloseUpload} />
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
