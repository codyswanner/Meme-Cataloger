import React, { useContext, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';

import AppDataContext from '../../SupportingModules/AppDataContext';


function DropHandler(props) {
    const {appState} = useContext(AppDataContext);
    const [modalActive, setModalActive] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault(); // Allow drop on page
        setModalActive(false);
        appState.setUploadDialogOpen(true);

        const dt = e.dataTransfer;
        const isFile = dt.types.includes('application/x-moz-file')
            | dt.types.includes('Files');
        if (isFile) { // Check dataTransfer type for files
            if (dt.files) { // If there are files, add them to state
                const data = [];
                for (const file of dt.files) {
                    data.push(file);
                };
                appState.setFiles([...appState.files, ...data]);
            };
        };
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dragover on page
        setModalActive(true); // Activate dragOver modal
    };

    const handleDragLeave = () => {
        setModalActive(false); // Disappear dragOver modal
    };

    const handleActiveModal = () => {
        const modalStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#cccccc',
        padding: '5%',
        };

        return(
            <Modal open={modalActive}>
                <Box style={modalStyles}>
                    <Typography>
                        Drop to Upload Your Files!
                    </Typography>
                </Box>
            </Modal>
        );
    };

    return(
        <div
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={() => handleDragLeave()}
            onDrop={(e) => handleDrop(e)}>
            {/* conditional render dragOver modal */}
            {modalActive ? handleActiveModal() : <></>}
            {/* render the other components */}
            {props.children}
        </div>
    );
};

export default DropHandler;
