import React, { useState } from 'react';

import { FileUploadForm, EmptyUploadForm } from './UploadForms';


/**
 * Handles drag-and-drop for uploading new images to the app.
 * Contains either EmptyUploadForm or FileUploadForm,
 * depending on if an image has been selected by the user.
 * 
 * @returns The UploadBox component to be rendered in the app.
 */
function UploadBox() {
    const [files, setFiles] = useState([]);
    const [uploadFailed, setUploadFailed] = useState(false);

    // this is triggered when user clicks "Upload" button
    const handleInput = () => {
        // Select the DataTransfer (dt)
        const dt = document.querySelector('#fileInput').files;
        // Currently only appends the first file selected
        // Future: accept all valid files selected
        setFiles([...files, dt[0]]);
    };
    
    // this is triggered when user drags and drops file(s)
    const handleDrop = (e) => {
        e.preventDefault(); // Allow drop
        const dt = e.dataTransfer;

        const isFile = dt.types.includes('application/x-moz-file') | dt.types.includes('Files');
        if (isFile) { // Check dataTransfer type for files
            if (dt.files) { // If there are files, add them to state
                // Currently only appends the first file selected
                // Future: accept all valid files selected
                const data = dt.files[0];
                setFiles([...files, data]);
            };
        };
    };

    // Allow dragover
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    if (files.length) {
        return(
            <FileUploadForm
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                files={files}
                setFiles={setFiles}
                setUploadFailed={setUploadFailed}
            />
        );
    } else {
        return(
            <EmptyUploadForm
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                files={files}
                setFiles={setFiles}
                handleInput={handleInput}
                uploadFailed={uploadFailed}
                setUploadFailed={setUploadFailed}
            />
        );
    };
};

export default UploadBox;
