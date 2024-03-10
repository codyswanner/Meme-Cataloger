import React, { useState } from 'react';
import { Box, Button, AppBar, Toolbar, Typography, Dialog, DialogTitle} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function UploadDialog(props) {

    const handleClose = () => {
        props.onClose();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        console.log("file dropped!")
        const dt = e.dataTransfer;
        console.log(dt);

        const isFile = dt.types.includes('application/x-moz-file') | dt.types.includes('Files');
        if (isFile) {
            console.log("Drop includes file!");
            if (dt.files) {
                const data = dt.files[0]
                console.log(data);
            } else {
                console.log("No files associated with drop");
            }

        } else {
            console.log("Incorrect drop type: " + dt.types);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("file dragged over!")
    }

    return(
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>
                Upload Media
            </DialogTitle>
            <Box 
            sx={{
                margin: '0 5% 0 5%'
            }}>
            <Typography>
                Drag and drop into the box, or click the button to browse
            </Typography>
            <Box 
            sx={{
                id: 'upload-box',
                flexGrow: 1, 
                borderStyle: 'dashed', 
                display: 'flex',
                height: 200,
                justifyContent: 'center',
                verticalAlign: 'center',
                margin: '5% 0 5% 0'
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}>
                <Button
                     component="label"
                     variant="contained"
                     sx={{ height: 50, verticalAlign: 'center', position: 'relative', margin: 'auto' }}
                     startIcon={<UploadIcon/>}>
                    Upload Here!
                    <VisuallyHiddenInput type='file' />
                </Button>
            </Box>
            </Box>
        </Dialog>
    )
}



function TopAppBar() {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

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
                    onClick={handleClickOpen}>
                    Upload
                </Button>
                <UploadDialog open={open} onClose={handleClose}/>
            </Toolbar>
        </AppBar>
    )

    

};

export default TopAppBar;
