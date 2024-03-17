import React from 'react';
import { Box, Button, Typography, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import CSRFToken from '../SupportingModules/CSRFToken';
import { sendCSRFRequest } from '../SupportingModules/CSRFToken';


async function handleUpload(e, files, setFiles) {
    e.preventDefault()
    'use server'
    const formData = new FormData();
    console.log(files);
    await files.forEach(file => {
        formData.append('file', file);    
    });
    console.log(formData);

    sendCSRFRequest(formData, 'api/upload/');
    await setFiles([]);
};


function FileUploadForm(props) {

    return (
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
            onDrop={props.handleDrop}
            onDragOver={props.handleDragOver}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <List>
                    {props.files.map((file, index) => (
                        <Typography key={index}>
                            {file.name}
                        </Typography>
                    ))}
                </List>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' onClick={(e) => handleUpload(e, props.files, props.setFiles)}>Click me!</Button>
                </Box>
                <CSRFToken/>
            </Box>
        </form>
    )
};

function EmptyUploadForm(props) {

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
            onDrop={props.handleDrop}
            onDragOver={props.handleDragOver}>
            <Button
            component="label"
            variant="contained"
            sx={{ height: 50, verticalAlign: 'center', position: 'relative', margin: 'auto' }}
            startIcon={<UploadIcon/>}>
                Upload Here!
                <VisuallyHiddenInput type='file' id='fileInput' onInput={props.handleInput}/>
            </Button>
        </Box>
    )
};

export {FileUploadForm};
export {EmptyUploadForm};
