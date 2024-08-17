import React, { useContext, useState } from 'react';
import { Box, Divider, Drawer, List, Toolbar } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppDataContext from '../../SupportingModules/AppDataContext';
import FilterCheckbox from './FilterCheckbox';
import TagEditor from './TagEditor';
import FeatureButton from './FeatureButton';
import DrawerHeader from './DrawerHeader';


/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
export default function TagDrawer() {
    const {appData, appState} = useContext(AppDataContext);
    const [editTags, setEditTags] = useState(false);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const drawerStyles = (style) => {
        const widthChooser = style=='permanent' ? 240 : "100%"
        return {
            backgroundColor: '#666666',
            width: widthChooser,
            flexShrink: 0,
            ['& .MuiDrawer-paper']:
                { width: widthChooser, backgroundColor: '#aaaaaa' },
            marginRight: '0.5%',
        };
    };

    const handleArchive = () => {
        // Not yet implemented
        console.log("Archive button clicked!");
    };

    const handleTrash = () => {
        // Not yet implemented
        console.log("Trash button clicked!");
    };

    const handleEdit = () => {
        // Toggle edit mode
        setEditTags(!editTags);
    };


    const permanentDrawerProps = {
        variant: 'permanent',
        sx: [drawerStyles('permanent'), {display: { xs: 'none', md: 'block' }}],
        'data-testid': 'permanent-drawer'
    };

    const temporaryDrawerProps = {
        variant: 'temporary',
        open: appState.drawerOpen,
        ModalProps: {keepMounted: true}, // improves performance
        sx: [drawerStyles('temporary'), {display: { xs: 'block', md: 'none' }}],
        'data-testid': 'temporary-drawer'
    };
    
    return (
        <Drawer {...(smallScreen ? temporaryDrawerProps : permanentDrawerProps)}>
            <Toolbar/>
            <Box sx={{ overflow: 'auto' }}>
                <DrawerHeader handleEdit={handleEdit}/>
                <List> {/* List tags available for filtering */}
                        {(appData.tagData.map((tag) => {
                            const tagId = tag.id;
                            const tagName = tag.name;
                            return(
                                editTags ?
                                
                                <TagEditor
                                text={tagName}
                                key={tagId}
                                tagId={tagId}/>
                                :
                                <FilterCheckbox
                                text={tagName}
                                key={tagId}
                                tagId={tagId}/>
                            )
                        }))}
                </List>
                <Divider/>
                <List> {/* Misc non-tag/filter options */}
                    <FeatureButton
                        name="Archive"
                        startIcon={<ArchiveIcon/>}
                        action={handleArchive}
                        active={false}/>
                    <FeatureButton
                        name="Trash"
                        startIcon={<DeleteIcon/>}
                        action={handleTrash}
                        active={false}/>
                </List>
            </Box>
        </Drawer>
    );
};
