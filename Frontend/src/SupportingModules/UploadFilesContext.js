import React, { createContext, useState } from 'react';


export const UploadFilesContext = createContext(null);

export default function UploadFilesContextProvider(props) {
    const [files, setFiles] = useState([]);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    const uploadFilesStates = [
        files,
        setFiles,
        uploadDialogOpen,
        setUploadDialogOpen
    ]

    return(
        <UploadFilesContext.Provider value={uploadFilesStates}>
            {props.children}
        </UploadFilesContext.Provider>
    )
}
