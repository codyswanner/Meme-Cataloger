import React, { useState } from 'react';

import StandardDrawerContents from './StandardDrawerContents';
import EditDrawerContents from './EditDrawerContents';


export default function DrawerModeSwitcher() {
    const [editTags, setEditTags] = useState(false);

    function handleArchive() {
        // Not yet implemented
        console.log("Archive button clicked!");
    };

    function handleTrash() {
        // Not yet implemented
        console.log("Trash button clicked!");
    };

    function handleEdit() {
        // Toggle edit mode
        setEditTags(!editTags);
    };

    if (!editTags) {  // Use FilterCheckbox, not TagEditor
        return (
            <StandardDrawerContents
                handleEdit={handleEdit}
                handleArchive={handleArchive}
                handleTrash={handleTrash}/>
        );
    } else if (editTags) {  // Use TagEditor, not FilterCheckbox
        return (
            <EditDrawerContents
                handleEdit={handleEdit}
                handleArchive={handleArchive}
                handleTrash={handleTrash}/>
        );
    };
};
