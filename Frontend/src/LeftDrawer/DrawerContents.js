import React, { useContext, useState } from 'react';
import { Box, Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import AppDataContext from '../SupportingModules/AppDataContext';
import FilterCheckbox from './FilterCheckbox';
import FeatureButton from './FeatureButton';
import TagEditor from './TagEditor';


export default function DrawerContents() {
    const appData = useContext(AppDataContext);
    const [editTags, setEditTags] = useState(false);
    let tagsList = appData[1];


    function handleArchiveButtonClick() {
        // Not yet implemented
        console.log("Archive button clicked!");
    };

    function handleTrashButtonClick() {
        // Not yet implemented
        console.log("Trash button clicked!");
    };

    function handleEditTagsButtonClick() {
        // Being implemented ;)
        console.log("Edit Tags button clicked!");
        setEditTags(!editTags);
    };

    if (!editTags) {  // Use FilterCheckbox, not TagEditor
        return (
            <Box sx={{ overflow: 'auto' }}>
                <Toolbar sx={{ marginTop: {'xs': "5%", 'md': 0}}}>
                    <Typography
                        sx={{ fontSize: {'xs': 40, 'md': 25} }}>
                        Filter by Tag
                    </Typography>
                    <IconButton
                        onClick={handleEditTagsButtonClick}
                        sx={{
                            marginLeft: 'auto',
                            transform: {'xs': 'scale(1.7)', 'md': 'scale(1.15)'}
                        }}>
                        <EditIcon/>
                    </IconButton>
                </Toolbar>
                <List> {/* List tags available for filtering */}
                    {tagsList.map((tag) => {
                        const tagId = tag.id;
                        const tagName = tag.name;
                        return(<FilterCheckbox  // This one uses FilterCheckbox
                            data-testid={'filter-checkbox'}
                            text={tagName}
                            key={tagId}
                            tagId={tagId}/>)
                    })}
                </List>
                <Divider/>
                <List> {/* Misc non-tag/filter options */}
                    <FeatureButton
                        name="Archive"
                        startIcon={<ArchiveIcon/>}
                        action={handleArchiveButtonClick}
                        active={false}/>
                    <FeatureButton
                        name="Trash"
                        startIcon={<DeleteIcon/>}
                        action={handleTrashButtonClick}
                        active={false}/>
                </List>
            </Box>
        );
    } else if (editTags) {  // Use TagEditor, not FilterCheckbox
        return (
            <Box sx={{ overflow: 'auto' }}>
                <Toolbar sx={{ marginTop: {'xs': "5%", 'md': 0}}}>
                    <Typography
                        sx={{ fontSize: {'xs': 40, 'md': 25} }}>
                        Filter by Tag
                    </Typography>
                    <IconButton
                        onClick={handleEditTagsButtonClick}
                        sx={{
                            marginLeft: 'auto',
                            transform: {'xs': 'scale(1.7)', 'md': 'scale(1.15)'}
                        }}>
                        <EditIcon/>
                    </IconButton>
                </Toolbar>
                <List> {/* List tags available for filtering */}
                    {tagsList.map((tag) => {
                        const tagId = tag.id;
                        const tagName = tag.name;
                        return(<TagEditor  // This one uses TagEditor
                            data-testid={'tag-editor'}
                            text={tagName}
                            key={tagId}
                            tagId={tagId}/>)
                    })}
                </List>
                <Divider/>
                <List> {/* Misc non-tag/filter options */}
                    <FeatureButton
                        name="Archive"
                        startIcon={<ArchiveIcon/>}
                        action={handleArchiveButtonClick}
                        active={false}/>
                    <FeatureButton
                        name="Trash"
                        startIcon={<DeleteIcon/>}
                        action={handleTrashButtonClick}
                        active={false}/>
                </List>
            </Box> 
        );
    };
};
