import React, { useContext } from 'react';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'

import UploadDialog from './UploadDialog';
import { UploadFilesContext } from '../SupportingModules/UploadFilesContext';


/**
 * Title and upload button for app.
 * Appears as a banner at the top of the page.
 * 
 * @returns The TopAppBar component to be rendered in the app.
 */
function TopAppBar() {
    const uploadFilesStates = useContext(UploadFilesContext);
    const uploadDialogOpen = uploadFilesStates[2];
    const setUploadDialogOpen = uploadFilesStates[3]; 
    
    const handleOpenUpload = () => {
        setUploadDialogOpen(true);
    };

    const handleCloseUpload = () => {
        setUploadDialogOpen(false);
    };

    return(
        <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
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
