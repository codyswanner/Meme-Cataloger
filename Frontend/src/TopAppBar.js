import React, { useState } from 'react';
import { Box, Button, AppBar, Toolbar, ListItemText, ListItemButton, Typography, Dialog, DialogTitle, List, ListItem} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';
import axios from 'axios';

import CSRFToken from './CSRFToken';
import { sendCSRFRequest } from './CSRFToken';


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


async function handleUpload(e, files, setFiles) {
    e.preventDefault()
    'use server'
    const formData = new FormData();
    await console.log(files);
    await files.forEach(file => {
        formData.append('file', file);    
    });
    console.log(formData);

    await sendCSRFRequest(formData, 'api/upload/');
    await setFiles([]);
}



function UploadBox(props) {

    const [files, setFiles] = useState([]);

    const handleInput = () => {
        console.log("File Input!")
        const dt = document.querySelector('#fileInput').files;
        console.log(dt);
        const data = dt[0]
        console.log(data);  
        setFiles([...files, data]);
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
                
                setFiles([...files, data]);
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
    
    if (files.length) {
        return(
            <form method='POST' action={''}>
            <Box 
            sx={{
            id: 'upload-box',
            display: 'flex',
            flexGrow: 1, 
            flexWrap: 'wrap',
            flexDirection: 'column',
            borderStyle: 'dashed', 
            height: 'auto',
            minHeight: 200,
            justifyContent: 'space-between',
            verticalAlign: 'center',
            margin: '5% 0 5% 0',
            padding: '2%'
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <List>
                    {files.map((file, index) => (
                        <Typography key={index}>
                            {file.name}
                        </Typography>
                    ))}
                </List>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' onClick={(e) => handleUpload(e, files, setFiles)}>Click me!</Button>
                </Box>
                <CSRFToken/>
            </Box>
            </form>
        )
    } else {
    return(
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
                <VisuallyHiddenInput type='file' id='fileInput' onInput={handleInput}/>
            </Button>
        </Box>
    );}
};




function UploadDialog(props) {

    const handleClose = () => {
        props.onClose();
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
                <UploadBox/>
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
