import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';


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
  };

  // on initial render, uploadResult is an empty string.
  if (uploadResult != "Success" & uploadResult != '') {
    return(
      <Box sx={uploadFailedStyles}>
        <Alert severity='error'>
          {uploadResult.toString()}
        </Alert>
      </Box>
    );
  };
};

/**
 * @param {object} props Contains props passed to the component.
 * @param {function} props.handleInput when "Upload" button is clicked.
 * @param {function} props.uploadResult helps display error on failed upload.
 * 
 * @returns The EmptyUploadForm component to the rendered in the app.
 */
export default function EmptyUploadForm(props) {

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
    image/webp,image/gif,image/bmp,image/svg";
  const acceptedVideoTypes =
    "video/mp4,video/mov,video/avi,\
    video/mkv,video/wmv,video/flv,video/webm";
  const acceptedFileTypes = `${acceptedImageTypes},${acceptedVideoTypes}`;

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
          data-testid='fileInput'
          multiple
          onInput={props.handleInput}
          accept={acceptedFileTypes}/>
      </Button>
    </Box>
  );
};
