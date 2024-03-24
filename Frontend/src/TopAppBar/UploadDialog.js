import React from 'react';
import { Box, Typography, Dialog, DialogTitle } from '@mui/material';

import UploadBox from './UploadBox';


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
