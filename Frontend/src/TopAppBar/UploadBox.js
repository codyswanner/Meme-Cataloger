import React, { useState } from 'react';

import { FileUploadForm, EmptyUploadForm } from './UploadForms';


function UploadBox() {
    const [files, setFiles] = useState([]);

    const handleInput = () => {
        const dt = document.querySelector('#fileInput').files;
        const data = dt[0];
        setFiles([...files, data]);
    };
    
    const handleDrop = (e) => {
        e.preventDefault(); // Allow drop
        const dt = e.dataTransfer;

        const isFile = dt.types.includes('application/x-moz-file') | dt.types.includes('Files');
        if (isFile) { // Check dataTransfer type for files
            if (dt.files) { // If there are files, add them to state
                const data = dt.files[0];
                setFiles([...files, data]);
            };
        };
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dragover
    };
    
    if (files.length) {
        return(
            <FileUploadForm
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                files={files}
                setFiles={setFiles}
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
            />
        );
    };
};

export default UploadBox;
