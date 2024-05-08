import React, { useState } from 'react';
import { Box, Button, Typography, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import CSRFToken from '../SupportingModules/CSRFToken';
import { sendCSRFRequest } from '../SupportingModules/CSRFToken';

// TODO: update this documentation!
/**
 * Sends upload request to backend (via HTTP).
 * 
 * @param {Array} files The selected files to be uploaded.
 * @param {function} setFiles Resets state to empty after request is complete.
 */
async function handleUpload(e, files, setFiles, setUploadFailed) {
    e.preventDefault()
    const formData = new FormData();
    files.forEach(file => {formData.append('file', file)});
    try {
        await sendCSRFRequest(formData, 'api/upload/');
    } catch (e) {
        setUploadFailed(true);
    }
    
    await setFiles([]);
};

// TODO: document this function!
function handleUploadFailed(uploadFailed) {
    const uploadFailedStyles = {
        height: 30,
        margin: '5% auto 0 auto',
        position: 'relative',
        verticalAlign: 'center',
    }

    if (uploadFailed) {
        console.log("received the prop, it's true!");
        return(
            <Box sx={uploadFailedStyles}>
            <Typography> {/* Very rudimentary error display, replace with more permanent solution later */}
                Unsupported File Type!
            </Typography>
            </Box>
        )
    } else {
        console.log("Recievied the prop, it's false!");
    }
}

// TODO: document this function!
function FileButton(props) {
    const [isHovered, setIsHovered] = useState(false);
    
    const buttonStyle = {
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        color: '#000000',
        cursor: 'pointer',
        textDecoration: isHovered ? 'underline' : 'none',
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    const handleFileClick = (e, file, files) => {
        e.preventDefault()
        const modifiedFiles = files.slice();
        const index = modifiedFiles.indexOf(file);
        modifiedFiles.splice(index, 1);
        props.setFiles(modifiedFiles);
    }

    return(
        <>
        <button
            style={buttonStyle}
            onClick={(e) => handleFileClick(e, props.file, props.files)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
                {props.file.name}
        </button>
        <br/>
        </>
    )
}

/**
 * Form displayed when files have been selected; allows submit, or further file selection.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {function} props.handleDrop passed from parent, which handles drag-and-drop behavior.
 * @param {function} props.handleDragOver passed from parent, which handles drag-and-drop behavior.
 * @param {Array} props.files the files to be uploaded; state passed from parent.
 * @param {function} props.setFiles state updater for 'files' state.
 * @param {function} props.setUploadFailed allows for display of error on a failed upload.
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
                        <FileButton
                        file={file}
                        files={props.files}
                        key={index}
                        setFiles={props.setFiles}/>
                    ))}
                </List>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type='submit'
                        onClick={(e) => handleUpload(
                            e, props.files, props.setFiles, props.setUploadFailed
                        )}
                    >
                        Upload
                    </Button>
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
 * @param {function} props.uploadFailed allows for display of error on a failed upload.
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
            flexDirection: 'column',
            justifyContent: 'center',
            verticalAlign: 'center',
            margin: '5% 0 5% 0'
            }}
            onDrop={props.handleDrop}
            onDragOver={props.handleDragOver}>
            {handleUploadFailed(props.uploadFailed)}
            <Button
            component="label"
            variant="contained"
            sx={{ height: 50, verticalAlign: 'center', position: 'relative', margin: 'auto' }}
            startIcon={<UploadIcon/>}>
                Upload Here!
                <VisuallyHiddenInput
                type='file'
                id='fileInput'
                multiple
                onInput={props.handleInput}
                accept={acceptedFileTypes}/>
            </Button>
        </Box>
    )
};

export {FileUploadForm};
export {EmptyUploadForm};
