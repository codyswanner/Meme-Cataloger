import React, { useState } from 'react';
import { Alert, Box, Button, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import CSRFToken from '../SupportingModules/CSRFToken';
import { sendCSRFRequest } from '../SupportingModules/CSRFToken';


/**
 * Sends upload request to backend (via HTTP).
 * 
 * @param {Event} e For preventing default browser behavior.
 * @param {Array} files The selected files to be uploaded.
 * @param {function} setFiles Resets state to empty after request is complete.
 * @param {function} setUploadFailed Says whether the upload failed or not.
 */
async function handleUpload(e, files, setFiles, setUploadFailed) {
    e.preventDefault()
    const formData = new FormData();
    files.forEach(file => {formData.append('file', file)});
    try {
        await sendCSRFRequest(formData, 'api/upload/');
        setUploadFailed(false);
    } catch (err) {
        setUploadFailed(true);
    }
    
    await setFiles([]);
};

/**
 * Shows an error to the user when the upload fails.
 * Currently, the only case handled by this function is "unsupported file type".
 * 
 * @param {boolean} uploadFailed When true, renders an error message for the user.
 * @returns The (conditionally rendered) error message to be displayed in the UploadBox.
 */
function handleUploadFailed(uploadFailed) {
    const uploadFailedStyles = {
        height: 30,
        margin: '5% auto 0 auto',
        position: 'relative',
        verticalAlign: 'center',
    }

    if (uploadFailed) {
        return(
            <Box sx={uploadFailedStyles}>
            <Alert severity='error'>
                Unsupported File Type!
            </Alert>
            </Box>
        )
    }
}

/**
 * Displays a button for the file that will remove it from the form when clicked.
 * Fits inside the FileUploadForm.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {file} props.file The specific file referenced by this button.
 * @param {Array} props.files The array of files currently in the form.
 * @param {function} props.setFiles Modifies the props.files array.
 * @returns The name of the file as a button that can be pressed to remove the file.
 */
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
            }}>
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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={(e) => handleUpload(
                                e, props.files, props.setFiles, props.setUploadFailed
                            )}
                            sx={{ width: '120px' }}
                        >
                            Upload
                        </Button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            onClick={() => props.setFiles([])}
                            sx={{ width: '120px' }}>
                            Clear all
                        </Button>
                    </div>
                </Box>
                <CSRFToken/>
            </Box>
        </form>
    )
};

/**
 * 
 * @param {object} props Contains props passed to the component.
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
            }}>
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
