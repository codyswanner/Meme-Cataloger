import React from 'react';
import { Box, Button, Typography, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import CSRFToken from '../SupportingModules/CSRFToken';
import { sendCSRFRequest } from '../SupportingModules/CSRFToken';


/**
 * Sends upload request to backend (via HTTP).
 * 
 * @param {Array} files The selected files to be uploaded.
 * @param {function} setFiles Resets state to empty after request is complete.
 */
async function handleUpload(e, files, setFiles) {
    e.preventDefault()
    'use server' // Tells React to use a server action
    const formData = new FormData();
    files.forEach(file => {formData.append('file', file)});
    sendCSRFRequest(formData, 'api/upload/');
    await setFiles([]);
};

/**
 * Form displayed when files have been selected; allows submit, or further file selection.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {function} props.handleDrop passed from parent, which handles drag-and-drop behavior.
 * @param {function} props.handleDragOver passed from parent, which handles drag-and-drop behavior.
 * @param {Array} props.files the files to be uploaded; state passed from parent.
 * @param {function} props.setFiles state updater for 'files' state.
 * 
 * @returns The FileUploadForm component to the rendered in the app.
 */
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
                    <Button type='submit' onClick={(e) => handleUpload(e, props.files, props.setFiles)}>Upload</Button>
                </Box>
                <CSRFToken/>
            </Box>
        </form>
    )
};

/**
 * 
 * @param {object} props Contains props passed to the component.
 * @param {function} props.handleDrop passed from parent, which handles drag-and-drop behavior.
 * @param {function} props.handleDragOver passed from parent, which handles drag-and-drop behavior.
 * @param {function} props.handleInput passed from parent, for when "Upload" button is clicked.
 * 
 * @returns The EmptyUploadForm component to the rendered in the app.
 */
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

    const acceptedImageFiletypes = "image/jpg,image/jpeg,image/png,image/webp,image/gif,image/bmp,image/svg"
    const acceptedVideoFiletypes = "video/mp4,video/mov,video/avi,video/mkv,video/wmv,video/flv,video/webm"
    const acceptedFileTypes = (acceptedImageFiletypes + "," + acceptedVideoFiletypes)
    
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
                <VisuallyHiddenInput
                type='file'
                id='fileInput'
                onInput={props.handleInput}
                accept={acceptedFileTypes}/>
            </Button>
        </Box>
    )
};

export {FileUploadForm};
export {EmptyUploadForm};
