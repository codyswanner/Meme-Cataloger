import React from 'react';
import { Box, Typography, Dialog, DialogTitle } from '@mui/material';

import UploadBox from './UploadBox';


/**
 * An interface for uploading new images to the app.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {boolean} props.open Controls open/visible state of the componenet.
 * 
 * @returns The UploadDialog componenet to be rendered in the app.
 */
function UploadDialog(props) {

    const handleClose = () => {
        props.onClose();
    };

    return(
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>
                Upload Media
            </DialogTitle>
            <Box sx={{margin: '0 5% 0 5%'}}>
                <Typography>
                    Drag and drop into the box, or click the button to browse
                </Typography>
                <UploadBox/>
            </Box>
        </Dialog>
    );
};

export default UploadDialog; 
