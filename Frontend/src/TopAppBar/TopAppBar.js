import React, { useContext } from 'react';
import { Button, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import MenuIcon from '@mui/icons-material/Menu'

import UploadDialog from './UploadDialog';
import { UploadFilesContext } from '../SupportingModules/UploadFilesContext';


/**
 * Title and upload button for app.
 * Appears as a banner at the top of the page.
 * 
 * @returns The TopAppBar component to be rendered in the app.
 */
function TopAppBar(props) {
    const uploadFilesStates = useContext(UploadFilesContext);
    const uploadDialogOpen = uploadFilesStates[2];
    const setUploadDialogOpen = uploadFilesStates[3];
    
    const handleOpenUpload = () => {
        setUploadDialogOpen(true);
    };

    const handleCloseUpload = () => {
        setUploadDialogOpen(false);
    };

    const handleDrawerToggle = () => {
        if (!props.isClosingDrawer) {
            props.setDrawerOpen(!props.drawerOpen);
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
                <Typography variant='h5' noWrap component='div'>
                    Meme-opolis
                </Typography>
                <Button
                    component="label"
                    variant="contained"
                    sx={{marginLeft: "auto"}}
                    startIcon={<UploadIcon/>}
                    onClick={handleOpenUpload}>
                    Upload
                </Button>
                <UploadDialog open={uploadDialogOpen} onClose={handleCloseUpload}/>
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
