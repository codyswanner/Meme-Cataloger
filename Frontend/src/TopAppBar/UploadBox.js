import React, { useState } from 'react';

import { FileUploadForm, EmptyUploadForm } from './UploadForms';


function UploadBox() {

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

        const isFile = dt.types.includes('application/x-moz-file') | dt.types.includes('Files');
        if (isFile) { // Check dataTransfer type for files
            console.log("Drop includes file!");
            if (dt.files) { // If there are files, add them to state
                const data = dt.files[0]        
                setFiles([...files, data]);
            } else {
                console.log("No files associated with drop");
            };
        } else {
            console.log("Incorrect drop type: " + dt.types);
        }
    }

    const handleDragOver = (e) => {
        // Browser default is to not allow drag over
        // Prevent default to allow drag over.
        e.preventDefault(); 
    }
    
    if (files.length) {
        return(
            <FileUploadForm 
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                files={files}
                setFiles={setFiles}
            />
        )
    } else {
    return(
        <EmptyUploadForm
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            files={files}
            setFiles={setFiles}
            handleInput={handleInput}
        />
    );}
};

export default UploadBox;
