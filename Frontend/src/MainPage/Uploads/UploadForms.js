import React, { useState } from 'react';
import { Alert, Box, Button, List } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import CSRFToken from '../../SupportingModules/CSRFToken';
import { sendCSRFRequest } from '../../SupportingModules/CSRFToken';


/**
 * Sends upload request to backend (via HTTP).
 * 
 * @param {Event} e For preventing default browser behavior.
 * @param {Array} files The selected files to be uploaded.
 * @param {function} setFiles Resets state to empty after request is complete.
 * @param {function} setUploadResult sets error/success message.
 */
async function handleUpload(e, files, setFiles, setUploadResult) {
    e.preventDefault()
    const formData = new FormData();
    files.forEach(file => {formData.append('file', file)});
    try {
        await sendCSRFRequest(formData, 'api/upload/');
        setUploadResult("Success");
    } catch (err) {
        setUploadResult(err.message);
    };
    
    await setFiles([]);
};

/**
 * Shows an error to the user when the upload fails.
 * 
 * @param {string} uploadResult when not "Success," carries error message.
 * @returns The error message to be displayed if there is one.
 */
function handleUploadResult(uploadResult) {
    const uploadFailedStyles = {
        height: 30,
        margin: '5% auto 0 auto',
        position: 'relative',
        verticalAlign: 'center',
    }

    // on initial render, uploadResult is an empty string.
    if (uploadResult != "Success" & uploadResult != '') {
        return(
            <Box sx={uploadFailedStyles}>
            <Alert severity='error'>
                {uploadResult.toString()}
            </Alert>
            </Box>
        )
    };
};

/**
 * Displays button that will remove the file from selection when clicked.
 * Fits inside the FileUploadForm.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {file} props.file The specific file referenced by this button.
 * @param {Array} props.files The array of files in the form (state).
 * @param {function} props.setFiles Updates the props.files state.
 * @returns The file name as a button that can be pressed to unselect file.
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
 * Displayed when files are selected; allows submit, or further file selection.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {Array} props.files files to be uploaded; state passed from parent.
 * @param {function} props.setFiles updates 'props.files' state.
 * @param {function} props.setUploadResult help display error on failed upload.
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
                                e,
                                props.files,
                                props.setFiles,
                                props.setUploadResult
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
 * @param {function} props.handleInput when "Upload" button is clicked.
 * @param {function} props.uploadResult helps display error on failed upload.
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

    const acceptedImageTypes = 
        "image/jpg,image/jpeg,image/png,\
        image/webp,image/gif,image/bmp,image/svg"
    const acceptedVideoTypes =
        "video/mp4,video/mov,video/avi,\
        video/mkv,video/wmv,video/flv,video/webm"
    const acceptedFileTypes = `${acceptedImageTypes},${acceptedVideoTypes}`

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
            {handleUploadResult(props.uploadResult)}
            <Button
            component="label"
            variant="contained"
            sx={{
                height: 50,
                verticalAlign: 'center',
                position: 'relative',
                margin: 'auto'
            }}
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
