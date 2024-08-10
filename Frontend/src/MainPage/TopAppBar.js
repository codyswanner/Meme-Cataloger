import React, { useContext, useEffect, useState } from 'react';
import { Button, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UploadIcon from '@mui/icons-material/Upload'
import MenuIcon from '@mui/icons-material/Menu'

import UploadDialog from './Uploads/UploadDialog';
import { UploadFilesContext } from './Uploads/UploadFilesContext';
import AppDataContext from '../SupportingModules/AppDataContext';


/**
 * Title and upload button for app.
 * Appears as a banner at the top of the page.
 * 
 * @returns The TopAppBar component to be rendered in the app.
 */
function TopAppBar() {
    const {appState} = useContext(AppDataContext);
    const uploadFilesStates = useContext(UploadFilesContext);
    const uploadDialogOpen = uploadFilesStates[2];
    const setUploadDialogOpen = uploadFilesStates[3];
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

    useEffect(() => {handleResize();}, [smallScreen])
    
    const handleOpenUpload = () => {
        setUploadDialogOpen(true);
    };

    const handleCloseUpload = () => {
        setUploadDialogOpen(false);
    };

    const handleDrawerToggle = () => {
        if (!appState.isClosingDrawer) {
            appState.setDrawerOpen(!appState.drawerOpen);
        };
    };

    return(
        <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    size="large"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' }, fontSize:'5em' }}
                >
                    <MenuIcon fontSize="inherit"/>
                </IconButton>
                <Typography variant='h5' noWrap component='div' sx={{ fontSize: titleSize }}>
                    Meme-opolis
                </Typography>
                <Button
                    variant="contained"
                    sx={{marginLeft: "auto", fontSize: uploadButtonSize}}
                    startIcon={<UploadIcon fontSize="inherit"/>}
                    onClick={handleOpenUpload}>
                    Upload
                </Button>
                <UploadDialog open={uploadDialogOpen} onClose={handleCloseUpload}/>
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
