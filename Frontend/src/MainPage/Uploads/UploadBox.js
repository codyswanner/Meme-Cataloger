import React, { useContext, useState } from 'react';

import EmptyUploadForm from './EmptyUploadForm';
import FileUploadForm from './FileUploadForm';
import AppDataContext from '../../SupportingModules/AppDataContext';


/**
 * Contains either EmptyUploadForm or FileUploadForm,
 * depending on if an image has been selected by the user.
 * 
 * @returns The UploadBox component to be rendered in the app.
 */
function UploadBox() {
    const {appState} = useContext(AppDataContext);
    const [uploadResult, setUploadResult] = useState('');

    // this is triggered when user clicks "Upload" button
    const handleInput = () => {
        // Select the DataTransfer (dt)
        const dt = document.querySelector('#fileInput');
        if (dt.files) { // If there are files, add them to state
            const data = [];
            for (const file of dt.files) {
                data.push(file);
            };
            appState.setFiles([...appState.files, ...data]);
        };
    };

    if (appState.files.length) {
        return(
            <FileUploadForm
                files={appState.files}
                setFiles={appState.setFiles}
                setUploadResult={setUploadResult}
            />
        );
    } else {
        return(
            <EmptyUploadForm
                files={appState.files}
                setFiles={appState.setFiles}
                handleInput={handleInput}
                uploadResult={uploadResult}
            />
        );
    };
};

export default UploadBox;
