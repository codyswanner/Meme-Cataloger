import React, { useContext, useState } from 'react';

import { FileUploadForm, EmptyUploadForm } from './UploadForms';
import AppDataContext from '../../SupportingModules/AppDataContext';


/**
 * Handles drag-and-drop for uploading new images to the app.
 * Contains either EmptyUploadForm or FileUploadForm,
 * depending on if an image has been selected by the user.
 * 
 * @returns The UploadBox component to be rendered in the app.
 */
function UploadBox() {
    const {appState} = useContext(AppDataContext);
    const files = appState.files;
    const setFiles = appState.setFiles;
    const [uploadFailed, setUploadFailed] = useState(false);

    // this is triggered when user clicks "Upload" button
    const handleInput = () => {
        // Select the DataTransfer (dt)
        const dt = document.querySelector('#fileInput');
        if (dt.files) { // If there are files, add them to state
            const data = [];
            for (const file of dt.files) {
                data.push(file);
            }
            setFiles([...files, ...data]);
        }
    };
    
    if (files.length) {
        return(
            <FileUploadForm
                files={files}
                setFiles={setFiles}
                setUploadFailed={setUploadFailed}
            />
        );
    } else {
        return(
            <EmptyUploadForm
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
